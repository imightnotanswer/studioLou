# Square Appointments Embed - Visual Examples

This document shows exactly how your website would look and function with the Square embed.

## Current vs. New Behavior

### Current Behavior (External Links)
When users click "BOOK NOW":
- New browser tab opens
- User navigates to Square's booking page
- User books appointment on Square's site
- User must navigate back to your site

### New Behavior (Embed Widget)
When users click "BOOK NOW":
- Modal/overlay appears on your current page
- Square booking widget loads inside the modal
- User books appointment without leaving your site
- Modal closes, user stays exactly where they were

## Visual Flow Example

### Homepage (`app/page.tsx`)

**BEFORE:**
```tsx
<Button href="https://squareup.com/appointments/book" className="...">
  BOOK A FACIAL
</Button>
```
*Clicking opens new tab*

**AFTER:**
```tsx
<Button onClick={openSquareBooking} className="...">
  BOOK A FACIAL
</Button>
```
*Clicking opens modal overlay on same page*

### Services Page (`app/services/page.tsx`)

**BEFORE:**
```tsx
<div className="mt-8">
  <Button href="https://squareup.com/appointments/book">BOOK NOW</Button>
</div>
```
*Two buttons, both open external links*

**AFTER:**
```tsx
<div className="mt-8">
  <Button onClick={openSquareBooking}>BOOK NOW</Button>
</div>
```
*Both buttons open the same modal widget*

### Header (`components/Header.tsx`)

**BEFORE:**
```tsx
<Button
  href="https://squareup.com/appointments/book"
  className="px-3 py-1 text-xs md:px-5 md:py-1.5 md:text-sm bg-brownDeep/90 hover:bg-brownDeep"
>
  Book
</Button>
```
*Opens external link*

**AFTER:**
```tsx
<Button
  onClick={openSquareBooking}
  className="px-3 py-1 text-xs md:px-5 md:py-1.5 md:text-sm bg-brownDeep/90 hover:bg-brownDeep"
>
  Book
</Button>
```
*Opens modal from any page*

## Implementation Steps

### Step 1: Add Square Script to Layout

Add to `app/layout.tsx` in the `<head>` section:

```tsx
<head>
  {/* ... existing head content ... */}
  <script 
    src='https://square.site/appointments/buyer/widget/54nx9qz78e2p8w/LS3MZ80C6P0VA.js'
    async
  />
</head>
```

### Step 2: Update Button Component

Modify `components/Button.tsx` to support onClick for Square widget:

```tsx
export function Button({
  href,
  onClick,
  children,
  variant = 'primary',
  className = '',
}: ButtonProps) {
  // ... existing code ...

  if (onClick) {
    return (
      <button onClick={onClick} className={combinedClasses}>
        {children}
      </button>
    )
  }

  // ... rest of existing code ...
}
```

### Step 3: Update All Booking Buttons

Replace all instances of:
```tsx
href="https://squareup.com/appointments/book"
```

With:
```tsx
onClick={openSquareBooking}
```

And import the function:
```tsx
import { openSquareBooking } from '@/components/SquareBookingWidget'
```

## Files to Modify

1. ✅ `app/layout.tsx` - Add Square script
2. ✅ `components/Button.tsx` - Already supports onClick (no changes needed!)
3. ✅ `app/page.tsx` - Change homepage button
4. ✅ `app/services/page.tsx` - Change both booking buttons  
5. ✅ `components/Header.tsx` - Change header button
6. ✅ `components/FAQsContent.tsx` - Optional: change FAQ link

## User Experience Comparison

### Desktop Experience

**Current:**
```
[User on homepage] 
  → Clicks "BOOK A FACIAL"
  → New tab opens with Square booking
  → User books
  → Closes tab or switches back
```

**With Embed:**
```
[User on homepage]
  → Clicks "BOOK A FACIAL"  
  → Modal overlay appears (dark background, centered booking widget)
  → User books in modal
  → Modal closes, user still on homepage
```

### Mobile Experience

**Current:**
```
[User on mobile]
  → Clicks "BOOK NOW"
  → Browser navigates to Square page
  → User books
  → Must use back button to return
```

**With Embed:**
```
[User on mobile]
  → Clicks "BOOK NOW"
  → Full-screen modal appears with booking widget
  → User books
  → Modal closes, user still on same page
```

## Benefits Summary

✅ **Seamless UX** - No page navigation  
✅ **Lower bounce rate** - Users stay engaged  
✅ **Faster booking** - No external page load  
✅ **Better mobile experience** - Modal works great on small screens  
✅ **Consistent branding** - Your site stays visible in background  

## Testing Checklist

After implementation, test:
- [ ] Homepage "BOOK A FACIAL" button opens modal
- [ ] Services page "BOOK NOW" buttons open modal
- [ ] Header "Book" button opens modal from any page
- [ ] Modal closes properly after booking
- [ ] Works on mobile devices
- [ ] Works on desktop browsers
- [ ] Modal is accessible (keyboard navigation, screen readers)

## Next Steps

Would you like me to:
1. ✅ Implement the full changes across all pages?
2. ✅ Test the implementation?
3. ✅ Create a preview branch?

Let me know and I'll proceed!

