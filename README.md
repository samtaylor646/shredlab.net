# Shred Lab (work in progress)

**Curated contests, classes, camps, and workshops.**

Shred Lab is a premier skate community and services company dedicated to fostering the skateboarding lifestyle. We specialize in comprehensive event management and production, offering a wide range of services including:

*   **Skateboard Lessons:** Personalized private instruction, group sessions, and ongoing classes for all skill levels.
*   **Events & Contests:** Full-scale production for local contests, demos, and professional events, including logistics, safety, and execution.
*   **Staffing Services:** Providing specialized personnel such as event managers, certified judges, and on-site leads.
*   **PR & Promotion:** Digital marketing, hype fulfillment, and sponsor ROI reporting for skateboard events.
*   **Workshops & Camps:** Seasonal camps (Summer/Fall/Winter) and creative workshops like "Build-a-Board" and "Skate & Create."
*   **Community Engagement:** Weekly meetups, park clean-ups, and open sessions to build a supportive local scene.

---

## Quote Management System (QMS)

> **Note:** The QMS is currently a standalone component of a future, comprehensive admin dashboard for Shred Lab.

The Shred Lab QMS is a lightweight, serverless-style web application designed specifically to streamline the quoting and invoicing process for Shred Lab's diverse service offerings. It uses a flat-file JSON architecture for data storage, ensuring easy deployment and management.

### Key Features of QMS

*   **Quote Management:** Create, save, load, and delete quotes for services like "Management Fee," "Promotional Package," and "Staffing."
*   **Auto-Numbering:** Automatically generates unique quote numbers (e.g., `SL-2025-001`).
*   **PDF Invoicing:** Generates professional, US Letter-sized PDF invoices directly in the browser using `jsPDF`.
*   **Client Metadata:** Stores comprehensive client details including contact info, event dates, and status.
*   **Theme Support:** Includes a robust dark/light mode with persistent user preference.
*   **Export Options:** Export data as PDF, CSV, or JSON for backup and portability.

---

## Installation (QMS)

1.  **Clone the Repository:**
    ```bash
    git clone https://github.com/samtaylor646/shredlab.net.git
    ```

2.  **Server Setup:**
    *   Ensure your web server supports PHP 7.4+.
    *   Verify that the `quotes/` directory is writable by the web server user.

3.  **Permissions:**
    ```bash
    chmod 777 quotes
    chmod 755 api
    ```

## Usage

1.  Navigate to `calculator.html` in your web browser.
2.  Fill in the event details and client information.
3.  Click "Save Quote" to store the data on the server.
4.  Use the "Download PDF" button to generate a professional invoice.

## Project Structure

*   `calculator.html`: The main application interface for the QMS.
*   `api/`: PHP scripts for handling data persistence (Save, Load, List, Delete).
*   `assets/`: CSS styles, JavaScript logic, and static images.
*   `quotes/`: JSON files storing individual quote data.

## Documentation

For a detailed implementation guide of the QMS, please refer to [QMS_IMPLEMENTATION_README.md](QMS_IMPLEMENTATION_README.md).

## License

All rights reserved. © 2026 Shred Lab.
