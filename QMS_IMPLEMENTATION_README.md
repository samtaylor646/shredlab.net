# Shred Lab Quote Management System (QMS)
## Complete Implementation Guide

---

## ✅ What's Been Implemented

### **All 5 Features Complete:**

1. ✅ **Theme Toggle Fixed**
   - Removed 'T' keyboard shortcut
   - Fixed icon logic: Shows moon 🌙 on light theme, sun ☀️ on dark theme
   
2. ✅ **Professional PDF Invoice**
   - US Letter format (8.5" x 11")
   - 0.5" margins on all sides
   - Pure jsPDF (no screenshot, crisp text)
   - Professional invoice layout with headers, line items, totals
   
3. ✅ **Client Metadata Fields**
   - Quote Number (auto-generated)
   - Status (Draft/Pending/Approved/Invoiced)
   - Client Name/Company
   - Contact Person
   - Email & Phone
   - Event Date
   - Valid Until Date
   - Additional Notes/Terms
   
4. ✅ **Auto Quote Numbering**
   - Format: `SL-YYYY-###` (e.g., SL-2025-001)
   - Auto-increments with each new quote
   - Stored in `/quotes/.quote_counter`
   
5. ✅ **Invoice Branding & Layout**
   - Professional header with company name
   - Quote number and status prominently displayed
   - Client information section
   - Itemized breakdown with proper formatting
   - Terms & notes section
   - Professional footer with contact info

---

## 📁 File Structure

```
public_html/
├── calculator.html                    ← REPLACE with new version
├── quotes/                            ← CREATE this folder (chmod 777)
│   └── .quote_counter                 ← Auto-created by system
├── api/                               ← CREATE this folder
│   ├── saveQuote.php                  ← NEW
│   ├── loadQuote.php                  ← NEW
│   ├── listQuotes.php                 ← NEW
│   ├── deleteQuote.php                ← NEW
│   ├── getLastQuoteNumber.php         ← NEW
│   └── updateQuoteNumber.php          ← NEW
└── assets/
    ├── css/
    │   ├── base.css
    │   ├── components.css
    │   └── theme.css
    ├── js/
    │   ├── theme.js                   ← Keep original (override in HTML)
    │   └── main.js
    └── data/
        └── initialData.json           ← NEW
```

---

## 🚀 Installation Steps

### 1. **Create Folders**
```bash
mkdir -p api
mkdir -p quotes
mkdir -p assets/data
chmod 755 api
chmod 777 quotes  # Or 755 if your server allows PHP writes
```

### 2. **Upload Files**

**PHP Files (to `/api/`):**
- `saveQuote.php`
- `loadQuote.php`
- `listQuotes.php`
- `deleteQuote.php`
- `getLastQuoteNumber.php`
- `updateQuoteNumber.php`

**Data File (to `/assets/data/`):**
- `initialData.json`

**Main File:**
- Replace your existing `calculator.html` with the new version

### 3. **Test Installation**

1. Open `calculator.html` in browser
2. Check browser console for any errors
3. Try saving a quote
4. Verify a `.json` file appears in `/quotes/` folder
5. Try loading the quote from dropdown
6. Export to PDF and verify formatting

---

## 🎨 PDF Invoice Layout

The PDF export now generates a professional invoice with:

### **Header**
```
SHRED LAB                          QUOTE INVOICE
Event Management & Production      Quote #: SL-2025-001
                                  Status: DRAFT
─────────────────────────────────────────────────────
```

### **Client Information**
```
CLIENT INFORMATION
Event: Summer Festival 2025        Email: client@example.com
Client: ABC Company                Phone: (555) 123-4567
Contact: John Doe                  Event Date: 07/15/2025

Quote Date: 11/08/2024             Valid Until: 12/08/2024
─────────────────────────────────────────────────────
```

### **Revenue Section**
```
SHRED LAB REVENUE
  Management Fee: Tier 2 Regional              $4,750
  Promotional Package: Media Essentials        $1,125
  ───────────────────────────────────────────
  Shred Lab Revenue Subtotal                   $5,875
```

### **Client Costs with Line Items**
```
CLIENT VARIABLE COSTS
  Venue & Rentals                              $1,500
  Insurance & Permits                            $500
  Prize Purse                                  $1,000

  Staffing & Personnel:
    Event Manager (On-Site Lead)
                    1 × $40/hr × 10h             $400
    Head Judge (Certified)
                    1 × $35/hr × 8h              $280
    [... more roles ...]
  ───────────────────────────────────────────
  Staffing Subtotal                            $2,500

  Miscellaneous Items:
    Signage & Banners      1 × $350              $350
  ───────────────────────────────────────────
  Misc Subtotal                                  $350
  ───────────────────────────────────────────
  Total Client Variable Costs                  $5,850
```

