import './style.css'
import { gsap } from "gsap";
    
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { ScrollToPlugin } from 'gsap/all';
import { SplitText } from "gsap/SplitText";
import { TextPlugin } from "gsap/TextPlugin";

gsap.registerPlugin(ScrambleTextPlugin,ScrollTrigger,ScrollToPlugin,ScrollSmoother,SplitText,TextPlugin);

ScrollSmoother.create({
  smooth: 1.5, //högre siffra = mer friktion typ
  effects: true, 
  smoothTouch: 0.1,
});

let hero_tl = gsap.timeline({
  scrollTrigger: {
    trigger: '#section1',
    start: '20% 20%',
    end: '80% 20%',
    scrub: 1.5,
    markers: false,
  }
})

hero_tl.from('#section1 img:nth-child(1)', {
    x: 200,
    opacity: .25,
    ease: "power1.inOut"
}).from('#section1 img:nth-child(2)', {
    x: -200,
    opacity: .25,
    ease: "power1.inOut"
}, 0.1)

gsap.from('#logo', {
  opacity: 0,
  x: 40,
  scrollTrigger: {
    trigger: '#section1',
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
    trigger: '#section3',
    start: '4% 30%',
    end: '+=50 30%',
    scrub: true,
    markers: false,
    id: "navbar-text"
  }
})

gsap.from('#portrait', {
  scale: .95,
  y: -150,
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
    trigger: '#section3',
    start: 'top 90%',
    end: '+=600 90%',
    scrub: 1,
    markers: false,
    id: "work",
  }
});

workTl.fromTo('#section3', {
  borderRadius: 30,
  scale: .95,
  y: 0,
  ease: "power3.in",
}, {
  borderRadius: 0,
  scale: 1,
  y: -96,
  ease: "power3.out"
} 
)

// MISC ------------------------

const splitWorks = new SplitText('#section3 h1', {
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
    trigger: "#section3",
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

function getSamePageAnchor (link) {
  if (
    link.protocol !== window.location.protocol ||
    link.host !== window.location.host ||
    link.pathname !== window.location.pathname ||
    link.search !== window.location.search
  ) {
    return false;
  }

  return link.hash;
}

// Scroll to a given hash, preventing the event given if there is one
function scrollToHash(hash, e) {
  const elem = hash ? document.querySelector(hash) : false;
  if(elem) {
    if(e) e.preventDefault();
    gsap.to(window, {scrollTo: elem});
  }
}

// If a link's href is within the current page, scroll to it instead
document.querySelectorAll('a[href]').forEach(a => {
  a.addEventListener('click', e => {
    scrollToHash(getSamePageAnchor(a), e);
  });
});

// Scroll to the element in the URL's hash on load
scrollToHash(window.location.hash);