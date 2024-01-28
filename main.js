import { gsap } from "gsap";
import lottie from "lottie-web";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextPlugin } from "gsap/TextPlugin";
import { SplitText } from "/splitText.js";

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
  InvestmentAnimation();
  map();
  animateEvents();
  animateOpinionCards();
  animateText();
  animateCompanyStructure();
  animateTextSection();
};

const animateTextSection = () => {
  const textSection = document.querySelector(".text-section");
  const sentences = textSection.querySelectorAll("p");
  const animatedDigits = textSection.querySelectorAll(".animated-digit");

  // Animate each sentence
  sentences.forEach((sentence, index) => {
    gsap.from(sentence, {
      scrollTrigger: {
        trigger: sentence,
        start: "top bottom", 
        end: "bottom top",
        toggleActions: "play none none reverse",
        // markers: true,
      },
      opacity: 0,
      y: 20,
      duration: 1,
      ease: "power2.out",
      delay: index * 0.3, // Stagger the start time of each sentence
    });
  });

  // Animate numbers
  animatedDigits.forEach((digit) => {
    const endValue = parseInt(digit.textContent.replace(/\s/g, ""), 10);
    gsap.from(digit, {
      scrollTrigger: {
        trigger: digit,
        start: "top 70%",
        toggleActions: "play none none reverse",
        // markers: true,
      },
      duration: 2,
      text: endValue,
      ease: "power3.inOut",
      snap: { textContent: 1 },
      stagger: 0.5,
    });
  });
};

const animateText = () => {
  const text = document.querySelector(".history-text");

  const splittedText = new SplitText(text);

  gsap.to(splittedText.chars, {
    scrollTrigger: {
      trigger: text,
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

const animateCompanyStructure = () => {
  const mm = gsap.matchMedia();
  mm.add("(max-width: 767px)", () => {
    gsap.utils.toArray(".carousel-item").forEach((item) => {
      const logo = item.querySelector("img");
      const heading = item.querySelector("h3");
      const desc = item.querySelector(".company-desc");
      const listItems = item.querySelectorAll(".company-list p");

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: item,
          start: "top 80%",
          end: "bottom top",
          toggleActions: "play none none reverse",
          // markers: true,
        },
      });

      tl.from(logo, {
        duration: 0.3,
        autoAlpha: 0,
        y: 30,
        ease: "power1.out",
      });

      tl.from(
        heading,
        {
          duration: 0.3,
          autoAlpha: 0,
          y: 30,
          ease: "power1.out",
        },
        "-=0.3"
      );

      tl.from(
        desc,
        {
          duration: 0.6,
          autoAlpha: 0,
          y: 20,
          ease: "power1.out",
        },
        "-=0.3"
      );

      listItems.forEach((item, index) => {
        tl.from(
          item,
          {
            duration: 0.6,
            autoAlpha: 0,
            y: 20,
            ease: "power1.out",
          },
          `-=${0.5 - index * 0.1}`
        );
      });
    });
  });
};

const InvestmentAnimation = () => {
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
  mm.add("(max-width: 767px)", () => {
    gsap.utils.toArray(".investment-item").forEach((item, index) => {
      const year = item.querySelector(".accent-year");
      const title = item.querySelector(".project-heading");
      const content = item.querySelector(".investment-left");
      const image = item.querySelector(".investment-right img");

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: item,
          start: "top 50%",
          end: "bottom top",
          toggleActions: "play none none reverse",
          // markers: true,
        },
      });

      tl.from(year, { x: -100, autoAlpha: 0, ease: "power2.out" }, 0).from(
        title,
        { x: 100, autoAlpha: 0, ease: "power2.out" },
        "-=0.5"
      );

      if (content) {
        tl.from(
          content,
          { y: 50, autoAlpha: 0, ease: "back.out(1.7)" },
          "-=0.5"
        );
      }
      if (image) {
        tl.from(
          image,
          { scale: 0.8, autoAlpha: 0, ease: "elastic.out(1, 0.3)" },
          "-=0.5"
        );
      }
    });
  });
};

