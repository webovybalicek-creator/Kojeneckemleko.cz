<?php
/**
 * Komentáře pod články: GET ?p=/rubrika/slug/ vrátí schválené, POST uloží nový ke schválení.
 * Bez cookies, bez e-mailu, bez IP v databázi (jen krátkodobý otisk kvůli limitu odesílání).
 * Nic se nezobrazí bez schválení v /navstevnost/komentare.php.
 */

declare(strict_types=1);
require __DIR__ . '/_lib.php';

header('Content-Type: application/json; charset=utf-8');
header('X-Robots-Tag: noindex');
header('Cache-Control: no-store');

const KM_COMMENT_PER_KEY = 3;      // odeslání za hodinu z jednoho zdroje
const KM_COMMENT_GLOBAL = 40;      // odeslání za hodinu celkem
const KM_COMMENT_MIN_MS = 4000;    // minimální doba vyplňování formuláře

function km_out(int $code, array $data): void
{
    http_response_code($code);
    echo json_encode($data, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}

function km_path(string $p): ?string
{
    return preg_match('~^/(mleka|krmeni|prikrmy)/[a-z0-9-]{2,80}/$~', $p) ? $p : null;
}

try {
    $pdo = km_db();
    km_comments_schema($pdo);
    $method = $_SERVER['REQUEST_METHOD'] ?? 'GET';

    if ($method === 'GET') {
        $path = km_path((string) ($_GET['p'] ?? ''));
        if ($path === null) {
            km_out(400, ['error' => 'Neplatná stránka.']);
        }
        $q = $pdo->prepare('SELECT id, name, body, created, reply FROM comments WHERE path = ? AND status = 1 ORDER BY created ASC LIMIT 200');
        $q->execute([$path]);
        $rows = array_map(static fn(array $r): array => [
            'id' => (int) $r['id'],
            'jmeno' => $r['name'],
            'text' => $r['body'],
            'datum' => date('j. n. Y', (int) $r['created']),
            'odpoved' => $r['reply'],
        ], $q->fetchAll());
        km_out(200, ['komentare' => $rows]);
    }

    if ($method !== 'POST') {
        km_out(405, ['error' => 'Nepodporovaná metoda.']);
    }

    $in = json_decode((string) file_get_contents('php://input', false, null, 0, 8192), true);
    if (!is_array($in)) {
        km_out(400, ['error' => 'Neplatná data.']);
    }
    $path = km_path((string) ($in['p'] ?? ''));
    $name = trim(preg_replace('/\s+/u', ' ', (string) ($in['jmeno'] ?? '')) ?? '');
    $body = trim(preg_replace('/\R{3,}/u', "\n\n", str_replace("\r", '', (string) ($in['text'] ?? ''))) ?? '');
    $ua = (string) ($_SERVER['HTTP_USER_AGENT'] ?? '');

    // Roboti: vyplněné skryté pole, příliš rychlé odeslání nebo známý robot → tváříme se, že je vše v pořádku.
    if ($path === null) {
        km_out(400, ['error' => 'Neplatná stránka.']);
    }
    if ((string) ($in['web'] ?? '') !== '' || (int) ($in['t'] ?? 0) < KM_COMMENT_MIN_MS || km_is_bot($ua)) {
        km_out(200, ['ok' => true]);
    }
    if (mb_strlen($name) < 2 || mb_strlen($name) > 40) {
        km_out(422, ['error' => 'Vyplňte přezdívku (2–40 znaků).']);
    }
    if (mb_strlen($body) < 10 || mb_strlen($body) > 1500) {
        km_out(422, ['error' => 'Text má mít 10 až 1500 znaků.']);
    }
    if (preg_match('~https?://|www\.|\b[a-z0-9-]+\.(cz|sk|com|net|org|eu|info|io|shop|store)\b~iu', $name . ' ' . $body)) {
        km_out(422, ['error' => 'Odkazy v komentářích nepovolujeme. Odstraňte prosím webové adresy.']);
    }
    if (preg_match('/[\w.+-]+@[\w-]+\.[\w.-]+/u', $name . ' ' . $body)) {
        km_out(422, ['error' => 'E-mailové adresy do komentářů nepište.']);
    }

    $now = time();
    $key = hash('sha256', km_salt($pdo, km_today()) . '|komentar|' . ($_SERVER['REMOTE_ADDR'] ?? ''));
    $pdo->prepare('DELETE FROM comment_rate WHERE ts < ?')->execute([$now - 86400]);
    $q = $pdo->prepare('SELECT COUNT(*) FROM comment_rate WHERE hash = ? AND ts >= ?');
    $q->execute([$key, $now - 3600]);
    $g = $pdo->prepare('SELECT COUNT(*) FROM comment_rate WHERE ts >= ?');
    $g->execute([$now - 3600]);
    if ((int) $q->fetchColumn() >= KM_COMMENT_PER_KEY || (int) $g->fetchColumn() >= KM_COMMENT_GLOBAL) {
        km_out(429, ['error' => 'Příliš mnoho komentářů za krátkou dobu. Zkuste to prosím později.']);
    }
    $dup = $pdo->prepare('SELECT 1 FROM comments WHERE path = ? AND body = ?');
    $dup->execute([$path, $body]);
    if ($dup->fetchColumn()) {
        km_out(200, ['ok' => true]);
    }

    $pdo->prepare('INSERT INTO comment_rate (hash, ts) VALUES (?, ?)')->execute([$key, $now]);
    $pdo->prepare('INSERT INTO comments (path, name, body, created, status) VALUES (?, ?, ?, ?, 0)')->execute([$path, $name, $body, $now]);

    // Upozornění provozovateli (jen pokud je nastavený secret KOMENTARE_EMAIL); text komentáře se e-mailem neposílá.
    $to = (string) (km_config()['notify_email'] ?? '');
    if ($to !== '' && filter_var($to, FILTER_VALIDATE_EMAIL)) {
        @mail(
            $to,
            '=?UTF-8?B?' . base64_encode('Nový komentář čeká na schválení') . '?=',
            "Na kojeneckemleko.cz čeká nový komentář ke schválení.\n\nStránka: https://kojeneckemleko.cz{$path}\nSchválení: https://kojeneckemleko.cz/navstevnost/komentare.php\n",
            "From: kojeneckemleko.cz <noreply@kojeneckemleko.cz>\r\nContent-Type: text/plain; charset=UTF-8"
        );
    }

    km_out(200, ['ok' => true]);
} catch (Throwable $e) {
    km_out(500, ['error' => 'Komentář se nepodařilo uložit. Zkuste to prosím později.']);
}
