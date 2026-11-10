<?php
/**
 * /navstevnost/komentare.php – schvalování komentářů (stejné přihlášení jako přehled návštěvnosti).
 */

declare(strict_types=1);
require __DIR__ . '/../api/_lib.php';

header('X-Robots-Tag: noindex, nofollow');
header('Cache-Control: no-store');
header('X-Frame-Options: DENY');
header('Referrer-Policy: same-origin');

session_name('km_admin');
session_set_cookie_params(['httponly' => true, 'samesite' => 'Strict', 'secure' => !empty($_SERVER['HTTPS']), 'path' => '/navstevnost/']);
session_start();

$password = (string) (km_config()['stats_password'] ?? '');
if (empty($_SESSION['ok']) || $password === '') {
    header('Location: ./');
    exit;
}
if (empty($_SESSION['csrf'])) {
    $_SESSION['csrf'] = bin2hex(random_bytes(16));
}
$csrf = (string) $_SESSION['csrf'];

$pdo = km_db();
km_comments_schema($pdo);

if (($_SERVER['REQUEST_METHOD'] ?? '') === 'POST') {
    if (!hash_equals($csrf, (string) ($_POST['csrf'] ?? ''))) {
        http_response_code(403);
        exit('Neplatný požadavek.');
    }
    $id = (int) ($_POST['id'] ?? 0);
    $akce = (string) ($_POST['akce'] ?? '');
    $reply = trim(str_replace("\r", '', (string) ($_POST['odpoved'] ?? '')));
    $reply = $reply === '' ? null : mb_substr($reply, 0, 2000);
    if ($akce === 'schvalit') {
        $pdo->prepare('UPDATE comments SET status = 1, reply = ? WHERE id = ?')->execute([$reply, $id]);
    } elseif ($akce === 'ulozit') {
        $pdo->prepare('UPDATE comments SET reply = ? WHERE id = ?')->execute([$reply, $id]);
    } elseif ($akce === 'skryt') {
        $pdo->prepare('UPDATE comments SET status = 0 WHERE id = ?')->execute([$id]);
    } elseif ($akce === 'smazat') {
        $pdo->prepare('DELETE FROM comments WHERE id = ?')->execute([$id]);
    }
    header('Location: komentare.php');
    exit;
}

$pending = $pdo->query('SELECT * FROM comments WHERE status = 0 ORDER BY created ASC')->fetchAll();
$approved = $pdo->query('SELECT * FROM comments WHERE status = 1 ORDER BY created DESC LIMIT 200')->fetchAll();

