document.addEventListener("DOMContentLoaded", () => {
  const spots = document.querySelectorAll(".spot");
  const pedestrian = document.querySelector("#pedestrian");
  const statusBox = document.querySelector("#status-box");
  const toggleBtn = document.querySelector("#toggle-blindspots");

  let showBlindSpots = false;

  // Әрбір 6 шеңберге басу (click) оқиғасын қосу
  spots.forEach((spot) => {
    spot.addEventListener("click", () => {
      // 1. Таңдалған нүктенің координатасын алу
      const pos = spot.getAttribute("position");
      
      // 2. Мүсіншені сол нүктеге көшіру және көрсету
      pedestrian.setAttribute("position", `${pos.x} 0 ${pos.z}`);
      pedestrian.setAttribute("visible", "true");

      // 3. Жүргізушіге көрінетінін тексеру
      const isVisible = spot.getAttribute("data-visible") === "true";
      const spotName = spot.getAttribute("data-name");

      if (isVisible) {
        statusBox.textContent = `✅ ${spotName}: Кабинадан КӨРІНЕДІ`;
        statusBox.style.background = "rgba(22, 163, 74, 0.9)"; // Жасыл
      } else {
        statusBox.textContent = `⚠️ ${spotName}: СОҚЫР АЙМАҚ (Көрінбейді)`;
        statusBox.style.background = "rgba(220, 38, 38, 0.9)"; // Қызыл
      }
    });
  });

  // «Соқыр аймақтарды көрсету» батырмасы
  toggleBtn.addEventListener("click", () => {
    showBlindSpots = !showBlindSpots;

    if (showBlindSpots) {
      toggleBtn.textContent = "Соқыр аймақтарды жасыру";
      toggleBtn.style.background = "#dc2626";

      spots.forEach((spot) => {
        const isVisible = spot.getAttribute("data-visible") === "true";
        // Көрінбейтіндерді қызыл, көрінетіндерді жасыл қылу
        spot.setAttribute("color", isVisible ? "#22c55e" : "#ef4444");
      });
    } else {
      toggleBtn.textContent = "Соқыр аймақтарды көрсету";
      toggleBtn.style.background = "#2563eb";

      // Барлық шеңберді бастапқы сұр түске қайтару
      spots.forEach((spot) => {
        spot.setAttribute("color", "#9ca3af");
      });
    }
  });
});