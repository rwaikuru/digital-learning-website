import React, { useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

// Importing images
import img1 from "/img/AGRA.jpeg";
import img2 from "/img/GIZ.jpeg";
import img3 from "/img/blended.avif";
import img4 from "/img/blendedlearning.jpg";
import img5 from "/img/blendedlearning.jpg";
import img6 from "/img/blendedlearning.jpg";
import img7 from "/img/blended.avif";
import img8 from "/img/blended.avif";
import img9 from "/img/kidscancode.webp";
import img10 from "/img/blended.avif";

const OurProjects = () => {
  const cardData = [
    { title: "Alliance for a Green Revolution in Africa (AGRA)", img: img1 },
    { title: "GIZ", img: img2 },
    { title: "Farm Input Promotions Africa (FIPS – Africa)", img: img3 },
    { title: "Mobile Learning", img: img4 },
    { title: "Sustainable and Affordable Access to Education for Refugees", img: img5 },
    { title: "Capacity Building in ICTS", img: img6 },
    { title: "ReadyToWork", img: img7 },
    { title: "Content Development", img: img8 },
    { title: "Kids Can Code", img: img9 },
    { title: "Smart Learning Communities", img: img10 },
    { title: "MasterCard Foundation", img: img10 },
    { title: "IJM/ODPP", img: img10 },
    { title: "UNHCR", img: img10 },



  ];

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    let iteration = 0;

    gsap.set(".cards li", { xPercent: 400, opacity: 0, scale: 0 });

    const spacing = 0.1;
    const snapTime = gsap.utils.snap(spacing);
    const cards = gsap.utils.toArray(".cards li");

    const animateFunc = (element) => {
      const tl = gsap.timeline();
      tl.fromTo(
        element,
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, zIndex: 100, duration: 0.5, yoyo: true, repeat: 1, ease: "power1.in", immediateRender: false }
      ).fromTo(
        element,
        { xPercent: 400 },
        { xPercent: -400, duration: 1, ease: "none", immediateRender: false },
        0
      );
      return tl;
    };

    const buildSeamlessLoop = (items, spacing, animateFunc) => {
      const rawSequence = gsap.timeline({ paused: true });
      const seamlessLoop = gsap.timeline({
        paused: true,
        repeat: -1,
        onRepeat() {
          this._time === this._dur && (this._tTime += this._dur - 0.01);
        },
        onReverseComplete() {
          this.totalTime(this.rawTime() + this.duration() * 100);
        },
      });

      const cycleDuration = spacing * items.length;

      items.concat(items).concat(items).forEach((item, i) => {
        const anim = animateFunc(items[i % items.length]);
        rawSequence.add(anim, i * spacing);
      });

      seamlessLoop.fromTo(
        rawSequence,
        { time: cycleDuration },
        { time: "+=" + cycleDuration, duration: cycleDuration, ease: "none" }
      );

      return seamlessLoop;
    };

    const seamlessLoop = buildSeamlessLoop(cards, spacing, animateFunc);

    const playhead = { offset: 0 };
    const wrapTime = gsap.utils.wrap(0, seamlessLoop.duration());

    const scrub = gsap.to(playhead, {
      offset: 0,
      onUpdate() {
        seamlessLoop.time(wrapTime(playhead.offset));
      },
      duration: 0.5,
      ease: "power3",
      paused: true,
    });

    const trigger = ScrollTrigger.create({
      start: 0,
      onUpdate(self) {
        const scroll = self.scroll();
        if (scroll > self.end - 1) {
          wrap(1, 2);
        } else if (scroll < 1 && self.direction < 0) {
          wrap(-1, self.end - 2);
        } else {
          scrub.vars.offset = (iteration + self.progress) * seamlessLoop.duration();
          scrub.invalidate().restart();
        }
      },
      end: "+=3000",
      markers: true,
      pin: ".gallery",
    });

    const progressToScroll = (progress) => gsap.utils.clamp(1, trigger.end - 1, gsap.utils.wrap(0, 1, progress) * trigger.end);

    const wrap = (iterationDelta, scrollTo) => {
      iteration += iterationDelta;
      trigger.scroll(scrollTo);
      trigger.update();
    };

    const scrollToOffset = (offset) => {
      const snappedTime = snapTime(offset);
      const progress = (snappedTime - seamlessLoop.duration() * iteration) / seamlessLoop.duration();
      const scroll = progressToScroll(progress);
      if (progress >= 1 || progress < 0) {
        return wrap(Math.floor(progress), scroll);
      }
      trigger.scroll(scroll);
    };

    ScrollTrigger.addEventListener("scrollEnd", () => scrollToOffset(scrub.vars.offset));

    document.querySelector(".next").addEventListener("click", () => scrollToOffset(scrub.vars.offset + spacing));
    document.querySelector(".prev").addEventListener("click", () => scrollToOffset(scrub.vars.offset - spacing));
  }, []);

  return (
    <div className="gallery">
    <div className="header flex justify-between items-center text-white px-4 py-2">
      <span className="text-sm font-bold">Digital Literacy, E-Learning, EdTech</span>
      <span className="text-xs"></span>
      <span className="text-sm underline">Work with Us</span>
    </div>
  
    <ul className="cards relative">
      {cardData.map((card, index) => (
        <li
          key={index}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        >
          <div className="absolute top-[-2rem] text-center w-full text-xl text-white font-bold">
            {card.title}
          </div>
          <img
            src={card.img}
            alt={card.title}
            className="w-full h-full rounded-md object-cover"
          />
        </li>
      ))}
    </ul>
  
    <div className="actions flex justify-between mt-4">
      <button className="prev bg-blue-500 text-white py-1 px-3 rounded">Prev</button>
      <button className="next bg-blue-500 text-white py-1 px-3 rounded">Next</button>
    </div>
  
    <div className="footer mt-16 text-center">
      <h1 className="text-[4rem] font-bold leading-none">Projects</h1>
    </div>
  </div>
  
  );
};

export default OurProjects;
