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
    ease: 1,
    scrub: true,
    markers: true,
  }
})

hero_tl.from('#hero img:nth-child(1)', {
    x: 200,
    opacity: .25,
}).from('#hero img:nth-child(2)', {
    x: -200,
    opacity: .25,
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
});