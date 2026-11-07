<?php
// Dočasný test deploye – po ověření smazat.
header('Content-Type: text/plain; charset=utf-8');
header('X-Robots-Tag: noindex, nofollow');
header('Cache-Control: no-store');

$dataDir = __DIR__ . '/api/data';
$writable = is_dir($dataDir) ? is_writable($dataDir) : is_writable(__DIR__ . '/api');
$atRoot = isset($_SERVER['DOCUMENT_ROOT']) && realpath($_SERVER['DOCUMENT_ROOT']) === realpath(__DIR__);

echo "kojeneckemleko.cz – test deploye: OK\n\n";
echo 'Čas nahrání buildu: ' . date('j. n. Y H:i', filemtime(__FILE__)) . "\n";
echo 'PHP: ' . PHP_VERSION . (version_compare(PHP_VERSION, '8.1', '>=') ? ' ✓' : ' ✗ (potřeba 8.1+)') . "\n";
echo 'pdo_sqlite: ' . (extension_loaded('pdo_sqlite') ? 'ano ✓' : 'NE ✗') . "\n";
echo 'Zápis do api/data: ' . ($writable ? 'ano ✓' : 'NE ✗') . "\n";
echo 'Soubor je v kořeni webu: ' . ($atRoot ? 'ano ✓' : 'NE ✗ – zkontroluj FTP_SERVER_DIR') . "\n";
echo 'Konfigurace počítadla: ' . (is_file(__DIR__ . '/api/config.php') ? 'ano ✓' : 'NE ✗') . "\n";
