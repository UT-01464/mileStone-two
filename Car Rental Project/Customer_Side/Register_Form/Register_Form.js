const users = JSON.parse(localStorage.getItem('users')) || [];


function encryptPassword(password) {
    return btoa(password);
}

document.getElementById('registerSection').addEventListener('submit', function (event) {
    event.preventDefault();

    let nicNumber = document.getElementById('nicNumber').value;
    let userName = document.getElementById('userName').value;
    let phoneNumber = document.getElementById('phoneNumber').value;
    let email = document.getElementById('email').value;
    let licenseNumber = document.getElementById('licenseNumber').value;
    let password = encryptPassword(document.getElementById('password').value);


    // console.log(licenseNumber); // Debugging line



    if (users.find(user => user.nicNumber === nicNumber)) {

        document.getElementById("registerMessage").textContent = "Username Already Exists";
        return;
    }

    users.push({ nicNumber, userName, phoneNumber, email,licenseNumber, password });
    localStorage.setItem('users', JSON.stringify(users));

    document.getElementById('registerMessage').textContent = "User created successfully!";
    document.getElementById('registerForm').reset();

});