function km_comment_card(array $c, string $csrf, bool $pending): void
{
    ?>
    <article class="c">
      <p class="c__meta"><b><?= km_e($c['name']) ?></b> · <?= km_e(date('j. n. Y H:i', (int) $c['created'])) ?> · <a href="<?= km_e($c['path']) ?>" target="_blank" rel="noopener"><?= km_e($c['path']) ?></a></p>
      <p class="c__body"><?= nl2br(km_e($c['body'])) ?></p>
      <form method="post">
        <input type="hidden" name="csrf" value="<?= km_e($csrf) ?>">
        <input type="hidden" name="id" value="<?= (int) $c['id'] ?>">
        <label>Odpověď redakce (nepovinná, zobrazí se pod komentářem)
          <textarea name="odpoved" rows="3" maxlength="2000"><?= km_e((string) ($c['reply'] ?? '')) ?></textarea>
        </label>
        <div class="c__btns">
          <?php if ($pending): ?>
            <button class="btn" name="akce" value="schvalit">Schválit a zveřejnit</button>
          <?php else: ?>
            <button class="btn" name="akce" value="ulozit">Uložit odpověď</button>
            <button class="btn btn--ghost" name="akce" value="skryt">Skrýt</button>
          <?php endif; ?>
          <button class="btn btn--ghost" name="akce" value="smazat" onclick="return confirm('Komentář natrvalo smazat?')">Smazat</button>
        </div>
      </form>
    </article>
    <?php
}
?>
<!doctype html>
<html lang="cs">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="robots" content="noindex, nofollow">
  <title>Komentáře – kojeneckemleko.cz</title>
  <link rel="icon" href="/favicon.svg" type="image/svg+xml">
  <style>
    :root { --ink: #0f3e17; --ink-2: #0c2f10; --sage: #b1dbb8; --mint: #cfe7d3; --keylime: #e1f4df; --cream: #fffefc; --charcoal: #222; --line: #efeeeb; --muted: #4a514b;
      --serif: 'Iowan Old Style', 'Newsreader', Georgia, serif; --sans: 'Inter', ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif; --ease: cubic-bezier(0.23, 1, 0.32, 1); }
    * { box-sizing: border-box; margin: 0; }
    body { background: var(--cream); color: var(--charcoal); font: 15px/1.55 var(--sans); -webkit-font-smoothing: antialiased; }
    .wrap { max-width: 820px; margin: 0 auto; padding: 32px clamp(16px, 4vw, 32px) 64px; display: grid; gap: 28px; }
    h1, h2 { font-family: var(--serif); font-weight: 300; color: var(--ink); letter-spacing: -0.02em; }
    h1 { font-size: clamp(32px, 5vw, 48px); line-height: 1.1; }
    h2 { font-size: 24px; margin-bottom: 14px; }
    .eyebrow { font-size: 11px; font-weight: 600; letter-spacing: .08em; text-transform: uppercase; color: var(--ink); }
    .muted { color: var(--muted); }
    a { color: var(--ink); }
    header { display: flex; flex-wrap: wrap; justify-content: space-between; align-items: end; gap: 16px; }
    .list { display: grid; gap: 14px; }
    .c { background: var(--keylime); border-radius: 14px; padding: 20px; display: grid; gap: 10px; }
    .list--ok .c { background: var(--cream); border: 1px solid var(--sage); }
    .c__meta { font-size: 13px; color: var(--muted); overflow-wrap: anywhere; }
    .c__meta b { color: var(--ink); }
    .c__body { overflow-wrap: anywhere; }
    form { display: grid; gap: 10px; }
    label { display: grid; gap: 6px; font-size: 13px; font-weight: 600; color: var(--ink); }
    textarea { width: 100%; padding: 10px 12px; font: inherit; font-weight: 400; color: var(--charcoal); border: 1px solid var(--sage); border-radius: 10px; background: var(--cream); resize: vertical; }
    textarea:focus-visible, .btn:focus-visible, a:focus-visible { outline: 2px solid var(--ink); outline-offset: 2px; }
    .c__btns { display: flex; flex-wrap: wrap; gap: 8px; }
    .btn { padding: 10px 16px; border-radius: 14px; border: 0; font: inherit; font-size: 14px; cursor: pointer; background: var(--ink); color: var(--cream); transition: background-color 150ms var(--ease), transform 150ms var(--ease); }
    .btn--ghost { background: transparent; color: var(--ink); box-shadow: inset 0 0 0 1px var(--ink); }
    .btn:active { transform: scale(.97); }
    @media (hover: hover) and (pointer: fine) { .btn:hover { background: var(--ink-2); } .btn--ghost:hover { background: var(--keylime); } }
    @media (prefers-reduced-motion: reduce) { .btn { transition: none; } }
  </style>
</head>
<body>
<div class="wrap">
  <header>
    <div>
      <p class="eyebrow">kojeneckemleko.cz</p>
      <h1>Komentáře</h1>
    </div>
    <p><a href="./">← Návštěvnost</a></p>
  </header>

  <section>
    <h2>Čekají na schválení (<?= count($pending) ?>)</h2>
    <?php if (!$pending): ?><p class="muted">Nic nečeká.</p><?php endif; ?>
    <div class="list"><?php foreach ($pending as $c) { km_comment_card($c, $csrf, true); } ?></div>
  </section>

  <section>
    <h2>Zveřejněné (<?= count($approved) ?>)</h2>
    <?php if (!$approved): ?><p class="muted">Zatím žádné.</p><?php endif; ?>
    <div class="list list--ok"><?php foreach ($approved as $c) { km_comment_card($c, $csrf, false); } ?></div>
  </section>

  <p class="muted">Před schválením zkontrolujte: žádné zdravotní rady pro konkrétní dítě, žádná reklama ani doporučování značek mléka, žádné osobní údaje. Odpověď redakce pište jen z ověřených zdrojů článku, u potíží s odkazem na pediatra.</p>
</div>
</body>
</html>
