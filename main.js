const init = () => {
  gsap.registerPlugin(ScrollTrigger);
  pbkalAnimation();
  lgvAnimation();
  leuvenAnimation();
  hslFourAnimation();
  setupScrollTrigger();
  dragAndDrop();
};

const dragAndDrop = () => {

    const allowDrop = (event) => {
      event.preventDefault();
    };

    const drag = (event) => {
      event.dataTransfer.setData("text", event.target.id);
    };

    const drop = (event) => {
      event.preventDefault();
      var data = event.dataTransfer.getData("text");
      event.target.appendChild(document.getElementById(data));
    };

    const shapes = document.querySelectorAll(".shapes div");
    const targets = document.querySelectorAll(".document div");

    shapes.forEach((shape) => {
      shape.addEventListener("dragstart", drag);
    });

    // Set up the drop event listeners for the targets
    targets.forEach((target) => {
      target.addEventListener("dragover", allowDrop);
      target.addEventListener("drop", drop);
    });
}

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
