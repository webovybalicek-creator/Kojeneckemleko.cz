<?php
/**
 * Zápis zobrazení stránky. Volá se beaconem z každé stránky (src/layouts/Base.astro).
 * Neukládá IP adresy, cookies ani identifikátory – viz /ochrana-soukromi/.
 */

declare(strict_types=1);
require __DIR__ . '/_lib.php';

header('Cache-Control: no-store');
header('X-Robots-Tag: noindex');

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    http_response_code(405);
    exit;
}

$ua = substr((string) ($_SERVER['HTTP_USER_AGENT'] ?? ''), 0, 400);
if (km_is_bot($ua)) {
    http_response_code(204);
    exit;
}

$body = json_decode((string) file_get_contents('php://input', false, null, 0, 2048), true);
if (!is_array($body)) {
    http_response_code(400);
    exit;
}

// Cesta: jen pathname z našeho webu, bez parametrů
$path = (string) ($body['p'] ?? '');
$path = (string) parse_url($path, PHP_URL_PATH);
if ($path === '' || $path[0] !== '/' || strlen($path) > 300 || str_starts_with($path, '/navstevnost') || str_starts_with($path, '/api/')) {
    http_response_code(204);
    exit;
}

// Odkud: jen doména, a jen cizí
$host = strtolower((string) ($_SERVER['HTTP_HOST'] ?? ''));
$refHost = strtolower((string) parse_url((string) ($body['r'] ?? ''), PHP_URL_HOST));
$refHost = preg_replace('/^www\./', '', $refHost);
if ($refHost === '' || $refHost === preg_replace('/^www\./', '', $host)) {
    $refHost = null;
}

try {
    $pdo = km_db();
    $day = km_today();
    $salt = km_salt($pdo, $day);
    $hash = hash('sha256', $salt . '|' . ($_SERVER['REMOTE_ADDR'] ?? '') . '|' . $ua . '|' . $host);

    $pdo->beginTransaction();
    $pdo->prepare('INSERT INTO pageviews (day, path, views) VALUES (?, ?, 1) ON CONFLICT(day, path) DO UPDATE SET views = views + 1')
        ->execute([$day, $path]);

    $ins = $pdo->prepare('INSERT OR IGNORE INTO today_visitors (day, hash) VALUES (?, ?)');
    $ins->execute([$day, $hash]);
    $isNew = $ins->rowCount() === 1 ? 1 : 0;

    $pdo->prepare('INSERT INTO daily (day, views, visitors) VALUES (?, 1, ?) ON CONFLICT(day) DO UPDATE SET views = views + 1, visitors = visitors + excluded.visitors')
        ->execute([$day, $isNew]);

    if ($refHost !== null) {
        $pdo->prepare('INSERT INTO referrers (day, host, views) VALUES (?, ?, 1) ON CONFLICT(day, host) DO UPDATE SET views = views + 1')
            ->execute([$day, substr($refHost, 0, 120)]);
    }
    $pdo->commit();
} catch (Throwable $e) {
    error_log('kojeneckemleko hit: ' . $e->getMessage());
}

http_response_code(204);
