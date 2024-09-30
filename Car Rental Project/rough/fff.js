document.addEventListener('DOMContentLoaded', function () {
    const addBookingBtn = document.getElementById('addBookingBtn');
    const bookingModal = document.getElementById('bookingModal');
    const closeBtn = bookingModal.querySelector('.close');
    const bookingForm = document.getElementById('bookingForm');
    const bookingTableBody = document.getElementById('rental-body');

    // Load car data from dashboard
    const cars = JSON.parse(localStorage.getItem('cars')) || [];
    let bookings = JSON.parse(localStorage.getItem('bookings')) || [];

    // Function to render the bookings from localStorage
    function renderBookings() {
        bookingTableBody.innerHTML = ''; // Clear the table before rendering

        bookings.forEach(booking => {
            const newRow = document.createElement('tr');
            newRow.innerHTML = `
                <td>${booking.carRegNo}</td>
                <td>${booking.nic}</td>
                <td>${booking.name}</td>
                <td>${booking.phone}</td>
                <td>${booking.brand}</td>
                <td>${booking.model}</td>
                <td>${booking.rentDate}</td>
                <td><button class="delete-btn">Delete</button></td>
            `;

            // Add delete functionality
            const deleteBtn = newRow.querySelector('.delete-btn');
            deleteBtn.addEventListener('click', function () {
                deleteBooking(booking.carRegNo);
            });

            bookingTableBody.appendChild(newRow);
        });
    }

    // Open the modal when the button is clicked
    addBookingBtn.addEventListener('click', function () {
        bookingModal.style.display = 'block';
    });

    // Close the modal when the 'X' button is clicked
    closeBtn.addEventListener('click', function () {
        bookingModal.style.display = 'none';
        bookingForm.reset();
    });

    // Close the modal when clicked outside the modal
    window.addEventListener('click', function (event) {
        if (event.target === bookingModal) {
            bookingModal.style.display = 'none';
            bookingForm.reset();
        }
    });

    // Add new booking to the table and localStorage
    bookingForm.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent the default form submission behavior

        // Get form values
        const carRegNo = document.getElementById('carRegNo').value;
        const nic = document.getElementById('nic').value;
        const name = document.getElementById('name').value;
        const phone = document.getElementById('phone').value;
        const rentDate = document.getElementById('rentDate').value;

        // Find the corresponding car details using carRegNo
        const car = cars.find(car => car.carRegNo === carRegNo);
        if (!car) {
            alert('Car not found!');
            return;
        }

        const brand = car.brand;
        const model = car.modelName;

        // Create booking object
        const newBooking = {
            carRegNo,
            nic,
            name,
            phone,
            brand,
            model,
            rentDate
        };

        // Add new booking to the bookings array
        bookings.push(newBooking);

        // Update localStorage
        localStorage.setItem('bookings', JSON.stringify(bookings));

        // Render the updated bookings
        renderBookings();

        // Close the modal and reset the form
        bookingModal.style.display = 'none';
        bookingForm.reset();
    });

    // Delete booking from localStorage and table
    function deleteBooking(carRegNo) {
        bookings = bookings.filter(booking => booking.carRegNo !== carRegNo);
        localStorage.setItem('bookings', JSON.stringify(bookings));
        renderBookings();
    }

    // Load the saved bookings on page load
    renderBookings();
});
