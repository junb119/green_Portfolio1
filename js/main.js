// common
let currentScroll = 0; // 스크롤양 초깃값

// ---------------------------header
const header = document.querySelector("header");
const headerHeight = header.offsetHeight; // 헤더높이 초깃값
const gnbTitle = header.querySelectorAll(".gnbTitle"); //헤더 왼쪽 목록
const headerCloseBtn = header.querySelector(".headerCloseBtn"); // 헤더 닫기 버튼
for (let title of gnbTitle) {
  // 헤더 목록 표시
  title.querySelector("a").addEventListener("mouseover", () => {
    for (let titleAll of gnbTitle) {
      titleAll.querySelector(".gnbMenu").classList.add("hidden"); // 나머지 하위 항목 안보이기
    }
    
    title.querySelector(".gnbMenu").classList.remove("hidden"); //활성화된 하위 항목 보이기

    header.style.height =
      title.querySelector(".gnbMenu").offsetHeight + headerHeight + 16 + "px"; // 헤더 높이 늘이기
    headerCloseBtn.classList.remove("hidden"); // 닫기 버튼 표시

    const titleItems = title.querySelectorAll(".titleItem"); // 하위 항목 선택

    for (let ti of titleItems) {
      ti.addEventListener("mouseenter", () => {
        for (let tis of titleItems) {
          tis.classList.remove("active");
          // 활성화된 다른 하위 항목 비활성화
        }
        ti.classList.add("active");
      });
      // 선택된 하위 항목 활성화
      // css-> 최하위 항목 보이기
    }
  });

  headerCloseBtn.addEventListener("click", closeHaeder); // 닫기버튼-> 헤더 닫기

  function closeHaeder() {
    for (let titleAll of gnbTitle) {
      titleAll.querySelector(".gnbMenu").classList.add("hidden");
    }
    headerCloseBtn.classList.add("hidden");
    header.style.height = headerHeight + "px";
  }

  // title.addEventListener("mouseout", () => {
  //   header.style.height = headerHeight + "px";
  //   title.querySelector(".gnbMenu").classList.add('hidden')
  // });
}

// 검색 버튼
const searchIcon = header.querySelector(".user_menu .searchIcon");
const searchInput = header.querySelector(".search");
const searchBtn = header.querySelector(".searchBtn");

searchIcon.addEventListener("click", () => {
  searchInput.classList.add("active");
});

// ------------------------items

const itemsWrapper = document.querySelector(".itemsWrapper");
const itemsH2 = itemsWrapper.querySelector("h2");
const itemsH3 = itemsWrapper.querySelector("h3");
const items = itemsWrapper.querySelector(".items");

// -----------------------slide
const slideWrapper = document.querySelector(".slideWrapper");
const slideContainer = slideWrapper.querySelector(".slideContainer");
const slides = slideContainer.querySelectorAll("li");
let curruntIdx = 0;

const slidesCount = slides.length;

function moveSlide(idx) {}

// 슬라이드 반응형
function resizeSlide() {
  let bodyWidth = document.body.offsetWidth;
  for (let slide of slides) {
    slide.style.width = bodyWidth * 0.3 + "px";
    slide.style.marginLeft = bodyWidth * 0.05 + "px";
  }
  slides[0].style.marginLeft = 0;
  slideContainer.style.width = bodyWidth * 0.3 * slides.length + "px";
}
resizeSlide();

window.addEventListener("resize", () => {
  resizeSlide();
});

// -------------------------------secondary
const litemsContainer = document.querySelector(".l-items");
const ritemsContainer = document.querySelector(".r-items");
const litems = litemsContainer.querySelectorAll(".l-items li");
const ritems = ritemsContainer.querySelectorAll(".r-items li");

repeatImgChange(litemsContainer, litems);
setTimeout(() => {
  repeatImgChange(ritemsContainer, ritems);
}, 1500);

function repeatImgChange(parent, list) {
  let activeItem = 0;
  setInterval(() => {
    console.log(activeItem);
    parent.querySelector(".active").classList.remove("active");
    list[activeItem].classList.add("active");
    activeItem = (activeItem + 1) % list.length;
  }, 3000);
}

// ------------------------------app

const appTextContainer = document.querySelector(".app .textContainer");
const appTitle = appTextContainer.querySelector("h2");
const appDesc = appTextContainer.querySelector("h3");

window.addEventListener("scroll", () => {
  if (scrollY > 600) {
    header.classList.add("scrollDown");
  } else {
    header.classList.remove("scrollDown");
  }

  if (scrollDownJudge(currentScroll)) {
    closeHaeder();
  }

  showToRight(appTextContainer, appTitle, scrollY);
  showToRight(appTextContainer, appDesc, scrollY);
  showToUp(itemsWrapper, itemsH2, scrollY);
  showToUp(itemsWrapper, itemsH3, scrollY);
  showToUp(itemsWrapper, items, scrollY);
});

function showToUp(container, target, scrollMount) {
  if (scrollMount > container.offsetTop - 700) {
    target.style.transform = "translateY(0%)";
    target.style.opacity = 1;
    target.style.visibility = "visible";
  } else if (scrollMount < 300) {
    target.style.transform = "translateY(100px)";
    target.style.opacity = 0;
    target.style.visibility = "hidden";
  }
}

function showToRight(container, target, scrollMount) {
  if (scrollMount > container.offsetTop - 700) {
    target.style.transform = "translateX(0%)";
    target.style.opacity = 1;
    target.style.visibility = "visible";
  } else if (scrollMount < 300) {
    target.style.transform = "translateX(-100%)";
    target.style.opacity = 0;
    target.style.visibility = "hidden";
  }
}

function scrollDownJudge(prevScroll) {
  if (prevScroll < scrollY) {
    console.log("scrolldown");
    currentScroll = scrollY;
    return true;
  } else {
    console.log("scrollup");
    currentScroll = scrollY;
    return false;
  }
}

//-----------------back to top
const navigator = document.querySelector(".navigator");
const btt = navigator.querySelector(".backToTop");

/*
스크롤양(scrollAmt)이 300보다 크다면 
btt에 클래스명 active 추가 
작다면 active 제거
*/

window.addEventListener("scroll", () => {
  let scrollAmt = window.scrollY;
  if (scrollAmt > 1000) {
    btt.classList.add("active");
  } else {
    navigator.classList.remove("active");
    btt.classList.remove("active");
  }
});

btt.addEventListener("click", (e) => {
  e.preventDefault();
  // window.scrollTo(0,0)

  window.scrollTo({
    left: 0,
    top: 0,
    behavior: "smooth",
  });
});

navigator.addEventListener("mouseenter", () => {
  if (btt.classList.contains("active") )
    navigator.classList.add("active");
});
navigator.addEventListener("mouseleave", () => {
  navigator.classList.remove("active");
});
