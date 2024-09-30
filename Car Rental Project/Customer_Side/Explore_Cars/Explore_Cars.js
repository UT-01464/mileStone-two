document.addEventListener('DOMContentLoaded', function () {
    const carContainer = document.querySelector('.container-gallery');
    const cars = JSON.parse(localStorage.getItem('cars')) || [];

    cars.forEach(car => {
        const carCard = document.createElement('div');
        carCard.className = 'gallery';

        carCard.innerHTML = `
            <img src="${car.image}" class="photo">
            <div class="car-details">
                <div class="car-title">
                    <h3 style="margin-left: 15px;">${car.brand} ${car.modelName}</h3>
                    <p class="car-year">${car.year}</p>
                </div>
                <div class="car-icons">
                    <div class="inside-align">
                        <div class="inside-line"><i class="fas fa-users"></i><p class="inside-info">${car.noOfPeople} People</p></div>
                        <div class="inside-line"><i class="fas fa-tachometer-alt"></i> <p class="inside-info">${car.fuelConsumption} km/litre</p></div>
                    </div>
                    <div>
                        <div class="inside-line"><i class="fa-solid fa-bolt"></i><p class="inside-info"> ${car.fuel}</p></div>
                        <div class="inside-line"><i class="fa-solid fa-microchip"></i> <p class="inside-info">${car.transmission}</p></div>
                    </div>
                </div>
                <p class="car-price" style="color: black;margin-left: 15px;">Rs. ${car.price}/hour</p>
                <button class="view-button" style="margin-left: 15px;">View</button>
            </div>
        `;

        carContainer.appendChild(carCard);
    });
});
