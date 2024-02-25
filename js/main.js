// import fetchData from "./data.js";

// fetchData 함수 호출
// fetchData().then((datas) => {
//   // JSON 데이터 사용
//   console.log(datas);

//   console.log(datas.length);

//   const videoContainer = document.querySelector(".videoContainer");
//   videoContainer.innerHTML += "<div class='videoTitle'></div>";
//   const videoTitle = videoContainer.querySelector(".videoTitle");
//   for (let data of datas) {
//     videoTitle.innerHTML += `<a href="#">${data.title}</a>`;
//   }

//   function setSection(idx) {
//     let target = datas[idx];
//     console.log(target.video);
//     videoContainer.querySelector("video").innerHTML = `
//     <source
//       src="${target.video}"
//       type="video/mp4"
//     />
//     `;
//   }
//   videoTitle.querySelectorAll("a").forEach((vt, idx) => {
//     vt.addEventListener("click", (e) => {
//       e.preventDefault();
//       setSection(idx);
//       console.log(setSection(idx))
//     });
//   });
//   setSection(0);
// });

// common
let currentScroll = 0; // 스크롤양 초깃값

/* POP UP PORTFOLIO NOTICE */
let noticePopup = document.querySelector(".notice_portfolio"),
  popupClose = noticePopup.querySelector(".popup_close"),
  dontSee = noticePopup.querySelector("#dont_see");

//쿠키 생성 함수
function setCookie(name, value, day) {
  let date = new Date();
  date.setDate(date.getDate() + day);
  document.cookie = `${name}=${value};expires=${date.toUTCString()}`;
}

// 쿠키 확인 함수
function cookieCheck(name) {
  let cookieArr = document.cookie.split(";");
  let visited = false;
  for (let cookie of cookieArr) {
    if (cookie.search(name) > -1) {
      visited = true;
      break;
    }
  }
  //만약 visited의 값이 false라면 dialog가 보인다
  if (!visited) {
    noticePopup.setAttribute("open", "");
  }
}
cookieCheck("uniclo");

