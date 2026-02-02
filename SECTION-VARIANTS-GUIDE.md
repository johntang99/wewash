# 🎨 Section Variants System - Complete Guide

## Overview

The **Section Variants System** allows you to create **many different website designs** using the same content by simply changing the `variant` property in your content JSON files.

This makes it easy to:
- ✅ Build **100+ unique TCM clinic websites** with different layouts
- ✅ Switch layouts **without code changes**
- ✅ Test different designs **quickly**
- ✅ Customize per site via JSON configuration

---

## 🏗️ Architecture

### How It Works

1. **Content JSON** specifies which variant to use
2. **Section Component** reads the variant
3. **Component renders** the appropriate layout
4. **Same content, different design!**

```
content/site/en/pages/home.json
└── "variant": "split-photo-right"
    ↓
HeroSection.tsx
└── Renders split layout with photo on right
```

---

## 📋 Available Section Variants

### 1. Hero Section (7 Variants)

| Variant | Description | Best For |
|---------|-------------|----------|
| **centered** | Text centered, gradient background | Traditional, formal sites |
| **split-photo-right** | Text left, photo right (50/50) | Modern, balanced design |
| **split-photo-left** | Text right, photo left (50/50) | Unique layouts |
| **overlap** | Text box overlaps photo | Dramatic, modern look |
| **photo-background** | Full photo background, text overlay | Visual-heavy sites |
| **video-background** | Video background, text overlay | Dynamic, engaging |
| **gallery-background** | Rotating photo gallery background | Multiple clinic photos |

#### Example: Centered Hero
```json
{
  "hero": {
    "variant": "centered",
    "clinicName": "Dr Huang Clinic",
    "tagline": "Traditional Chinese Medicine",
    "description": "..."
  }
}
```

#### Example: Split with Photo
```json
{
  "hero": {
    "variant": "split-photo-right",
    "clinicName": "Dr Huang Clinic",
    "image": "/uploads/clinic-photo.jpg",
    "tagline": "Traditional Chinese Medicine",
    "description": "..."
  }
}
```

#### Example: Video Background
```json
{
  "hero": {
    "variant": "video-background",
    "clinicName": "Dr Huang Clinic",
    "video": "/uploads/clinic-video.mp4",
    "tagline": "Traditional Chinese Medicine",
    "description": "..."
  }
}
```

---

### 2. Testimonials Section (5 Variants)

| Variant | Description | Best For |
|---------|-------------|----------|
| **carousel** | Auto-rotating slider | 3-5 testimonials, highlight best |
| **grid** | Static grid layout | Show all testimonials at once |
| **masonry** | Pinterest-style layout | Varying length testimonials |
| **slider-vertical** | Vertical stacked list | Detailed testimonials |
| **featured-single** | One large testimonial | Highlight best review |

#### Example: Carousel
```json
{
  "testimonials": {
    "variant": "carousel",
    "title": "Real Results",
    "testimonials": [...]
  }
}
```

#### Example: Grid
```json
{
  "testimonials": {
    "variant": "grid",
    "title": "Patient Reviews",
    "testimonials": [...]
  }
}
```

---

### 3. Services Section (5 Variants)

| Variant | Description | Best For |
|---------|-------------|----------|
| **grid-cards** | Equal-sized cards in grid | 6-9 services, equal importance |
| **featured-large** | One large + smaller cards | Highlight main service |
| **list-horizontal** | Horizontal scrolling | Many services, modern look |
| **accordion** | Expandable accordion | Detailed service descriptions |
| **tabs** | Tabbed interface | Clean, organized presentation |

#### Example: Featured Large
```json
{
  "services": {
    "variant": "featured-large",
    "featured": {
      "id": "acupuncture",
      "title": "Acupuncture",
      "shortDescription": "...",
      "image": "/uploads/acupuncture.jpg"
    },
    "services": [...]
  }
}
```

#### Example: Tabs
```json
{
  "services": {
    "variant": "tabs",
    "title": "Our Services",
    "services": [...]
  }
}
```

---

### 4. More Sections (Coming)

**Conditions Section** (4 variants):
- `grid-cards` - Card grid
- `categories-tabs` - Tabbed by category
- `list-detailed` - Detailed list
- `icon-grid` - Icon + title grid

**CTA Section** (4 variants):
- `centered` - Centered text + buttons
- `split` - Text + image split
- `banner` - Full-width banner
- `card-elevated` - Elevated card

**Gallery Section** (4 variants):
- `grid-masonry` - Masonry grid
- `grid-uniform` - Uniform grid
- `carousel` - Carousel slider
- `lightbox-grid` - Grid with lightbox

**Blog Preview** (4 variants):
- `cards-grid` - Grid of cards
- `featured-side` - Large featured + list
- `list-detailed` - Detailed list
- `carousel` - Horizontal carousel

---

## 🎯 How to Use Variants

### Step 1: Choose a Variant

Pick from the available variants for each section.

### Step 2: Update JSON

Edit your content JSON file:

```json
{
  "hero": {
    "variant": "split-photo-right",  // ← Add this
    "clinicName": "...",
    // ... rest of content
  }
}
```

