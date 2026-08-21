---
name: Academic Precision
colors:
  surface: '#fcf9f8'
  surface-dim: '#dcd9d9'
  surface-bright: '#fcf9f8'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f6f3f2'
  surface-container: '#f0eded'
  surface-container-high: '#eae7e7'
  surface-container-highest: '#e5e2e1'
  on-surface: '#1b1b1c'
  on-surface-variant: '#434656'
  inverse-surface: '#303030'
  inverse-on-surface: '#f3f0ef'
  outline: '#737688'
  outline-variant: '#c3c5d9'
  surface-tint: '#004dea'
  primary: '#0041c8'
  on-primary: '#ffffff'
  primary-container: '#0055ff'
  on-primary-container: '#e3e6ff'
  inverse-primary: '#b6c4ff'
  secondary: '#00677f'
  on-secondary: '#ffffff'
  secondary-container: '#00ccf9'
  on-secondary-container: '#005266'
  tertiary: '#4044a4'
  on-tertiary: '#ffffff'
  tertiary-container: '#595dbe'
  on-tertiary-container: '#e6e5ff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dce1ff'
  primary-fixed-dim: '#b6c4ff'
  on-primary-fixed: '#001551'
  on-primary-fixed-variant: '#0039b3'
  secondary-fixed: '#b7eaff'
  secondary-fixed-dim: '#4cd6ff'
  on-secondary-fixed: '#001f28'
  on-secondary-fixed-variant: '#004e60'
  tertiary-fixed: '#e1e0ff'
  tertiary-fixed-dim: '#c0c1ff'
  on-tertiary-fixed: '#04006d'
  on-tertiary-fixed-variant: '#373a9b'
  background: '#fcf9f8'
  on-background: '#1b1b1c'
  surface-variant: '#e5e2e1'
  background-subtle: '#F0F6FF'
  success-emerald: '#10B981'
  warning-amber: '#F59E0B'
  border-light: '#E5E7EB'
typography:
  display-lg:
    fontFamily: Hanken Grotesk
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Hanken Grotesk
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Hanken Grotesk
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
  label-caps:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.05em
  code-sm:
    fontFamily: JetBrains Mono
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 4px
  xs: 8px
  sm: 16px
  md: 24px
  lg: 48px
  xl: 80px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: auto
  max-width: 1280px
---

## Brand & Style
The design system for this educational platform is rooted in the concepts of **clarity, progress, and authority**. It targets a focused demographic of learners and professionals seeking a structured, distraction-free environment for skill acquisition.

The visual direction follows a **Modern Corporate** aesthetic with a lean toward **Minimalism**. It prioritizes content legibility through generous whitespace and a strict adherence to a "functional-first" hierarchy. The interface avoids unnecessary decorative elements, instead using subtle depth and precise color application to guide the user's focus toward learning objectives and course progression.

## Colors
The palette is anchored by **Royal Blue**, a hue associated with institutional trust and digital reliability. This is used for primary actions and key navigation elements. **Electric Blue** serves as the high-energy accent, reserved specifically for progress indicators (progress bars, completion badges) and high-priority Call-to-Actions (CTAs).

The background strategy utilizes a "Paper and Ink" approach: clean white (`#FFFFFF`) for primary surfaces and a soft tint (`#F0F6FF`) for secondary containers to distinguish sidebar navigation or course meta-data. Text is set in a deep neutral (`#1F1F1F`) to ensure maximum contrast and reduce eye strain during long reading sessions.

## Typography
The typography system uses a dual-sans pairing. **Hanken Grotesk** is used for headlines to provide a sharp, contemporary edge that feels modern and precise. **Inter** is utilized for body copy due to its exceptional legibility and neutral character, essential for long-form educational content.

For specialized contexts such as "Time to Complete" or "Lesson ID," **JetBrains Mono** is introduced to provide a technical, structured feel, reflecting the platform's focus on coding and logical skills. Use tight tracking on large headings and increased line height on body copy to facilitate scanning.

## Layout & Spacing
The system employs a **Fixed-Fluid Hybrid Grid**. On desktop, content is centered within a 1280px container using a 12-column structure. On mobile, the layout shifts to a single column with 16px side margins.

A strict 4px/8px baseline grid maintains vertical rhythm. Vertical spacing between course sections should be generous (`lg` or `xl`) to create distinct mental "chapters," while spacing within a course card should be compact (`xs` or `sm`) to group related information tightly.

## Elevation & Depth
Depth is conveyed through **Tonal Layering** and **Soft Ambient Shadows**. 

1.  **Level 0 (Base):** Default page background.
2.  **Level 1 (Surface):** Cards and main content areas. Use a 1px border (`#E5E7EB`) and a very soft shadow (0px 4px 20px rgba(0, 0, 0, 0.04)).
3.  **Level 2 (Interaction):** Hover states for cards. The shadow intensifies (0px 8px 30px rgba(0, 0, 0, 0.08)) and the border color shifts to the Primary Royal Blue.
4.  **Level 3 (Overlays):** Modals and dropdowns. These use a higher elevation shadow and a subtle backdrop blur (4px) to maintain context without visual noise.

## Shapes
The shape language is defined as **Rounded**, utilizing a base radius of 8px (`0.5rem`). This strikes a balance between the friendliness of a learning platform and the discipline of a professional tool. 

- **Small elements (Checkboxes, Tags):** 4px radius.
- **Standard elements (Buttons, Inputs, Cards):** 8px radius.
- **Large containers (Course Hero sections):** 16px radius for top or bottom curves.
- **Interactive Progress Bars:** Pill-shaped (fully rounded) to indicate fluid movement and completion.

## Components
- **Buttons:** Primary buttons use a solid Royal Blue fill with white text. Secondary buttons use an outline style with 1.5px border weight. Active/Pressed states should darken the background color by 10%.
- **Course Cards:** Must include a fixed-ratio thumbnail (16:9), a progress bar at the bottom edge (if started), and a "Level" chip in the top right.
- **Inputs:** Text fields should have a 1px border that turns Royal Blue on focus. Error states use a 2px red border with a supporting micro-copy label.
- **Progress Indicators:** Use the Electric Blue accent. For course progress, use a horizontal bar; for curriculum completion, use a circular "donut" chart.
- **Chips/Badges:** Use the `label-caps` typography. Backgrounds for tags (e.g., "Beginner," "Python") should be low-saturation tints of the Primary color to avoid competing with main CTAs.
- **Sidebar Navigation:** Use an "Active Indicator" bar (4px wide) on the left edge of the active menu item to guide the user's current location in the curriculum.