(function () {
  // define some variabels
  const body = document.body;
  const themeToggle = document.querySelector(".theme-toggle");
  const themeIcon = themeToggle
    ? themeToggle.querySelector(".theme-toggle__icon")
    : null;
  const navToggle = document.querySelector(".nav-toggle");
  const navLinks = document.querySelector(".nav__links");
  const contactForm = document.querySelector(".contact__form");
  const formStatus = document.querySelector(".form-status");
  const yearEl = document.getElementById("year");
  const greetingModal = document.getElementById("greeting-modal");
  const greetingMessage = document.getElementById("greeting-message");

  const setTheme = (theme) => {
    const isDark = theme === "dark";
    body.classList.toggle("dark-theme", isDark);
    if (themeIcon) {
      themeIcon.textContent = isDark ? "🌙" : "☀️";
    }
    localStorage.setItem("preferred-theme", theme);
  };
  // for light and dark mode
  const getPreferredTheme = () => {
    const stored = localStorage.getItem("preferred-theme");

    if (stored) {
      return stored;
    }
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  };

  if (themeToggle) {
    setTheme(getPreferredTheme());
    themeToggle.addEventListener("click", () => {
      const current = body.classList.contains("dark-theme") ? "dark" : "light";
      setTheme(current === "dark" ? "light" : "dark");
    });
  }

  if (navToggle && navLinks) {
    navToggle.addEventListener("click", () => {
      const isOpen = navLinks.classList.toggle("is-visible");
      navToggle.setAttribute("aria-expanded", String(isOpen));
    });

    navLinks.addEventListener("click", (event) => {
      if (event.target instanceof HTMLAnchorElement) {
        navLinks.classList.remove("is-visible");
        navToggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (event) => {
      const targetId = anchor.getAttribute("href");
      if (!targetId || targetId === "#") {
        return;
      }
      const target = document.querySelector(targetId);
      if (target) {
        event.preventDefault();
        target.scrollIntoView({ behavior: "smooth" });
      }
    });
  });
  if (contactForm) {
    contactForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const formData = new FormData(contactForm);
      const name = (formData.get("name") || "").trim();
      const email = (formData.get("email") || "").trim();
      const subject = (formData.get("subject") || "").trim();
      const message = (formData.get("message") || "").trim();
      const consentChecked = formData.get("consent") === "on";
      if (!formStatus) return;

      const nameRegex = /^[A-Za-z\s]{2,}$/;
      const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,}$/i;
      const errors = [];

      if (!name || !nameRegex.test(name)) {
        errors.push("Name must be letters only, at least 2 characters.");
      }
      if (!email || !emailRegex.test(email)) {
        errors.push("Enter a valid email address.");
      }
      if (!subject || subject.length < 4) {
        errors.push("Subject must be at least 4 characters.");
      }
      if (!message || message.length < 20) {
        errors.push("Message must be at least 20 characters.");
      }
      if (!consentChecked) {
        errors.push("Please agree to be contacted back.");
      }

      if (errors.length) {
        formStatus.textContent = errors.join(" ");
        formStatus.style.color = "red";
      } else {
        formStatus.textContent = `Thanks, ${name}! Your message passed all checks.`;
        formStatus.style.color = "green";
        // Remember name for future greetings
        if (typeof localStorage !== "undefined") {
          localStorage.setItem("visitor_name", name);
        }
        contactForm.reset();
      }
    });
  }
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  if (greetingModal && greetingMessage) {
    // Track visits in localStorage
    let visits = 0;
    if (typeof localStorage !== "undefined") {
      const storedVisits = Number(localStorage.getItem("visit_count") || 0);
      visits = Number.isFinite(storedVisits) ? storedVisits + 1 : 1;
      localStorage.setItem("visit_count", visits);
    }

    const hour = new Date().getHours();

    let message;

    if (hour < 12) {
      message = "Good morning!";
    } else if (hour < 18) {
      message = "Good afternoon!";
    } else if (hour < 22) {
      message = "Good evening!";
    } else {
      message = "Good night!";
    }

    // Personalize with stored name if present
    const storedName =
      (typeof localStorage !== "undefined" &&
        localStorage.getItem("visitor_name")) ||
      "";

    // Build a friendly string, e.g., "Good morning, Alex! Visit #3"
    const nameChunk = storedName ? `, ${storedName}` : "!";
    const visitChunk = visits
      ? `You have visited this page ${visits} time${
          visits === 1 ? "" : "s"
        }.`
      : "";

    // Two-line message: greeting on first line, visit info on second
    greetingMessage.innerHTML = `${message}${nameChunk}<br>${visitChunk}`;
    greetingModal.hidden = false;
    requestAnimationFrame(() => {
      greetingModal.classList.add("is-visible");
    });
    setTimeout(() => {
      greetingModal.classList.remove("is-visible");
      setTimeout(() => {
        greetingModal.hidden = true;
      }, 500);
    }, 5000);
  }

  // Expand/Collapse entire sections when clicking the eye icon
  document.querySelectorAll(".section-toggle").forEach((button) => {
    button.addEventListener("click", () => {
      const section = button.closest("section");

      // Toggle collapsed state
      const isCollapsed = section.classList.toggle("collapsed");

      // Update icon
      button.innerHTML = isCollapsed
        ? `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94A10.94 10.94 0 0 1 12 20c-7 0-11-8-11-8a21.74 21.74 0 0 1 5.06-6.88m3.67-1.63A10.94 10.94 0 0 1 12 4c7 0 11 8 11 8a21.74 21.74 0 0 1-2.22 3.18M1 1l22 22"/><path d="M9.88 9.88A3 3 0 0 0 12 15a3 3 0 0 0 2.12-.88"/></svg>`
        : `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>`;

      // Hide or show only the content below the section-heading (keep heading + button visible)
      section
        .querySelectorAll(":scope > *:not(.section-heading)")
        .forEach((el) => {
          if (el.className === "section-toggle") return;
          el.style.display = isCollapsed ? "none" : "";
        });
    });
  });
  // Custom animated circular cursor
  const cursor = document.querySelector(".cursor-dot");
  if (cursor) {
    document.addEventListener("mousemove", (e) => {
      cursor.style.top = `${e.clientY}px`;
      cursor.style.left = `${e.clientX}px`;
    });

    // Make cursor grow when clicking
    document.addEventListener("mousedown", () => {
      cursor.style.transform = "translate(-50%, -50%) scale(1.6)";
    });
    document.addEventListener("mouseup", () => {
      cursor.style.transform = "translate(-50%, -50%) scale(1)";
    });
  }

  // Session timer: tracks how long visitor has been on page
  const timerDisplay = document.getElementById("time-on-page");
  if (timerDisplay) {
    let seconds = 0;
    const format = (s) => {
      const mins = Math.floor(s / 60)
        .toString()
        .padStart(2, "0");
      const secs = (s % 60).toString().padStart(2, "0");
      return `${mins}:${secs}`;
    };
    const tick = () => {
      seconds += 1;
      timerDisplay.textContent = format(seconds);
    };
    timerDisplay.textContent = format(seconds);
    setInterval(tick, 1000);
  }
})();
