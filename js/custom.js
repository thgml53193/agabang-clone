$(function () {
  // 헤더 스크롤을 내렸을 때 배경색 채워짐, 이미지/폰트컬러 바뀜
  const header = document.querySelector("header");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      header.classList.add("active");
    } else {
      header.classList.remove("active");
    }
  });

  // 비주얼 슬라이드
  var swiper = new Swiper(".mySwiper", {
    spaceBetween: 30,
    centeredSlides: true,
    loop: true,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });

  // con01,con03 상품리스트 슬라이드 동일
  var sellerSwiper = new Swiper(".sellerSwiper", {
    // 1. [기본값] 480px 이하 (모바일)
    slidesPerView: 1.2,
    spaceBetween: 16,
    slidesOffsetBefore: 20, // 왼쪽 여백
    loop: true,
    navigation: {
      nextEl: ".con01 .btn-next",
      prevEl: ".con01 .btn-prev",
    },

    breakpoints: {
      // 2. 480px ~ 767px (작은 태블릿)
      480: {
        slidesPerView: 1.5, // 이미지가 조금 작아지면서 2개 이상 보임
        spaceBetween: 8,
        slidesOffsetBefore: 20,
      },
      // 3. 768px ~ 1024px (큰 태블릿/작은 노트북)
      768: {
        slidesPerView: 2.5, // 이미지가 더 작아짐
        spaceBetween: 16,
        slidesOffsetBefore: 20,
      },
      // 4. 1024px ~ (일반 데스크탑)
      1024: {
        slidesPerView: 4,
        spaceBetween: 16,
        slidesOffsetBefore: 0, // 고정 너비 레이아웃과 일치
      },
    },
  });

  // con02 right 상품리스트 슬라이드 (센터)
  var giftSwiper = new Swiper(".con02 .giftSwiper", {
    slidesPerView: 2,
    centeredSlides: true,
    spaceBetween: 16,
    loop: true,
    loopedSlides: 4,
    navigation: {
      nextEl: ".con02 .btn-next",
      prevEl: ".con02 .btn-prev",
    },
  });

  // 배너 슬라이드
  var bnSwiper = new Swiper(".bnSwiper", {
    loop: true,

    // PC용 화살표 버튼
    navigation: {
      nextEl: ".banner .swiper-button-next",
      prevEl: ".banner .swiper-button-prev",
    },

    // 모바일용 숫자 페이징 설정
    pagination: {
      el: ".banner .bn-num",
      type: "fraction",

      renderFraction: function (currentClass, totalClass) {
        return (
          '<span class="' +
          currentClass +
          '"></span> <span class="separator">|</span> <span class="' +
          totalClass +
          '"></span>'
        );
      },

      formatFractionCurrent: function (number) {
        return number < 10 ? "0" + number : number;
      },
      formatFractionTotal: function (number) {
        return number < 10 ? "0" + number : number;
      },
    },
  });

  // con04 모바일에서만 슬라이드
  var brandSwiper = new Swiper(".brandSwiper", {
    slidesPerView: 1.1,
    spaceBetween: 8,
    // slidesOffsetBefore:20,
    grabCursor: true, // 추가 (UX 개선)
    loop: true, // 추가
    breakpoints: {
      768: {
        enabled: false, // PC에서 비활성화
      },
    },
  });

  gsap.registerPlugin(ScrollTrigger);

  function createScrollAnimation(
    sectionSelector,
    targetSelector,
    extraAnimation = null,
  ) {
    const section = document.querySelector(sectionSelector);
    if (!section) return; // 섹션이 없으면 에러 방지를 위해 종료

    const title = section.querySelector(".seller");
    const products = section.querySelectorAll(targetSelector);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top 70%",
      },
    });

    if (title) {
      tl.from(title, { y: -50, opacity: 0, duration: 0.8, ease: "power2.out" });
    }

    tl.from(
      products,
      {
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
      },
      "<",
    );

    if (extraAnimation) extraAnimation(tl);
  }
  // con01, con03 상품 슬라이드 요소들이 움직임
  createScrollAnimation(".con01", ".list .swiper-wrapper");
  createScrollAnimation(".con03", ".list .swiper-wrapper");
  // con02 giftSwiper 안의 슬라이드들이 움직임
  createScrollAnimation(".con02", ".wrap", (tl) => {
    tl.from(
      ".con02 .txt04 > p, .con02 .txt04 .view",
      { y: 30, opacity: 0, duration: 0.6, stagger: 0.2 },
      "<+=0.4",
    );
  });
  // con04
  createScrollAnimation(".con04", ".brandSwiper .swiper-slide");
  const brandItems = document.querySelectorAll(".con04 .swiper-slide");

  brandItems.forEach((item) => {
    gsap.from(item.querySelectorAll(".txt04 p, .txt04 .view"), {
      scrollTrigger: {
        trigger: item,
        start: "top 70%",
      },
      y: 30,
      opacity: 0,
      duration: 0.8,
      stagger: 0.2,
      ease: "power2.out",
    });
  });

  gsap.from(".banner", {
    scrollTrigger: {
      trigger: ".banner",
      start: "top 80%",
    },
    y: 50,
    opacity: 0,
    duration: 0.8,
    ease: "power2.out",
  });

  // bottom nav 스크롤을 내리면 사라지고, 올리면 나타남
  let lastScrollTop = 0;
  const bottomNav = $(".bottom-nav");

  $(window).on("scroll", function () {
    let scrollTop = $(this).scrollTop();
    if (scrollTop > lastScrollTop) {
      bottomNav.addClass("hide");
    } else {
      bottomNav.removeClass("hide");
    }

    lastScrollTop = scrollTop;
  });
});
