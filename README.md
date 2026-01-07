# Shred Lab Quote Management System (QMS)

## Overview

Shred Lab QMS is a lightweight, serverless-style web application designed for managing event quotes and invoices. It uses a flat-file JSON architecture for data storage, making it easy to deploy on any standard PHP host without the need for a SQL database.

## Key Features

*   **Quote Management:** Create, save, load, and delete quotes.
*   **Auto-Numbering:** Automatically generates unique quote numbers (e.g., `SL-2025-001`).
*   **PDF Invoicing:** Generates professional, US Letter-sized PDF invoices directly in the browser using `jsPDF`.
*   **Client Metadata:** Stores comprehensive client details including contact info, event dates, and status.
*   **Theme Support:** Includes a robust dark/light mode with persistent user preference.
*   **Export Options:** Export data as PDF, CSV, or JSON for backup and portability.

## Installation

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

*   `calculator.html`: The main application interface.
*   `api/`: PHP scripts for handling data persistence (Save, Load, List, Delete).
*   `assets/`: CSS styles, JavaScript logic, and static images.
*   `quotes/`: JSON files storing individual quote data.

## Documentation

For a detailed implementation guide, please refer to [QMS_IMPLEMENTATION_README.md](QMS_IMPLEMENTATION_README.md).

## License

All rights reserved. © 2026 Shred Lab.
