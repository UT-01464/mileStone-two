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

