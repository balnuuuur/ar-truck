document.addEventListener("DOMContentLoaded", () => {
  const pointBtns = document.querySelectorAll(".point-btn");
  const visualSpots = document.querySelectorAll(".visual-spot");
  const blindspotZones = document.querySelector("#blindspot-zones");
  const pedestrian = document.querySelector("#pedestrian");
  const statusBox = document.querySelector("#status-box");
  const toggleBtn = document.querySelector("#toggle-blindspots");

  let showBlindSpots = false;

  pointBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const index = btn.getAttribute("data-index");
      const targetSpot = visualSpots[index];

      const pos = targetSpot.getAttribute("position");
      const isVisible = targetSpot.getAttribute("data-visible") === "true";
      const spotName = targetSpot.getAttribute("data-name");

      pedestrian.setAttribute("position", `${pos.x} 0 ${pos.z}`);
      pedestrian.setAttribute("visible", "true");

      if (isVisible) {
        statusBox.textContent = `✅ ${spotName}: Кабинадан КӨРІНЕДІ`;
        statusBox.style.background = "rgba(22, 163, 74, 0.9)";
      } else {
        statusBox.textContent = `⚠️ ${spotName}: СОҚЫР АЙМАҚ (Көрінбейді)`;
        statusBox.style.background = "rgba(220, 38, 38, 0.9)";
      }
    });
  });

  toggleBtn.addEventListener("click", () => {
    showBlindSpots = !showBlindSpots;

    if (showBlindSpots) {
      toggleBtn.textContent = "Соқыр аймақтарды жасыру";
      toggleBtn.style.background = "#dc2626";
      statusBox.textContent = "🔴 Қызыл аймақтар - жүргізуші көре алмайтын соқыр аймақтар!";
      statusBox.style.background = "rgba(220, 38, 38, 0.9)";

      if (blindspotZones) {
        blindspotZones.setAttribute("visible", "true");
      }

      visualSpots.forEach((spot) => {
        const isVisible = spot.getAttribute("data-visible") === "true";
        spot.setAttribute("color", isVisible ? "#22c55e" : "#ef4444");
      });
    } else {
      toggleBtn.textContent = "Соқыр аймақтарды көрсету";
      toggleBtn.style.background = "#2563eb";
      statusBox.textContent = "Мүсіншені қою үшін төменнен нүктені таңдаңыз";
      statusBox.style.background = "rgba(0, 0, 0, 0.85)";

      if (blindspotZones) {
        blindspotZones.setAttribute("visible", "false");
      }

      visualSpots.forEach((spot) => {
        spot.setAttribute("color", "#9ca3af");
      });
    }
  });
});