# Header Variants Guide

## Overview

The header now supports 3 different layout variants that can be configured per page.

## Variant Types

### 1. Default Variant (One-Line Layout) ✅
**When to use**: Most pages (standard layout)

**Layout**:
```
[Logo + Name]  [Home] [Services] [Conditions] [About] [Case Studies] [Gallery] [Pricing] [Blog] [Contact] [Lang] [Book Online]
```

**Features**:
- Logo on the left (SVG logo)
- All menu items in ONE horizontal line
- Language switcher integrated
- "Book Online" button on the right
- Responsive: collapses to mobile menu on small screens

**Usage**:
```tsx
<Header locale={locale} siteId={siteId} variant="default" />
// or just
<Header locale={locale} siteId={siteId} /> // default is assumed
```

### 2. Centered Variant (Logo on Top) ✅
**When to use**: Homepage or landing pages for more visual impact

**Layout**:
```
           [Logo + Dr Huang Clinic]
           Traditional Chinese Medicine
           
[Home] [Services] [Conditions] [About] [Case Studies] [Gallery] [Pricing] [Blog] [Contact] [Lang] [Book Online]
```

**Features**:
- Logo centered at top
- Clinic name below logo
- Menu items centered in a single row below
- Symmetrical, elegant look

**Usage**:
```tsx
<Header locale={locale} siteId={siteId} variant="centered" />
```

### 3. Transparent Variant (Overlay Style) ✅
**When to use**: Pages with photo backgrounds, overlaying hero images

**Layout**:
Same as default, but with transparent/frosted glass background

**Features**:
- Semi-transparent white background (95% opacity)
- Backdrop blur effect (frosted glass)
- Floats over content beautifully
- Same one-line menu layout

**Usage**:
```tsx
<Header locale={locale} siteId={siteId} variant="transparent" />
```

## Changes Made

### ✅ 1. Logo Updated
- **Old**: Green square with "TCM" text
- **New**: SVG logo from `/uploads/dr-huang-clinic/home/drhuang-2.svg`
- **Size**: 48px height (default), 60px height (centered variant)

### ✅ 2. Button Text Changed
- **Old**: "Book Appointment" / "预约"
- **New**: "Book Online" / "在线预约"

### ✅ 3. Menu Layout Fixed
- **Old**: Menu items might wrap to multiple lines
- **New**: All menu items in ONE horizontal line
- **Responsive**: 
  - Desktop (1280px+): All items visible
  - Tablet: Hamburger menu
  - Mobile: Hamburger menu

## How to Change Variant for a Page

### Update Layout.tsx

Open: `app/[locale]/layout.tsx`

**Current** (uses default everywhere):
```tsx
<Header locale={locale} siteId={site.id} />
```

**Change to centered** (for homepage):
```tsx
<Header 
  locale={locale} 
  siteId={site.id} 
  variant={pathname === `/${locale}` ? 'centered' : 'default'}
/>
```

**Change to transparent** (for pages with hero images):
```tsx
<Header 
  locale={locale} 
  siteId={site.id} 
  variant="transparent"
/>
```

## Visual Comparison

### Default Variant
```
┌─────────────────────────────────────────────────────────────────┐
│ [LOGO] Dr Huang   Home Services Conditions About ... [EN/中文] [Book Online] │
└─────────────────────────────────────────────────────────────────┘
```

### Centered Variant
```
┌─────────────────────────────────────────────────────────────────┐
│                        [LOGO]                                    │
│                   Dr Huang Clinic                                │
│              Traditional Chinese Medicine                         │
│                                                                   │
│    Home  Services  Conditions  About  ...  [EN/中文] [Book Online]    │
└─────────────────────────────────────────────────────────────────┘
```

### Transparent Variant
```
┌─────────────────────────────────────────────────────────────────┐
│ [LOGO] Dr Huang   Home Services ... [EN/中文] [Book Online]         │
│                                                     (Frosted glass) │
└─────────────────────────────────────────────────────────────────┘
     ↓ Overlays hero image below
```

## Responsive Behavior

### Desktop (1280px+)
- All 9 menu items visible in one line
- Logo + menu + button all visible
- No scrolling needed

### Tablet (768px - 1279px)
- Logo visible
- Hamburger menu button
- Click to expand menu items vertically

### Mobile (< 768px)
- Logo icon only
- Hamburger menu button
- Full-screen menu when expanded

## Styling Details

### Default/Centered Variants
- Background: Solid white (`bg-white`)
- Shadow: Small shadow (`shadow-sm`)
- Height: 80px (5rem)

### Transparent Variant
- Background: White 95% opacity (`bg-white/95`)
- Backdrop filter: Blur effect (`backdrop-blur-md`)
- Shadow: Small shadow (`shadow-sm`)
- Effect: Frosted glass appearance

## Top Bar

All variants include an optional top bar (hidden on mobile):

```
┌─────────────────────────────────────────────────────────────────┐
│ ☎ (845) 381-1106  ✉ info@clinic.com      [Accepting New Patients] │
└─────────────────────────────────────────────────────────────────┘
```

**To hide top bar**: Remove the top bar section from Header.tsx

## Logo Specifications

### SVG Logo Requirements
- **Path**: `/public/uploads/dr-huang-clinic/home/drhuang-2.svg`
- **Format**: SVG (scalable, crisp at any size)
- **Recommended size**: 200x200px artboard
- **Colors**: Should match brand colors

### Fallback
If SVG logo doesn't load, component will show error. Make sure file exists.

## Customization

### Change Logo
Replace file at: `public/uploads/dr-huang-clinic/home/drhuang-2.svg`

### Change Menu Items
Edit `navigation` array in `Header.tsx`:
```tsx
const navigation = [
  { text: locale === 'en' ? 'Home' : '首页', url: `/${locale}` },
  // Add/remove/edit items here
];
```

### Change Button Text
Edit the button text:
```tsx
{locale === 'en' ? 'Book Online' : '在线预约'}
```

### Adjust Spacing
Edit gap classes:
```tsx
gap-4    // Small spacing
gap-6    // Medium spacing (current)
gap-8    // Large spacing
```

## Testing

After changes, test:

1. ✅ All menu items visible on desktop
2. ✅ Logo displays correctly
3. ✅ "Book Online" button works
4. ✅ Language switcher works
5. ✅ Mobile menu expands/collapses
6. ✅ All links navigate correctly
7. ✅ Transparent variant overlays hero nicely

## Browser Support

- ✅ Chrome/Edge (latest)
- ✅ Safari (latest)
- ✅ Firefox (latest)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

Backdrop blur (transparent variant) works on all modern browsers.

## Performance

All variants are optimized:
- SVG logo: ~5KB (fast load)
- No layout shift
- Sticky positioning (smooth scroll)
- Hardware-accelerated backdrop blur

## Next Steps

Want to customize further?

1. **Different logo per page**: Pass logo prop
2. **Different menu per section**: Create separate Header components
3. **Mega menu**: Expand to dropdown menus
4. **Search bar**: Add search input to header
5. **User account**: Add login/profile menu

Let me know what else you need!
