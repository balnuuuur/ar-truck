document.addEventListener("DOMContentLoaded", () => {

    const target = document.querySelector(
        "[mindar-image-target]"
    );

    const points = [
        { x: 0, z: -1.2, visible: false },
        { x: 1.0, z: -0.8, visible: true },
        { x: 1.0, z: 0.2, visible: true },
        { x: -1.0, z: 0.2, visible: true },
        { x: -1.0, z: -0.8, visible: false },
        { x: 0, z: 1.3, visible: false }
    ];

    let showBlindZones = false;

    const person = document.createElement("a-cylinder");

    person.setAttribute("radius", "0.12");
    person.setAttribute("height", "0.5");
    person.setAttribute("color", "#27AE60");
    person.setAttribute("visible", "false");

    target.appendChild(person);

    const panel = document.createElement("div");

    panel.style.position = "fixed";
    panel.style.top = "15px";
    panel.style.left = "50%";
    panel.style.transform = "translateX(-50%)";
    panel.style.zIndex = "9999";
    panel.style.textAlign = "center";
    panel.style.width = "90%";

    panel.innerHTML = `
        <div style="
            background: white;
            padding: 12px;
            border-radius: 12px;
            font-family: Arial;
            box-shadow: 0 2px 10px #888;
        ">
            <h3 style="margin: 5px;">
                Жүргізуші сізді көре ала ма?
            </h3>

            <p id="result">
                Жүк көлігінің айналасындағы нүктені таңдаңыз
            </p>

            <button id="blindButton" style="
                padding: 10px 15px;
                background: #E74C3C;
                color: white;
                border: none;
                border-radius: 8px;
            ">
                Соқыр аймақтарды көрсету
            </button>
        </div>
    `;

    document.body.appendChild(panel);

    const result = document.getElementById("result");
    const blindButton = document.getElementById("blindButton");

    points.forEach((point, index) => {

        const circle = document.createElement("a-cylinder");

        circle.setAttribute(
            "position",
            `${point.x} 0.05 ${point.z}`
        );

        circle.setAttribute("radius", "0.16");
        circle.setAttribute("height", "0.04");
        circle.setAttribute("color", "#3498DB");

        circle.setAttribute("class", "clickable");

        circle.addEventListener("click", () => {

            person.setAttribute(
                "position",
                `${point.x} 0.35 ${point.z}`
            );

            person.setAttribute("visible", "true");

            if (point.visible) {

                result.innerText =
                    `№${index + 1} нүкте: Жүргізуші жаяу жүргіншіні көре алады`;

                person.setAttribute("color", "#27AE60");

            } else {

                result.innerText =
                    `№${index + 1} нүкте: САҚ БОЛЫҢЫЗ! Бұл — соқыр аймақ`;

                person.setAttribute("color", "#E74C3C");
            }
        });

        target.appendChild(circle);

        point.element = circle;
    });

    blindButton.addEventListener("click", () => {

        showBlindZones = !showBlindZones;

        points.forEach((point) => {

            if (showBlindZones && !point.visible) {
                point.element.setAttribute("color", "#E74C3C");
            } else {
                point.element.setAttribute("color", "#3498DB");
            }

        });

        blindButton.innerText = showBlindZones
            ? "Соқыр аймақтарды жасыру"
            : "Соқыр аймақтарды көрсету";
    });

});
