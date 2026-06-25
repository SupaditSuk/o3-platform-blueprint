# Design

## Visual Direction

Black-and-white knowledge atelier with a controlled crimson/coral pulse. The surface should feel crisp, focused, and editorial without falling into magazine cliche. Axion Studio is used only as an interaction reference: pill navigation, rolling CTA text, bottom-sheet mobile menu, section badges, and media-led cards.

## Color Tokens

Use OKLCH custom properties only.

```css
:root {
  --bg: 0.085 0 0;
  --surface: 0.145 0 0;
  --ink: 0.985 0 0;
  --muted: 0.735 0 0;
  --line: 0.245 0 0;
  --brand: 0.58 0.22 23;
  --coral: 0.68 0.18 36;
}
```

Light sections may invert to pure white with near-black ink. Crimson and coral are reserved for CTAs, focus rings, live indicators, and a few high-value accents.

## Typography

Primary font stack: Noto Sans Thai when available, then system sans. Keep body copy at 16px or larger, line-height 1.6 for Thai text, and cap prose measure near 70ch.

## Layout

Use a max content width of 1440px. The home page opens with a full viewport hero, then moves through About, Featured Writing, Future Courses, and Contact. Cards are used only for article previews and media tiles.

## Motion

Use 200-500ms transitions with exponential or cubic-bezier easing. Required motion patterns: CTA text roll, arrow rotation, mobile bottom sheet, soft hero texture movement. All motion must honor `prefers-reduced-motion`.
