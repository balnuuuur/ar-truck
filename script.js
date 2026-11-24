document.addEventListener("DOMContentLoaded", () => {
  const pointBtns = document.querySelectorAll(".point-btn");
  const visualSpots = document.querySelectorAll(".visual-spot");
  const blindspotZones = document.querySelector("#blindspot-zones");
  const pedestrian = document.querySelector("#pedestrian");
  const statusBox = document.querySelector("#status-box");
  const toggleBtn = document.querySelector("#toggle-blindspots");

  const hintRow = document.querySelector("#hint-row");
  const hintToggleBtn = document.querySelector("#hint-toggle-btn");
  const hintBox = document.querySelector("#hint-box");

  const spotExplanations = {
    0: "Биік кабина мен алдыңғы әйнектің төменгі шегіне байланысты жүргізуші дәл алдындағы жаяу жүргіншіні байқамай қалуы мүмкін. Көліктің алдынан тым жақын өтпеңіз.",
    1: "Оң жақтағы соқыр аймақ ең қауіптілердің бірі: бүйірлік айналардағы бұрыштар мен кузовтың кесірінен жақын тұрған адам көрінбей қалуы ықтимал.",
    2: "Жүк көлігінің артында артқы шолу шектеулі немесе мүлдем болмайды. Көлік артқа жүргенде бұл аймақта тұру өте қауіпті.",
    3: "Жүргізушінің сол жақ бүйірлік айнасынан жақсы көрінетін аймақ. Дегенмен көлік қозғалыста болғанда бәрібір қашықтық сақтаған жөн.",
    4: "Көліктен белгілі бір қашықтықта тұрғандықтан, жаяу жүргінші жүргізушінің алдыңғы әйнегінен анық көрінеді.",
    5: "Оң жақ қашығырақ бұрыштағы адам бүйірлік айналар мен көру бұрышы арқылы жүргізушіге көрінеді, бірақ бұрылу кезінде абай болған дұрыс."
  };

  let showBlindSpots = false;
  let currentExplanation = "";
  let isHintOpen = false;

  const setHintOpen = (open) => {
    isHintOpen = open;
    hintBox.style.display = open ? "block" : "none";
    hintToggleBtn.textContent = open ? "✕ Түсіндірмені жабу" : "💡 Түсіндірмені ашу";
  };

  hintToggleBtn.addEventListener("click", () => {
    if (!currentExplanation) return;
    hintBox.textContent = currentExplanation;
    setHintOpen(!isHintOpen);
  });

  pointBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const index = btn.getAttribute("data-index");
      const targetSpot = visualSpots[index];

      const pos = targetSpot.getAttribute("position");
      const isVisible = targetSpot.getAttribute("data-visible") === "true";
      const spotName = targetSpot.getAttribute("data-name");

      pedestrian.setAttribute("position", `${pos.x} 0.01 ${pos.z}`);
      pedestrian.setAttribute("visible", "true");

      if (isVisible) {
        statusBox.textContent = `✅ ${spotName}: Кабинадан КӨРІНЕДІ`;
        statusBox.style.background = "rgba(22, 163, 74, 0.9)";
      } else {
        statusBox.textContent = `⚠️ ${spotName}: СОҚЫР АЙМАҚ (Көрінбейді)`;
        statusBox.style.background = "rgba(220, 38, 38, 0.9)";
      }

      currentExplanation = spotExplanations[index] || "";
      hintBox.textContent = currentExplanation;
      hintRow.style.display = currentExplanation ? "flex" : "none";
      setHintOpen(false);
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