document.addEventListener('DOMContentLoaded', () => {
    const Container = document.getElementById("Login-Container");
    const registerbtn = document.getElementById("register");
    const loginbtn = document.getElementById("login");

    // Toggle to sign-up form
    registerbtn.addEventListener('click', () => {
        Container.classList.add("active");
    });

    // Toggle to sign-in form
    loginbtn.addEventListener('click', () => {
        Container.classList.remove("active");
    });

    // -------------------- Register --------------------
    const users = JSON.parse(localStorage.getItem('users')) || [];

    document.getElementById('userCreationForm').addEventListener('submit', function(event) {
        event.preventDefault();  // Prevent form submission

        let nicNumber = document.getElementById('createNIC').value.trim();
        let password = document.getElementById('createPassword').value.trim();
        let email = document.getElementById('createEmail').value.trim();

        if (nicNumber === "" || password === "" || email === "") {
            alert("All fields are required.");
            return;
        }

        // Check if NIC number already exists
        if (users.find(user => user.nicNumber === nicNumber)) {
            alert("NIC number already exists.");
            return;
        }

        // Check if email already exists
        if (users.find(user => user.email.toLowerCase() === email.toLowerCase())) {
            alert("Email already registered.");
            return;
        }

        // Store the new user
        users.push({ nicNumber, password, email });
        localStorage.setItem('users', JSON.stringify(users));

        alert("User created successfully!");
        document.getElementById('userCreationForm').reset();
    });

    // -------------------- Login --------------------
    document.getElementById('loginForm').addEventListener('submit', function(event) {
        event.preventDefault();  // Prevent form submission

        const nicNumber = document.getElementById('NICNumber').value.trim();
        const password = document.getElementById('Password').value.trim();

        // Validate user credentials
        const user = users.find(user => 
            user.nicNumber === nicNumber && user.password === password);

        if (user) {
            localStorage.setItem('currentUser', JSON.stringify(user)); // Store current user in localStorage
            window.location.href = '../userpage/profile.html';  // Redirect to profile page in the user folder
        } else {
            alert('Invalid credentials');
        }
    });
});
