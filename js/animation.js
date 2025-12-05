document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".card");

  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
          observer.unobserve(entry.target); // Animate only once
        }
      });
    },
    {
      threshold: 0.2, // trigger when 20% of the card is visible
    }
  );

  cards.forEach((card) => observer.observe(card));
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
