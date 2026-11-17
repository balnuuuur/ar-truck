document.addEventListener("DOMContentLoaded", () => {
  const pointBtns = document.querySelectorAll(".point-btn");
  const pedestrian = document.querySelector("#pedestrian");
  const statusBox = document.querySelector("#status-box");
  const toggleBtn = document.querySelector("#toggle-blindspots");

  let showBlindSpots = false;

  pointBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const x = btn.getAttribute("data-x");
      const z = btn.getAttribute("data-z");
      const isVisible = btn.getAttribute("data-visible") === "true";
      const spotName = btn.getAttribute("data-name");

      pedestrian.setAttribute("position", `${x} 0 ${z}`);
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
    } else {
      toggleBtn.textContent = "Соқыр аймақтарды көрсету";
      toggleBtn.style.background = "#2563eb";
      statusBox.textContent = "Мүсіншені қою үшін төменнен нүктені таңдаңыз";
    }
  });
});