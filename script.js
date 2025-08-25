document.addEventListener("DOMContentLoaded", () => {
  const track = document.querySelector(".carousel-track");
  const slides = Array.from(track.children);
  const nextButton = document.querySelector(".carousel-btn.right");
  const prevButton = document.querySelector(".carousel-btn.left");

  // Clone first & last slides for smooth looping
  const firstClone = slides[0].cloneNode(true);
  const lastClone = slides[slides.length - 1].cloneNode(true);

  firstClone.id = "first-clone";
  lastClone.id = "last-clone";

  track.appendChild(firstClone);
  track.insertBefore(lastClone, slides[0]);

  const updatedSlides = Array.from(track.children);
  let currentIndex = 1; // start on the first "real" slide
  const slideWidth = slides[0].getBoundingClientRect().width;

  track.style.transform = `translateX(-${slideWidth * currentIndex}px)`;

  function setTransition(enable) {
    track.style.transition = enable ? "transform 0.4s ease-in-out" : "none";
  }

  function moveToSlide() {
    track.style.transform = `translateX(-${slideWidth * currentIndex}px)`;
  }

  nextButton.addEventListener("click", () => {
    if (currentIndex >= updatedSlides.length - 1) return;
    currentIndex++;
    setTransition(true);
    moveToSlide();
  });

  prevButton.addEventListener("click", () => {
    if (currentIndex <= 0) return;
    currentIndex--;
    setTransition(true);
    moveToSlide();
  });

  track.addEventListener("transitionend", () => {
    if (updatedSlides[currentIndex].id === "first-clone") {
      setTransition(false);
      currentIndex = 1;
      moveToSlide();
    }

    if (updatedSlides[currentIndex].id === "last-clone") {
      setTransition(false);
      currentIndex = updatedSlides.length - 2;
      moveToSlide();
    }
  });

  // Adjust carousel if window resizes
  window.addEventListener("resize", () => {
    const newWidth = slides[0].getBoundingClientRect().width;
    track.style.transition = "none";
    track.style.transform = `translateX(-${newWidth * currentIndex}px)`;
  });
});