/*
  popupClose 클릭 시,
    팝업 display none
    dontSee에 체크 되어있다면,
      쿠키 생성,아니라면 쿠키 만료.
*/
popupClose.addEventListener("click", () => {
  noticePopup.style.display = "none";
  if (dontSee.checked) {
    setCookie("uniclo", "home", 1);
  } else {
    setCookie("uniclo", "home", -1);
  }
});

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

  headerCloseBtn.addEventListener("click", closeHeader); // 닫기버튼-> 헤더 닫기

  function closeHeader  () {
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
const searchBox = header.querySelector(".search");
const searchInput = searchBox.querySelector("input");
const searchBtn = searchBox.querySelector(".searchBtn.submit");
const searchClose = document.querySelector(".searchBtn.close");
const searchIcon = document.querySelector(".user_menu .searchIcon");

searchIcon.addEventListener("click", (e) => {
  e.preventDefault();
  searchIcon.classList.add("unvisible");
  searchBox.classList.add("active");
  setTimeout(() => {
    console.log("test");
    searchBtn.classList.remove("hidden");
    searchClose.classList.remove("hidden");
  }, 300);
});

searchClose.addEventListener("click", () => {
  // e.preventDefault()
  searchIcon.classList.remove("unvisible");
  searchBox.classList.remove("active");
  searchBtn.classList.add("hidden");
  searchClose.classList.add("hidden");
});

// ------------------------items

const itemsWrapper = document.querySelector(".itemsWrapper");
const itemsH2 = itemsWrapper.querySelector("h2");
const itemsH3 = itemsWrapper.querySelector("h3");
const items = itemsWrapper.querySelector(".items");

// -----------------------slide

const slideWrapper = document.querySelector(".slideWrapper");
const slideContainer = slideWrapper.querySelector(".slideContainer");
let slides = slideContainer.querySelectorAll("li");
let slideWidth;
let slideMarginLeft;
let slideToShow = 3;
let curruntIdx = 0;
let slideTimer;
const slidesCount = slides.length;
const slideControl = slideWrapper.querySelector(".slideControl");
const prevBtn = slideControl.querySelector(".prevBtn");
const nextBtn = slideControl.querySelector(".nextBtn");
const pagers = slideWrapper.querySelectorAll(".pager a");
resizeSlide();

nextBtn.addEventListener("click", () => {
  moveSlide(curruntIdx + 1);
});
prevBtn.addEventListener("click", () => {
  moveSlide(curruntIdx - 1);
});

pagers.forEach((pager, idx) => {
  pager.addEventListener("click", (e) => {
    e.preventDefault();
    moveSlide(idx);
  });
});

function autoSlide() {
  slideTimer = setInterval(() => {
    if (curruntIdx >= slidesCount - slideToShow) {
      moveSlide(0);
    } else moveSlide(curruntIdx + 1);
  }, 3000);
}

slideWrapper.addEventListener("mouseenter", () => {
  clearInterval(slideTimer);
});
slideWrapper.addEventListener("mouseleave", () => {
  autoSlide();
});
autoSlide();

function moveSlide(idx) {
  resizeSlide();
  slideContainer.style.transform = `translateX(${
    -idx * (slideWidth + slideMarginLeft)
  }px)`;
  curruntIdx = idx;

  if (curruntIdx === 0) {
    prevBtn.style.display = "none";
    nextBtn.style.display = "";
  } else if (curruntIdx === slidesCount - slideToShow) {
    prevBtn.style.display = "";
    nextBtn.style.display = "none";
  } else {
    prevBtn.style.display = "";
    nextBtn.style.display = "";
  }
}
moveSlide(0);
// 브라우저 너비대비 슬라이드 크기 변경
function resizeSlide() {
  let bodyWidth = document.body.offsetWidth;
  for (let slide of slides) {
    slideWidth = bodyWidth * 0.3;
    slideMarginLeft = bodyWidth * 0.05;

    slide.style.width = slideWidth + "px";
    slide.style.marginLeft = slideMarginLeft + "px";
  }
  slides[0].style.marginLeft = 0 + "px";
  slideContainer.style.width =
    slideWidth * slides.length + slideMarginLeft * (slides.length - 1) + "px";
}

window.addEventListener("resize", () => {
  resizeSlide();
});

// -------------------------------secondary
const litemsContainer = document.querySelector(".l-items");
const ritemsContainer = document.querySelector(".r-items");
const litems = litemsContainer.querySelectorAll(".l-items li");
const ritems = ritemsContainer.querySelectorAll(".r-items li");
let litemActive = 0;
let ritemActive = 0;

let litemRepeat = repeatImgChange(litemsContainer, litems, litemActive);
let ritemRepeat;
setTimeout(() => {
  ritemRepeat = repeatImgChange(ritemsContainer, ritems, ritemActive);
}, 1500);

function repeatImgChange(parent, list, activeItem) {
  return setInterval(() => {
    console.log(activeItem);
    parent.querySelector(".active").classList.remove("active");
    list[activeItem].classList.add("active");
    activeItem = (activeItem + 1) % list.length;
  }, 3000);
}

litemsContainer.addEventListener("mouseenter", () => {
  clearInterval(litemRepeat);
});
litemsContainer.addEventListener("mouseleave", () => {
  litemRepeat = repeatImgChange(litemsContainer, litems, litemActive);
});

ritemsContainer.addEventListener("mouseenter", () => {
  clearInterval(ritemRepeat);
});
ritemsContainer.addEventListener("mouseleave", () => {
  ritemRepeat = repeatImgChange(ritemsContainer, ritems, ritemActive);
});

// ------------------------------app

const appTextContainer = document.querySelector(".app .textContainer");
const appTitle = appTextContainer.querySelector("h2");
const appDesc = appTextContainer.querySelector("h3");

window.addEventListener("scroll", () => {
  showToUp(itemsWrapper, itemsH2, scrollY);
  showToUp(itemsWrapper, itemsH3, scrollY);
  showToUp(itemsWrapper, items, scrollY);
  showToRight(appTextContainer, appTitle, scrollY);
  showToRight(appTextContainer, appDesc, scrollY);
  
  if (scrollY > 600) {
    header.classList.add("scrollDown");
  } else {
    header.classList.remove("scrollDown");
  }

  if (scrollDownJudge(currentScroll)) {
    closeHeader();
  }
  
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
  if (btt.classList.contains("active")) navigator.classList.add("active");
});
navigator.addEventListener("mouseleave", () => {
  navigator.classList.remove("active");
});
