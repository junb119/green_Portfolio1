const slideWrapper = document.querySelector(".slideWrapper");
const slideContainer = slideWrapper.querySelector(".slideContainer");
const slides = slideContainer.querySelectorAll("li");
const slidesCount = slides.length;
const slideToShow = 3;
























// ------------------------------app

const appTextContainer = document.querySelector(".app .textContainer");
const appTitle = appTextContainer.querySelector("h2");
const appDesc = appTextContainer.querySelector("h3");

window.addEventListener("scroll", () => {
  showToRight(appTitle, scrollY);
  showToRight(appDesc, scrollY);
});

function showToRight(target, scrollMount) {
  if (scrollMount > appTextContainer.offsetTop - 600) {
    target.style.transform = "translateX(0%)";
    target.style.opacity = 1;
    target.style.visibility = "visible";
  } else if (scrollMount < 300) {
    target.style.transform = "translateX(-100%)";
    target.style.opacity = 0;
    target.style.visibility = "hidden";
  }
}
