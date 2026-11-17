document.addEventListener("DOMContentLoaded", () => {
  const spots = document.querySelectorAll(".spot");
  const pedestrian = document.querySelector("#pedestrian");
  const statusBox = document.querySelector("#status-box");
  const toggleBtn = document.querySelector("#toggle-blindspots");

  let showBlindSpots = false;

  spots.forEach((spot) => {
    const triggerAction = (e) => {
      if (e) e.stopPropagation();

      const pos = spot.getAttribute("position");
      pedestrian.setAttribute("position", `${pos.x} 0 ${pos.z}`);
      pedestrian.setAttribute("visible", "true");

      const isVisible = spot.getAttribute("data-visible") === "true";
      const spotName = spot.getAttribute("data-name");

      if (isVisible) {
        statusBox.textContent = `✅ ${spotName}: Кабинадан КӨРІНЕДІ`;
        statusBox.style.background = "rgba(22, 163, 74, 0.9)"; 
      } else {
        statusBox.textContent = `⚠️ ${spotName}: СОҚЫР АЙМАҚ (Көрінбейді)`;
        statusBox.style.background = "rgba(220, 38, 38, 0.9)"; 
      }
    };

    spot.addEventListener("click", triggerAction);
    spot.addEventListener("touchstart", triggerAction);
    spot.addEventListener("mousedown", triggerAction);
  });

  toggleBtn.addEventListener("click", () => {
    showBlindSpots = !showBlindSpots;

    if (showBlindSpots) {
      toggleBtn.textContent = "Соқыр аймақтарды жасыру";
      toggleBtn.style.background = "#dc2626";

      spots.forEach((spot) => {
        const isVisible = spot.getAttribute("data-visible") === "true";
        spot.setAttribute("color", isVisible ? "#22c55e" : "#ef4444");
      });
    } else {
      toggleBtn.textContent = "Соқыр аймақтарды көрсету";
      toggleBtn.style.background = "#2563eb";

      spots.forEach((spot) => {
        spot.setAttribute("color", "#9ca3af");
      });
    }
  });
});