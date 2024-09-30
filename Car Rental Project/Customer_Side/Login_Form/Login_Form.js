const users = JSON.parse(localStorage.getItem('users')) || [];

function encryptPassword(password) {
    return btoa(password);
}

document.getElementById('loginForm').addEventListener('submit', function (event) {
    event.preventDefault();

    let nicNumber = document.getElementById('nicNumber').value;
    let password = encryptPassword(document.getElementById('password').value);

    
    const adminNIC = "adminNIC123";
    const adminPassword = encryptPassword("123");

    
    if (nicNumber === adminNIC && password === adminPassword) {
        document.getElementById('loginMessage').textContent = "Admin login successful!";
        window.location.href = '../../Management_Side/DashBoard.html'; 
        return; 
    }

    let user = users.find(user => user.nicNumber === nicNumber && user.password === password);

    if (user) {
        document.getElementById('loginMessage').textContent = "User login successful!";
        window.location.href = '../Explore_Cars/Explore_Cars_L.html'; 
    } else {
        document.getElementById('loginMessage').textContent = "Invalid NIC number or password.";
    }
});