const animateEvents = () => {
  const mm = gsap.matchMedia();
  const eventsBlocks = document.querySelectorAll(".events-block");

  eventsBlocks.forEach((block) => {
    const header = block.querySelector(".event-header");
    const animationDiv = block.querySelector("div[class$='-animation']");
    const animationText = block.querySelector(".animation-text");
    const yearAndDescription = block.querySelector(".year-and-description");

    mm.add("(min-width: 768px)", () => {
      gsap
        .timeline({
          scrollTrigger: {
            trigger: block,
            start: "top 90%",
            end: "bottom 70%",
            scrub: true,
            // markers: true,
          },
        })
        .from(header, {
          x: -100,
          autoAlpha: 0,
          ease: "power2.out",
        })
        .from(animationText, {
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
    mm.add("(max-width: 767px)", () => {
      gsap
        .timeline({
          scrollTrigger: {
            trigger: block,
            start: "top bottom",
            end: "bottom bottom",
            scrub: true,
            // markers: true,
          },
        })
        .from(header, {
          x: -100,
          autoAlpha: 0,
          ease: "power2.out",
        })
        .from(animationText, {
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
            y: 100,
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
  const symbols = gsap.utils.toArray(".opinion-symbol");

  opinionCards.forEach((card, index) => {
    const animationParams = card.classList.contains("against-opinion")
      ? { x: -200, rotation: -10, backgroundColor: "red" }
      : { x: 200, rotation: 10, backgroundColor: "green" };

    const symbol = symbols[index];

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: card,
        start: "top 20%",
        toggleActions: "play none none reverse",
        // markers: true,
      },
    });

    tl.to(card, {
      ...animationParams,
      ease: "power2.in",
    }).to(
      symbol,
      {
        opacity: 1,
        duration: 0.5,
        ease: "power2.in",
      },
      "<"
    ); // "<" means this animation will start at the same time as the previous one
  });
};

const setupDragAndDrop = () => {
  const draggables = document.querySelectorAll(".shapes div");
  const dropZones = document.querySelectorAll(".drop-area div");
  const dropZoneIds = ["france", "belgium", "germany", "netherlands", "uk"];
  const contractButton = document.querySelector(".contract-button");
  let animationPlayed = false;

  draggables.forEach((draggable) => {
    draggable.addEventListener("dragstart", (event) => {
      event.dataTransfer.setData("text", draggable.id);
    });
  });

  const checkShapesPlacement = () => {
    const allCorrect = dropZoneIds.every((id, index) => {
      const zone = document.getElementById("drop-" + id);
      if (!zone) {
        console.error("Drop zone not found:", "drop-" + id);
        return false;
      }
      const child = zone.firstElementChild;
      return child && child.id === id;
    });
    contractButton.style.display = allCorrect ? "block" : "none";
    console.log(allCorrect);
  };

  dropZones.forEach((zone, index) => {
    zone.addEventListener("dragover", (event) => {
      event.preventDefault();
    });

    zone.addEventListener("drop", (event) => {
      event.preventDefault();
      const draggableId = event.dataTransfer.getData("text");
      const draggableElement = document.getElementById(draggableId);

      if (!zone.firstChild) {
        zone.appendChild(draggableElement);
        zone.style.border =
          draggableId === dropZoneIds[index]
            ? "3px solid green"
            : "3px solid red";
      }

      checkShapesPlacement();
    });
  });

  contractButton.addEventListener("click", () => {
    if (!animationPlayed) {
      lottie.loadAnimation({
        container: document.querySelector(".signature-animation"),
        renderer: "svg",
        loop: false,
        autoplay: true,
        path: "assets/animations/signature.json",
      });
      animationPlayed = true;
      contractButton.disabled = true;
      contractButton.style.opacity = 0.5;
    }
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
        updatePbkalLetters(index, true);
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
    path: "assets/animations/mobile-animation.json",
  });
};

// const signatureAnimation = () => {
//   lottie.loadAnimation({
//     container: document.querySelector(".signature-animation"),
//     renderer: "svg",
//     loop: false,
//     autoplay: true,
//     path: "assets/animations/signature.json",
//   });
// };

init();
