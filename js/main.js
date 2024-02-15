const slideWrapper = document.querySelector('.slideWrapper');
const slideContainer = slideWrapper.querySelector('.slideContainer');
const slides = slideContainer.querySelectorAll('li');
const slidesCount = slides.length;
const slideToShow = 3;
// ------------------------------app
const appTextContainer = document.querySelector('.textContainer')
const appTitle = appTextContainer.querySelector('h2')
const appDesc = appTextContainer.querySelector('h3')
console.log('test',appTextContainer.offsetTop)

window.addEventListener('scroll', ()=> {
  if (scrollY > appTextContainer.offsetTop-800) {
    appTextContainer.style.transform = 'translateX(0%)'
    appTextContainer.style.opacity = 1
    appTextContainer.style.visibility = 'visible'
  } else if (scrollY < 300) {
    appTextContainer.style.transform = 'translateX(-100%)'
    appTextContainer.style.opacity = 0
    appTextContainer.style.visibility = 'hidden'
  }
})

console.log
