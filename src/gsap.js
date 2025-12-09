import { gsap } from "gsap";
    
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { SplitText } from "gsap/SplitText";
import { TextPlugin } from "gsap/TextPlugin";

import Lenis from 'lenis'


gsap.registerPlugin(ScrollTrigger,ScrollToPlugin,SplitText,TextPlugin);

// Initialize Lenis
const lenis = new Lenis({
  autoRaf: true,
});

// Listen for the scroll event and log the event data
// lenis.on('scroll', (e) => {
//   console.log(e);
// });

// Synchronize Lenis scrolling with GSAP's ScrollTrigger plugin
lenis.on('scroll', ScrollTrigger.update);

// Add Lenis's requestAnimationFrame (raf) method to GSAP's ticker
// This ensures Lenis's smooth scroll animation updates on each GSAP tick
gsap.ticker.add((time) => {
  lenis.raf(time * 1000); // Convert time from seconds to milliseconds
});

// Disable lag smoothing in GSAP to prevent any delay in scroll animations
gsap.ticker.lagSmoothing(0);

const statsText = gsap.utils.toArray('.stat');

// Split each stat text once
const splits = statsText.map(el => new SplitText(el, { type: "words" }));

let statstl = gsap.timeline({
  scrollTrigger: {
    trigger: '#stats',
    start: '-150 80%',
    end: 'bottom 77%',
    scrub: 0.5,
    markers: false,
  }
});

// Add each animation to the same timeline, one after another
splits.forEach(split => {
  statstl.from(split.words, {
    opacity: 0,
    y: 20,
    duration: 0.6,
    stagger: 0.05,
    ease: "power4.out"
  });
});


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
      markers: false
    }
  });
});

gsap.to("#hero-container", {
  yPercent: -50,
  y: 400,
  ease: "none",
  scrollTrigger: {
    trigger: "#hero",
    start: "top top",
    end: "80% top",
    scrub: 0,
    markers: false
  }
});

gsap.from(".about-img", {
  y: 20,
  ease: "none",
  scrollTrigger: {
    trigger: "#about",
    start: "top 90%",
    end: "80% 90%",
    scrub: 0,
    markers: true
  }
});

//  !NAVBAR LINK SCROLLING 
document.getElementById("work-link").addEventListener("click", function (e) {
  e.preventDefault(); // stops the link from navigating
  gsap.to(window, { duration: 1.5, scrollTo: "#work", ease: "power4.out" });
});

document.getElementById("about-link").addEventListener("click", function (e) {
  e.preventDefault(); // stops the link from navigating
  gsap.to(window, { duration: 1.5, scrollTo: "#about", ease: "power4.out" });
});

document.getElementById("logo-link").addEventListener("click", function (e) {
  e.preventDefault(); // stops the link from navigating
  gsap.to(window, { duration: 1.5, scrollTo: "#hero", ease: "power4.out" });
});