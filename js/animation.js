document.addEventListener("DOMContentLoaded", () => {
  // Handle normal cards (non-timeline) with IntersectionObserver
  const normalCards = document.querySelectorAll(
    ".card:not(.certificates__list .card)"
  );

  const normalObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
          normalObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  normalCards.forEach((card) => normalObserver.observe(card));

  // Handle timeline certificates with sequential animation
  const timelineWrapper = document.querySelector(".timeline-wrapper");
  if (timelineWrapper) {
    const progressLine = timelineWrapper.querySelector(".timeline-progress");
    const certCards = Array.from(
      timelineWrapper.querySelectorAll(".certificates__list li")
    );

    if (progressLine && certCards.length > 0) {
      // Observe when the timeline section comes into view
      const timelineObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              // Start the sequential animation
              animateCertificatesSequentially(certCards, progressLine);
              timelineObserver.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.1 }
      );

      timelineObserver.observe(timelineWrapper);
    }
  }

  // Sequential animation function
  function animateCertificatesSequentially(cards, progressLine) {
    let currentIndex = 0;

    function animateNext() {
      if (currentIndex >= cards.length) return;

      const card = cards[currentIndex];
      const targetHeight = card.offsetTop + 45;

      // Grow the line to this card
      progressLine.style.height = `${targetHeight}px`;

      // Wait 3s for line to reach, then show card
      setTimeout(() => {
        card.classList.add("show");

        // Move to next card after a brief pause
        currentIndex++;
        setTimeout(animateNext, 200); // Small gap before next certificate starts
      }, 2000);
    }

    animateNext();
  }
});
document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll(".section-heading");

  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target); // run once per section
        }
      });
    },
    { threshold: 0.7 } // trigger when 30% visible
  );

  sections.forEach((section) => observer.observe(section));
});
