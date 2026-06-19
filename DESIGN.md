# Healthdog Design System

## 1. Atmosphere & Identity

헬스독은 보호자가 아이를 처음 만나는 순간의 조심스러운 안심감을 보여주는 웰니스형 분양 브랜드다. 시각적 서명은 `cream paper + sage care`: 크림색 종이 같은 배경 위에 세이지 그린, 작은 노란 포인트, 부드러운 반려동물 사진을 얹어 건강, 청결, 상담 신뢰를 먼저 느끼게 한다. 사이트는 귀여움을 과시하지 않고, 따뜻한 상담실처럼 차분해야 한다.

## 2. Color

### Palette

| Role | Token | Light | Dark | Usage |
| --- | --- | --- | --- | --- |
| Surface/base | --surface-base | #FFFCF6 | #171A16 | Page background |
| Surface/cream | --surface-cream | #F7F1E6 | #20231D | Warm section bands |
| Surface/sage | --surface-sage | #E4ECDD | #263026 | Soft green section bands |
| Surface/elevated | --surface-elevated | #FFFFFF | #252820 | Cards, sheets, popovers |
| Text/primary | --text-primary | #26312B | #F8F6EF | Headlines, primary copy |
| Text/secondary | --text-secondary | #5F665D | #C8CFC2 | Body, descriptions |
| Text/muted | --text-muted | #8A8E83 | #9EA696 | Captions, helper text |
| Border/subtle | --border-subtle | #E8DFD2 | #3A4035 | Image frames, card edges |
| Border/sage | --border-sage | #CBD8C1 | #52624D | Branch cards, focus rings |
| Accent/green | --accent-green | #5CBF6F | #78D98A | Primary CTA, active nav, key icons |
| Accent/sage | --accent-sage | #78936E | #9CB48F | Secondary CTA, badges |
| Accent/yellow | --accent-yellow | #F3C84B | #F7D66B | Tiny dots, underline accents, badges |
| Status/error | --status-error | #C74E3F | #EF8A7C | Form errors only |

### Rules

- Cream and white must dominate. Green is a trust signal, not a wall color.
- Yellow is used only as a small warmth accent. Never use it as a large button background.
- Do not add purple, blue-gradient, orange-brown, or high-saturation pastel surfaces.
- Generated images already contain the main visual palette, so code UI should use quieter versions of the same colors.

## 3. Typography

### Scale

| Level | Desktop | Mobile | Weight | Line Height | Tracking | Usage |
| --- | --- | --- | --- | --- | --- | --- |
| Display | 56px | 36px | 500 | 1.22 | 0 | Hero/page headline when not inside an image |
| H1 | 44px | 32px | 500 | 1.25 | 0 | Major page titles |
| H2 | 34px | 26px | 500 | 1.35 | 0 | Section titles |
| H3 | 24px | 21px | 600 | 1.4 | 0 | Card titles |
| Body/lg | 18px | 17px | 400 | 1.75 | 0 | Lead paragraphs |
| Body | 16px | 16px | 400 | 1.7 | 0 | Default body |
| Body/sm | 14px | 14px | 400 | 1.6 | 0 | Meta, secondary info |
| Caption | 12px | 12px | 500 | 1.45 | 0 | Labels, badges |

### Font Stack

- Display/serif: `Gowun Batang`, `Noto Serif KR`, serif
- UI/body: `Pretendard Variable`, `Pretendard`, `Noto Sans KR`, system-ui, sans-serif
- Mono: not used in the public UI

### Rules

- Main emotional headings use `Gowun Batang`; buttons, nav, forms, cards, pet metadata, and branch info use `Pretendard`.
- Do not use Inter, Roboto, Arial, or Helvetica as the intended brand font.
- Do not scale font size with viewport width. Use fixed breakpoint sizes.
- Letter spacing is always `0`; Korean text must not be tightened with negative tracking.

## 4. Spacing & Layout

### Base Unit

All spacing derives from a 4px base.

| Token | Value | Usage |
| --- | --- | --- |
| --space-1 | 4px | Icon-to-label gap |
| --space-2 | 8px | Tight inline groups |
| --space-3 | 12px | Badge and compact control padding |
| --space-4 | 16px | Mobile page margin, small card padding |
| --space-5 | 20px | Button padding, form groups |
| --space-6 | 24px | Standard card padding |
| --space-8 | 32px | Card groups, image-to-button gap |
| --space-10 | 40px | Inner section rhythm |
| --space-14 | 56px | Mobile section padding |
| --space-18 | 72px | Tablet section padding |
| --space-24 | 96px | Desktop section padding |
| --space-32 | 128px | Large desktop hero breathing room |

### Grid

- Max content width: 1400px for public card sections, 1180px for narrow text sections, 1440px for generated image bands.
- Page margin: 16px mobile, 24px tablet, 40px desktop.
- Breakpoints: sm 640px, md 768px, lg 1024px, xl 1280px, 2xl 1536px.
- Generated desktop banners keep their natural wide ratio; mobile banners are separate assets and must not be cropped from desktop.

