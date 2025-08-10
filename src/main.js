import './style.css'
import { gsap } from "gsap";
    
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { SplitText } from "gsap/SplitText";
import { TextPlugin } from "gsap/TextPlugin";

gsap.registerPlugin(ScrambleTextPlugin,ScrollTrigger,ScrollSmoother,SplitText,TextPlugin);

ScrollSmoother.create({
  smooth: 1, // how long (in seconds) it takes to "catch up" to the native scroll position
  effects: true, // looks for data-speed and data-lag attributes on elements
  smoothTouch: 0.1, // much shorter smoothing time on touch devices (default is NO smoothing on touch devices)
});

let hero_tl = gsap.timeline({
  scrollTrigger: {
    trigger: '#hero',
    start: '20% 20%',
    end: '80% 20%',
    scrub: 1.5,
    markers: false,
  }
})

hero_tl.from('#hero img:nth-child(1)', {
    x: 200,
    opacity: .25,
    ease: "power1.inOut"
}).from('#hero img:nth-child(2)', {
    x: -200,
    opacity: .25,
    ease: "power1.inOut"
}, 0.1)

gsap.from('#logo', {
  opacity: 0,
  x: 40,
  scrollTrigger: {
    trigger: '#hero',
    start: 'bottom 30%',
    end: '+=50 30%',
    scrub: 1,
    markers: false,
  }
})

gsap.from('#portrait', {
  y: -80,
  scrollTrigger: {
    trigger: '#portrait',
    start: 'top 60%',
    end: '+=300 60%',
    scrub: true,
    markers: false,
    id: "portrait",
  }
})

let workTl = gsap.timeline({
  scrollTrigger: {
    trigger: '#work',
    start: 'top 80%',
    end: '80% 80%',
    scrub: true,
    markers: false,
    id: "selected-work",
  }
});

workTl.from('#work', {
  borderRadius: 30,
  scale: .95,
  ease: "power3.out",
}).to('#info', {
  y: 400,
  opacity: 0.8,
  ease: "power3.out",
}, 0);

document.querySelectorAll('.hoversplit').forEach((element) => {
    const splitText = new SplitText(element, {
        type: "words, chars",
        mask: 'chars',
    });
    
    element.addEventListener('mouseenter', () => {
        gsap.to(splitText.chars, {
            yPercent: -85,
            duration: .4,
            stagger: .05,
            onComplete: () => split.revert()
        });
    });
    
    element.addEventListener('mouseleave', () => {
        gsap.to(splitText.chars, {
            yPercent: 0, // Reset to original position
            duration: .2,
            stagger: .05,
        });
    });
});