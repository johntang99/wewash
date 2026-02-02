# Quick Testing Guide

## Dev Server Running
**URL**: http://localhost:3003

## Test Plan (5 minutes)

### 1. Test Services Page (Both Languages)

**Chinese Services** - http://localhost:3003/zh/services
- ✓ Hero title shows: "传统中医疗法"
- ✓ Services section shows 8 treatments in Chinese
- ✓ FAQ accordion opens/closes
- ✓ "预约咨询" button visible

**English Services** - http://localhost:3003/en/services
- ✓ Hero title shows: "Traditional Chinese Medicine Services"
- ✓ Services section shows 8 treatments in English
- ✓ FAQ accordion opens/closes
- ✓ "Schedule Consultation" button visible

### 2. Test Contact Page (Both Languages)

**Chinese Contact** - http://localhost:3003/zh/contact
- ✓ Hero title shows: "联系我们"
- ✓ Three contact cards (致电我们, 电子邮件, 拜访我们)
- ✓ Hours show Chinese days (周一, 周二, etc.)
- ✓ Form labels in Chinese
- ✓ Form placeholder "张三" for name
- ✓ Submit button says "发送消息"
- ✓ FAQ section in Chinese

**English Contact** - http://localhost:3003/en/contact
- ✓ Hero title shows: "Get in Touch"
- ✓ Three contact cards (Call Us, Email, Visit Us)
- ✓ Hours show English days (Monday, Tuesday, etc.)
- ✓ Form labels in English
- ✓ Form placeholder "John Smith" for name
- ✓ Submit button says "Send Message"
- ✓ FAQ section in English

### 3. Test Language Switcher

**From any page**:
1. Click language button (top right)
2. Should show dropdown/toggle
3. Click other language
4. ✓ Page reloads
5. ✓ URL changes (`/en/...` ↔ `/zh/...`)
6. ✓ Content changes language
7. ✓ Same page (e.g., still on contact page)

### 4. Test Contact Form Submission

1. Go to contact page (either language)
2. Fill out form:
   - Name: "Test User"
   - Email: "test@example.com"
   - Phone: "555-123-4567"
   - Reason: Select any option
   - Message: "Test message"
3. Click submit button
4. ✓ Button shows loading state ("Sending..." / "发送中...")
5. ✓ Success message appears
6. ✓ Form clears
7. ✓ (Optional) Check email for notification

### 5. Test Other Pages (Quick Check)

**Test these URLs load without errors**:
- http://localhost:3003/zh - Homepage
- http://localhost:3003/zh/about - About page
- http://localhost:3003/zh/pricing - Pricing page
- http://localhost:3003/zh/conditions - Conditions page  
- http://localhost:3003/zh/case-studies - Case studies
- http://localhost:3003/zh/blog - Blog listing
- http://localhost:3003/zh/new-patients - New patients
- http://localhost:3003/zh/gallery - Gallery

### 6. Test Mobile Responsiveness

1. Open dev tools (F12)
2. Click device toolbar icon (Ctrl+Shift+M)
3. Select "iPhone 12 Pro" or similar
4. Navigate through pages
5. ✓ Content stacks vertically
6. ✓ Navigation menu works
7. ✓ Forms are usable
8. ✓ No horizontal scroll

## Expected Results

### ✅ Success Criteria
- No 404 errors on any page
- All content in correct language
- Forms submit successfully
- Language switcher changes locale
- No console errors
- Mobile layout works

### ❌ Red Flags (report immediately)
- 404 error on services or contact pages
- English text on Chinese pages (or vice versa)
- Form doesn't submit
- Console errors appear
- Page crashes or freezes

## If Something Doesn't Work

### Services Page 404
- Check URL is exactly: `/zh/services` or `/en/services`
- Check `content/dr-huang-clinic/zh/pages/services.json` exists
- Check browser console for errors

### Contact Page Still English
- Hard refresh page (Ctrl+F5 or Cmd+Shift+R)
- Check URL includes `/zh/` not `/en/`
- Check browser console

### Form Doesn't Submit
- Open browser console (F12 → Console tab)
- Look for error messages
- Check network tab for failed requests
- Verify `/api/contact` route is responding

### Language Switcher Broken
- Check middleware is running
- Check URL structure
- Hard refresh page

## Quick Fixes

### Clear Cache
```bash
# If pages seem stuck with old content:
rm -rf .next/
npm run dev
```

### Restart Server
```bash
# Kill the dev server
pkill -f "next dev"
# Start again
npm run dev
```

### Check Logs
```bash
# Watch server logs
cd medical-clinic/chinese-medicine
npm run dev
# Look for errors in terminal
```

## Test Results Template

Copy and fill out:

```
Date: ___________
Tester: ___________

✅/❌ Services Page (ZH): _____
✅/❌ Services Page (EN): _____
✅/❌ Contact Page (ZH): _____
✅/❌ Contact Page (EN): _____
✅/❌ Language Switcher: _____
✅/❌ Contact Form: _____
✅/❌ Other Pages Load: _____
✅/❌ Mobile Responsive: _____

Issues Found:
_________________________________
_________________________________

Overall Status: PASS / FAIL
```

## Next Step After Testing

If all tests pass:
1. Stop dev server: `Ctrl+C`
2. Run production build: `npm run build`
3. Deploy to Vercel/hosting
4. Test live site with same checklist

If tests fail:
1. Note which specific test failed
2. Check browser console for errors
3. Report issue with:
   - URL that failed
   - Expected behavior  
   - Actual behavior
   - Screenshots if helpful
   - Console errors
