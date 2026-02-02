# 🚀 GETTING STARTED - TCM Multi-Site System

## ✅ Phase 1 Complete! What You Have Now:

### 🎉 Working Features

1. **✅ Multi-Language Website**
   - English at `/en`
   - Chinese at `/zh`
   - Language switcher in header
   - All content translated

2. **✅ Responsive Layout**
   - Professional header with navigation
   - Mobile hamburger menu
   - Footer with 4 columns
   - Works on all devices

3. **✅ Theme Customization**
   - 16 CSS variables
   - Editable via `content/dr-huang-clinic/theme.json`
   - Live theme injection
   - Green & Amber color scheme (default)

4. **✅ Content Management**
   - File-based CMS (no database needed)
   - Edit content via JSON files
   - Type-safe content loading
   - Sample clinic content included

---

## 📦 Installation & Running

### Step 1: Install Dependencies

```bash
cd medical-clinic/chinese-medicine
npm install
```

### Step 2: Run Development Server

```bash
npm run dev
```

### Step 3: Open in Browser

- **English Homepage**: http://localhost:3000/en
- **Chinese Homepage**: http://localhost:3000/zh
- **Auto-redirect**: http://localhost:3000 → `/en`

---

## 🎨 How to Customize Your Site

### Change Colors & Fonts

Edit `content/dr-huang-clinic/theme.json`:

```json
{
  "colors": {
    "primary": {
      "DEFAULT": "#166534",  ← Change main color
      "dark": "#14532d",     ← Change hover color
      "light": "#22c55e"
    }
  },
  "typography": {
    "heading": "2.25rem"     ← Change heading size
  }
}
```

Save the file and refresh your browser - changes appear instantly!

### Edit Homepage Content

**English**: `content/dr-huang-clinic/en/pages/home.json`  
**Chinese**: `content/dr-huang-clinic/zh/pages/home.json`

Example - Change clinic name:

```json
{
  "hero": {
    "clinicName": "Your Clinic Name Here",  ← Edit this
    "tagline": "Your Tagline",
    "description": "Your description..."
  }
}
```

### Change Contact Information

Edit `content/dr-huang-clinic/en/site.json`:

```json
{
  "clinicName": "Dr Huang Clinic",
  "phone": "(845) 381-1106",     ← Your phone
  "email": "your@email.com",     ← Your email
  "address": "71 East Main St"   ← Your address
}
```

Don't forget to update the Chinese version too in `/zh/site.json`!

---

## 📄 Current Pages

### ✅ Working Now
- **Home** (`/en` or `/zh`)
  - Hero section with CTA buttons
  - Stats display (4 metrics)
  - Header with navigation
  - Footer with all sections

### 🚧 Coming in Phase 3 (After Phase 2)
- Full homepage with all 12 sections
- Services page
- Conditions page
- About page
- And 6 more pages...

---

## 🗂️ File Structure Quick Reference

```
content/
└── dr-huang-clinic/           ← Your clinic folder
    ├── theme.json            ← Colors & fonts (shared)
    ├── en/                   ← English content
    │   ├── site.json        ← Contact info
    │   ├── navigation.json  ← Menu items
    │   └── pages/
    │       └── home.json    ← Homepage content
    └── zh/                   ← Chinese content (same structure)
```

**To edit content**: Just open the JSON file and change the text!

---

## 🎯 What's Next?

### Phase 2: UI Components (Next Week)
We'll build 16 reusable components:
- Buttons, Cards, Badges
- Forms (Input, Textarea, Select)
- Modal, Accordion, Carousel
- Toast notifications

### Phase 3: Complete Homepage (Week After)
All 12 sections:
- Testimonials carousel
- How It Works (3 steps)
- Conditions grid (8 cards)
- Services showcase
- Blog preview
- Gallery preview
- And more...

### Phase 4-8: Everything Else
- 9 more pages
- Admin dashboard
- Multi-site support (50 clinics)

---

## 🛠️ Common Tasks

### Add a New Menu Item

