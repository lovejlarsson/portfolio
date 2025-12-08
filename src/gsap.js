import { gsap } from "gsap";
    
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { SplitText } from "gsap/SplitText";
import { TextPlugin } from "gsap/TextPlugin";

gsap.registerPlugin(ScrollTrigger,ScrollToPlugin,SplitText,TextPlugin);

const steps = [
  { el: "#hero4", pos: "10%" },
  { el: "#hero3", pos: "30%" },
  { el: "#hero2", pos: "40%" },
  { el: "#hero1", pos: "45%" },
//   { el: "#hero0", pos: "50%" },
];

steps.forEach(step => {
  gsap.to(step.el, {
    opacity: 0,
    duration: 0.1,
    scrollTrigger: {
      trigger: "#hero",
      start: `${step.pos} top`,
      end: `${step.pos} top`,
      scrub: 0,
      markers: true
    }
  });
});