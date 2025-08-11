import './style.css'
import { gsap } from "gsap";
    
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { SplitText } from "gsap/SplitText";
import { TextPlugin } from "gsap/TextPlugin";

gsap.registerPlugin(ScrambleTextPlugin,ScrollTrigger,ScrollSmoother,SplitText,TextPlugin);

ScrollSmoother.create({
  smooth: 1.5, //högre siffra = mer friktion typ
  effects: true, 
  smoothTouch: 0.1,
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

gsap.to('header',
{
  color: "#fff",
  scrollTrigger: {
    trigger: '#work',
    start: '8% 30%',
    end: '+=50 30%',
    scrub: true,
    markers: false,
    id: "navbar-text"
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
    start: 'top 90%',
    end: '+=600 90%',
    scrub: 1,
    markers: true,
    id: "selected-work",
  }
});

workTl.fromTo('#work', {
  borderRadius: 30,
  scale: .95,
  y: 0,
  ease: "power3.in",
}, {
  borderRadius: 0,
  scale: 1,
  y: -100,
  ease: "power3.out"
} 
)

const splitWorks = new SplitText('#work h1', {
  type: "chars",
  mask: 'lines'
})

gsap.from(splitWorks.chars, {
  yPercent: 80,
  opacity: 0,
  duration: 1,
  stagger: .05,
  ease: "power3.out",
  scrollTrigger: {
    trigger: "#work",
    start: 'top 80%',
    end: 'top 80%',
    scrub: false,
    markers: false,
    id: 'work-heading',
  }
})

document.querySelectorAll('.hoversplit').forEach((element) => {
    const splitText = new SplitText(element, {
        type: "words, chars",
        mask: 'chars',
    });
    
    element.addEventListener('mouseenter', () => {
        gsap.to(splitText.chars, {
            yPercent: -80,
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