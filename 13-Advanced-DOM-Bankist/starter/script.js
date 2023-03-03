'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

const nav = document.querySelector('.nav');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

/////////////////////////////////////////////////////////////////////////////

//BUTTON SCROLLING
btnScrollTo.addEventListener('click', function (e) {
  // e.preventDefault();
  // const s1coords = section1.getBoundingClientRect();
  // console.log(s1coords);
  // console.log(e.target.getBoundingClientRect());
  // console.log('Current scroll x/y', window.pageXOffset, window.pageYOffset);
  // console.log(
  //   'height/width viewport',
  //   document.documentElement.clientHeight,
  //   document.documentElement.clientWidth
  // );

  // SCROLLING;
  // window.scrollTo;
  // window.scrollTo({
  //   left: s1coords.left + window.pageXOffset,
  //   top: s1coords.top + window.pageYOffset,
  //   behavior: 'smooth',
  // });

  section1.scrollIntoView({ behavior: 'smooth' });
});
///////////////////////////////////////////////////////////////////////////////
//PAGE NAVIGATION
// document.querySelectorAll('.nav__link').forEach(function (el) {
//   el.addEventListener('click', function (e) {
//     e.preventDefault();
//     const id = this.getAttribute('href');
//     // console.log(id);
//     document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
//   });
// });
//Delegation of event handlers to multiple elements
//1. Adding an event listener that is common to all the elements
//2. Determine which element originated the event.
document.querySelector('.nav__links').addEventListener('click', function (e) {
  console.log(e.target);
  if (e.target.classList.contains('nav__link')) {
    e.preventDefault();
    const id = e.target.getAttribute('href');
    // console.log(id);
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

//BUILIDING A TABBED COMPONENT

//USING DELEGATION
tabsContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab');
  // console.log(clicked);

  //GUARD CLAUSE
  if (!clicked) return;

  //REMOVE ACTIVE CLASSES
  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  tabsContent.forEach(c => c.classList.remove('operations__content--active'));

  //ACTIVATE TAB
  clicked.classList.add('operations__tab--active');

  //ACTIVE CONTENT AREA
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

//MENU FADE ANIMATION

const handlerHover = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');
    siblings.forEach(el => {
      if (el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};
nav.addEventListener('mouseover', handlerHover.bind(0.5));

nav.addEventListener('mouseout', handlerHover.bind(1));

//STICKY NAVIGATION
// const initialCoords = section1.getBoundingClientRect();
// // console.log(initialCoords);
// window.addEventListener('scroll', function () {
//   if (window.scrollY > initialCoords.top) nav.classList.add('sticky');
//   else nav.classList.remove('sticky');
// });

//INTERSECTION OBSERVER API
// const callback = function (entries, observer) {
//   entries.forEach(entry => {
//     console.log(entry);
//   });
// };
// const options = {
//   root: null,
//   threshold: 0.1,
// };
// const observer = new IntersectionObserver(callback, options);
// observer.observe(section1);

const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height;

const StickyNav = function (entries) {
  const [entry] = entries;
  // console.log(entry);
  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};
const headerObserver = new IntersectionObserver(StickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});
headerObserver.observe(header);

//REVEALING SECTIONS ON SCROLL
const allSections = document.querySelectorAll('.section');

const revealSection = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

allSections.forEach(function (section) {
  // console.log(section);
  sectionObserver.observe(section);
  // console.log(section);
  // section.classList.add('section--hidden');
  // console.log(section);
});

//LAZY LOADING IMAGES
const imgTargets = document.querySelectorAll('img[data-src]');

const imgCallStack = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;

  //REPLACE SRC WITH DATA-SRC IMAGES. THIS PROPERTY REMOVES THE BLURRING EFFECRT FROM THE IMAGES
  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });
  observer.unobserve(entry.target);
};
const imgObserver = new IntersectionObserver(imgCallStack, {
  root: null,
  threshold: 0,
  rootMargin: '200px',
});

imgTargets.forEach(img => imgObserver.observe(img));

//SLIDERS

const slides = document.querySelectorAll('.slide');
const btnLeft = document.querySelector('.slider__btn--left');
const btnRight = document.querySelector('.slider__btn--right');
const dotContainer = document.querySelector('.dots');

let curSlide = 0;
const maxSlide = slides.length;

// const slider = document.querySelector('.slider');
// slider.style.transform = 'scale(0.4) translateX(-1200px)';
// slider.style.overflow = 'visible';

// const createDots = function () {
//   slides.forEach(function (_, i) {
//     dotContainer.insertAdjacentElement(
//       'beforeend',
//       `<button class="dots__dot" data-slide="${i}"></button>`
//     );
//   });
// };
// createDots();

const goToSlide = function (slide) {
  slides.forEach(
    (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
  );
};
goToSlide(0);

//NEXT SLIDE
const nextSlide = function () {
  if (curSlide === maxSlide - 1) {
    curSlide = 0;
  } else {
    curSlide++;
  }
  goToSlide(curSlide);
};

const prevSlide = function () {
  if (curSlide === 0) curSlide = maxSlide - 1;
  else curSlide--;
  goToSlide(curSlide);
};

btnRight.addEventListener('click', nextSlide);
btnLeft.addEventListener('click', prevSlide);
document.addEventListener('keydown', function (e) {
  if (e.key === 'ArrowLeft') prevSlide();
  e.key === 'ArrowRight' && nextSlide();
});
/////////////////////////////////////////////////////////////////////////////////////////
//LECTURES
//SELECTING ELEMENTS
// console.log(document.documentElement);
// console.log(document.head);
// console.log(document.body);

// //QUERY SELECTOR AND QUERY SELECTOR ALL RETURNS A NODE LIST
// const header = document.querySelector('.header');
// const allSections = document.querySelectorAll('.section');
// console.log(allSections);

// // GET ELEMENT BY ID, TAG NAME AND CLASS NAME RETURNS A HTML COLLECTION
// document.getElementById('section--1');
// const allButtons = document.getElementsByTagName('button');
// console.log(allButtons);

// //CREATING AND INSERTING ELEMENTS
// const message = document.createElement('div');
// message.classList.add('cookie-essage');
// message.innerHTML =
//   'We use cookies for improved functionality and analytics <button class="btn btn--close--cookie">Got it!</button>';
// header.append(message);

// //DELETING ELEMENTS
// document
//   .querySelector('.btn--close--cookie')
//   .addEventListener('click', function () {
//     message.remove();
//   });

// // STYLES, ATTRIBUTES AND CLASSES IN DOM AND CSS
// //
// // message.style.backgroundColor = '#37383d';
// // message.style.width = '120% ';
// // message.style.fontSize = '10px';
// //.getComputedStyle

// console.log(getComputedStyle(message).color);
// console.log(getComputedStyle(message).height);

// message.style.height =
//   Number.parseFloat(getComputedStyle(message).height, 10) + 30 + 'px';

// //ATTRIBUTES
// const logo = document.querySelector('.nav__logo');
// console.log(logo.alt);
// console.log(logo.src);
// console.log(logo.className);
// console.log(logo.getAttribute('designer'));
// console.log(logo.setAttribute('Company', 'Bankist'));

// //DATA ATTRIBUTES
// //They always start with the data keyword when parsing them as attributes in HTMML elements.
// //They always stored in the dataset object
// //Mostly used in UI for storing data

// //OPTIONAL CHAINING
// const shilla = {
//   name: {
//     firstName: {
//       fName: 'shila',
//     },
//     lastName: 'sawei',
//   },
//   schools: ['MMMU', 'MFA', 'SOS'],
// };
// console.log(shilla.name?.firstName?.fName);

//TYPES OF EVENTS AND EVENT HANDLERS
//Mouseenter -> Triggered when the mouse enter the space around the selected element.
//Works same as the mouwehover in css
//It is good for functionality triggered upon a mouse hover
//Can as well be explained as a poiinting device has been moved onto the element that has the listener attached
//Mouseleave-> A pointing devive has been moved off the element that has the listener attached to it
// const h1 = document.querySelector('h1');
// // h1.addEventListener('mouseenter', function (e) {
// //   alert('addEventListener: Great! You are reading the heading.');
// // });

// const alterH1 = function (e) {
//   alert('onmouseenter: Great! You are reading the heading.');
//   // h1.removeEventListener('mouseenter', alterH1);
// };

// h1.addEventListener('mouseenter', alterH1);
// // h1.onmouseenter =

// setTimeout(() => h1.removeEventListener('mouseenter', alterH1), 3000);

//RGB(255,255,255)
// const randomInt = (min, max) => Math.floor(Math.random() * (max - min) + min);
// const randomColor = () =>
//   `rgb${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)}`;
// document.querySelector('.nav__link').addEventListener('click', function (e) {
//   this.style.backgroundColor = randomColor();
// });
// document.querySelector('.nav__links').addEventListener('click', function (e) {
//   // console.log('LINK');
//   this.style.backgroundColor = randomColor();
// });
// document.querySelector('.nav').addEventListener('click', function (e) {
//   // console.log('LINK');
//   this.style.backgroundColor = randomColor();
// });

// const h1 = document.querySelector('h1');

//GOING DOWNWARDS: CHILD
//Goes downwards no matter has far it is to select the children
// console.log(h1.querySelectorAll('.highlight'));
// console.log(h1.childNodes);
// console.log(h1.children);
// h1.firstElementChild.style.color = 'white';
// h1.lastElementChild.style.color = 'orangered';

//GOINF UPWARDS:  PARENTS
//Involves selecting the parent node
//Goes upwards no matter how far it is to select the parent
// console.log(h1.parentNode);
// console.log(h1.parentElement);

// h1.closest('.header').style.background = 'var(--gradient-secondary)';

//SIDEWAYS: SIBLINGS
//Will always select siblings at the same level.
//Make use of previousElementSIbling() method and nextElementSibling() method
//Just as the methods say, they either return the previous or the next sibling of the child element
// console.log(h1.previousElementSibling);
// console.log(h1.nextElementSibling);

//To Traverse all the siblings and access all the children, we start from the parent element and traverse downwards
// console.log(h1.parentElement.children);
// [...h1.parentElement.children].forEach(function (el) {
//   if (el !== h1) el.style.transform = 'scale(0.5)';
// });
