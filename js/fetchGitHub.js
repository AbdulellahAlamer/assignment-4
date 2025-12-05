document.addEventListener("DOMContentLoaded", () => {
  const section = document.getElementById("github-projects");
  const grid = document.getElementById("github-repo-grid");
  if (!section || !grid) return;

  // Public endpoint; no token required.
  const API =
    "https://api.github.com/users/AbdulellahAlamer/repos?type=public&sort=updated&per_page=6";

  const formatDate = (value) => {
    const date = new Date(value);
    return Number.isNaN(date.getTime())
      ? "—"
      : date.toLocaleDateString(undefined, {
          month: "short",
          day: "numeric",
          year: "numeric",
        });
  };

  const renderCard = (repo) => {
    const card = document.createElement("article");
    card.className = "card project-card";

    const description =
      repo.description ||
      "A recently updated repository from my GitHub profile.";

    card.innerHTML = `
      <div class="project-card__content">
        <h3>${repo.name}</h3>
        <p>${description}</p>
        <ul>
          <li><strong>Language:</strong> ${repo.language || "N/A"}</li>
          <li><strong>Stars:</strong> ${repo.stargazers_count}</li>
          <li><strong>Updated:</strong> ${formatDate(repo.pushed_at)}</li>
        </ul>
        <a class="text-link" href="${
          repo.html_url
        }" target="_blank" rel="noopener noreferrer">
          View on GitHub
        </a>
      </div>
    `;

    return card;
  };

  const showError = (message) => {
    grid.innerHTML = "";
    const card = document.createElement("article");
    card.className = "card";
    card.innerHTML = `
      <h3>Couldn’t load repos</h3>
      <p style="color:var(--color-text-muted)">${message}</p>
      <button class="button" data-retry-fetch>Retry</button>
    `;
    grid.appendChild(card);

    const retry = card.querySelector("[data-retry-fetch]");
    if (retry) {
      retry.addEventListener("click", () => {
        grid.innerHTML = `<article class="card" aria-hidden="true"><h3>Loading…</h3></article>`;
        fetchRepos();
      });
    }
  };

  const fetchRepos = async () => {
    try {
      const headers = {
        Accept: "application/vnd.github+json",
        "X-GitHub-Api-Version": "2022-11-28",
      };
      const res = await fetch(API, { headers });
      if (!res.ok) {
        throw new Error(`GitHub responded with ${res.status}`);
      }
      const repos = await res.json();

      if (!Array.isArray(repos) || repos.length === 0) {
        grid.innerHTML = "";
        const empty = document.createElement("article");
        empty.className = "card";
        empty.innerHTML = `<h3>No repositories found</h3><p style="color:var(--color-text-muted)">Check the GitHub username or visibility settings.</p>`;
        grid.appendChild(empty);
        return;
      }

      // Take the most recently pushed repos from the returned list (already sorted by updated).
      grid.innerHTML = "";
      repos.slice(0, 6).forEach((repo) => grid.appendChild(renderCard(repo)));
    } catch (error) {
      showError(error.message || "Unexpected error");
    }
  };

  fetchRepos();
});
