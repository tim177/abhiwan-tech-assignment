document.addEventListener("DOMContentLoaded", initializePage);

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
    let newIndex = currentImageIndex - 1;
    if (newIndex < 0) {
      newIndex = galleryImages.length - 1;
    }
    updateMainImage(newIndex);
  });

  nextBtn.addEventListener("click", () => {
    let newIndex = currentImageIndex + 1;
    if (newIndex >= galleryImages.length) {
      newIndex = 0;
    }
    updateMainImage(newIndex);
  });
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
    let selectedFlavor;
    flavorOptions.forEach((option) => {
      if (option.checked) {
        selectedFlavor = option.value;
      }
    });

    let selectedPurchaseType;
    purchaseOptions.forEach((option) => {
      if (option.checked) {
        selectedPurchaseType = option.value;
      }
    });

    if (selectedFlavor && selectedPurchaseType) {
      addToCartBtn.href = cartUrls[selectedFlavor][selectedPurchaseType];
    }
  }

  flavorOptions.forEach((option) => {
    option.addEventListener("change", updateAddToCartLink);
  });

  purchaseOptions.forEach((option) => {
    option.addEventListener("change", updateAddToCartLink);
  });

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
    if (index < 0) index = 0;
    if (index > cards.length - 1) index = cards.length - 1;

    currentIndex = index;

    slider.scrollTo({
      left: cardWidth * index,
      behavior: "smooth",
    });

    paginationDots.forEach((dot) => dot.classList.remove("active"));
    paginationDots[index].classList.add("active");
  }

  prevButton.addEventListener("click", () => {
    scrollToCard(currentIndex - 1);
  });

  nextButton.addEventListener("click", () => {
    scrollToCard(currentIndex + 1);
  });

  paginationDots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      scrollToCard(index);
    });
  });

  slider.addEventListener("scroll", () => {
    const scrollPosition = slider.scrollLeft;
    const newIndex = Math.round(scrollPosition / cardWidth);

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
      faqItems.forEach((otherItem) => {
        if (otherItem !== item && otherItem.classList.contains("active")) {
          otherItem.classList.remove("active");
        }
      });

      item.classList.toggle("active");
    });
  });
}
