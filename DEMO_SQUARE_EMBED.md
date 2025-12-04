# Square Appointments Embed - Implementation Demo

This document shows how your website would look and function if you replaced all "Book now" links with the Square Appointments embed widget.

## Current Implementation

Currently, all booking buttons link to an external Square page:
- **Homepage**: "BOOK A FACIAL" button → opens `https://squareup.com/appointments/book` in new tab
- **Services Page**: Two "BOOK NOW" buttons → open `https://squareup.com/appointments/book` in new tab  
- **Header**: "Book" button → opens `https://squareup.com/appointments/book` in new tab
- **FAQs**: Text link → opens `https://squareup.com/appointments/book` in new tab

## New Implementation with Embed

With the Square embed script, clicking any booking button would:
1. **Keep users on your site** - No navigation away
2. **Open a modal/overlay** - Square's booking widget appears as a popup
3. **Seamless experience** - Users can book without leaving your beautiful site

## Visual Changes

### User Experience Flow:

**Before (Current):**
```
User clicks "BOOK NOW" 
  → New tab opens
  → User navigates to Square's booking page
  → User books appointment
  → User closes tab or navigates back
```

**After (With Embed):**
```
User clicks "BOOK NOW"
  → Modal/overlay appears on current page
  → Square booking widget loads in modal
  → User books appointment
  → Modal closes, user stays on your site
```

## Code Changes Required

### 1. Add Square Script to Layout

The Square script needs to be loaded once globally. Add it to `app/layout.tsx`:

```tsx
// In app/layout.tsx, add to <head>:
<script src='https://square.site/appointments/buyer/widget/54nx9qz78e2p8w/LS3MZ80C6P0VA.js' async></script>
```

### 2. Modify Button Component

Update `components/Button.tsx` to support triggering the Square widget:

```tsx
// Add a prop to trigger Square widget instead of external link
interface ButtonProps {
  href?: string
  onClick?: () => void
  children: ReactNode
  variant?: 'primary' | 'secondary'
  className?: string
  useSquareWidget?: boolean // New prop
}

// When useSquareWidget is true, trigger the widget instead of navigating
```

### 3. Update All Booking Buttons

Change all booking buttons from:
```tsx
<Button href="https://squareup.com/appointments/book">BOOK NOW</Button>
```

To:
```tsx
<Button useSquareWidget={true}>BOOK NOW</Button>
```

## Files That Would Change

1. **app/layout.tsx** - Add Square script
2. **components/Button.tsx** - Add Square widget trigger support
3. **app/page.tsx** - Change homepage button
4. **app/services/page.tsx** - Change both booking buttons
5. **components/Header.tsx** - Change header booking button
6. **components/FAQsContent.tsx** - Change FAQ link (if desired)

## Benefits

✅ **Better UX** - Users stay on your site  
✅ **Lower bounce rate** - No navigation away  
✅ **Faster booking** - No page load delay  
✅ **Consistent branding** - Your site stays visible  
✅ **Mobile friendly** - Modal works great on all devices  

## Considerations

⚠️ **Modal behavior** - The widget opens as an overlay, which is great UX but requires the script to load  
⚠️ **Script dependency** - If Square's script fails to load, booking won't work  
⚠️ **Styling** - Square's widget has its own styling (though it's usually well-designed)  

## Next Steps

If you'd like me to implement this, I can:
1. Add the Square script to your layout
2. Update the Button component to support the widget
3. Replace all booking links with widget triggers
4. Test that everything works correctly

Would you like me to proceed with the full implementation?

