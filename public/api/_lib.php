<?php
/**
 * Společný základ pro počítadlo návštěvnosti kojeneckemleko.cz.
 * Bez cookies: unikátní návštěvníci = denní hash (IP + prohlížeč + denně měněná sůl).
 * Hashe ani sůl se neuchovávají déle než do konce dne.
 */

declare(strict_types=1);

if (basename($_SERVER['SCRIPT_FILENAME'] ?? '') === '_lib.php') {
    http_response_code(404);
    exit;
}

const KM_TZ = 'Europe/Prague';
date_default_timezone_set(KM_TZ);

function km_config(): array
{
    $file = __DIR__ . '/config.php';
    $cfg = is_file($file) ? require $file : [];
    return is_array($cfg) ? $cfg : [];
}

function km_db(): PDO
{
    $dir = __DIR__ . '/data';
    if (!is_dir($dir)) {
        mkdir($dir, 0750, true);
    }
    $ht = $dir . '/.htaccess';
    if (!is_file($ht)) {
        file_put_contents($ht, "Require all denied\n<IfModule !mod_authz_core.c>\nDeny from all\n</IfModule>\n");
    }

    $pdo = new PDO('sqlite:' . $dir . '/stats.sqlite', null, null, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    ]);
    $pdo->exec('PRAGMA journal_mode = WAL; PRAGMA busy_timeout = 3000;');
    $pdo->exec('
        CREATE TABLE IF NOT EXISTS pageviews (day TEXT NOT NULL, path TEXT NOT NULL, views INTEGER NOT NULL DEFAULT 0, PRIMARY KEY (day, path));
        CREATE TABLE IF NOT EXISTS daily (day TEXT PRIMARY KEY, views INTEGER NOT NULL DEFAULT 0, visitors INTEGER NOT NULL DEFAULT 0);
        CREATE TABLE IF NOT EXISTS referrers (day TEXT NOT NULL, host TEXT NOT NULL, views INTEGER NOT NULL DEFAULT 0, PRIMARY KEY (day, host));
        CREATE TABLE IF NOT EXISTS today_visitors (day TEXT NOT NULL, hash TEXT NOT NULL, PRIMARY KEY (day, hash));
        CREATE TABLE IF NOT EXISTS salt (day TEXT PRIMARY KEY, value TEXT NOT NULL);
    ');
    return $pdo;
}

function km_today(): string
{
    return date('Y-m-d');
}

/** Denní sůl – vytvoří se první návštěvou dne, staré se mažou. */
function km_salt(PDO $pdo, string $day): string
{
    $pdo->prepare('DELETE FROM salt WHERE day <> ?')->execute([$day]);
    $pdo->prepare('DELETE FROM today_visitors WHERE day <> ?')->execute([$day]);
    $row = $pdo->prepare('SELECT value FROM salt WHERE day = ?');
    $row->execute([$day]);
    $salt = $row->fetchColumn();
    if (!$salt) {
        $salt = bin2hex(random_bytes(16));
        $pdo->prepare('INSERT OR IGNORE INTO salt (day, value) VALUES (?, ?)')->execute([$day, $salt]);
        $row->execute([$day]);
        $salt = (string) $row->fetchColumn();
    }
    return $salt;
}

function km_is_bot(string $ua): bool
{
    return $ua === '' || (bool) preg_match(
        '/bot|crawl|spider|slurp|mediapartners|yandex|baidu|seznambot|facebookexternalhit|preview|headless|lighthouse|pingdom|uptime|monitor|curl|wget|python|httpclient|java\//i',
        $ua
    );
}

function km_e(string $s): string
{
    return htmlspecialchars($s, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
}
