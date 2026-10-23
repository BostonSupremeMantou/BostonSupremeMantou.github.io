(() => {
  function revealComponent(hash, focus = false) {
    let id;
    try {
      id = decodeURIComponent(hash.slice(1));
    } catch {
      return false;
    }
    const component = document.getElementById(id);
    if (!component?.matches(".component")) return false;

    const details = component.querySelector(":scope > details");
    if (!details) return false;
    details.open = true;
    if (focus) details.querySelector("summary").focus({ preventScroll: true });
    component.scrollIntoView({ block: "start" });
    return true;
  }

  document.addEventListener("click", (event) => {
    const link = event.target.closest("a[data-component-link]");
    if (
      !link ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    )
      return;
    if (!document.getElementById(link.hash.slice(1))?.matches(".component"))
      return;

    event.preventDefault();
    if (location.hash !== link.hash) history.pushState(null, "", link.hash);
    revealComponent(link.hash, true);
  });

  window.addEventListener("hashchange", () => revealComponent(location.hash));
  revealComponent(location.hash);
})();
