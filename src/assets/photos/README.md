# Drop-in photos

Put image files here and they appear on the site automatically (no code change).
Any of these extensions works: `.webp`, `.jpg`, `.jpeg`, `.png`, `.avif`.
The file name (without extension) is the key.

## Client demo — suite banners

The suite-level image on `/client-demo` (banner, tree root, hero tiles,
standalone card) and the module landing pages (`/solutions/hrms`, etc.).

| File name                    | Shown as                                  | Topic                          |
| ---------------------------- | ----------------------------------------- | ------------------------------ |
| `suite-hrms.*`               | HRMS banner                               | people / HR / attendance       |
| `suite-finance.*`            | Finance banner                            | coins / accounts / ledger      |
| `suite-manufacturing.*`      | Manufacturing banner                      | factory / production floor     |

## Individual modules (optional — otherwise the real app screen is used)

Name them `<suite>-<module>.*`, e.g.:

- `hrms-attendance.*`, `hrms-payroll.*`, `hrms-leave.*`
- `finance-accounts.*`, `finance-billing.*`, `finance-expenses.*`
- `manufacturing-crm.*`, `manufacturing-procurement.*`

## Other pages

- `home-hero.*` — home hero background
- `banner-<art>.*` — inner page banners (e.g. `banner-solutions.*`, `banner-platform.*`)

Images are served as-is, so keep them optimised (WebP, ~1600px wide max) for speed.
