# Technical Documentation

## Overview

This project delivers a static personal portfolio site for Abdulellah Alamer. It is built with semantic HTML, modern CSS (flexbox, grid, custom properties), and vanilla JavaScript to satisfy Assignment 1 requirements: responsive design, basic interactivity, and transparent AI usage. The current version adds extended animations, a “My Favorite Books” API section using Open Library, retry logic for failed requests, scroll‑triggered animations, GitHub repo fetching, a personalized greeting with visit counter, and a session timer.

## File Breakdown

- `index.html` – Core markup containing the hero (About), Experience, Projects, Certificates, and Contact sections, along with navigation and footer.
- `css/styles.css` – Styling layer that defines the color system, component styles, responsive grids, and theme-specific variables.
- `js/script.js` – Handles theme persistence, mobile navigation toggling, smooth scrolling, contact form validation/feedback, greeting + visit counter, and session timer.
- `js/fetch.js` – Handles Open Library API fetching, book rendering, and retry button.
- `js/fetchGitHub.js` – Fetches and renders the latest public GitHub repositories as cards.
- `js/animation.js` – manages scroll‑based and typing animations.
- `assets/images/` – Placeholder directory for future profile or project imagery.
- `docs/` – Contains AI usage notes and this technical documentation.

## HTML Structure Highlights

- Navigation links use in-page anchors for smooth scrolling between sections.
- Each major section is wrapped in a semantic `<section>` with contextual headings for accessibility.
- The contact form uses native HTML validation (`required`, `type="email"`) and augmented client-side rules (name/email/subject/message length + consent checkbox) with a live region for feedback.
- A GitHub Projects section renders recent public repositories dynamically from the GitHub API.
- A “Time on Page” block shows a session timer; the greeting banner personalizes with stored visitor name and visit count via `localStorage`.

## Styling Approach

- CSS custom properties power the color palette and enable quick theme switching.
- Shared `.card` styles promote consistency across experience, project, and certificate entries.
- Flexbox and CSS grid provide adaptive layouts, while media queries adjust the navigation and spacing for narrow viewports.
- A gradient hero background and placeholder profile component hint at the original branding without external dependencies.

## JavaScript Behavior

- **Theme Toggle:** Stores the user preference in `localStorage` and respects the operating system's default on first load.
- **Mobile Navigation:** Toggles visibility of the primary navigation list and keeps `aria-expanded` in sync for screen readers.
- **Smooth Scrolling:** Intercepts internal anchor clicks and calls `scrollIntoView` for progressive enhancement.
- **Contact Form Validation/Feedback:** Applies multiple client-side checks (name/email/subject/message length and consent), reports errors inline, stores the visitor name to personalize future greetings, and resets on success.
- **Footer Year:** Automatically updates the year to keep the footer current.
- **Favorite Books Fetch:** Uses Open Library API to get and display books dynamically; retry button renders on failure.
- **GitHub Repos Fetch:** Calls the GitHub public API to render recent repos with language, stars, and updated date; handles loading, empty, and error states.
- **Greeting + Visit Counter:** Builds a time-of-day greeting, injects stored visitor name if present, and tracks visit count in `localStorage`.
- **Session Timer:** Displays time on page, updating every second.
- **Scroll Animations:** Uses Intersection Observer for cards and text; typing animation for headings.
- **Script Loading:** All scripts are deferred to avoid render blocking.

## Responsive Design

- Layout scales from single-column stacks on mobile (≤600px) to multi-column grids on tablets and desktops.
- Navigation condenses into a hamburger trigger on viewports narrower than 900px.
- Buttons and interactive elements retain comfortable touch targets and focus states across breakpoints.

## Extensibility Notes

- Swap the hero placeholder for a real image by adding an asset to `assets/images/` and updating the `.hero__media` markup.
- Replace project cards with live links, GitHub repositories, or case studies as new work is completed.
- Connect the contact form to a serverless function or third-party provider to handle real submissions.
- Expand JavaScript interactivity (e.g., filter projects, animate scroll progress) while keeping the code modular.

## Testing Checklist

- Resize the browser to confirm sections remain legible on mobile, tablet, and desktop widths.
- Toggle the theme and reload the page to ensure the preference persists.
- Submit the contact form with sample data to confirm the inline confirmation message appears.
- Retry button reloads correctly after failed book fetch.
- Cards animate only when visible.
- Typing animation triggers once when section appears.
- GitHub repos render or show a friendly empty/error state.
- Greeting shows stored name and increments visit count; session timer counts up.
