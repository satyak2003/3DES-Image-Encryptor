document.addEventListener("DOMContentLoaded", () => {
  const encryptButton = document.getElementById("encrypt-button");
  const lockOverlay = document.getElementById("lockOverlay");


  encryptButton.addEventListener("mouseenter", () => {
      lockOverlay.classList.add("show-lock-overlay");
  });

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


  encryptButton.addEventListener("mouseenter", () => {
      lockOverlay1.classList.add("show-lock-overlay1");
  });


  encryptButton.addEventListener("mouseleave", () => {
      lockOverlay1.classList.remove("show-lock-overlay1");

      setTimeout(() => {
        lockOverlay.classList.add("hide-lock-overlay");
    }, 500); 
  });
});

