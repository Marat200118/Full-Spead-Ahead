import { gsap } from "gsap";
import lottie from "lottie-web";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextPlugin } from "gsap/TextPlugin";

const init = () => {
  gsap.registerPlugin(ScrollTrigger, TextPlugin);
  lgvAnimation();
  flagsAnimation();
  leuvenAnimation();
  hslFourAnimation();
  aheadAnimation();
  setupDragAndDrop();
  mobileInteraction();
  mobileAnimation();
  setupCompanyDragAndDrop();
  horizontalScroll();
  map();
  animateEvents();
  readingTextAnimation();
  animateOpinionCards();
  // horizontalTextScroll();
}


// const horizontalTextScroll = () => {
//   gsap.to(".horizontal-scroll", {
//     x: () =>
//       -(
//         document.querySelector(".horizontal-scroll").scrollWidth -
//         window.innerWidth
//       ) + "px",
//     ease: "none",
//     scrollTrigger: {
//       trigger: ".text-section",
//       pin: true,
//       scrub: 1,
//       end: () =>
//         "+=" + document.querySelector(".horizontal-scroll").offsetWidth,
//     },
//   });
// };

const readingTextAnimation = () => {
  splitText(".history-text");

  gsap.to(".letter", {
    scrollTrigger: {
      trigger: ".history-text",
      start: "top 60%",
      end: "bottom 40%",
      scrub: true,
      // markers: true,
    },
    color: "#222831",
    stagger: 0.05,
    ease: "linear",
  });
};

const horizontalScroll = () => {
  const mm = gsap.matchMedia();
  mm.add("(min-width: 768px)", () => {
    gsap.to(".investment-container", {
      x: () =>
        -(
          document.querySelector(".investment-container").scrollWidth -
          document.documentElement.clientWidth
        ) + "px",
      ease: "none",
      scrollTrigger: {
        trigger: ".investments",
        pin: true,
        scrub: 1,
        end: () =>
          "+=" + document.querySelector(".investment-container").offsetWidth,
      },
    });
  });
};

const animateEvents = () => {
  const mm = gsap.matchMedia();
  const eventsBlocks = document.querySelectorAll(".events-block");

  eventsBlocks.forEach((block) => {
    const header = block.querySelector(".event-header");
    const animationDiv = block.querySelector("div[class$='-animation']");
    const yearAndDescription = block.querySelector(".year-and-description");

    mm.add("(min-width: 768px)", () => {
      gsap
        .timeline({
          scrollTrigger: {
            trigger: block,
            start: "top 90%",
            end: "bottom 60%",
            scrub: true,
            // markers: true,
          },
        })
        .from(header, {
          x: -100,
          autoAlpha: 0,
          ease: "power2.out",
        })
        .from(
          animationDiv,
          {
            scale: 0.5,
            autoAlpha: 0,
            ease: "power2.out",
          },
          "-=0.5"
        )
        .from(
          yearAndDescription,
          {
            x: 100,
            autoAlpha: 0,
            ease: "power2.out",
          },
          "-=0.5"
        );
    });
  });
};

const animateOpinionCards = () => {
  const opinionCards = gsap.utils.toArray(".opinion-card");

  opinionCards.forEach((card) => {
    const animationParams = card.classList.contains("against-opinion")
      ? { x: -200, rotation: -10, backgroundColor: "red" }
      : { x: 200, rotation: 10, backgroundColor: "green" };

    gsap.to(card, {
      ...animationParams,
      scrollTrigger: {
        trigger: card,
        start: "top 30%",
        toggleActions: "play none none reverse",
        // markers: true,
      },
      ease: "power1.in",
      onCompleteParams: [card],
    });
  });
};


const splitText = (selector) => {
  const element = document.querySelector(selector);
  let text = element.innerText;
  text = text.replace(/\$/g, "<br>");

  const parts = text.split(/(<br>)/g);
  let splitText = "";

  for (const part of parts) {
    if (part === "<br>") {
      splitText += part;
    } else {
      const letters = part.split("");
      for (const letter of letters) {
        if (letter === " ") {
          splitText += "<span class='letter'>&nbsp;</span>";
        } else {
          splitText += `<span class='letter'>${letter}</span>`;
        }
      }
    }
  }
  element.innerHTML = splitText;
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
    },
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

//* Animations

const flagsAnimation = () => {
  lottie.loadAnimation({
    container: document.querySelector(".flags-animation"),
    renderer: "svg",
    loop: true,
    autoplay: true,
    path: "assets/animations/flags_composition.json",
  });
};

const aheadAnimation = () => {
  lottie.loadAnimation({
    container: document.querySelector(".ahead-animation"),
    renderer: "svg",
    loop: true,
    autoplay: true,
    path: "/assets/animations/ahead-black.json",
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
    path: "assets/animations/mobile-animation.json",
  });
};

init();
