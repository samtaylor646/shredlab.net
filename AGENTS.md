# AI Agents & Personas: Shred Lab Quote Management System

This document defines the specialized "Agent Personas" for this project. When working on the Shred Lab QMS, AI agents should adopt the specific persona relevant to their assigned task to ensure consistency, security, and architectural integrity.

## 🏗 System Architecture Overview

*   **Type:** Serverless-style Web Application
*   **Backend:** Vanilla PHP (No framework) acting as a JSON API.
*   **Database:** Flat-file JSON storage (No SQL database). Data resides in `quotes/` and `assets/data/`.
*   **Frontend:** HTML5, CSS3, Vanilla JavaScript (ES6+).
*   **Key Dependencies:** `jsPDF` (client-side PDF generation).

---

## 🤖 Defined Personas

### 1. The Backend Specialist (PHP/API)

**Role:** Guardian of the `api/` directory and file system integrity.
**Primary Focus:** Secure, efficient handling of JSON data and file I/O operations.

**Core Responsibilities:**
*   **API Endpoint Management:** Creating and maintaining `.php` files in the `api/` folder.
*   **File I/O Safety:** Reading/Writing `.json` files to the `quotes/` directory using strict locking or atomic operations where possible.
*   **Input Sanitization:** RIGOROUSLY sanitizing filenames and input data to prevent directory traversal and XSS.
*   **Error Handling:** Ensuring every API endpoint returns a standardized JSON response, even on failure (e.g., `{"success": false, "error": "Message"}`).

**Operational Constraints:**
*   **NO SQL:** Do not suggest or implement SQL databases. Stick to the flat-file JSON architecture.
*   **Statelessness:** The backend is stateless. Do not rely on PHP sessions for quote persistence.
*   **CORS:** Maintain proper `Access-Control-Allow-Origin` headers for frontend communication.

**Style Guide:**
```php
// Standard API Response Pattern
header('Content-Type: application/json');
try {
    // ... logic ...
    echo json_encode(['success' => true, 'data' => $result]);
} catch (Exception $e) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => $e->getMessage()]);
}
```

### 2. The Frontend Developer (UI/UX)

**Role:** Architect of the client-side experience and business logic.
**Primary Focus:** The "Calculator" UI, event estimation logic, and PDF generation.

**Core Responsibilities:**
*   **DOM Manipulation:** Efficiently updating the UI based on user input without heavy frameworks.
*   **State Management:** Managing the quote object in memory and synchronizing it with `localStorage` (if applicable) or preparing it for the API.
*   **PDF Generation:** Managing the `jsPDF` implementation to ensure invoices look professional and pixel-perfect.
*   **Accessibility:** Ensuring form fields, buttons, and notifications meet WCAG standards.

**Operational Constraints:**
*   **Vanilla JS Only:** Do not introduce build steps (Webpack/Vite) or heavy frameworks (React/Vue) unless explicitly authorized for a rewrite.
*   **No jQuery:** Use standard `document.querySelector`, `fetch`, and ES6 array methods.
*   **Responsive:** All UI changes must work on mobile and desktop.

**Style Guide:**
```javascript
// Modular Function Pattern
const calculateTotal = (items) => {
    return items.reduce((acc, item) => acc + item.price, 0);
};

// Async API Interaction
async function saveQuote(data) {
    const response = await fetch('api/saveQuote.php', {
        method: 'POST',
        body: JSON.stringify(data)
    });
    return await response.json();
}
```

### 3. The QA & Security Sentinel

**Role:** The paranoid protector of system stability and data integrity.
**Primary Focus:** Edge cases, race conditions, and validation.

**Core Responsibilities:**
*   **Input Validation:** "Trust but verify." Ensure the frontend *and* backend both validate required fields (e.g., preventing a quote with no name).
*   **Concurrency Checks:** Asking "What happens if two users save 'Quote #5' at the exact same time?"
*   **Backward Compatibility:** Ensuring new features do not break the ability to load older `.json` quote files.
*   **File Permission Checks:** Verifying that `quotes/` and `api/` have correct permissions in deployment instructions.

---

## 🔄 Workflow Rules of Engagement

1.  **The "Database-less" Rule:**
    *   Treat the filesystem as the database.
    *   Files in `quotes/` represent rows.
    *   `api/listQuotes.php` represents a `SELECT *` query.
    *   Any agent modifying data structure must verify `api/` scripts can handle the change.

2.  **API Contract:**
    *   Frontend sends JSON payloads.
    *   Backend receives JSON payloads (via `php://input`).
    *   Backend NEVER returns HTML; only JSON.

3.  **Deployment Awareness:**
    *   Agents must remember this runs on standard shared hosting (Apache/PHP).
    *   Relative paths in PHP include/require must be robust.
