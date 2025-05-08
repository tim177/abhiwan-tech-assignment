document.addEventListener("DOMContentLoaded", () => {
  initializePage();
  initMobileMenu();
});

function initializePage() {
  initProductGallery();
  initAddToCartFunctionality();
  initTestimonialsSlider();
  initFaqAccordion();
}

function initProductGallery() {
  const mainImage = document.getElementById("main-product-image");
  const thumbnails = document.querySelectorAll(".thumbnail");
  const dots = document.querySelectorAll(".dot");
  const prevBtn = document.querySelector(".prev-btn");
  const nextBtn = document.querySelector(".next-btn");

  const galleryImages = [
    "/assets/element_image.png",
    "/assets/element_image.png",
    "/assets/element_image.png",
    "/assets/element_image.png",
  ];

  let currentImageIndex = 0;

  function updateMainImage(index) {
    currentImageIndex = index;
    mainImage.src = galleryImages[index];

    thumbnails.forEach((thumb) => thumb.classList.remove("active"));
    thumbnails[index].classList.add("active");

    dots.forEach((dot) => dot.classList.remove("active"));
    dots[index].classList.add("active");
  }

  thumbnails.forEach((thumbnail, index) => {
    thumbnail.addEventListener("click", () => updateMainImage(index));
  });

  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => updateMainImage(index));
  });

  prevBtn.addEventListener("click", () => {
    const newIndex =
      (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
    updateMainImage(newIndex);
  });

  nextBtn.addEventListener("click", () => {
    const newIndex = (currentImageIndex + 1) % galleryImages.length;
    updateMainImage(newIndex);
  });

  // Set initial image
  updateMainImage(0);
}

function initAddToCartFunctionality() {
  const flavorOptions = document.querySelectorAll('input[name="flavor"]');
  const purchaseOptions = document.querySelectorAll(
    'input[name="purchase-type"]'
  );
  const addToCartBtn = document.getElementById("add-to-cart");

  const cartUrls = {
    original: {
      "single-subscription": "/cart/add?product=original-single-subscription",
      "double-subscription": "/cart/add?product=original-double-subscription",
      "try-once": "/cart/add?product=original-try-once",
    },
    matcha: {
      "single-subscription": "/cart/add?product=matcha-single-subscription",
      "double-subscription": "/cart/add?product=matcha-double-subscription",
      "try-once": "/cart/add?product=matcha-try-once",
    },
    cacao: {
      "single-subscription": "/cart/add?product=cacao-single-subscription",
      "double-subscription": "/cart/add?product=cacao-double-subscription",
      "try-once": "/cart/add?product=cacao-try-once",
    },
  };

  function updateAddToCartLink() {
    const selectedFlavor = [...flavorOptions].find((opt) => opt.checked)?.value;
    const selectedPurchaseType = [...purchaseOptions].find(
      (opt) => opt.checked
    )?.value;

    if (selectedFlavor && selectedPurchaseType) {
      addToCartBtn.href = cartUrls[selectedFlavor][selectedPurchaseType];
    }
  }

  flavorOptions.forEach((option) =>
    option.addEventListener("change", updateAddToCartLink)
  );
  purchaseOptions.forEach((option) =>
    option.addEventListener("change", updateAddToCartLink)
  );

  updateAddToCartLink();
}

function initTestimonialsSlider() {
  const slider = document.querySelector(".testimonials-slider");
  const prevButton = document.querySelector(".prev-button");
  const nextButton = document.querySelector(".next-button");
  const paginationDots = document.querySelectorAll(".pagination-dot");
  const cards = document.querySelectorAll(".testimonial-card");

  let currentIndex = 0;
  const cardWidth = cards[0].offsetWidth + 20;

  function scrollToCard(index) {
    index = Math.max(0, Math.min(index, cards.length - 1));
    currentIndex = index;

    slider.scrollTo({
      left: cardWidth * index,
      behavior: "smooth",
    });

    paginationDots.forEach((dot) => dot.classList.remove("active"));
    paginationDots[index].classList.add("active");
  }

  prevButton.addEventListener("click", () => scrollToCard(currentIndex - 1));
  nextButton.addEventListener("click", () => scrollToCard(currentIndex + 1));

  paginationDots.forEach((dot, index) =>
    dot.addEventListener("click", () => scrollToCard(index))
  );

  slider.addEventListener("scroll", () => {
    const newIndex = Math.round(slider.scrollLeft / cardWidth);
    if (newIndex !== currentIndex) {
      currentIndex = newIndex;
      paginationDots.forEach((dot) => dot.classList.remove("active"));
      if (paginationDots[currentIndex]) {
        paginationDots[currentIndex].classList.add("active");
      }
    }
  });
}

function initFaqAccordion() {
  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach((item) => {
    const question = item.querySelector(".faq-question");
    question.addEventListener("click", () => {
      faqItems.forEach((other) => {
        if (other !== item) other.classList.remove("active");
      });
      item.classList.toggle("active");
    });
  });
}

function initMobileMenu() {
  const hamburgerBtn = document.querySelector(".hamburger-menu");
  const mainNav = document.querySelector(".main-nav");
  const searchIcon = document.querySelector(".search-icon");
  const searchForm = document.querySelector(".search-form");
  const searchClose = document.querySelector(".search-close");
  const header = document.querySelector(".site-header");

  hamburgerBtn?.addEventListener("click", function () {
    this.classList.toggle("active");
    mainNav.classList.toggle("active");

    if (header.classList.contains("search-expanded")) {
      header.classList.remove("search-expanded");
      searchForm.classList.remove("active");
    }
  });

  searchIcon?.addEventListener("click", function () {
    const isMobile = window.innerWidth <= 992;

    if (isMobile) {
      header.classList.toggle("search-expanded");
      if (mainNav.classList.contains("active")) {
        hamburgerBtn.classList.remove("active");
        mainNav.classList.remove("active");
      }

      setTimeout(() => {
        document.querySelector(".search-input")?.focus();
      }, 100);
    } else {
      searchForm.classList.toggle("active");

      if (searchForm.classList.contains("active")) {
        setTimeout(() => {
          document.querySelector(".search-input")?.focus();
        }, 300);
      }
    }
  });

  searchClose?.addEventListener("click", function () {
    if (header.classList.contains("search-expanded")) {
      header.classList.remove("search-expanded");
    } else {
      searchForm.classList.remove("active");
    }
  });

  document.addEventListener("click", function (event) {
    if (
      mainNav.classList.contains("active") &&
      !mainNav.contains(event.target) &&
      !hamburgerBtn.contains(event.target)
    ) {
      mainNav.classList.remove("active");
      hamburgerBtn.classList.remove("active");
    }

    if (
      searchForm.classList.contains("active") &&
      !searchForm.contains(event.target) &&
      !searchIcon.contains(event.target)
    ) {
      searchForm.classList.remove("active");
      if (header.classList.contains("search-expanded")) {
        header.classList.remove("search-expanded");
      }
    }
  });

  window.addEventListener("resize", function () {
    if (window.innerWidth > 992) {
      header.classList.remove("search-expanded");
      searchForm.classList.add("active");
    } else {
      searchForm.classList.remove("active");
      header.classList.add("search-expanded");
    }
  });
}
