// --- GSAP
gsap.registerPlugin(ScrollTrigger, DrawSVGPlugin);

gsap.config({
  nullTargetWarn: false,
  trialWarn: false,
});

let mm = gsap.matchMedia();

// --- GLOBAL - RELOAD AT THE TOP
window.addEventListener("beforeunload", function () {
  history.scrollRestoration = "manual";
});

// --- LENIS
window.lenis = new Lenis();

lenis.on("scroll", ScrollTrigger.update);

gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});

gsap.ticker.lagSmoothing(0);

// --- SPLIT TEXT
let splitText;

function runSplit() {
  splitText = new SplitType("[split-txt]", {
    types: "words, chars",
  });
}
runSplit();

// --- Update on window resize
let windowWidth = $(window).innerWidth();
window.addEventListener("resize", function () {
  if (windowWidth !== $(window).innerWidth()) {
    windowWidth = $(window).innerWidth();
    splitText.revert();
    runSplit();
    gsap.set(".char", { visibility: "visible" });
  }
});

// --- PAPER TIGET SIGNATURE
const pprtgr = [
  'color: #F2F3F3',
  'background: #080808',
  'font-size: 12px',
  'padding-left: 10px',
  'line-height: 2',
  'border-left: 5px solid #ff3c31',
].join(';');
console.info(`

%cWebsite by Paper Tiger${' '}
www.papertiger.com${'     '}

`, pprtgr);

// --- CURRENT YEAR
const currentYear = document.querySelector('[current-year]');
if (currentYear) {
  currentYear.innerHTML = new Date().getFullYear();
}

// --- POST BLOCKS
function postBlocks() {
  const postsContainer = document.querySelector(".o-grid.posts");
  const posts = Array.from(postsContainer.querySelectorAll(".c-post-item"));
  const block1 = document.querySelector("[data-post='block-1']");
  const block2 = document.querySelector("[data-post='block-2']");

  function addBlocks() {
    if (!postsContainer || !block1 || !block2) {
      console.error("Required elements are missing in the DOM.");
      return;
    }

    removeBlocks();

    if (posts[0]) {
      const clonedBlock1 = block1.cloneNode(true);
      clonedBlock1.dataset.added = "true";
      posts[0].insertAdjacentElement("afterend", clonedBlock1);
    }

    if (posts[1]) {
      const clonedBlock2 = block2.cloneNode(true);
      clonedBlock2.dataset.added = "true";
      posts[1].insertAdjacentElement("afterend", clonedBlock2);
    }

    postBlocksIconAnimation();
  }

  function removeBlocks() {
    const addedBlocks = document.querySelectorAll("[data-added='true']");
    addedBlocks.forEach(block => block.remove());
  }

  function handleResize() {
    const screenWidth = window.innerWidth;
    if (screenWidth >= 992) {
      addBlocks();
    } else {
      removeBlocks();
    }
  }

  handleResize();
  window.addEventListener("resize", handleResize);
}

function postBlocksIconAnimation() {
  // const instances = document.querySelectorAll("[data-icon='post-draw'] path");

  // gsap.from(instances, {
  //   drawSVG: 0,
  //   stagger: 0.05,
  //   scrollTrigger: {
  //     trigger: ".c-post-block",
  //     start: "center 80%",
  //     end: "bottom top",
  //     markers: true,
  //     scrub: true
  //   }
  // });

  const instances = document.querySelectorAll(".c-post-block");

  instances.forEach(instance => {

    const path = instance.querySelectorAll("[data-icon='post-draw'] path");

    gsap.from(path, {
      drawSVG: 0,
      stagger: 0.05,
      duration: 3,
      scrollTrigger: {
        trigger: instance,
        start: "top center",
        end: "bottom top",
      },
      repeat: -1,
    });
  });
};

// window.postBlocksIconAnimation = function () {}

// --- ICONS ANIMATION
function iconsAnimation() {
  gsap.from("[data-icon='draw'] path:not(.no-draw)", {
    duration: 6,
    drawSVG: 0,
    stagger: 0.05,
    ease: "power3.out",
    // scrollTrigger: {
    //   trigger: "[data-icon='draw']",
    //   start: "top bottom",
    // },
    repeat: -1,
  });

  // 3D rotation
  gsap.from("[data-icon='rotate']", {
    duration: 4,
    rotationY: 360,
    repeat: -1,
    ease: "linear"
  });
}

// --- STYLED TEXT
function styledText() {
  const instances = document.querySelectorAll(".t-styled-txt");

  gsap.from(instances, {
    yPercent: 50,
    opacity: 0,
    ease: "power4.out",
    duration: 1.6,
    stagger: 0.1,
    scrollTrigger: {
      trigger: ".t-display-2.styled-txt",
      start: "top bottom",
    }
  });
}

// --- GLOBAL - FADE
function fade() {
  const fadeElements = document.querySelectorAll("[fade]");

  gsap.set(fadeElements, { opacity: 0, y: "5em" });

  ScrollTrigger.batch(fadeElements, {
    once: true,
    start: "top 95%",
    onEnter: (batch) =>
      gsap.to(batch, {
        opacity: 1,
        duration: 1.8,
        ease: "power3.out",
        stagger: 0.2,
        y: 0
      }),
  });
}

// --- HOME LOADER
function homeLoader() {

  const txtInstances = document.querySelectorAll(".o-row.hm-hero .t-display-1");

  let tl = gsap.timeline({ defaults: { ease: "expo.out", duration: 2.4, } });

  gsap.set(txtInstances, { yPercent: -100 });
  gsap.set(".o-row.hm-hero_bt", { opacity: 1 });

  tl.to(txtInstances, {
    yPercent: 0,
    stagger: 0.3,
  });

  tl.to(".o-row.hm-hero .t-display-1.is-1", {
    opacity: 1
  }, "<");

  tl.to(".o-row.hm-hero .t-display-1.is-outline.is-2", {
    opacity: 1
  }, "<0.2");

  tl.to(".o-row.hm-hero .t-display-1.is-outline.is-3", {
    opacity: 0.4
  }, "<0.2");

  tl.to(".o-row.hm-hero .t-display-1.is-outline.is-4", {
    opacity: 0.2
  }, "<0.2");

  tl.to(".o-row.hm-hero .t-display-1.is-outline.is-5", {
    opacity: 0.1
  }, "<0.2");

  tl.to(".o-row.hm-hero .t-display-1.is-outline.is-6", {
    opacity: 0.1
  }, "<0.2");

  tl.from("[data-icon='hm-hero-draw'] path", {
    duration: 7,
    drawSVG: 0,
    stagger: 0.05,
    repeat: -1,
  }, 0);
}

// --- QUOTES SLIDER
function quotesSlider() {
  const slider = new Swiper(".swiper.quote", {
    slidesPerView: 1,
    spaceBetween: 0,
    speed: 700,
    loop: true,
    navigation: {
      nextEl: '.swiper-next.quote',
      prevEl: '.swiper-prev.quote',
    },
    effect: 'fade',
    fadeEffect: {
      crossFade: true
    },
  });
}

let homepage = document.querySelector("[data-page='homepage']");

// --- INIT
function init() {
  postBlocks();
  iconsAnimation();
  styledText();
  if (homepage) {
    homeLoader();
  }
  fade();
  quotesSlider();
}

init();

// --- MATCHMEDIA - DESKTOP
mm.add("(min-width: 992px)", () => {
  return () => {
    //
  };
});

// --- MATCHMEDIA - TABLET AND MOBILE
mm.add("(max-width: 991px)", () => {
  //
  return () => {
    //
  };
});
