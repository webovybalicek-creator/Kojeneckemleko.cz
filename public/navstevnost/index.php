<?php
/**
 * /navstevnost/ – přehled návštěvnosti pod heslem (heslo = secret STATS_PASSWORD, viz README).
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

$cfg = km_config();
$password = (string) ($cfg['stats_password'] ?? '');
$error = '';

if (isset($_GET['odhlasit'])) {
    $_SESSION = [];
    session_destroy();
    header('Location: ./');
    exit;
}

if (($_SERVER['REQUEST_METHOD'] ?? '') === 'POST') {
    usleep(400000); // zpomalení zkoušení hesel
    $lockDb = km_db();
    $lockKey = km_login_key($lockDb);
    if (km_login_blocked($lockDb, $lockKey)) {
        http_response_code(429);
        $error = 'Příliš mnoho pokusů. Zkuste to znovu za 15 minut.';
    } elseif ($password !== '' && hash_equals($password, (string) ($_POST['heslo'] ?? ''))) {
        session_regenerate_id(true);
        $_SESSION['ok'] = true;
        $_SESSION['nemerit'] = true; // po přihlášení vyřadit prohlížeč z měření
        header('Location: ./');
        exit;
    } else {
        km_login_fail($lockDb, $lockKey);
        $error = $password === '' ? 'Heslo není nastavené (secret STATS_PASSWORD).' : 'Nesprávné heslo.';
    }
}

$authed = !empty($_SESSION['ok']) && $password !== '';
$setNoTrack = $authed && !empty($_SESSION['nemerit']);
unset($_SESSION['nemerit']);

$range = (int) ($_GET['dni'] ?? 30);
if (!in_array($range, [7, 30, 90, 365], true)) {
    $range = 30;
}

$data = null;
$ipExcluded = false;
if ($authed) {
    $pdo = km_db();
    // Vlastní IP adresa se nepočítá: otisk se obnoví při každém otevření přehledu (IP se může měnit).
    if (isset($_GET['ip']) && $_GET['ip'] === 'pocitat') {
        km_ip_include($pdo);
        $_SESSION['ip_pocitat'] = true;
        header('Location: ./');
        exit;
    }
    if (isset($_GET['ip']) && $_GET['ip'] === 'nepocitat') {
        unset($_SESSION['ip_pocitat']);
        header('Location: ./');
        exit;
    }
    if (empty($_SESSION['ip_pocitat'])) {
        km_ip_exclude($pdo);
    }
    $ipExcluded = km_ip_excluded($pdo);
    $from = date('Y-m-d', strtotime('-' . ($range - 1) . ' days'));

    $q = $pdo->prepare('SELECT day, views, visitors FROM daily WHERE day >= ? ORDER BY day');
    $q->execute([$from]);
    $byDay = [];
    foreach ($q as $r) {
        $byDay[$r['day']] = $r;
    }
    $days = [];
    for ($i = $range - 1; $i >= 0; $i--) {
        $d = date('Y-m-d', strtotime("-$i days"));
        $days[] = ['day' => $d, 'views' => (int) ($byDay[$d]['views'] ?? 0), 'visitors' => (int) ($byDay[$d]['visitors'] ?? 0)];
    }

    $pages = $pdo->prepare('SELECT path, SUM(views) AS views FROM pageviews WHERE day >= ? GROUP BY path ORDER BY views DESC LIMIT 20');
    $pages->execute([$from]);
    $refs = $pdo->prepare('SELECT host, SUM(views) AS views FROM referrers WHERE day >= ? GROUP BY host ORDER BY views DESC LIMIT 15');
    $refs->execute([$from]);

    $data = [
        'days' => $days,
        'views' => array_sum(array_column($days, 'views')),
        'visitors' => array_sum(array_column($days, 'visitors')),
        'today' => end($days),
        'pages' => $pages->fetchAll(),
        'refs' => $refs->fetchAll(),
        'max' => max(1, ...array_column($days, 'views')),
    ];
}

$fmt = fn (int $n): string => number_format($n, 0, ',', "\u{00A0}");
?>
<!doctype html>
<html lang="cs">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="robots" content="noindex, nofollow">
  <title>Návštěvnost | Kojenecké mléko</title>
  <link rel="icon" href="/favicon.svg" type="image/svg+xml">
  <style>
    :root {
      --ink: #0f3e17; --ink-2: #0c2f10; --sage: #b1dbb8; --mint: #cfe7d3; --keylime: #e1f4df;
      --slate: #b6ced5; --cream: #fffefc; --charcoal: #222; --line: #efeeeb; --muted: #4a514b;
      --serif: 'Iowan Old Style', 'Newsreader', Georgia, serif;
      --sans: 'Inter', ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif;
      --ease: cubic-bezier(0.23, 1, 0.32, 1);
    }
    * { box-sizing: border-box; margin: 0; }
    body { background: var(--cream); color: var(--charcoal); font: 15px/1.55 var(--sans); -webkit-font-smoothing: antialiased; }
    .wrap { max-width: 1100px; margin: 0 auto; padding: 32px clamp(16px, 4vw, 32px) 64px; }
    h1, h2 { font-family: var(--serif); font-weight: 300; color: var(--ink); letter-spacing: -0.02em; }
    h1 { font-size: clamp(32px, 5vw, 48px); line-height: 1.1; }
    h2 { font-size: 24px; margin-bottom: 14px; }
    .eyebrow { font-size: 11px; font-weight: 600; letter-spacing: .08em; text-transform: uppercase; color: var(--ink); }
    .muted { color: var(--muted); }
    a { color: var(--ink); }
    header { display: flex; flex-wrap: wrap; justify-content: space-between; align-items: end; gap: 16px; margin-bottom: 28px; }
    .ranges { display: flex; gap: 6px; flex-wrap: wrap; }
    .ranges a, .btn {
      display: inline-block; padding: 9px 14px; border-radius: 999px; text-decoration: none; font-size: 14px;
      background: var(--keylime); color: var(--ink); border: 0; cursor: pointer;
      transition: background-color 150ms var(--ease), transform 150ms var(--ease);
    }
    .ranges a[aria-current] { background: var(--ink); color: var(--cream); }
    .btn { background: var(--ink); color: var(--cream); border-radius: 14px; padding: 12px 20px; }
    .btn:active, .ranges a:active { transform: scale(.97); }
    @media (hover: hover) and (pointer: fine) { .ranges a:not([aria-current]):hover { background: var(--mint); } .btn:hover { background: var(--ink-2); } }
    .panel { border-radius: 14px; padding: 28px; }
    .grid { display: grid; gap: 14px; }
    .kpis { grid-template-columns: repeat(4, 1fr); margin-bottom: 14px; }
    .kpi { background: var(--keylime); }
    .kpi:nth-child(2) { background: var(--mint); }
    .kpi:nth-child(3) { background: var(--sage); }
    .kpi:nth-child(4) { background: var(--slate); }
    .kpi b { display: block; font-family: var(--serif); font-weight: 300; font-size: clamp(30px, 4vw, 44px); line-height: 1.1; color: var(--ink); font-variant-numeric: tabular-nums; margin-top: 6px; }
    .chart { background: var(--slate); padding: 21px; margin-bottom: 14px; }
    .chart-inner { background: var(--cream); border-radius: 10px; padding: 21px; }
    .bars { display: flex; align-items: flex-end; gap: 2px; height: 180px; margin-top: 14px; }
    .bar { flex: 1; min-width: 2px; background: var(--sage); border-radius: 3px 3px 0 0; position: relative; transform-origin: bottom; animation: grow 400ms var(--ease) both; }
    .bar span { position: absolute; bottom: 0; left: 0; right: 0; background: var(--ink); border-radius: 3px 3px 0 0; }
    @keyframes grow { from { transform: scaleY(0); } }
    .axis { display: flex; justify-content: space-between; margin-top: 8px; font-size: 12px; }
    .legend { display: flex; gap: 16px; font-size: 13px; }
    .legend i { display: inline-block; width: 10px; height: 10px; border-radius: 3px; margin-right: 6px; vertical-align: -1px; }
    .two { grid-template-columns: 1.4fr 1fr; }
    table { width: 100%; border-collapse: collapse; font-size: 14px; font-variant-numeric: tabular-nums; }
    td { padding: 10px 0; border-bottom: 1px solid var(--line); vertical-align: top; }
    td:last-child { text-align: right; padding-left: 12px; white-space: nowrap; }
    td a { word-break: break-all; text-decoration: none; }
    .card { background: var(--cream); border: 1px solid var(--line); }
    .login { max-width: 380px; margin: 12vh auto 0; background: var(--keylime); display: grid; gap: 14px; }
    input[type=password] { width: 100%; padding: 12px 14px; border: 1px solid var(--sage); border-radius: 14px; font: inherit; background: var(--cream); }
    input:focus-visible, a:focus-visible, button:focus-visible { outline: 2px solid var(--ink); outline-offset: 2px; }
    .err { color: #8a1c1c; font-size: 14px; }
    footer { margin-top: 28px; font-size: 13px; }
    @media (max-width: 760px) { .kpis { grid-template-columns: 1fr 1fr; } .two { grid-template-columns: 1fr; } .panel { padding: 21px; } }
    @media (prefers-reduced-motion: reduce) { * { animation: none !important; transition: none !important; } }
  </style>
</head>
<body>
<div class="wrap">
<?php if (!$authed): ?>
  <form method="post" class="panel login" autocomplete="off">
    <p class="eyebrow">kojeneckemleko.cz</p>
    <h1>Návštěvnost</h1>
    <label for="heslo" class="muted">Heslo</label>
    <input id="heslo" name="heslo" type="password" required autofocus>
    <?php if ($error): ?><p class="err" role="alert"><?= km_e($error) ?></p><?php endif; ?>
    <button class="btn" type="submit">Přihlásit</button>
  </form>
<?php else: ?>
  <header>
    <div>
      <p class="eyebrow">kojeneckemleko.cz</p>
      <h1>Návštěvnost</h1>
    </div>
    <nav class="ranges" aria-label="Období">
      <?php foreach ([7 => '7 dní', 30 => '30 dní', 90 => '90 dní', 365 => 'Rok'] as $n => $label): ?>
        <a href="?dni=<?= $n ?>"<?= $n === $range ? ' aria-current="page"' : '' ?>><?= $label ?></a>
      <?php endforeach; ?>
    </nav>
  </header>

  <section class="grid kpis" aria-label="Souhrn">
    <div class="panel kpi"><span class="eyebrow">Návštěvníci</span><b><?= $fmt($data['visitors']) ?></b><span class="muted">za <?= $range ?> dní</span></div>
    <div class="panel kpi"><span class="eyebrow">Zobrazení</span><b><?= $fmt($data['views']) ?></b><span class="muted">za <?= $range ?> dní</span></div>
    <div class="panel kpi"><span class="eyebrow">Dnes návštěvníci</span><b><?= $fmt($data['today']['visitors']) ?></b><span class="muted">od půlnoci</span></div>
    <div class="panel kpi"><span class="eyebrow">Dnes zobrazení</span><b><?= $fmt($data['today']['views']) ?></b><span class="muted">od půlnoci</span></div>
  </section>

  <section class="panel chart" aria-label="Vývoj po dnech">
    <div class="chart-inner">
      <div class="legend"><span><i style="background:var(--sage)"></i>Zobrazení</span><span><i style="background:var(--ink)"></i>Návštěvníci</span></div>
      <div class="bars">
        <?php foreach ($data['days'] as $i => $d):
          $h = round($d['views'] / $data['max'] * 100, 2);
          $hv = $d['views'] ? round($d['visitors'] / $d['views'] * 100, 2) : 0; ?>
          <div class="bar" style="height:<?= $h ?>%;animation-delay:<?= min($i * 8, 400) ?>ms" title="<?= km_e(date('j. n. Y', strtotime($d['day']))) ?>: <?= $d['visitors'] ?> návštěvníků, <?= $d['views'] ?> zobrazení"><span style="height:<?= $hv ?>%"></span></div>
        <?php endforeach; ?>
      </div>
      <div class="axis muted"><span><?= date('j. n.', strtotime($data['days'][0]['day'])) ?></span><span>dnes</span></div>
    </div>
  </section>

  <section class="grid two">
    <div class="panel card">
      <h2>Nejčtenější stránky</h2>
      <?php if (!$data['pages']): ?><p class="muted">Zatím žádná data.</p><?php else: ?>
      <table><tbody>
        <?php foreach ($data['pages'] as $p): ?>
          <tr><td><a href="<?= km_e($p['path']) ?>" target="_blank" rel="noopener"><?= km_e($p['path']) ?></a></td><td><?= $fmt((int) $p['views']) ?></td></tr>
        <?php endforeach; ?>
      </tbody></table>
      <?php endif; ?>
    </div>
    <div class="panel card">
      <h2>Odkud přišli</h2>
      <?php if (!$data['refs']): ?><p class="muted">Zatím žádné odkazující weby.</p><?php else: ?>
      <table><tbody>
        <?php foreach ($data['refs'] as $r): ?>
          <tr><td><?= km_e($r['host']) ?></td><td><?= $fmt((int) $r['views']) ?></td></tr>
        <?php endforeach; ?>
      </tbody></table>
      <?php endif; ?>
    </div>
  </section>

  <footer class="muted">
    Měření bez cookies, boti jsou vyfiltrovaní. Návštěvník = unikátní kombinace zařízení a prohlížeče během jednoho dne.
    · <a href="?odhlasit=1">Odhlásit</a>
    <br><span id="nemerit">Tento prohlížeč se nezapočítává do statistik.</span>
    <a href="#" id="nemerit-toggle">Znovu počítat</a>
    <br><?php if ($ipExcluded): ?>Návštěvy z vaší současné IP adresy se nepočítají (ukládá se jen její otisk). <a href="?ip=pocitat">Počítat</a>
    <?php else: ?>Návštěvy z vaší současné IP adresy se počítají. <a href="?ip=nepocitat">Nepočítat</a><?php endif; ?>
    <br>Statistiky vynulovány <?= km_e(date('j. n. Y', strtotime(KM_RESET))) ?>.
  </footer>
  <script>
    // Přihlášením se tento prohlížeč vyřadí z měření (značka v localStorage pro celý web).
    (function () {
      var k = 'km-nemerit', t = document.getElementById('nemerit'), b = document.getElementById('nemerit-toggle');
      function show() {
        var on = localStorage.getItem(k) === '1';
        t.textContent = on ? 'Tento prohlížeč se nezapočítává do statistik.' : 'Tento prohlížeč se započítává do statistik.';
        b.textContent = on ? 'Znovu počítat' : 'Nepočítat';
      }
      try {
        <?php if ($setNoTrack): ?>localStorage.setItem(k, '1');<?php endif; ?>
        show();
        b.addEventListener('click', function (e) {
          e.preventDefault();
          localStorage.getItem(k) === '1' ? localStorage.removeItem(k) : localStorage.setItem(k, '1');
          show();
        });
      } catch (e) { t.textContent = 'Prohlížeč neumožňuje uložit nastavení – použij odkaz s ?nemerit=1.'; b.hidden = true; }
    })();
  </script>
<?php endif; ?>
</div>
</body>
</html>
