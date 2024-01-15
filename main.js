const init = () => {
  gsap.registerPlugin(ScrollTrigger);
  pbkalAnimation();
  lgvAnimation();
  setupScrollTrigger();
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
