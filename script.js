// Sample Data Array
const packages =[{
    id: 1,
    destination: "Goa",
    category: "Beach",
    days: 4,
    price: 12000,
    image: "C:/Users/admin/Desktop/TravelGo - Holiday & Tour Booking Website/images/goa.png",
    description: "Enjoy golden sand beaches, nightlife, and water sports in sunny Goa."
  },
  {
    id: 2,
    destination: "Manali",
    category: "Adventure",
    days: 5,
    price: 18000,
    image:"C:/Users/admin/Desktop/TravelGo - Holiday & Tour Booking Website/images/manali.png",
    description: "Snow-capped peaks, trekking trails, and adventure awaits in Manali."
  },
  {
    id: 3,
    destination: "Jaipur",
    category: "City",
    days: 3,
    price: 10000,
    image: "C:/Users/admin/Desktop/TravelGo - Holiday & Tour Booking Website/images/jaypur.png",
    description: "Explore magnificent forts, palaces, and vibrant Rajasthani culture."
  },
  {
    id: 4,
    destination: "Kerala",
    category: "Nature",
    days: 6,
    price: 22000,
    image: "C:/Users/admin/Desktop/TravelGo - Holiday & Tour Booking Website/images/kerla.png",
    description: "Relax in serene backwaters, tea gardens, and lush green landscapes."
  },
  {
    id: 5,
    destination: "Rishikesh",
    category: "Adventure",
    days: 3,
    price: 9000,
    image: "C:/Users/admin/Desktop/TravelGo - Holiday & Tour Booking Website/images/rishikesh.png",
    description: "Experience white-water rafting, yoga, and camping along the Ganges."
  },
  {
    id: 6,
    destination: "Mumbai",
    category: "City",
    days: 2,
    price: 8500,
    image: "C:/Users/admin/Desktop/TravelGo - Holiday & Tour Booking Website/images/mumbai.png",
    description: "The bustling financial capital with historic landmarks and coastal views."
  },
  {
    id: 7,
    destination: "Kashid Beach",
    category: "Beach",
    days: 5,
    price: 8000,
    image: "C:/Users/admin/Desktop/TravelGo - Holiday & Tour Booking Website/images/kashidbeach.png",
    description: "Enjoy golden sand beaches, nightlife, and water sports in sunny Goa."
  },
  {
    id: 8,
    destination: "Dandeli",
    category: "Adventure",
    days: 3,
    price: 20000,
    image:"C:/Users/admin/Desktop/TravelGo - Holiday & Tour Booking Website/images/Dandeli.png",
    description: "Snow-capped peaks, trekking trails, and adventure awaits in Dandeli."
  },
  {
    id: 9,
    destination: "Indore",
    category: "City",
    days: 5,
    price: 25000,
    image:"C:/Users/admin/Desktop/TravelGo - Holiday & Tour Booking Website/images/indore.png",
    description: "Explore magnificent forts, palaces, and vibrant Indore culture."
  },
];
let selectedPackage = null;
let currentCategory = "All";

