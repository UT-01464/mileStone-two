document.addEventListener('DOMContentLoaded', () => {
    const editProfileBtn = document.getElementById('editProfileBtn');
    const profileEditPopup = new bootstrap.Modal(document.getElementById('profileEditPopup'));
    const saveProfileBtn = document.getElementById('saveProfileBtn');
    const cancelEditBtn = document.querySelector('.btn-close');
    const editProfileForm = document.getElementById('editProfileForm');
    const currentUser = JSON.parse(localStorage.getItem('currentUser')) || {};

    // Populate the form with current user data
    function populateEditForm() {
        document.getElementById('editName').value = currentUser.name || '';
        document.getElementById('editAddress').value = currentUser.address || '';
        document.getElementById('editPhone').value = currentUser.phone || '';
    }

    // Open the profile edit popup
    editProfileBtn.addEventListener('click', () => {
        populateEditForm();
        profileEditPopup.show();
    });

    // Handle save profile changes
    saveProfileBtn.addEventListener('click', () => {
        const name = document.getElementById('editName').value;
        const address = document.getElementById('editAddress').value;
        const phone = document.getElementById('editPhone').value;
        const profilePicture = document.getElementById('editProfilePicture').files[0];

        // Update user data in localStorage
        currentUser.name = name;
        currentUser.address = address;
        currentUser.phone = phone;

        // Handle profile picture
        if (profilePicture) {
            const reader = new FileReader();
            reader.onload = function(event) {
                // Get base64 image data URL
                const imageDataURL = event.target.result;

                // Compress or resize the image if needed
                compressImage(imageDataURL).then((compressedImage) => {
                    try {
                        currentUser.profilePicture = compressedImage;
                        localStorage.setItem('currentUser', JSON.stringify(currentUser));
                        updateProfileDisplay();
                        profileEditPopup.hide();
                    } catch (e) {
                        console.error('Failed to save profile picture:', e);
                        alert('Unable to save profile picture. Please try a smaller image.');
                    }
                });
            };
            reader.readAsDataURL(profilePicture);
        } else {
            localStorage.setItem('currentUser', JSON.stringify(currentUser));
            updateProfileDisplay();
            profileEditPopup.hide();
        }
    });

    // Handle cancel button click
    cancelEditBtn.addEventListener('click', () => {
        profileEditPopup.hide();
    });

    // Compress or resize image function
    function compressImage(dataURL) {
        return new Promise((resolve) => {
            const img = new Image();
            img.src = dataURL;

            img.onload = function() {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');

                canvas.width = img.width / 2; // Adjust for compression
                canvas.height = img.height / 2; // Adjust for compression

                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

                const compressedDataURL = canvas.toDataURL('image/jpeg', 0.7); // Adjust quality as needed
                resolve(compressedDataURL);
            };
        });
    }

    // Update profile display
    function updateProfileDisplay() {
        const userInfo = document.getElementById('userInfo');
        userInfo.innerHTML = `
            <img src="${currentUser.profilePicture || 'path/to/default-profile-pic.jpg'}" alt="Profile Picture" class="img-thumbnail" style="width: 100px; height: auto;">
            <p><strong>NIC Number:</strong> ${currentUser.nicNumber || 'Not provided'}</p>
            <p><strong>Email:</strong> ${currentUser.email || 'Not provided'}</p>
            <p><strong>Name:</strong> ${currentUser.name || 'Not provided'}</p>
            <p><strong>Address:</strong> ${currentUser.address || 'Not provided'}</p>
            <p><strong>Phone:</strong> ${currentUser.phone || 'Not provided'}</p>
        `;
    }

    // Initialize profile display
    updateProfileDisplay();
});






// -------------------------------------------Report

function rentCar(carId) {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const cars = JSON.parse(localStorage.getItem('cars')) || [];
    const rentals = JSON.parse(localStorage.getItem('rentals')) || [];
    const orders = JSON.parse(localStorage.getItem('orders')) || [];

    const car = cars.find(car => car.id === carId);
    if (car) {
        const rental = {
            carId: car.id,
            brand: car.brand,
            model: car.model,
            category: car.category,
            rentDate: new Date().toLocaleString(),
            nicNumber: currentUser.nicNumber // Adding NIC number to the rental info
        };

        rentals.push(rental);
        localStorage.setItem('rentals', JSON.stringify(rentals));

        orders.push(rental); // Add the rental to orders as well
        localStorage.setItem('orders', JSON.stringify(orders));

        // Update UI or alert user
        alert('Car rented successfully!');
    }
}

function returnCar(carId) {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const rentals = JSON.parse(localStorage.getItem('rentals')) || [];
    const orders = JSON.parse(localStorage.getItem('orders')) || [];

    const rental = rentals.find(rental => rental.carId === carId);
    if (rental) {
        rental.returnDate = new Date().toLocaleString();
        rental.nicNumber = currentUser.nicNumber; // Ensure NIC number is stored

        orders.push(rental); // Add the returned car to orders with return date
        localStorage.setItem('orders', JSON.stringify(orders));

        // Remove from current rentals
        const updatedRentals = rentals.filter(r => r.carId !== carId);
        localStorage.setItem('rentals', JSON.stringify(updatedRentals));

        // Update UI or alert user
        alert('Car returned successfully!');
    }
}
