<?php
/**
 * Zápis anonymní akce na stránce (cíle): dočtení článku, použití nástroje, stažení PDF…
 * Ukládá se jen počet za den, název akce a stránka. Žádné cookies, IP ani identifikátor návštěvníka.
 * Volá se z src/layouts/Base.astro (window.kmEvent). Seznam akcí: km_events() v _lib.php.
 */

declare(strict_types=1);
require __DIR__ . '/_lib.php';

header('Cache-Control: no-store');
header('X-Robots-Tag: noindex');

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    http_response_code(405);
    exit;
}
if (km_is_bot(substr((string) ($_SERVER['HTTP_USER_AGENT'] ?? ''), 0, 400))) {
    http_response_code(204);
    exit;
}
$body = json_decode((string) file_get_contents('php://input', false, null, 0, 1024), true);
$name = is_array($body) ? (string) ($body['e'] ?? '') : '';
$path = is_array($body) ? (string) parse_url((string) ($body['p'] ?? ''), PHP_URL_PATH) : '';
if (!isset(km_events()[$name]) || $path === '' || $path[0] !== '/' || strlen($path) > 300
    || !preg_match('~^[a-z0-9/_.-]+$~i', $path) || str_starts_with($path, '/navstevnost') || str_starts_with($path, '/api/')) {
    http_response_code(204);
    exit;
}

try {
    $pdo = km_db();
    if (!km_ip_excluded($pdo)) {
        km_events_schema($pdo);
        $pdo->prepare('INSERT INTO events (day, name, path, n) VALUES (?, ?, ?, 1) ON CONFLICT(day, name, path) DO UPDATE SET n = n + 1')
            ->execute([km_today(), $name, $path]);
    }
} catch (Throwable $e) {
    error_log('kojeneckemleko event: ' . $e->getMessage());
}
http_response_code(204);