### Step 3: Add Required Fields

Some variants need extra fields:

**Photo variants** need `image`:
```json
{
  "hero": {
    "variant": "split-photo-right",
    "image": "/uploads/clinic-exterior.jpg",  // ← Required
    "clinicName": "..."
  }
}
```

**Video variants** need `video`:
```json
{
  "hero": {
    "variant": "video-background",
    "video": "/uploads/clinic-tour.mp4",  // ← Required
    "clinicName": "..."
  }
}
```

### Step 4: Save & Refresh

Save the file and refresh your browser. The new layout appears instantly!

---

## 🔧 Variant Configuration

### Layout Options

Each variant has configuration:

```typescript
{
  variant: 'split-photo-right',
  layout: 'container',      // container | full-width | narrow
  padding: 'lg',            // none | sm | md | lg | xl
  className: 'grid md:grid-cols-2 gap-12'
}
```

### Padding Sizes

| Size | Mobile | Desktop |
|------|--------|---------|
| `none` | 0 | 0 |
| `sm` | py-8 | py-12 |
| `md` | py-12 | py-16 |
| `lg` | py-16 | py-24 |
| `xl` | py-20 | py-32 |

---

## 💡 Mix & Match Examples

### Example 1: Modern Clinic

```json
{
  "hero": { "variant": "video-background" },
  "testimonials": { "variant": "carousel" },
  "services": { "variant": "featured-large" },
  "cta": { "variant": "split" }
}
```

**Result:** Dynamic video hero, rotating testimonials, featured services, split CTA

---

### Example 2: Traditional Clinic

```json
{
  "hero": { "variant": "centered" },
  "testimonials": { "variant": "grid" },
  "services": { "variant": "grid-cards" },
  "cta": { "variant": "centered" }
}
```

**Result:** Classic centered layout, static grids, traditional feel

---

### Example 3: Photo-Heavy Clinic

```json
{
  "hero": { "variant": "photo-background" },
  "testimonials": { "variant": "masonry" },
  "services": { "variant": "list-horizontal" },
  "gallery": { "variant": "grid-masonry" }
}
```

**Result:** Beautiful photos throughout, modern layouts

---

## 🎨 Creating 100+ Unique Sites

With variants, you can create **hundreds of unique designs**:

**Math:**
- 7 hero variants
- × 5 testimonials variants
- × 5 services variants
- × 4 conditions variants
- × 4 CTA variants
- × 4 gallery variants

= **11,200 possible combinations!**

Each combination creates a **completely different looking website** using the same content.

---

## 📝 Best Practices

### 1. Choose Based on Content

**Few services (3-4)?** → Use `featured-large`
**Many services (8+)?** → Use `tabs` or `accordion`

**Short testimonials?** → Use `grid` or `carousel`
**Long testimonials?** → Use `slider-vertical` or `featured-single`

### 2. Consider Your Audience

**Young, modern audience?** → Use video, overlays, carousels
**Traditional audience?** → Use centered, grids, simple layouts

### 3. Mobile Responsiveness

All variants are **mobile-responsive** by default:
- Grids collapse to single column
- Split layouts stack vertically
- Horizontal scrolls become vertical

### 4. Performance

**Video backgrounds:**
- Use short, compressed videos (< 5MB)
- Provide fallback image

**Photo galleries:**
- Optimize images (WebP format)
- Use Next.js Image component (coming Phase 4)

---

## 🚀 Advanced: Custom Variants

Want to create your own variant?

### 1. Add to Type Definition

```typescript
// lib/section-variants.ts
export type HeroVariant = 
  | 'centered'
  | 'split-photo-right'
  | 'your-custom-variant';  // ← Add here
```

### 2. Add Configuration

```typescript
export const heroVariantConfig = {
  // ... existing variants
  'your-custom-variant': {
    variant: 'your-custom-variant',
    layout: 'container',
    padding: 'lg',
    className: 'your-custom-classes',
  },
};
```

### 3. Implement in Component

```typescript
// components/sections/HeroSection.tsx
case 'your-custom-variant':
  return (
    <section className={cn(sectionClasses, className)}>
      {/* Your custom layout */}
    </section>
  );
```

---

## 📚 Summary

✅ **7 Hero variants** - From centered to video backgrounds
✅ **5 Testimonials variants** - From carousel to featured
✅ **5 Services variants** - From grids to tabs
✅ **Easy configuration** - Just change JSON
✅ **100+ combinations** - Create unique sites
✅ **Mobile responsive** - All variants adapt
✅ **Performance optimized** - Fast loading

---

## 🎯 Next Steps

1. **Try different variants** - Update your home.json
2. **Test combinations** - Mix and match
3. **Find your style** - What works for your clinic?
4. **Create templates** - Save successful combinations

**Documentation:**
- Full list: See this file
- Examples: Check `content/dr-huang-clinic/en/pages/home.json`
- Code: Browse `components/sections/`

---

**Ready to create unique designs?** Just change the `variant` in your JSON! 🎨
