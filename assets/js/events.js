// events.js — Populates event card dates with user-friendly formatting

document.addEventListener('DOMContentLoaded', () => {
    const eventCards = document.querySelectorAll('.events-grid .project-item');
    
    // Function to convert YYYY-MM-DD to a user-friendly format (e.g., Nov 3, 2025)
    function formatDate(dateString) {
        if (!dateString) return '';
        try {
            // Use / for reliable parsing across browsers, then use Intl.DateTimeFormat
            const date = new Date(dateString.replace(/-/g, '/')); 
            
            // Fallback if the date is invalid
            if (isNaN(date.getTime())) return dateString; 
            
            const options = { 
                month: 'short', 
                day: 'numeric', 
                year: 'numeric' 
            };
            return new Intl.DateTimeFormat('en-US', options).format(date);
        } catch (e) {
            console.error('Date formatting error:', e);
            return dateString; // Fallback to raw string
        }
    }

    eventCards.forEach(card => {
        const cardDateSpan = card.querySelector('.card-date');
        // If the date span is missing, skip this card
        if (!cardDateSpan) return;

        let dateText = '';
        
        // --- 1. Check for data-day (Recurring events) ---
        if (card.dataset.day) {
            dateText = card.dataset.day;
        } 
        
        // --- 2. Check for data-range (Camps) ---
        else if (card.dataset.range) {
            const [startDateStr, endDateStr] = card.dataset.range.split('/');
            
            const formattedStart = formatDate(startDateStr);
            const formattedEnd = formatDate(endDateStr);
            
            if (formattedStart && formattedEnd) {
                dateText = `${formattedStart} - ${formattedEnd}`;
            } else {
                dateText = card.dataset.range.replace('/', ' - '); // Fallback
            }
        }
        
        // --- 3. Check for data-date (Single dates) ---
        else if (card.dataset.date) {
            dateText = formatDate(card.dataset.date);
        }
        
        // Insert the final formatted text into the span
        cardDateSpan.textContent = dateText.trim();
        
        // The CSS has a pipe separator after card-date. 
        // We only want to display the time if a date or day was successfully found.
        if (dateText.trim() === '') {
            const dateMetaInfo = card.querySelector('.card-meta-info');
            // Hide the separator if the date is empty
            if (dateMetaInfo) {
                const afterElementRule = Array.from(document.styleSheets)
                    .flatMap(s => Array.from(s.cssRules || []))
                    .find(r => r.selectorText === '.card-meta-info .card-date::after');
                
                if (afterElementRule) {
                     // Since we cannot modify pseudo-elements directly in JS, 
                     // we can apply a class or style to the parent/date element
                     // to override the content rule for the pipe separator.
                     cardDateSpan.style.setProperty('content', 'none', 'important'); 
                }
            }
        }
    });
});