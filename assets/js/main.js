document.addEventListener('DOMContentLoaded', () => {
  RunUniversalPageCode();

  const body = document.querySelector('body');
  if (!body) {
    console.error('Greška: Nije pronađen body na stranici.');
    return;
  }

  const page = body.dataset.page;
  if (!page) {
    console.error('Greška: Nije pronadjen data-page atribut u body.')
    return;
  }

  if (page === 'index') RunIndexPageCode();
  else if (page === 'products') RunProductsPageCode();
  else if (page === 'contact') RunContactPageCode();
  else if (page === 'author');
  else if (page === 'message');
  else console.error(`Stranica sa imenom '${page}' ne postoji. Proveriti vrednost data-page atributa.`);
});

const RunUniversalPageCode = () => {
  const pageOverlay = document.getElementById('overlay');
  if (!pageOverlay) return;

  pageOverlay.classList.add('fade-out');
  setTimeout(() => pageOverlay.remove(), 1600);

  const mainNav = document.getElementById('main-nav');
  if (!mainNav) return;

  window.addEventListener('scroll', () => {
    mainNav.classList.toggle('main-nav-alt', window.scrollY > 0);
  });

  const buttonTop = document.getElementById('btn-top');
  if(!buttonTop) return;

  buttonTop.addEventListener('click', () => {
    window.scrollTo(0, 0);
  });
}

