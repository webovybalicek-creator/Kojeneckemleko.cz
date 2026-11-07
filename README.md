# 🍼 kojeneckemleko.cz

Nezávislý průvodce kojeneckými mléky a krmením miminka. Astro, statický web.

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # výstup v dist/
```

- Pravidla projektu, design a obsahové zásady: [CLAUDE.md](CLAUDE.md)
- Přehled komponent: `/styleguide/`

## Deploy (FTP)

GitHub Action `.github/workflows/deploy.yml` – build + nahrání `dist/` přes FTP. Spouští se automaticky při pushi do `main`, ručně v záložce Actions.

Secrets (Settings → Secrets and variables → Actions):

| Secret | Význam |
|---|---|
| `FTP_SERVER` | FTP server |
| `FTP_USERNAME` | uživatel |
| `FTP_PASSWORD` | heslo |
| `FTP_SERVER_DIR` | volitelně cílová složka s lomítkem, např. `www/` |
| `STATS_PASSWORD` | heslo ke stránce `/navstevnost/` |

Hosting musí mít PHP 8.1+ s `pdo_sqlite`.

## Návštěvnost

Vlastní měření bez cookies (`public/api/hit.php`, data v `api/data/stats.sqlite`, na FTP se nepřepisují).
Přehled: `/navstevnost/` pod heslem `STATS_PASSWORD`. Podrobnosti pro návštěvníky: `/ochrana-soukromi/`.
