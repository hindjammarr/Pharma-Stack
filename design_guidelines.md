# Design Guidelines: Pharmacy Application

## Design Approach
**System-Based Approach**: Using a clean, medical-focused design system prioritizing trust, accessibility, and professional appearance. Drawing inspiration from healthcare platforms like CVS and Walgreens for familiarity.

## Core Design Elements

### A. Color Palette
**Primary Colors:**
- Medical Blue: 210 85% 45% (professional, trustworthy)
- Deep Navy: 220 30% 25% (headers, important text)

**Supporting Colors:**
- Clean White: 0 0% 98% (backgrounds, cards)
- Light Gray: 210 15% 95% (subtle backgrounds)
- Success Green: 140 60% 45% (confirmations, stock status)
- Warning Amber: 35 85% 55% (alerts, low stock)
- Error Red: 0 70% 50% (errors, out of stock)

**Dark Mode:**
- Background: 220 15% 8%
- Surface: 220 10% 12%
- Text: 210 15% 85%

### B. Typography
**Font Stack:** Inter via Google Fonts
- Headers: 600-700 weight, sizes 24px-48px
- Body: 400-500 weight, 14px-16px
- Small text: 400 weight, 12px-14px

### C. Layout System
**Spacing Units:** Tailwind 2, 4, 6, 8, 12, 16
- Consistent padding: p-4, p-6, p-8
- Margins: m-2, m-4, m-8
- Gaps: gap-4, gap-6, gap-8

### D. Component Library

**Navigation:**
- Clean header with pharmacy logo and main navigation
- Breadcrumb navigation for product categories
- Mobile-first hamburger menu

**Product Cards:**
- White cards with subtle shadows
- Product image, name, price, stock status
- Clear "Add to Cart" buttons with medical blue primary color

**Forms:**
- Consistent input styling with proper labels
- Form validation with clear error states
- Professional signup/login forms

**Admin Dashboard:**
- Sidebar navigation with medical icons
- Data tables with clean borders and alternating row colors
- Status badges for orders and inventory

**Shopping Cart:**
- Slide-out cart panel
- Clear quantity controls
- Prominent checkout button

## Key Design Principles

1. **Medical Trust:** Professional appearance with medical blue accents
2. **Accessibility:** High contrast ratios, clear typography, keyboard navigation
3. **Mobile-First:** Responsive design prioritizing mobile experience
4. **Information Hierarchy:** Clear visual separation between product info, pricing, and actions
5. **Consistency:** Unified spacing, colors, and component patterns throughout

## Images
- **Hero Image:** Large hero banner on homepage featuring a modern pharmacy interior or medicine bottles arrangement
- **Product Images:** Clean, white-background product photos for medications and health products
- **Service Icons:** Simple iconography for services (delivery, consultation, etc.)
- **Pharmacy Info:** Professional photo of the pharmacy storefront for contact page

## Special Considerations
- Prescription validation flows require clear, step-by-step UI
- Order status tracking with progress indicators
- Emergency contact information prominently displayed
- Clear distinction between prescription and over-the-counter products