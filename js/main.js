const wrapper = document.querySelector(".blog-slider-wrapper");
const carousel = document.querySelector(".blog-slider-carousel");
arrowBtns = document.querySelectorAll(".blog-slider-wrapper i");
const firstCardWidth = carousel.querySelector(
  ".blog-slider-carousel .card"
).offsetWidth;
const carouselChildrens = [...carousel.children];

let isDragging = false,
  startX,
  startScrollLeft,
  timeoutId;

//loop
let cardPerView = Math.round(carousel.offsetWidth / firstCardWidth);

carouselChildrens
  .slice(-cardPerView)
  .reverse()
  .forEach((card) => {
    carousel.insertAdjacentHTML("afterbegin", card.outerHTML);
  });

carouselChildrens.slice(0, cardPerView).forEach((card) => {
  carousel.insertAdjacentHTML("beforeend", card.outerHTML);
});

//buttons
arrowBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    carousel.scrollLeft +=
      btn.id === "blog-slider-left" ? -firstCardWidth : firstCardWidth;
  });
});

//drag
const dragStart = (e) => {
  isDragging = true;
  carousel.classList.add("dragging");
  startX = e.pageX;
  startScrollLeft = carousel.scrollLeft;
};

const dragging = (e) => {
  if (!isDragging) return;
  carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
};

const dragStop = () => {
  isDragging = false;
  carousel.classList.remove("dragging");
};

//autoplay
const autoPlay = () => {
  if (window.innerWidth < 800) return;
  timeoutId = setTimeout(() => (carousel.scrollLeft += firstCardWidth), 10000);
};

autoPlay();

const infiniteScroll = () => {
  if (carousel.scrollLeft === 0) {
    carousel.classList.add("no-transition");
    carousel.scrollLeft = carousel.scrollWidth - 2 * carousel.offsetWidth;
    carousel.classList.remove("no-transition");
  } else if (
    Math.ceil(carousel.scrollLeft) ===
    carousel.scrollWidth - carousel.offsetWidth
  ) {
    carousel.classList.add("no-transition");
    carousel.scrollLeft = carousel.offsetWidth;
    carousel.classList.remove("no-transition");
  }

  clearTimeout(timeoutId);
  if (!wrapper.matches(":hover")) autoPlay();
};

carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("mousemove", dragging);
document.addEventListener("mouseup", dragStop);
carousel.addEventListener("scroll", infiniteScroll);
wrapper.addEventListener("mouseenter", () => clearTimeout(timeoutId));
wrapper.addEventListener("mouseleave", autoPlay);

//animation scripts
let up = "up";
let left = "left";
let right = "right";

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      if (entry.target.classList[entry.target.classList.length - 1] == up) {
        entry.target.classList.add("animate__fadeInUp");
      } else if (
        entry.target.classList[entry.target.classList.length - 1] == left
      ) {
        entry.target.classList.add("animate__fadeInLeft");
      } else if (
        entry.target.classList[entry.target.classList.length - 1] == right
      ) {
        entry.target.classList.add("animate__fadeInRight");
      }
    }
  });
});

observer.observe(document.querySelector(".headline-block"));
observer.observe(document.querySelector(".about-pop-container"));
observer.observe(document.querySelector(".slider-img"));
observer.observe(document.querySelector(".map-embed"));
