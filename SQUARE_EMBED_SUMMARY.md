# Square Appointments Embed - Quick Summary

## What Changes?

Instead of buttons linking to `https://squareup.com/appointments/book` (which opens a new tab), all "Book now" buttons will trigger a **modal overlay** that appears on your current page.

## Visual Difference

### Before (Current):
```
┌─────────────────────────────┐
│  Your Website Page          │
│                             │
│  [BOOK NOW] ← Click         │
│                             │
└─────────────────────────────┘
         ↓ (opens new tab)
┌─────────────────────────────┐
│  Square Booking Page        │
│  (separate tab)             │
└─────────────────────────────┘
```

### After (With Embed):
```
┌─────────────────────────────┐
│  Your Website Page          │
│  (dimmed/overlay)           │
│                             │
│  [BOOK NOW] ← Click         │
│                             │
│  ┌───────────────────────┐ │
│  │ Square Booking Widget │ │ ← Modal appears
│  │ (in overlay)          │ │
│  └───────────────────────┘ │
└─────────────────────────────┘
```

## Where "Book Now" Appears

1. **Homepage** - "BOOK A FACIAL" button
2. **Services Page** - Two "BOOK NOW" buttons (top and bottom)
3. **Header** - "Book" button (visible on all pages)
4. **FAQs Page** - Text link in booking FAQ answer

## Code Changes Required

### Minimal Changes Needed:

1. **Add script to `app/layout.tsx`** (one line in `<head>`)
2. **Update 4 button instances** to use `onClick` instead of `href`
3. **Import the trigger function** in those 4 files

That's it! Your Button component already supports `onClick`, so no changes needed there.

## User Experience

**Current:** Click → New tab → Book → Close tab/switch back  
**New:** Click → Modal appears → Book → Modal closes (stay on page)

## Ready to Implement?

I've created:
- ✅ `components/SquareBookingWidget.tsx` - The widget loader and trigger function
- ✅ Documentation files explaining the changes

Would you like me to:
1. **Implement it now** - Make all the changes so you can test it
2. **Show you the code** - See exactly what each file would look like
3. **Create a test page** - See it working on one page first

Let me know how you'd like to proceed!

