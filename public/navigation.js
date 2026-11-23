function enhanceNavigation() {
  const menu = document.querySelector(".mobile-menu");
  if (!menu) return;

  menu.addEventListener("keydown", event => {
    if (event.key === "Escape" && menu.open) {
      menu.open = false;
      menu.querySelector("summary").focus();
    }
  });

  window.matchMedia("(min-width: 761px)").addEventListener("change", event => {
    if (event.matches) menu.open = false;
  });
}

if (document.querySelector(".mobile-menu")) {
  enhanceNavigation();
} else {
  // The Vite development server renders the markup on the client.
  const root = document.getElementById("root");
  const observer = new MutationObserver(() => {
    observer.disconnect();
    enhanceNavigation();
  });
  observer.observe(root, { childList: true });
}
