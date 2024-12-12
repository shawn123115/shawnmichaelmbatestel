// Flag to track if the user is logged in
let isLoggedIn = false;

// Smooth scrolling function for "View Pets" button
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    section.scrollIntoView({ behavior: "smooth" });
}

// Filter pets based on the selected category
function filterPets(type) {
    const allPets = document.querySelectorAll('.pet-card');

    // Show all pets if 'all' is selected
    if (type === 'all') {
        allPets.forEach(pet => {
            pet.classList.remove('hidden');
        });
    } else {
        // Hide pets that do not match the selected category
        allPets.forEach(pet => {
            if (pet.classList.contains(type)) {
                pet.classList.remove('hidden');
            } else {
                pet.classList.add('hidden');
            }
        });
    }
}

// Form validation for adoption form
function validateForm() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;

    if (name === "" || email === "") {
        alert("Please fill out all fields.");
        return false;
    }
    return true;
}

// Open the login/register modal when the "View Available Pets" button is clicked
function openLoginModal() {
    const modal = document.getElementById('auth-modal');
    modal.style.display = 'block';
}

// Close the modal
function closeModal() {
    const modal = document.getElementById('auth-modal');
    modal.style.display = 'none';
}

// Show the login form
function showLoginForm() {
    document.getElementById('login-form').style.display = 'block';
    document.getElementById('register-form').style.display = 'none';
    document.querySelector('.tab-btn.active').classList.remove('active');
    document.querySelectorAll('.tab-btn')[0].classList.add('active');
}

// Show the register form
function showRegisterForm() {
    document.getElementById('login-form').style.display = 'none';
    document.getElementById('register-form').style.display = 'block';
    document.querySelector('.tab-btn.active').classList.remove('active');
    document.querySelectorAll('.tab-btn')[1].classList.add('active');
}

// Simple login validation
function validateLogin() {
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    if (email === "" || password === "") {
        document.getElementById('login-feedback').textContent = "Please fill out all fields.";
        return false;
    }

    // Mock successful login
    document.getElementById('login-feedback').textContent = "Login successful!";
    document.getElementById('login-feedback').style.color = 'green';
    isLoggedIn = true; // Mark as logged in
    closeModal();
    return false;
}

// Simple register validation
function validateRegister() {
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;
    const name = document.getElementById('register-name').value;

    if (email === "" || password === "" || name === "") {
        document.getElementById('register-feedback').textContent = "Please fill out all fields.";
        return false;
    }

    // Mock successful registration
    document.getElementById('register-feedback').textContent = "Registration successful!";
    document.getElementById('register-feedback').style.color = 'green';
    closeModal();
    return false;
}

// Handle clicking the "Adopt" button
function handleAdoptClick(petName) {
    if (!isLoggedIn) {
        // If the user is not logged in, show the login modal
        alert('You need to log in before adopting a pet!');
        openLoginModal();
    } else {
        // If logged in, proceed with adoption (for now, just show an alert)
        alert(`Proceeding with adoption of ${petName}`);
        // Here, you would send the adoption request to the server or handle it as needed
    }
}

// Add event listeners to all "Adopt" buttons
window.onload = () => {
    const adoptButtons = document.querySelectorAll('.pet-card button');
    adoptButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const petName = event.target.parentElement.querySelector('h3').innerText;
            handleAdoptClick(petName);
        });
    });

    // Add event listener to filter buttons (e.g. "Dogs", "Cats", etc.)
    const filterButtons = document.querySelectorAll('.filter-menu button');
    filterButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const type = event.target.getAttribute('data-type');
            filterPets(type); // Filter pets by type
        });
    });
};