### **Discounts (if any)**
```
DISCOUNTS APPLIED
  Early Bird Discount (10%)
  ───────────────────────────────────────────
  Total Discount                               -$587
```

### **Grand Total**
```
═════════════════════════════════════════════
GRAND TOTAL                                 $11,138
═════════════════════════════════════════════
```

### **Terms & Footer**
```
TERMS & NOTES:
50% deposit required to secure date. Balance due 7 days
prior to event. Cancellations within 30 days forfeit deposit.

─────────────────────────────────────────────────────
Shred Lab Event Management         Page 1 of 1
www.shredlab.com | contact@shredlab.com
                          Thank you for your business!
```

---

## 🔧 Customization Options

### **Change Company Branding**

In `calculator.html`, find the PDF export function and modify:

```javascript
// Header
doc.text('SHRED LAB', margin, y);  // Change company name
doc.text('Event Management & Production', margin, y + 0.15);  // Change tagline

// Footer
doc.text('Shred Lab Event Management', margin, footerY + 0.15);
doc.text('www.shredlab.com | contact@shredlab.com', margin, footerY + 0.3);
```

### **Add Company Logo**

To add a logo to the PDF:

```javascript
// After header text, add:
const logoImg = 'data:image/png;base64,YOUR_BASE64_IMAGE_HERE';
doc.addImage(logoImg, 'PNG', margin, margin - 0.1, 0.5, 0.5);
```

### **Change Quote Number Format**

In `generateQuoteNumber()` function:

```javascript
// Current: SL-2025-001
// Change to: QUOTE-2025-001
return `QUOTE-${year}-${nextNumber}`;
```

### **Adjust PDF Styling**

Modify font sizes, colors, and spacing in the `exportToPDF()` function:

```javascript
doc.setFontSize(28);  // Header size
doc.setFontSize(9);   // Body text size
doc.setTextColor(100);  // Gray text (0-255)
```

---

## 📊 Export Formats

### **PDF Invoice**
- Professional layout
- US Letter size with 0.5" margins
- Includes all client info, line items, totals
- Ready to print or email

### **CSV Data**
- Spreadsheet-compatible
- Includes all quote data
- Good for importing into accounting software
- Human-readable format

### **JSON Backup**
- Complete quote state
- Can be imported back into calculator
- Good for sharing between users
- Version controlled

---

## 🐛 Troubleshooting

### **PDF Not Generating**
- Check browser console for errors
- Verify jsPDF library loaded (check CDN link)
- Try in different browser (Chrome/Firefox recommended)

### **Quote Not Saving**
- Check `/quotes/` folder permissions (should be 777 or 755)
- Verify PHP has write permissions
- Check PHP error logs

### **Quote Number Not Incrementing**
- Check if `.quote_counter` file exists in `/quotes/`
- Verify file is writable
- Delete `.quote_counter` and try again (will reset to 0)

### **Theme Toggle Not Working**
- Clear browser cache
- Check if theme.js is loading
- Verify localStorage is enabled

---

## 🔐 Security Notes

1. **Production Deployment:**
   - Move `/quotes/` folder OUTSIDE of public_html for security
   - Update paths in PHP files accordingly
   - Add `.htaccess` to block direct access to quote files

2. **Authentication:**
   - Consider adding password protection
   - Implement user login system
   - Add role-based access control

3. **File Validation:**
   - PHP files validate input
   - File names are sanitized
   - SQL injection not a concern (no database)

---

## 💡 Future Enhancements

### **Potential Additions:**
- Email quotes directly to clients
- Duplicate quote functionality
- Quote templates for common events
- Client database integration
- Payment tracking
- Multi-page PDF for very long quotes
- Digital signature capture
- Quote approval workflow

---

## 📞 Support

For issues or questions:
1. Check browser console for JavaScript errors
2. Check PHP error logs on server
3. Verify all files are uploaded correctly
4. Ensure folder permissions are correct

---

## ✨ Key Features Summary

✅ Auto-incrementing quote numbers (SL-2025-001)
✅ Professional PDF invoices (Letter size, 0.5" margins)
✅ Client metadata (name, email, phone, event date, etc.)
✅ Quote status tracking (Draft/Pending/Approved/Invoiced)
✅ Itemized line-by-line breakdown
✅ Multiple export formats (PDF/CSV/JSON)
✅ Save/Load/Delete quotes
✅ Import/Export JSON for backup
✅ Fixed theme toggle (no keyboard shortcut)
✅ Proper icon display (moon on light, sun on dark)
✅ Terms & notes section
✅ Professional invoice layout
✅ Server-based storage (access from any device)

---

**Implementation Complete! 🎉**