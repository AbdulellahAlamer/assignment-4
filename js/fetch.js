async function loadFavoriteBooks() {
  const grid = document.getElementById("favorite-books-grid");
  const API = "https://openlibrary.org/search.json?q=clean+code";

  // Heuristics to keep TECH books only
  const TECH_SUBJECTS = [
    "programming",
    "software engineering",
    "computer science",
    "software development",
    "coding",
    "technology",
    "algorithms",
    "data structures",
  ];

  const isTech = (doc) => {
    const title = (doc.title || "").toLowerCase();
    const subjects = (doc.subject || []).map((s) => s.toLowerCase());
    const author = (
      (doc.author_name && doc.author_name.join(" ")) ||
      ""
    ).toLowerCase();

    const subjectHit = subjects.some((s) =>
      TECH_SUBJECTS.some((t) => s.includes(t))
    );
    const titleHit =
      title.includes("clean code") ||
      title.includes("software") ||
      title.includes("refactor") ||
      title.includes("program") ||
      title.includes("code") ||
      title.includes("developer");
    const authorHit = author.includes("martin"); // Bob Martin, etc.

    return subjectHit || titleHit || authorHit;
  };

  const coverUrl = (doc) => {
    if (doc.cover_i)
      return `https://covers.openlibrary.org/b/id/${doc.cover_i}-L.jpg`;
    if (doc.isbn && doc.isbn.length)
      return `https://covers.openlibrary.org/b/isbn/${doc.isbn[0]}-L.jpg`;
    return "https://covers.openlibrary.org/b/id/10909258-L.jpg"; // neutral fallback cover
  };

  const authorText = (doc) =>
    doc.author_name && doc.author_name.length
      ? doc.author_name.join(", ")
      : "Unknown author";

  const yearText = (doc) =>
    doc.first_publish_year ? String(doc.first_publish_year) : "—";

  const workLink = (doc) => {
    // Prefer work key, fall back to edition key if needed
    const key = doc.key || (doc.edition_key && `/books/${doc.edition_key[0]}`);
    return key ? `https://openlibrary.org${key}` : "#";
  };

  const renderCard = (doc) => {
    const card = document.createElement("article");
    card.className = "card";
    card.innerHTML = `
      <figure class="project-card__media">
        <img src="${coverUrl(doc)}" alt="Book cover for ${
      doc.title || "book"
    }" loading="lazy">
      </figure>
      <h3>${doc.title || "Untitled"}</h3>
      <p style="margin:.25rem 0 0;color:var(--color-text-muted)"><strong>Author(s):</strong> ${authorText(
        doc
      )}</p>
      <p style="margin:.25rem 0 0;color:var(--color-text-muted)"><strong>Year:</strong> ${yearText(
        doc
      )}</p>
      <a class="text-link" href="${workLink(
        doc
      )}" target="_blank" rel="noopener">View on Open Library</a>
    `;
    return card;
  };

  try {
    const res = await fetch(API);
    if (!res.ok) throw new Error("Failed to fetch books");
    const data = await res.json();

    // Filter to tech-y hits, then pick up to 3 diverse results
    const techDocs = (data.docs || []).filter(isTech);

    // Simple diversity: prefer unique titles/authors, slice first 3
    const unique = [];
    const seen = new Set();
    for (const d of techDocs) {
      const sig = `${(d.title || "").toLowerCase()}|${authorText(
        d
      ).toLowerCase()}`;
      if (!seen.has(sig)) {
        unique.push(d);
        seen.add(sig);
      }
      if (unique.length >= 3) break;
    }

    // Render
    grid.innerHTML = "";
    if (unique.length === 0) {
      const empty = document.createElement("div");
      empty.className = "card";
      empty.innerHTML = `<h3>No suitable tech books found</h3><p>Try adjusting the query.</p>`;
      grid.appendChild(empty);
      return;
    }
    unique.forEach((d) => grid.appendChild(renderCard(d)));
  } catch (err) {
    grid.innerHTML = "";
    const error = document.createElement("div");
    error.className = "card";
    error.innerHTML = `<h3>Couldn’t load books</h3><p style="color:var(--color-text-muted)">${err.message}</p>
    <button id="retry-btn" class="button" style="margin-top:1rem;">Retry</button>`;
    grid.appendChild(error);
    document.getElementById("retry-btn").addEventListener("click", () => {
      loadFavoriteBooks();
    });
  }
}
loadFavoriteBooks();
