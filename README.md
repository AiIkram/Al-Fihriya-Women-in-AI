# Al-Fihriya — Women in AI

An international research community for women working across artificial intelligence,
including machine learning, computer vision, robotics, medical imaging,
neuroscience, astrophysics, theoretical ML, and AI safety.

Built with **React 19, TypeScript, Vite, Tailwind CSS v4, Framer Motion and Lucide**.
Zero raster images — everything is SVG, CSS and code.

---

## Brand identity

A **precision laboratory / robotics instrumentation** system.

| Token | Value | Use |
| --- | --- | --- |
| `--color-carbon` | `#0D0F0E` | Panels, headers, primary button |
| `--color-lab` | `#F2F4F2` | Page background |
| `--color-signal` | `#A3E635` | Primary instrument accent, LEDs, live states |
| `--color-signal-deep` | `#65A30D` | Accent on light backgrounds |
| `--color-volt` | `#22D3EE` | Secondary trace / reference channel |
| `--color-flux` | `#818CF8` | Tertiary accent |
| `--color-thermo` | `#FB923C` | Feedback / warning channel |
| `--color-alarm` | `#F43F5E` | Fault state |

Typography: **Space Grotesk** (display), **JetBrains Mono** (labels, readouts, codes),
**Inter** (body). All small labels use the `.label-plate` utility — uppercase,
`0.16em` tracking, 10px.

---

## Interactive components

### `InstrumentPanel.tsx` — the instrument bench
Four switchable calibrated modes, all hand-drawn SVG:

| Mode | Code | What it shows |
| --- | --- | --- |
| Signal Analyser | `CH-01` | Live oscilloscope with graticule, activation trace + gradient reference trace |
| Robotic Kinematics | `ARM-6DOF` | 6-DOF arm with servo joints, sweep animation, workspace envelope |
| Training Pipeline | `DATA-BUS` | Ingest → preproc → encode → head with animated backprop return bus |
| Loss Optimiser | `SGD-CTRL` | Loss surface, descent path, saddle escape, converged minimum |

Includes a CSS calibration scan sweep, corner reticles, blinking LEDs and a live
session readout strip.

### `Emblem.tsx` — the official mark
The Al-Fihriya 8-pointed star redrawn as a **PCB instrument**: circuit substrate pad,
solder terminals at each vertex, neural connectome lattice, and a pulsing power core.
Accepts `theme="light" | "dark"` and `animate`.

---

## Sections

| ID | Section | Notes |
| --- | --- | --- |
| `#modules` | Module rack | 8 AI disciplines, each with scope, toolchain and publication venues |
| `#bench` | Instrument bench | The interactive panel above |
| `#heritage` | Heritage record | SVG astrolabe/observatory blueprint honouring Fatima al-Fihri (859 AD) |
| `#gatherings` | Operations schedule | 4 recurring community gatherings + local timezone conversion grid |
| `#comms` | Comms bus | Private channel: opportunity feed, technical threads, support |
| `#principles` | Operating values | 04 enforced rules |
| `#students` | Intake | What students and early-career members actually get |
| `#faq` | Diagnostics | 07-entry accessible accordion |
| `#join` | Access control | Final call to action |

---

## Configuration

All links live in **`src/config.ts`**:

```ts
export const COMMUNITY_JOIN_URL = ""; // Google Form / intake link
export const TELEGRAM_URL      = ""; // private channel invite
export const LINKEDIN_URL      = ""; // public page
export const CONTACT_EMAIL     = "contact@alfihriyya.community";
```

While `COMMUNITY_JOIN_URL` is empty, every Request Access button opens an
accessible dialog (`role="dialog"`, Escape to close, focus moved to close button)
explaining the intake form is being calibrated — no fake submissions, no dead links.
Social links are removed from the DOM entirely until configured.

---

## Accessibility

- Semantic landmarks, skip-to-content link, `:focus-visible` ring in signal green.
- Accordion uses `aria-expanded` / `aria-controls` and is keyboard operable.
- Dialog traps focus intent and closes on Escape.
- All decorative SVGs are `aria-hidden`; informative SVGs carry `role="img"` + labels.
- Full `prefers-reduced-motion` support — every animation collapses to `0.01ms`.
- Contrast checked for body text on both `#F2F4F2` and `#0D0F0E`.

---

## Commands

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # → dist/
npm run preview
```