document.addEventListener("DOMContentLoaded", () => {
  // --- 1. Dark Mode Persistence & Toggle ---
  const darkModeToggle = document.getElementById("dark-mode-toggle");
  if (localStorage.getItem("darkMode") === "enabled") {
    document.body.classList.add("dark-mode");
    if (darkModeToggle) darkModeToggle.textContent = "☀️ Light Mode";
  }

  if (darkModeToggle) {
    darkModeToggle.addEventListener("click", () => {
      document.body.classList.toggle("dark-mode");
      const isDark = document.body.classList.contains("dark-mode");
      localStorage.setItem("darkMode", isDark ? "enabled" : "disabled");
      darkModeToggle.textContent = isDark ? "☀️ Light Mode" : "🌙 Dark Mode";
    });
  }

  // --- 2. Destinations Page Logic ---
  const packagesGrid = document.getElementById("packages-grid");
  const searchInput = document.getElementById("search-input");
  const filterBtns = document.querySelectorAll(".filter-btn");

  if (packagesGrid) {
    renderPackages(packages);

    if (searchInput) {
      searchInput.addEventListener("input", filterAndSearch);
    }

    filterBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        filterBtns.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        currentCategory = btn.getAttribute("data-category");
        filterAndSearch();
      });
    });
  }

  function renderPackages(data) {
    packagesGrid.innerHTML = "";
    if (data.length === 0) {
      packagesGrid.innerHTML = `<p style="grid-column: 1/-1; text-align: center;">No packages matched your search.</p>`;
      return;
    }

    data.forEach((pkg) => {
      const card = document.createElement("div");
      card.className = "package-card";
      card.innerHTML = `
        <img src="${pkg.image}" alt="${pkg.destination}">
        <div class="package-body">
          <div class="package-header">
            <h3>${pkg.destination}</h3>
            <span class="category-tag">${pkg.category}</span>
          </div>
          <p class="package-info">${pkg.description}</p>
          <p><strong>Duration:</strong> ${pkg.days} Days</p>
          <div class="package-price">₹${pkg.price.toLocaleString()}</div>
          <button class="btn book-btn" data-id="${pkg.id}">Book Now</button>
        </div>
      `;
      packagesGrid.appendChild(card);
    });

    document.querySelectorAll(".book-btn").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const id = parseInt(e.target.getAttribute("data-id"));
        handleSelectPackage(id);
      });
    });
  }

  function filterAndSearch() {
    const searchTerm = searchInput ? searchInput.value.toLowerCase().trim() : "";
    const filtered = packages.filter((pkg) => {
      const matchesCategory = currentCategory === "All" || pkg.category === currentCategory;
      const matchesSearch = pkg.destination.toLowerCase().includes(searchTerm);
      return matchesCategory && matchesSearch;
    });
    renderPackages(filtered);
  }

  // Modal Handlers
  const modal = document.getElementById("booking-modal");
  const closeModal = document.getElementById("close-modal");
  const modalDetails = document.getElementById("modal-details");
  const confirmBtn = document.getElementById("confirm-selection-btn");

  function handleSelectPackage(id) {
    selectedPackage = packages.find((pkg) => pkg.id === id);
    if (selectedPackage && modal) {
      modalDetails.innerHTML = `
        <p><strong>Destination:</strong> ${selectedPackage.destination}</p>
        <p><strong>Category:</strong> ${selectedPackage.category}</p>
        <p><strong>Duration:</strong> ${selectedPackage.days} Days</p>
        <p><strong>Price:</strong> ₹${selectedPackage.price.toLocaleString()}</p>
        <p style="margin-top:0.5rem;">${selectedPackage.description}</p>
      `;
      modal.classList.remove("hidden");
    }
  }

  if (closeModal) closeModal.addEventListener("click", () => modal.classList.add("hidden"));

  if (confirmBtn) {
    confirmBtn.addEventListener("click", () => {
      if (selectedPackage) {
        localStorage.setItem("savedPackage", JSON.stringify(selectedPackage));
        window.location.href = "booking.html";
      }
    });
  }

  // --- 3. Hero Search Navigation ---
  const heroSearchBtn = document.getElementById("hero-search-btn");
  if (heroSearchBtn) {
    heroSearchBtn.addEventListener("click", () => {
      window.location.href = "destinations.html";
    });
  }

  // --- 4. My Booking Page Logic ---
  const savedPackageInfo = document.getElementById("saved-package-info");
  const clearBookingBtn = document.getElementById("clear-booking-btn");
  const userDestinationInput = document.getElementById("user-destination");
  const bookingForm = document.getElementById("booking-form");
  const formMessage = document.getElementById("form-message");

  if (savedPackageInfo) {
    loadSavedBooking();
  }

  function loadSavedBooking() {
    const saved = localStorage.getItem("savedPackage");
    if (saved) {
      const pkg = JSON.parse(saved);
      savedPackageInfo.innerHTML = `
        <p><strong>Destination:</strong> ${pkg.destination}</p>
        <p><strong>Category:</strong> ${pkg.category}</p>
        <p><strong>Duration:</strong> ${pkg.days} Days</p>
        <p><strong>Price:</strong> ₹${pkg.price.toLocaleString()}</p>
      `;
      if (clearBookingBtn) clearBookingBtn.classList.remove("hidden");
      if (userDestinationInput) userDestinationInput.value = pkg.destination;
    }
  }

  if (clearBookingBtn) {
    clearBookingBtn.addEventListener("click", () => {
      localStorage.removeItem("savedPackage");
      savedPackageInfo.innerHTML = `<p>No trip selected yet. Pick a package from <a href="destinations.html">Destinations</a>!</p>`;
      if (userDestinationInput) userDestinationInput.value = "";
      clearBookingBtn.classList.add("hidden");
    });
  }

  if (bookingForm) {
    bookingForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("user-name").value.trim();
      const email = document.getElementById("user-email").value.trim();
      const destination = userDestinationInput.value.trim();
      const date = document.getElementById("travel-date").value;
      const travelers = document.getElementById("travelers").value;

      if (!name || !email || !destination || !date || !travelers) {
        showFormMessage("Please fill in all fields and select a package.", "error");
        return;
      }

      showFormMessage(`Thank you ${name}! Your request for ${destination} on ${date} has been saved.`, "success");
      bookingForm.reset();
    });
  }

  function showFormMessage(msg, status) {
    if (formMessage) {
      formMessage.textContent = msg;
      formMessage.className = `form-msg ${status}`;
    }
  }

  // --- 5. Contact Form Logic ---
  const contactForm = document.getElementById("contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const msgDiv = document.getElementById("contact-msg");
      if (msgDiv) {
        msgDiv.textContent = "Thank you! Your message has been sent successfully.";
        msgDiv.className = "form-msg success";
      }
      contactForm.reset();
    });
  }
});