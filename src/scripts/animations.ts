import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

let currentContext: gsap.Context | undefined;

function initialiseAnimations() {
  currentContext?.revert();

  currentContext = gsap.context(() => {
    const media = gsap.matchMedia();

    media.add("(prefers-reduced-motion: no-preference)", () => {
      const heroContent = document.querySelector<HTMLElement>("[data-hero-content]");

      if (heroContent) {
        gsap.from(heroContent.children, {
          autoAlpha: 0,
          y: 24,
          duration: 0.8,
          ease: "power2.out",
          stagger: 0.12,
          delay: 0.1,
        });
      }

      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((element) => {
        gsap.from(element, {
          autoAlpha: 0,
          y: 28,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: {
            trigger: element,
            start: "top 85%",
            once: true,
          },
        });
      });

      ScrollTrigger.refresh();
      return () => media.revert();
    });
  });
}

document.addEventListener("astro:page-load", initialiseAnimations);