const RunIndexPageCode = () => {
  const hero = document.getElementById('hero-background');
  const arrow = document.getElementById('arrow');

  if (!hero && !arrow) return;

  window.addEventListener('scroll', () => {
    if (hero) hero.classList.toggle('hero-background-alt', window.scrollY > 0);
    if (arrow) arrow.classList.toggle('arrow-alt', window.scrollY > 0);
  });

  const aboutBtn = document.getElementById('about-btn');
  if (!aboutBtn) return;

  aboutBtn.addEventListener('click', () => {
    const el = document.getElementById('about-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  });

  const featuredBtn = document.getElementById('featured-btn');
  if (!featuredBtn) return;
  featuredBtn.addEventListener('click', () => {
    const el = document.getElementById('featured-anchor');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  });

  const images = [
    'assets/img/tables/luxury/luxury-oak.png', 
    'assets/img/tables/luxury/sapphire-table.png', 
    'assets/img/tables/luxury/prestige-console.png', 
    'assets/img/tables/kitchen/maple-table.png', 
    'assets/img/tables/living-room/venus-side.png'
  ];
  const slideshowImg1 = document.querySelector('#carousel-first');
  const slideshowImg2 = document.querySelector('#carousel-second');
  if (!slideshowImg1 || !slideshowImg2) return;

  let index = 0;
  setInterval(() => {
    index = (index + 2) % images.length;

    const nextIndex = (index + 1) % images.length;

    slideshowImg1.src = images[index];
    slideshowImg2.src = images[nextIndex];

    slideshowImg1.classList.remove('flash-zoom');
    void slideshowImg1.offsetWidth;
    slideshowImg1.classList.add('flash-zoom');

    slideshowImg2.classList.remove('flash-zoom');
    void slideshowImg2.offsetWidth;
    slideshowImg2.classList.add('flash-zoom');

  }, 7000);
}

const catalogueContent = document.getElementById("catalogue-content");


const products = [
  {name: "Sapphire Dining Table", price: 2800, category: "luxury", img: "assets/img/tables/luxury/sapphire-table.png", description: "Table only, handcrafted epoxy top"},
  {name: "Prestige Console Table", price: 2000, category: "luxury", img: "assets/img/tables/luxury/prestige-console.png", description: "Perfect for hallway or living room"},
  {name: "Rustic Farmhouse Table", price: 1100, category: "kitchen", img: "assets/img/tables/kitchen/rustic-farmhouse.png", description: "Handcrafted from reclaimed wood"},
  {name: "Nordic Coffee Table", price: 480, category: "living-room", img: "assets/img/tables/living-room/nordic-coffee.png", description: "Scandinavian minimalist style"},
  {name: "Maple Epoxy Desk", price: 2100, category: "luxury", img: "assets/img/tables/kitchen/maple-table.png", description: "Stylish workspace with epoxy top"},
  {name: "Cedar Dining Set", price: 650, category: "sets", img: "assets/img/tables/sets/cedar-set.png", description: "Cedar wood dining table with 2 chairs"},
  {name: "Luxury Oak Dining Table", price: 3350, category: "luxury", img: "assets/img/tables/luxury/luxury-oak.png", description: "Seats 8, handcrafted with oak and epoxy"},
  {name: "Venus Side Table", price: 650, category: "living-room", img: "assets/img/tables/living-room/venus-side.png", description: "Elegant side table for any modern interior"},
];


const RenderProducts = (productsArray) => {
  catalogueContent.innerHTML = "";
  productsArray.forEach(p => {
    const div = document.createElement("div");
    div.className = "col-12 col-sm-12 col-lg-4 col-md-6 mb-4";
    div.innerHTML = `
      <div class="card h-100 shadow-sm">
        <img src="${p.img}" class="card-img-top img-fluid h-100" alt="${p.name}">
        <div class="card-body d-flex flex-column">
          <h6 class="card-title text-uppercase">${p.name}</h6>
          <p class="card-text text-truncate">${p.description}</p>
          <div class="mt-auto d-flex justify-content-between align-items-center">
            <span class="fw-bold btn btn-sm">$${p.price}</span>
          </div>
        </div>
      </div>
    `;
    catalogueContent.appendChild(div);
  });
}

const RunProductsPageCode = () => {
  RenderProducts(products);
  const priceFilter = document.getElementById("price-filter");
  const categoryFilter = document.getElementById("category-filter");
  const applyBtn = document.getElementById("apply-filters");

  applyBtn.addEventListener("click", () => {
    let filtered = products;

    const price = priceFilter.value;
    if(price !== "all"){
      filtered = filtered.filter(p => {
        if(price === "low") return p.price <= 1000;
        if(price === "medium") return p.price > 1000 && p.price <= 3000;
        if(price === "high") return p.price > 3000;
      });
    }

    const category = categoryFilter.value;
    if(category !== "all"){
      filtered = filtered.filter(p => p.category === category);
    }

    RenderProducts(filtered);
  });

  document.querySelectorAll(".detail-item").forEach(item => {
    item.addEventListener("click", () => {
      const wrapper = item.parentElement;
      const content = wrapper.querySelector(".detail-content");

      if (content.classList.contains("open")) {
        return;
      }

      document.querySelectorAll(".detail-content").forEach(panel => {
        panel.classList.remove("open");
        panel.parentElement.querySelector(".detail-item").classList.remove("open-panel");
      });

      content.classList.add("open");
      item.classList.add("open-panel");
    });
  });
}

const ShowError = (errorType, inputField, inputLabel, fieldName, length) => {
  if (!inputField) {
    console.error("Prosledjeno polje nije definisano.")
    return;
  }

  if (!inputLabel) {
    console.error("Prosledjen label nije definisan.")
    return;
  }
  
  inputField.style.border = '2px solid red';

  if (errorType === 'regex-fail') {
    inputLabel.innerHTML = `${fieldName} <span style="color:red;">* Wrong format!</span>`;
  }
  else if (errorType === 'no-input') {
    inputLabel.innerHTML = `${fieldName} <span style="color:red;">* Can't be empty!</span>`;
  }
  else if (errorType === 'max-length') {
    inputLabel.innerHTML = `${fieldName} <span style="color:red;">* Maximum ${length} characters!</span>`;
  }
}

const ClearError = (inputField, inputLabel, fieldName) => {
  if (!inputField || !inputLabel) return;

  inputField.style.border = '';
  inputLabel.innerHTML = fieldName;
}

const ValidateRegex = (regexPattern, testString) => {
  return regexPattern.test(testString);
}

const ValidateRadioGroup = (name, inputField, labelElement, fieldName) => {
  const selected = document.querySelector(`input[name="${name}"]:checked`);

  if (!selected) {
    ShowError('no-input', inputField, labelElement, fieldName, 0); 
    labelElement.innerHTML = `${fieldName} <span style="color:red;">* Please select one!</span>`;
    return false;
  }

  ClearError(null, labelElement, fieldName);
  return true;
}

const ValidateFormInput = () => {
  let validity = true;

  const firstLastNameRegex = /^[A-ZČĆŠĐŽ][a-zčćšđž]+(?:\s[A-ZČĆŠĐŽ][a-zčćšđž]+)*$/;
  const firstName = document.getElementById('firstName');
  const firstNameLabel = document.getElementById('firstNameLabel');
  const firstNameValue = firstName ? firstName.value : '';
  ClearError(firstName, firstNameLabel, 'First name');
  if (firstNameValue === '') {
    ShowError('no-input', firstName, firstNameLabel, 'First name');
    validity = false;
  } else if (!ValidateRegex(firstLastNameRegex, firstNameValue)) {
    ShowError('regex-fail', firstName, firstNameLabel, 'First name');
    validity = false;
  }
  
  const lastName = document.getElementById('lastName');
  const lastNameLabel = document.getElementById('lastNameLabel');
  const lastNameValue = lastName ? lastName.value : '';
  ClearError(lastName, lastNameLabel, 'Last name');
  if(lastNameValue === '')  {
    ShowError('no-input', lastName, lastNameLabel, 'Last name');
    validity = false;
  } else if (!ValidateRegex(firstLastNameRegex, lastNameValue)) {
    ShowError('regex-fail', lastName, lastNameLabel, 'Last name');
    validity = false;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const email = document.getElementById('email');
  const emailLabel = document.getElementById('emailLabel');
  const emailValue = email ? email.value : '';
  ClearError(email, emailLabel, 'Email');
  if(emailValue === '') {
    ShowError('no-input', email, emailLabel, 'Email');
    validity = false;
  } else if (!ValidateRegex(emailRegex, emailValue)) {
    ShowError('regex-fail', email, emailLabel, 'Email');
    validity = false;
  }
  
  const message = document.getElementById('message');
  const messageLabel = document.getElementById('messageLabel');
  const messageValue = message ? message.value : '';
  ClearError(message, messageLabel, 'Message:');
  if (messageValue.length > 300) {
    ShowError('max-length', message, messageLabel, 'Message:', 300)
    validity = false;
  }

  const questionType = document.querySelector('input[name="question"]:checked'); 
  const questionLabel = document.getElementById('questionLabel');
  ClearError(questionType, questionLabel, 'Question type:')
  if (!ValidateRadioGroup("question", questionType, questionLabel, "Question type:")) {
    validity = false;
  }

  return validity;
}

const RunContactPageCode = () => {

  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    if (!ValidateFormInput()) {
      e.preventDefault();
      return false;
    }
  });

  const map = document.getElementById('google-map');
  const mapImage = document.getElementsByClassName('google-map-popup')[0];
  map.addEventListener('mouseenter', () => {
    mapImage.style.transform = "translateX(-50%) translateY(0px)";
    mapImage.style.opacity = "1";
  });
  map.addEventListener('mouseleave', () => {
    mapImage.style.transform = "translateX(-50%) translateY(20px)";
    mapImage.style.opacity = "0";
  });

  const btn = document.getElementById("add-review-btn");
  const textInput = document.getElementById("review-text");
  const ratingInput = document.getElementById("review-rating");
  const reviewsContainer = document.getElementById("reviews");

  let reviewCount = 0;

  btn.addEventListener("click", () => {
    const text = textInput.value.trim();
    const selectedValue = ratingInput.value;

    if (!text) return;

    reviewCount++;

    const ratingMap = {
      "1": 5,
      "2": 4,
      "3": 3,
      "4": 2,
      "5": 1
    };

    const realRating = ratingMap[selectedValue];
    const stars = "Rating: " + "★ ".repeat(realRating) + "☆ ".repeat(5 - realRating);

    const div = document.createElement("div");
    div.className = "d-flex align-items-start mb-2 w-100";

    const d = new Date();
    const dateFormat = d.getDate() + "." + (d.getMonth() + 1) + "." + d.getFullYear();

    div.innerHTML = `
      <div class="me-3 fw-bold d-flex justify-content-center align-items-center rounded mt-1" style="
        width: 40px; 
        height: 40px; 
        background-color: #C29C6C; 
        flex-shrink: 0;">
        ${reviewCount}
      </div>
      <div style="flex: 1; word-wrap: break-word; overflow-wrap: break-word; max-width: 90%;">
        <strong>${stars}</strong>
        <p>${text}</p>
        <p class="mb-3 text-secondary">Post date: ${dateFormat}</p>
      </div>
    `;

    reviewsContainer.appendChild(div);

    textInput.value = "";
    ratingInput.value = "1";
  });
}
