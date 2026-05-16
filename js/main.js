document.documentElement.classList.add("js");

// UI behavior
const header = document.querySelector(".site-header");
const revealItems = document.querySelectorAll(".reveal");
const yearTarget = document.getElementById("footer-year");

const syncHeader = () => {
  if (!header) return;
  header.classList.toggle("is-scrolled", window.scrollY > 18);
};

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: "0px 0px -8% 0px"
  });

  revealItems.forEach((item, index) => {
    item.style.transitionDelay = `${Math.min(index * 35, 160)}ms`;
    revealObserver.observe(item);
  });
} else {
  revealItems.forEach((item) => {
    item.classList.add("is-visible");
  });
}

window.setTimeout(() => {
  revealItems.forEach((item) => {
    item.classList.add("is-visible");
  });
}, 900);

window.addEventListener("load", () => {
  document.querySelectorAll(".contact-buttons").forEach((group) => {
    group.classList.add("is-loaded");
  });
});

if (yearTarget) {
  yearTarget.textContent = new Date().getFullYear();
}

syncHeader();
window.addEventListener("scroll", syncHeader, { passive: true });

if (window.lucide) {
  window.lucide.createIcons();
}

// Optional desktop-only Three.js hero. The current static page does not load Three.js,
// but this guard prevents heavy WebGL work on mobile if the visual is reintroduced.
const isMobile = window.matchMedia("(max-width: 768px)").matches;
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

let heroAnimationFrame = null;
let heroAnimationStarted = false;

const stopHeroAnimation = () => {
  if (heroAnimationFrame) {
    cancelAnimationFrame(heroAnimationFrame);
    heroAnimationFrame = null;
  }
  heroAnimationStarted = false;
};

const iniciarAnimacaoHero = () => {
  const container = document.getElementById("hero-three-container");
  if (!container || heroAnimationStarted || !window.THREE) return;

  const animate = () => {
    if (document.hidden) {
      stopHeroAnimation();
      return;
    }

    heroAnimationStarted = true;
    heroAnimationFrame = requestAnimationFrame(animate);
  };

  animate();
};

if (!isMobile && !prefersReducedMotion && window.THREE) {
  iniciarAnimacaoHero();
}

document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
    stopHeroAnimation();
    return;
  }

  if (!isMobile && !prefersReducedMotion && window.THREE) {
    iniciarAnimacaoHero();
  }
});
