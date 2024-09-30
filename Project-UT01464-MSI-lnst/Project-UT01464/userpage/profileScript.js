document.addEventListener('DOMContentLoaded', () => {
    const userInfo = document.getElementById('userInfo');
    const availableCarTableBody = document.getElementById('availableCarTableBody');
    const myRentalsTableBody = document.getElementById('myRentalsTableBody');
    const orderHistoryTableBody = document.getElementById('orderHistoryTableBody');
    const logoutBtn = document.getElementById('logoutBtn');
    const loadingScreen = document.getElementById('loading-screen');

    // Simulate loading delay
    setTimeout(() => {
        loadingScreen.style.display = 'none';
    }, 1000);

    // Initialize localStorage with sample data if empty
    if (!localStorage.getItem('cars')) {
        const sampleCars = [
            { id: '1', brand: 'Toyota', model: 'Camry', category: 'Sedan', image: 'path/to/toyota-camry.jpg' },
            { id: '2', brand: 'Honda', model: 'Civic', category: 'Sedan', image: 'path/to/honda-civic.jpg' }
        ];
        localStorage.setItem('cars', JSON.stringify(sampleCars));
    }

    if (!localStorage.getItem('rentals')) {
        localStorage.setItem('rentals', JSON.stringify([]));
    }

    if (!localStorage.getItem('orders')) {
        localStorage.setItem('orders', JSON.stringify([]));
    }

    // Load user info
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser) {
        userInfo.innerHTML = `
            <p><strong>NIC Number:</strong> ${currentUser.nicNumber}</p>
            <p><strong>Email:</strong> ${currentUser.email}</p>
        `;
    }

    // Function to update tables
    function updateTables() {
        // Clear existing table contents
        availableCarTableBody.innerHTML = '';
        myRentalsTableBody.innerHTML = '';
        orderHistoryTableBody.innerHTML = '';

        // Load available cars
        const cars = JSON.parse(localStorage.getItem('cars')) || [];
        cars.forEach(car => {
            const carRow = document.createElement('tr');
            carRow.innerHTML = `
                <td>${car.id}</td>
                <td>${car.brand}</td>
                <td>${car.model}</td>
                <td>${car.category}</td>
                <td><img src="${car.image}" alt="${car.brand} ${car.model}" style="width: 100px; height: auto;"></td>
                <td><button class="btn btn-primary rent-btn" data-id="${car.id}">Rent</button></td>
            `;
            availableCarTableBody.appendChild(carRow);

            // Attach event listener directly to the rent button
            carRow.querySelector('.rent-btn').addEventListener('click', () => {
                rentCar(car.id);
            });
        });

        // Load rentals
        const rentals = JSON.parse(localStorage.getItem('rentals')) || [];
        rentals.forEach(rental => {
            const rentalRow = document.createElement('tr');
            rentalRow.innerHTML = `
                <td>${rental.carId}</td>
                <td>${rental.brand}</td>
                <td>${rental.model}</td>
                <td>${rental.category}</td>
                <td>${rental.rentDate}</td>
                <td><button class="btn btn-danger return-btn" data-id="${rental.carId}">Return</button></td>
            `;
            myRentalsTableBody.appendChild(rentalRow);

            // Attach event listener directly to the return button
            rentalRow.querySelector('.return-btn').addEventListener('click', () => {
                returnCar(rental.carId);
            });
        });

        // Load order history
        const orders = JSON.parse(localStorage.getItem('orders')) || [];
        orders.forEach(order => {
            orderHistoryTableBody.innerHTML += `
                <tr>
                    <td>${order.carId}</td>
                    <td>${order.brand}</td>
                    <td>${order.model}</td>
                    <td>${order.rentDate}</td>
                    <td>${order.returnDate}</td>
                </tr>
            `;
        });
    }

    // Function to handle car rental
    function rentCar(carId) {
        let cars = JSON.parse(localStorage.getItem('cars')) || [];
        let rentals = JSON.parse(localStorage.getItem('rentals')) || [];

        const car = cars.find(car => car.id === carId);
        if (car) {
            const rental = {
                carId: car.id,
                brand: car.brand,
                model: car.model,
                category: car.category,
                rentDate: new Date().toLocaleString()  // Include both date and time
            };

            rentals.push(rental);
            localStorage.setItem('rentals', JSON.stringify(rentals));

            // Remove car from available cars
            cars = cars.filter(car => car.id !== carId);
            localStorage.setItem('cars', JSON.stringify(cars));

            // Update tables
            updateTables();

            alert('Car rented successfully!');
        }
    }

    // Function to handle car return
    function returnCar(carId) {
        let rentals = JSON.parse(localStorage.getItem('rentals')) || [];
        const rental = rentals.find(rental => rental.carId === carId);
        if (rental) {
            const order = {
                carId: rental.carId,
                brand: rental.brand,
                model: rental.model,
                rentDate: rental.rentDate,
                returnDate: new Date().toLocaleString()  // Include both date and time
            };
            let orders = JSON.parse(localStorage.getItem('orders')) || [];
            orders.push(order);
            localStorage.setItem('orders', JSON.stringify(orders));

            // Remove rental from my rentals
            rentals = rentals.filter(rental => rental.carId !== carId);
            localStorage.setItem('rentals', JSON.stringify(rentals));

            // Add car back to available cars
            const car = {
                id: rental.carId,
                brand: rental.brand,
                model: rental.model,
                category: rental.category,
                image: 'path/to/car.jpg' // Set a default or specific image path
            };
            let cars = JSON.parse(localStorage.getItem('cars')) || [];
            cars.push(car);
            localStorage.setItem('cars', JSON.stringify(cars));

            // Update tables
            updateTables();

            alert('Car returned successfully!');
        }
    }

    // Initial table load
    updateTables();

    // Handle logout
    logoutBtn.addEventListener('click', () => {
        localStorage.removeItem('currentUser');
        window.location.href = 'login.html';
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const carList = document.getElementById('car-list');
    let cars = JSON.parse(localStorage.getItem('cars')) || [];

    function updateCarList() {
        carList.innerHTML = '';
        cars.forEach(car => {
            carList.innerHTML += `
                <div class="car-card">
                    <img src="${car.image}" alt="${car.name}">
                    <div class="car-details">
                        <h2>${car.name}</h2>
                        <p>Type: ${car.type}</p>
                        <p>Brand: ${car.brand}</p>
                        <p>Model Year: ${car.modelYear}</p>
                        <p>${car.description}</p>
                        <button class="rent-now">Rent Now</button>
                    </div>
                </div>
            `;
        });
    }

    updateCarList();
});
