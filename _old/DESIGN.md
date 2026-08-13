---
name: AL RAQI
colors:
  surface: '#121414'
  surface-dim: '#121414'
  surface-bright: '#37393a'
  surface-container-lowest: '#0c0f0f'
  surface-container-low: '#1a1c1c'
  surface-container: '#1e2020'
  surface-container-high: '#282a2b'
  surface-container-highest: '#333535'
  on-surface: '#e2e2e2'
  on-surface-variant: '#d0c5af'
  inverse-surface: '#e2e2e2'
  inverse-on-surface: '#2f3131'
  outline: '#99907c'
  outline-variant: '#4d4635'
  surface-tint: '#e9c349'
  primary: '#f2ca50'
  on-primary: '#3c2f00'
  primary-container: '#d4af37'
  on-primary-container: '#554300'
  inverse-primary: '#735c00'
  secondary: '#c7c6c4'
  on-secondary: '#303130'
  secondary-container: '#464746'
  on-secondary-container: '#b5b5b3'
  tertiary: '#d0cecd'
  on-tertiary: '#313030'
  tertiary-container: '#b5b2b2'
  on-tertiary-container: '#464545'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#ffe088'
  primary-fixed-dim: '#e9c349'
  on-primary-fixed: '#241a00'
  on-primary-fixed-variant: '#574500'
  secondary-fixed: '#e3e2e0'
  secondary-fixed-dim: '#c7c6c4'
  on-secondary-fixed: '#1b1c1b'
  on-secondary-fixed-variant: '#464746'
  tertiary-fixed: '#e5e2e1'
  tertiary-fixed-dim: '#c9c6c5'
  on-tertiary-fixed: '#1c1b1b'
  on-tertiary-fixed-variant: '#474646'
  background: '#121414'
  on-background: '#e2e2e2'
  surface-variant: '#333535'
typography:
  display-lg:
    fontFamily: Playfair Display
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Playfair Display
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Playfair Display
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
  headline-sm:
    fontFamily: Playfair Display
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  data-lg:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 24px
    letterSpacing: -0.01em
  label-mono:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.05em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  unit: 8px
  container-max: 1440px
  gutter: 24px
  margin-desktop: 64px
  margin-mobile: 20px
---

## Brand & Style
The design system for this brand is built on the pillars of **Prestige, Precision, and Protection**. It targets high-net-worth individuals and serious gold investors who demand an experience that reflects the value of their assets. 

The visual style is a fusion of **Corporate Modern** and **Glassmorphism**. It utilizes deep, "ink-trap" blacks to provide a stage for metallic accents, evoking the feeling of a high-end physical vault. Surfaces are treated with subtle translucency and microscopic borders to maintain a lightweight, digital feel despite the heavy, authoritative color palette. The emotional response should be one of absolute confidence and understated luxury.

## Colors
The palette is rooted in the materials of wealth. 

- **Primary (Metallic Gold):** Used for primary calls to action, active states, and "Verified" status indicators. It should be applied as a subtle linear gradient (from #D4AF37 to #F1D592) on larger elements to simulate a metallic sheen.
- **Secondary (Platinum):** Used for secondary UI elements, borders, and muted icons. It provides a cool-toned contrast to the warmth of the gold.
- **Tertiary (Deep Black):** The primary background color. It is not a pure flat black, but a deep charcoal that allows for depth-layering through lighter surface shades.
- **Neutral (White):** Reserved strictly for body text and high-readability data points to ensure accessibility against the dark backgrounds.

## Typography
Typography is used to establish a clear hierarchy between "Editorial/Brand" and "Functional/Data."

- **Serif (Playfair Display):** Used for headlines and section titles. This adds the necessary "luxury" and "traditional banking" feel.
- **Sans-Serif (Inter):** Used for all functional text, descriptions, and UI controls. Its neutral character ensures that the luxury aesthetic does not compromise usability.
- **Monospace (JetBrains Mono):** Introduced specifically for live gold rates, timestamps, and transaction IDs. The fixed-width nature of the font prevents "shimmering" or layout shifts when numbers update in real-time.

## Layout & Spacing
This design system utilizes a **Fixed Grid** on desktop to maintain an organized, dashboard-like structure, transitioning to a fluid model on mobile.

- **Desktop:** 12-column grid with a 1440px max-width. Large 64px outer margins create a "framed" look, emphasizing the premium nature of the content.
- **Spacing Rhythm:** Based on an 8px base unit. Component padding should be generous (minimum 24px for cards) to avoid visual clutter.
- **Adaptation:** On mobile, margins reduce to 20px, and complex 3-column data layouts reflow into a single-column vertical stack. Interactive charts should maintain a minimum height of 240px on all devices.

## Elevation & Depth
Depth is created through **Tonal Layering** and **Glassmorphism**, rather than traditional heavy shadows.

1.  **Level 0 (Base):** #0A0A0A (The void).
2.  **Level 1 (Surface):** #161616. Used for primary card backgrounds. Includes a 1px solid border of #2A2A2A.
3.  **Level 2 (Active/Glass):** A semi-transparent overlay (White at 5% opacity) with a 20px backdrop blur. This is used for navigation bars and modal overlays.
4.  **Accents:** Gold elements (Level 3) should have a soft, "outer glow" rather than a drop shadow. Use a diffused shadow with the primary color at 20% opacity to simulate the radiance of precious metal.

## Shapes
The shape language is **Precise and Architectural**. 

We use **Soft (0.25rem)** corners for standard UI components like inputs and small buttons to maintain a sense of modern precision. Larger containers and cards use **rounded-lg (0.5rem)** to slightly soften the high-contrast aesthetic. Circle shapes are reserved exclusively for avatars and "Verified" checkmark badges. Avoid using pill-shaped buttons; rectangular buttons with subtle rounding feel more "institutional" and trustworthy in a financial context.

## Components
- **Buttons:** Primary buttons use the Gold gradient with black text (#0A0A0A) for maximum contrast. Secondary buttons use a Platinum border with no fill.
- **Data Cards:** Cards must feature a 1px top-border in Platinum or Gold to indicate category. They should use a subtle glass effect when placed over background gradients.
- **Verified Rate Badges:** A small, "Platinum" pill-shaped badge with a "Gold" checkmark icon. Text should be in the `label-mono` style.
- **Interactive Charts:** Lines should be rendered in Gold (#D4AF37) with a semi-transparent gold gradient fill underneath. Use Platinum for grid lines, set at 10% opacity.
- **Input Fields:** Dark backgrounds (#121212) with a 1px border that glows Gold only when focused. Labels should always be visible above the field in `label-mono`.
- **List Items:** Use "Hairline" separators (0.5px Platinum at 20% opacity). Each item should have a hover state that slightly lightens the background to #1A1A1A.