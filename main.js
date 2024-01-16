const init = () => {
  gsap.registerPlugin(ScrollTrigger);
  pbkalAnimation();
  lgvAnimation();
  leuvenAnimation();
  hslFourAnimation();
  setupScrollTrigger();
  setupDragAndDrop();
};

const setupDragAndDrop = () => {
  const draggables = document.querySelectorAll(".shapes div");
  const dropZones = document.querySelectorAll(".drop-area div");
  const dropZoneIds = ["france", "belgium", "germany", "netherlands", "uk"];
  
  dropZones.forEach((zone, index) => {
    zone.id = "drop-" + dropZoneIds[index];
  });

  draggables.forEach((draggable) => {
    draggable.addEventListener("dragstart", (event) => {
      event.dataTransfer.setData("text", draggable.id);
    });
  });

  const checkShapesPlacement = () => {
    const allCorrect = Array.from(dropZones).every((zone, index) => {
      const child = zone.firstChild;
      return child && child.id === dropZoneIds[index];
    });

    if (allCorrect) {
      document.querySelector(".contract-button").style.display = "block";
    }
  };

  dropZones.forEach((zone, index) => {
    zone.addEventListener("dragover", (event) => {
      event.preventDefault();
    });

    zone.addEventListener("drop", (event) => {
      event.preventDefault();
      const data = event.dataTransfer.getData("text");
      const element = document.getElementById(data);
      if (!zone.hasChildNodes()) {
        zone.appendChild(element);
        if (data === dropZoneIds[index]) {
          zone.style.border = "2px solid green";
        } else {
          zone.style.border = "2px solid red";
        }
        checkShapesPlacement(); 
      }
    });
  });
};

const pbkalAnimation = () => {
  lottie.loadAnimation({
    container: document.querySelector(".pbkal-animation"),
    renderer: "svg",
    loop: true,
    autoplay: true,
    path: "animations/pbkal.json",
  });
};

const lgvAnimation = () => {
  lottie.loadAnimation({
    container: document.querySelector(".lgv-animation"),
    renderer: "svg",
    loop: true,
    autoplay: true,
    path: "animations/lgv.json",
  });
};

const leuvenAnimation = () => {
  lottie.loadAnimation({
    container: document.querySelector(".leuven-animation"),
    renderer: "svg",
    loop: true,
    autoplay: true,
    path: "animations/leuven.json",
  });
};

const hslFourAnimation = () => {
  lottie.loadAnimation({
    container: document.querySelector(".hsl-4-animation"),
    renderer: "svg",
    loop: true,
    autoplay: true,
    path: "animations/hsl4.json",
  });
};

const setupScrollTrigger = () => {
  gsap.from(".history", {
    scrollTrigger: {
      trigger: ".history",
      start: "top bottom",
      end: "center top",
      scrub: true,
    },
    opacity: 0,
    duration: 0.5,
  });
};

init();
