# AI Usage Report

## Tools Utilized

- **ChatGPT** – Assisted with translating existing portfolio content into modern generating HTML/CSS/JS, and drafting documentation including this file.Also, it help me how to use the `Open Library API
` that fetch the books info.
- **What changed:** Used regularly during feature work to sanity-check logic, wording, and structure before coding.

## Use Cases

1. Open Library API Integration
   - Prompt: “Add a section titled My Favorite Books and use this API: https://openlibrary.org/search.json?q=clean+code to fetch books.”
   - AI Output: Complete HTML and JS code to fetch and render book cards dynamically using fetch().
   - My Edits:
   - Adjusted layout to match my existing CSS grid.
   - Replaced placeholder covers with responsive images.
   - Added error handling and retry button.
   - Outcome: Dynamic book section integrated cleanly into the site.
2. Error Handling and Retry Logic
   - Prompt: “Make a button to retry fetch when it fails.”
   - AI Output: Added window.location.reload() logic and improved `<button>` element structure.
   - My Edits: Styled it with .button class and margin spacing.
   - Outcome: Cleaner user experience when API requests fail.
3. Scroll-Triggered Animations
   - Prompt: “Make the cards show up from the left when they appear on screen.”
   - AI Output: IntersectionObserver code and CSS transition for .card elements.
   - My Edits: Tuned threshold to 0.3 for smoother triggering and added staggered animation delays.
   - Outcome: Subtle entry animation that activates only when visible.
4. Typing Text Animation
   - Prompt: “Make this text have a typing animation.”
   - AI Output: Typewriter effect using CSS keyframes and blinking caret.
   - My Edits: Adjusted animation duration, font size, and trigger timing.
   - Outcome: Dynamic intro heading that types out phrase naturally.
5. Paragraph Fade-Up Animation
   - Prompt: “Make paragraph under the heading fade up when the screen comes to that section.”
   - AI Output: Provided IntersectionObserver script and CSS transitions.
   - My Edits: Synced delay with heading typing animation and unified easing curves.
   - Outcome: Smooth sequential text reveal.
6. Personalized Greeting with Stored Name
   - Prompt: “Store the submitted name and reuse it in a greeting with visit count.”
   - AI Output: localStorage-based name persistence and visit counter logic.
   - My Edits: Added two-line formatting, pluralization, and safe fallbacks when storage is unavailable.
   - Outcome: Returning visitors see a personalized greeting plus visit number.
7. GitHub Repos Fetch & Render
   - Prompt: “Fetch my public GitHub repos and show them in cards.”
   - AI Output: Fetch call to GitHub REST API, parsing repo fields for display.
   - My Edits: Added error/empty states, loading placeholders, and limited to recent repos; removed token requirement.
   - Outcome: Latest public repos render as cards with language, stars, and updated date.

## Benefits

- Accelerated implementation of animations and scroll logic without manual trial-and-error.
- Immediate suggestions on accessibility and semantic HTML structure.
- Cleaner code with reusable patterns and consistent style.
- Faster debugging and real-time improvement of existing JavaScript functions.
- Overall, AI sped up iteration and kept the UI consistent across sections.

## Challenges

- Needed to manually tweak animation timing to align with section visibility.
- Some AI outputs had small syntax errors (e.g., herf instead of href) requiring review.
- Open Library data sometimes missing covers or authors, needed conditional checks.
- Also had to validate AI text suggestions to ensure clarity and tone fit the site.

## Learning Outcomes

- Gained understanding of the Intersection Observer API for scroll effects.

- Learned how to handle API fetch errors gracefully and retry logic patterns.

- Improved skills in CSS animations and transitions.
- Learned to validate AI code, not copy blindly — understanding what each part does.

- Reinforced awareness of ethical AI use: treating AI as a learning aid, not a code generator replacement.

- Deepened familiarity with localStorage/state persistence patterns and integrating third-party APIs (GitHub, Open Library) with resilient UI states.