Edit `content/dr-huang-clinic/en/navigation.json`:

```json
{
  "main": [
    {
      "text": "Home",
      "url": "/en"
    },
    {
      "text": "New Page",  ← Add this
      "url": "/en/new-page"
    }
  ]
}
```

### Change Top Bar Badge

Edit `content/dr-huang-clinic/en/pages/home.json`:

```json
{
  "topBar": {
    "badge": {
      "text": "Now Accepting New Patients",  ← Change text
      "visible": true                        ← Show/hide
    }
  }
}
```

### Update Footer Copyright

Edit Footer component or add to content files (Phase 6 will make this editable via admin).

---

## 🐛 Troubleshooting

### Port 3000 Already in Use?

```bash
# Use a different port
npm run dev -- -p 3001
```

### Changes Not Showing?

1. Hard refresh: `Cmd+Shift+R` (Mac) or `Ctrl+Shift+R` (Windows)
2. Clear cache and reload
3. Restart dev server: `Ctrl+C` then `npm run dev` again

### TypeScript Errors?

```bash
npm run type-check
```

---

## 📚 Learn More

- **Project Plan**: Read `PROJECT-PLAN.md` for full roadmap
- **Phase 1 Checklist**: See `PHASE-1-CHECKLIST.md` for what's done
- **README**: See `README.md` for technical details
- **Next.js Docs**: https://nextjs.org/docs
- **Tailwind CSS**: https://tailwindcss.com/docs

---

## 🎨 Design System Preview

### Colors
```
Primary:   #166534 (Green)
Secondary: #78350f (Amber)
```

### Typography
```
Display:    48px (Hero titles)
Heading:    36px (Section titles)
Subheading: 20px (Card titles)
Body:       16px (Paragraphs)
Small:      14px (Meta text)
```

### Components Available Now
- ✅ Button (Primary, Outline variants)
- ✅ Badge
- ✅ Card (basic)
- ✅ Header
- ✅ Footer
- ✅ Language Switcher

### Components Coming in Phase 2
- 🔜 Modal
- 🔜 Accordion
- 🔜 Carousel
- 🔜 Tabs
- 🔜 Form inputs
- 🔜 Toast notifications

---

## ✨ Tips for Success

1. **Start Small**: Edit one section at a time
2. **Test Both Languages**: Always check `/en` and `/zh`
3. **Use Version Control**: Commit changes regularly
4. **Mobile First**: Test on phone screen sizes
5. **Keep Backups**: Copy files before major changes

---

## 📞 Need Help?

1. Check the documentation files:
   - `README.md`
   - `PROJECT-PLAN.md`
   - `PHASE-1-CHECKLIST.md`

2. Review the sample content:
   - `content/dr-huang-clinic/en/pages/home.json`

3. Look at component examples:
   - `components/layout/Header.tsx`
   - `components/layout/Footer.tsx`

---

## 🎯 Quick Wins You Can Do Now

### 1️⃣ Change Your Clinic Name (2 minutes)
- Edit `content/dr-huang-clinic/en/site.json`
- Edit `content/dr-huang-clinic/zh/site.json`

### 2️⃣ Update Contact Info (3 minutes)
- Phone, email, address in both `site.json` files
- Also update in `pages/home.json` for hero section

### 3️⃣ Customize Colors (5 minutes)
- Edit `content/dr-huang-clinic/theme.json`
- Try different primary colors!

### 4️⃣ Update Stats (5 minutes)
- Edit `content/dr-huang-clinic/en/pages/home.json`
- Find `hero.stats` array
- Change numbers and labels

### 5️⃣ Change Testimonials (10 minutes)
- Edit `testimonials` section in `home.json`
- Update quotes, names, conditions

---

## 🚀 You're Ready!

Phase 1 is complete and working. You have a solid foundation for a professional TCM clinic website.

**Next**: We'll build the UI component library in Phase 2, then complete all homepage sections in Phase 3.

---

**Happy Building!** 🎉

Questions? Check the documentation or wait for Phase 2 instructions.