### Rules

- Generated image sections are treated as full-width bands, not cards inside cards.
- Keep section padding generous. The image style has a quiet editorial mood; cramped layouts will break it.
- Use `picture` for desktop/mobile image switching and provide stable `aspect-ratio` so the layout does not jump.

## 5. Components

### Generated Image Band

- **Structure**: section wrapper, optional small code eyebrow/title only when the image does not already contain the same copy, `picture`, CTA row below.
- **Variants**: hero, section image, CTA background.
- **Spacing**: `--space-14` mobile vertical, `--space-24` desktop vertical, CTA row `--space-8` below image.
- **States**: image has no interaction; CTA buttons carry interaction states.
- **Accessibility**: all generated images need meaningful `alt`; repeated text inside the image must also be represented in nearby semantic text when the section is critical.
- **Motion**: gentle fade-up with transform and opacity only.

### Brand CTA Button

- **Structure**: shadcn `Button` with rounded pill shape, text label, optional Lucide arrow or phone icon.
- **Variants**: primary green, secondary cream, outline sage.
- **Spacing**: 48px minimum height mobile, 52px to 56px desktop; horizontal padding `--space-6` to `--space-8`.
- **Type**: 16px default, 15px only for compact navigation actions.
- **States**: hover darkens green slightly, active scales to 0.98, focus uses `--border-sage`.
- **Accessibility**: text label must state the action, such as `상담 문의하기`, not vague labels.
- **Motion**: 220ms `cubic-bezier(0.22, 1, 0.36, 1)`.

### Branch Card

- **Structure**: branch name, region/address summary, phone, Naver Place, Instagram/blog links.
- **Variants**: compact grid card, detail page header card.
- **Spacing**: card padding `--space-8` to `--space-10`, internal gap `--space-4`; desktop grid cards should feel like introduction panels, not dashboard tiles.
- **States**: hover lifts by 2px and changes border to `--border-sage`.
- **Accessibility**: links expose destination names, not only icons.
- **Motion**: transform and border-color only.

### Pet Card

- **Structure**: real pet image, name, breed/type, branch, status, CTA.
- **Variants**: listing grid, related pets, featured home card.
- **Spacing**: image ratio fixed, content padding `--space-6` to `--space-8`; card buttons use the same 48px+ CTA height as the rest of the system.
- **States**: hover reveals CTA emphasis without moving text.
- **Accessibility**: image alt includes name/type when available.
- **Motion**: subtle image scale inside clipped container, max 1.03.

### Consultation Form

- **Structure**: branch select, contact fields, pet interest, message, consent checkbox, submit CTA.
- **Variants**: full page form, compact modal.
- **Spacing**: field group gap `--space-5` to `--space-6`; compact form width 520px, full form max width 720px.
- **States**: disabled, loading, error, success must all be designed.
- **Accessibility**: labels are visible; errors are connected to fields.
- **Motion**: success/error messages fade in with opacity only.

## 6. Motion & Interaction

### Timing

| Type | Duration | Easing | Usage |
| --- | --- | --- | --- |
| Micro | 140ms | cubic-bezier(0.22, 1, 0.36, 1) | Button press, link hover |
| Standard | 220ms | cubic-bezier(0.22, 1, 0.36, 1) | Cards, tabs, menus |
| Emphasis | 520ms | cubic-bezier(0.16, 1, 0.3, 1) | Hero and section entry |
| Carousel | 650ms | cubic-bezier(0.32, 0.72, 0, 1) | Hero slide transitions |

### Rules

- Animate only `transform` and `opacity`.
- Do not animate layout properties, widths, heights, top, left, margin, or padding.
- Use `IntersectionObserver` or Framer Motion viewport triggers for reveal; no raw scroll listeners.
- Respect `prefers-reduced-motion`.
- Avoid aggressive parallax. The brand should feel calm and careful.

## 7. Depth & Surface

### Strategy

Depth strategy is mixed but restrained: tonal shifts first, soft shadows only for interactive cards and overlays.

| Level | Value | Usage |
| --- | --- | --- |
| Image frame | 0 1px 0 rgba(38, 49, 43, 0.06) | Generated images, pet photos |
| Card rest | 0 10px 30px rgba(57, 49, 37, 0.06) | Branch/pet cards |
| Card hover | 0 16px 42px rgba(57, 49, 37, 0.10) | Hovered cards |
| Overlay | 0 24px 70px rgba(38, 49, 43, 0.16) | Dialogs, mobile menu |

### Rules

- Do not use dark generic drop shadows.
- Do not place cards inside cards.
- Generated images already include their own frames and decorative depth; do not wrap them in heavy containers.
- Border radius stays modest for UI cards: 8px to 16px. Very large radii are reserved for pills, dialogs, and image bands when needed.
