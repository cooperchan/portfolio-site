

document.addEventListener('DOMContentLoaded', () => {
  const fadeIns = document.querySelectorAll('.fade-in');

  fadeIns.forEach((el) => {
    el.style.willChange = 'opacity, transform';
  });

  
});


document.addEventListener("DOMContentLoaded", () => {
  const track = document.querySelector(".carousel-track");
  const slides = Array.from(track.children);
  const nextButton = document.querySelector(".carousel-btn.right");
  const prevButton = document.querySelector(".carousel-btn.left");

  let currentIndex = 0;

  function updateCarousel() {
    const slideWidth = slides[0].getBoundingClientRect().width;
    track.style.transform = `translateX(-${slideWidth * currentIndex}px)`;
  }

  nextButton.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % slides.length;
    updateCarousel();
  });

  prevButton.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    updateCarousel();
  });

  // Set slide positions for smoother transitions
  slides.forEach((slide, index) => {
    slide.style.left = `${index * 100}%`;
  });

  track.style.transition = "transform 0.4s ease-in-out";
});
