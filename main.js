import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const init = () => {
  gsap.registerPlugin(ScrollTrigger);
  pbkalAnimation();
  lgvAnimation();
  leuvenAnimation();
  hslFourAnimation();
  aheadAnimation();
  setupScrollTrigger();
  setupDragAndDrop();
  mobileInteraction();
  mobileAnimation();
  setupCompanyDragAndDrop();
  map();
};


const setupCompanyDragAndDrop = () => {
  if (window.innerWidth >= 768) {
    const companyLogos = document.querySelectorAll(
      ".company-structure .company-img img"
    );
    const agreementDropZones = document.querySelectorAll(
      ".company-structure .agreement .drop-area-company div"
    );

    companyLogos.forEach((logo) => {
      logo.setAttribute("draggable", true);
      logo.addEventListener("dragstart", (event) => {
        event.dataTransfer.setData("text/plain", logo.src);
      });
    });

    agreementDropZones.forEach((zone) => {
      zone.addEventListener("dragover", (event) => {
        event.preventDefault();
      });

      zone.addEventListener("drop", (event) => {
        event.preventDefault();
        const logoSrc = event.dataTransfer.getData("text/plain");
        zone.style.backgroundImage = `url(${logoSrc})`;
        zone.style.backgroundSize = "contain";
        zone.style.backgroundRepeat = "no-repeat";
        zone.style.backgroundPosition = "center";
      });
    });
  }
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
        zone.style.border =
          data === dropZoneIds[index] ? "2px solid green" : "2px solid red";
        checkShapesPlacement();
      }
    });
  });
};

const mobileInteraction = () => {
  const mobileDraggables = document.querySelectorAll(
    ".mobile-document-section .shapes div"
  );
  const mobileDropZones = document.querySelectorAll(
    ".mobile-document-section .drop-area div"
  );
  const pbkalLetters = document.querySelectorAll(
    ".mobile-document-section .pbkal h1"
  );
  const dropZoneIds = ["france", "belgium", "germany", "netherlands", "uk"];

  mobileDraggables.forEach((draggable, index) => {
    draggable.addEventListener("click", () => {
      const targetZone = mobileDropZones[index];
      if (!targetZone.hasChildNodes()) {
        targetZone.appendChild(draggable);
        targetZone.style.border = "2px solid green";
        updatePbkalLetters(index, true); // Update PBKAL letters
        checkMobileShapesPlacement();
      }
    });
  });

  const updatePbkalLetters = (index, isCorrect) => {
    if (isCorrect) {
      pbkalLetters[index].style.color = "#F37021";
    } else {
      pbkalLetters[index].style.color = "";
    }
  };

  const checkMobileShapesPlacement = () => {
    const allCorrect = Array.from(mobileDropZones).every((zone, index) => {
      const child = zone.firstChild;
      return child && child.id === dropZoneIds[index];
    });

    if (allCorrect) {
      document.querySelector(".mobile-document-section .button").style.display =
        "block";
    }
  };
};


const pbkalAnimation = () => {
  lottie.loadAnimation({
    container: document.querySelector(".pbkal-animation"),
    renderer: "svg",
    loop: true,
    autoplay: true,
    path: "assets/animations/pbkal.json",
  });
};

const aheadAnimation = () => {
  lottie.loadAnimation({
    container: document.querySelector(".ahead-animation"),
    renderer: "svg",
    loop: true,
    autoplay: true,
    path: "assets/animations/ahead-black.json",
  });
};

const lgvAnimation = () => {
  lottie.loadAnimation({
    container: document.querySelector(".lgv-animation"),
    renderer: "svg",
    loop: true,
    autoplay: true,
    path: "assets/animations/lgv.json",
  });
};

const leuvenAnimation = () => {
  lottie.loadAnimation({
    container: document.querySelector(".leuven-animation"),
    renderer: "svg",
    loop: true,
    autoplay: true,
    path: "assets/animations/leuven.json",
  });
};

const hslFourAnimation = () => {
  lottie.loadAnimation({
    container: document.querySelector(".hsl-4-animation"),
    renderer: "svg",
    loop: true,
    autoplay: true,
    path: "assets/animations/hsl4.json",
  });
};

const mobileAnimation = () => {
  lottie.loadAnimation({
    container: document.querySelector(".mobile-animation"),
    renderer: "svg",
    loop: true,
    autoplay: true,
    path: "assets/animations/pbkal.json",
  });
}

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

const map = () => {
  const center = [51.332871, 12.522164];
  const map = L.map("map").setView(center, 5);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 18,
  }).addTo(map);

  const editableLayers = new L.FeatureGroup();
  map.addLayer(editableLayers);

  const drawPluginOptions = {
    position: "topright",
    draw: {
      polyline: {
        shapeOptions: {
          color: "#f357a1",
          weight: 4,
        },
      },
      polygon: false,
      circle: false,
      rectangle: false,
      marker: false,
      circlemarker: false,
    }
  };

  

  const drawControl = new L.Control.Draw(drawPluginOptions);
  map.addControl(drawControl);

  map.on("draw:created", function (e) {
    const type = e.layerType;
    const layer = e.layer;

    if (type === "polyline") {
      const latlngs = layer.getLatLngs();
      let totalLength = 0;
      for (let i = 0; i < latlngs.length - 1; i++) {
        totalLength += latlngs[i].distanceTo(latlngs[i + 1]);
      }
      const lengthInKm = totalLength / 1000;

      const travelTimeHours = lengthInKm / 200;
      const hours = Math.floor(travelTimeHours);
      const minutes = Math.floor((travelTimeHours - hours) * 60);

      const estimatedCostsInMln = lengthInKm * 25;

      const billions = Math.floor(estimatedCostsInMln * 0.001);
      const millions = Math.floor(estimatedCostsInMln - billions * 1000);

      updateRouteInformation(lengthInKm, hours, minutes, billions, millions);
    }

    editableLayers.addLayer(layer);
  });

  const updateRouteInformation = (
    distance,
    hours,
    minutes,
    billions,
    millions
  ) => {
    const distanceElem = document.querySelector(
      ".route-information .information-block:nth-child(1) p"
    );
    distanceElem.textContent = `${distance.toFixed(2)} km`;

    const timeElem = document.querySelector(
      ".route-information .information-block:nth-child(2) p"
    );
    timeElem.textContent = `${hours} hours and ${minutes} minutes`;

    const costElem = document.querySelector(
      ".route-information .information-block:nth-child(3) p"
    );
    costElem.textContent = billions
      ? `${billions} billions and ${millions} millions`
      : `${millions} millions`;
  };
};

init();
