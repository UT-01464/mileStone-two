
function bookingHistoryShow() {
    document.getElementById('bookingcontainer').style.display = 'block';
    document.getElementById('dashboardcontainer').style.display = 'none';
    document.getElementById('customercontainer').style.display = 'none';
    document.getElementById('overduecontainer').style.display = 'none';
    document.getElementById('returncontainer').style.display = 'none';
}



document.addEventListener('DOMContentLoaded', function () {
    const modal = document.getElementById("bookingModal");
    const btn = document.getElementById("addBookingBtn");
    const span = document.getElementsByClassName("closeBtn")[0];
    const form = document.getElementById("bookingForm");
    const rentalBody = document.getElementById("rental-body");
    const rentDateInput = document.getElementById('rentDate');
    const carRegInput = document.getElementById('carRegNo');
    const brandInput = document.getElementById('brand');
    const modelInput = document.getElementById('model');
    const nicInput = document.getElementById('nic'); 
    const nameInput = document.getElementById('name'); 
    const phoneInput = document.getElementById('phone'); 

   
    const generateRegNumber = () => {
        let bookings = JSON.parse(localStorage.getItem('bookings')) || [];
        const lastBooking = bookings[bookings.length - 1];
        const lastRegNumber = lastBooking ? parseInt(lastBooking.regNumber.slice(3)) : 0;
        const newRegNumber = lastRegNumber + 1;
        return `REG${newRegNumber.toString().padStart(4, '0')}`;
    };

   
    const setCurrentDate = () => {
        const now = new Date();
        rentDateInput.value = now.toISOString();
    };

    
    carRegInput.addEventListener('input', function () {
        const carRegNo = carRegInput.value.trim();
        if (carRegNo) {
            const cars = JSON.parse(localStorage.getItem('cars')) || [];
            const car = cars.find(car => car.carRegNo == carRegNo.toString());
            if (car) {
                brandInput.value = car.brand;
                modelInput.value = car.modelName;
            } else {
                brandInput.value = '';
                modelInput.value = '';
            }
        } else {
            brandInput.value = '';
            modelInput.value = '';
        }
    });

    
    nicInput.addEventListener('input', function () {
        const nicNumber = nicInput.value.trim();
        if (nicNumber) {
            const customers = JSON.parse(localStorage.getItem('users')) || [];
            const customer = customers.find(customer => customer.nicNumber === nicNumber);
            if (customer) {
                nameInput.value = customer.userName;
                phoneInput.value = customer.phoneNumber;
            } else {
                nameInput.value = '';
                phoneInput.value = '';
            }
        } else {
            nameInput.value = '';
            phoneInput.value = '';
        }
    });

    btn.onclick = function () {
        setCurrentDate();
        modal.style.display = "block";
    };

    span.onclick = function () {
        modal.style.display = "none";
    };

    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    };

    form.onsubmit = function (e) {
        e.preventDefault();

        const nic = nicInput.value.trim();
        const name = nameInput.value.trim();
        const phone = phoneInput.value.trim();

        
        const customers = JSON.parse(localStorage.getItem('users')) || [];
        const customer = customers.find(customer => customer.nicNumber === nic);

        if (!customer) {
            alert('NIC does not match any customer. Please ensure the customer is registered.');
            return;
        }

        const regNumber = generateRegNumber();
        const brand = brandInput.value.trim();
        const model = modelInput.value.trim();
        const rentDate = new Date(rentDateInput.value).toLocaleString();

        const newRow = rentalBody.insertRow();
        newRow.innerHTML = 
            `<td>${regNumber}</td>
            <td>${nic}</td>
            <td>${name}</td>
            <td>${phone}</td>
            <td>${brand}</td>
            <td>${model}</td>
            <td>${rentDate}</td>
            <td></td>`;

        let bookings = JSON.parse(localStorage.getItem('bookings')) || [];
        bookings.push({ regNumber, nic, name, phone, brand, model, rentDate, returnDate: '' });
        localStorage.setItem('bookings', JSON.stringify(bookings));

        form.reset();
        modal.style.display = "none";
    };

    function loadBookings() {
        let bookings = JSON.parse(localStorage.getItem('bookings')) || [];
        bookings.forEach(function(booking) {
            let rentDate = booking.rentDate ? new Date(booking.rentDate).toLocaleString() : '';
            let returnDate = booking.returnDate ? new Date(booking.returnDate).toLocaleString() : '';
            let newRow = rentalBody.insertRow();
            newRow.innerHTML = 
                `<td>${booking.regNumber}</td>
                <td>${booking.nic}</td>
                <td>${booking.name}</td>
                <td>${booking.phone}</td>
                <td>${booking.brand}</td>
                <td>${booking.model}</td>
                <td>${rentDate}</td>
                <td>${returnDate}</td>`;
        });
    }

    loadBookings();
});
