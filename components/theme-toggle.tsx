"use client";

type Theme = "light" | "dark";

// Reads the current theme at click time: no state to sync, no flash, no hydration mismatch.
function current(): Theme {
  const set = document.documentElement.dataset.theme as Theme | undefined;
  return set ?? (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
}

export function ThemeToggle() {
  const flip = () => {
    const next: Theme = current() === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {}
  };

  return (
    <button
      type="button"
      onClick={flip}
      aria-label="Switch between light and dark theme"
      className="ml-1 grid h-8 w-8 place-items-center rounded-full border border-rule text-muted hover:text-ink"
    >
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 3a9 9 0 0 0 0 18z" fill="currentColor" />
      </svg>
    </button>
  );
}
