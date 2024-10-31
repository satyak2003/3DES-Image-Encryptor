document.addEventListener("DOMContentLoaded", () => {
  const encryptButton = document.getElementById("encrypt-button");
  const lockOverlay = document.getElementById("lockOverlay");

  // Show overlay on mouse enter (hover start)
  encryptButton.addEventListener("mouseenter", () => {
      lockOverlay.classList.add("show-lock-overlay");
  });

  // Hide overlay on mouse leave (hover end)
  encryptButton.addEventListener("mouseleave", () => {
      lockOverlay.classList.remove("show-lock-overlay");

      setTimeout(() => {
        lockOverlay.classList.add("hide-lock-overlay");
    }, 500); 
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const encryptButton = document.getElementById("decrypt-button");
  const lockOverlay1 = document.getElementById("lockOverlay1");

  // Show overlay on mouse enter (hover start)
  encryptButton.addEventListener("mouseenter", () => {
      lockOverlay1.classList.add("show-lock-overlay1");
  });

  // Hide overlay on mouse leave (hover end)
  encryptButton.addEventListener("mouseleave", () => {
      lockOverlay1.classList.remove("show-lock-overlay1");

      setTimeout(() => {
        lockOverlay.classList.add("hide-lock-overlay");
    }, 500); 
  });
});

