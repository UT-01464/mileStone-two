function dashboardshow() {
    document.getElementById('dashboardcontainer').style.display = 'block';
    document.getElementById('bookingcontainer').style.display = 'none';
    document.getElementById('customercontainer').style.display = 'none';
    document.getElementById('overduecontainer').style.display = 'none';
    document.getElementById('returncontainer').style.display = 'none';
}

document.addEventListener('DOMContentLoaded', function () {
    const tableBody = document.querySelector('#deviceTable tbody');
    const openModalBtn = document.getElementById('openModalBtn');
    const modal = document.getElementById('modal');
    const closeModalBtn = document.querySelector('.closeBtn');
    const carForm = document.getElementById('carForm');
    const manageModal = document.getElementById('manageModal');
    const closeManageBtn = document.querySelector('.closeManageBtn');
    const manageTitle = document.getElementById('manageTitle');
    const optionList = document.getElementById('optionList');
    const addOptionBtn = document.getElementById('addOptionBtn');
    const newOptionInput = document.getElementById('newOption');
    const imageInput = document.getElementById('carImage');

    let editingRow = null;
    let currentDropdown = null;

    const dropdownOptions = {
        brand: ['Toyota', 'Honda', 'Ford', 'Tesla'],
        modelName: ['Model A', 'Model B', 'Model C', 'Model D'],
        year: ['2020', '2021', '2022', '2023'],
        transmission: ['Automatic', 'Manual', 'Semi-Automatic'],
        fuel: ['Petrol', 'Diesel', 'Electric', 'Hybrid'],
        noOfPeople: ['4', '5', '7'],
        availability: ['Available', 'Not Available', 'In Maintenance']
    };

    function populateDropdown(id, options) {
        const select = document.getElementById(id);
        select.innerHTML = '';
        options.forEach(option => {
            const opt = document.createElement('option');
            opt.value = option;
            opt.textContent = option;
            select.appendChild(opt);
        });
    }

    function openModal() {
        modal.style.display = 'block';
    }

    function closeModal() {
        modal.style.display = 'none';
        carForm.reset();
        editingRow = null;
    }

    function openManageModal(dropdownId) {
        currentDropdown = dropdownId;
        manageTitle.textContent = `Manage ${dropdownId}`;
        newOptionInput.value = '';
        populateOptionList(dropdownId);
        manageModal.style.display = 'block';
    }

    function closeManageModal() {
        manageModal.style.display = 'none';
        currentDropdown = null;
    }

    function populateOptionList(dropdownId) {
        optionList.innerHTML = '';
        dropdownOptions[dropdownId].forEach(option => {
            const li = document.createElement('li');
            li.textContent = option;
            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Delete';
            deleteBtn.style.backgroundColor="#FF8484";
            deleteBtn.style.color="white";
            deleteBtn.style.border="none";
            deleteBtn.style.padding="10px 20px";
            deleteBtn.style.borderRadius="5px";
            deleteBtn.style.cursor="pointer";
            deleteBtn.style.marginLeft="10px";



            deleteBtn.addEventListener('click', function () {
                removeOption(dropdownId, option);
            });
            li.appendChild(deleteBtn);
            optionList.appendChild(li);
        });
    }

    function addOption() {
        const newOption = newOptionInput.value.trim();
        if (newOption && !dropdownOptions[currentDropdown].includes(newOption)) {
            dropdownOptions[currentDropdown].push(newOption);
            populateDropdown(currentDropdown, dropdownOptions[currentDropdown]);
            populateOptionList(currentDropdown);
        }
        newOptionInput.value = '';
    }

    function removeOption(dropdownId, option) {
        const index = dropdownOptions[dropdownId].indexOf(option);
        if (index > -1) {
            dropdownOptions[dropdownId].splice(index, 1);
            populateDropdown(dropdownId, dropdownOptions[dropdownId]);
            populateOptionList(dropdownId);
        }
    }

    function addRow(event) {
        event.preventDefault();

        const brand = document.getElementById('brand').value;
        const modelName = document.getElementById('modelName').value;
        const carRegNo = document.getElementById('carRegNo').value;
        const availability = document.getElementById('availability').value; 
        
        const year = document.getElementById('year').value;
        const transmission = document.getElementById('transmission').value;
        const fuel = document.getElementById('fuel').value;
        const fuelConsumption = document.getElementById('fuelConsumption').value;
        const noOfPeople = document.getElementById('noOfPeople').value;
        const price = document.getElementById('price').value;

        
        const imageFile = imageInput.files[0];

        if (imageFile) {
            const reader = new FileReader();
            reader.onload = function (e) {
                const base64Image = e.target.result;

                const carData = {
                    brand,
                    modelName,
                    carRegNo,
                    availability,
                    year,
                    transmission,
                    fuel,
                    fuelConsumption,
                    noOfPeople,
                    price,
                    image: base64Image
                };

                if (editingRow) {
                    updateRow(carData);
                } else {
                    createRow(carData);
                }

                closeModal();
            };
            reader.readAsDataURL(imageFile); 
        } else {
            const carData = {
                brand,
                modelName,
                carRegNo,
                availability,
                year,
                transmission,
                fuel,
                fuelConsumption,
                noOfPeople,
                price,
                image: '' 
            };

            if (editingRow) {
                updateRow(carData);
            } else {
                createRow(carData);
            }

            closeModal();
        }
    }

    function updateRow(carData) {
        editingRow.cells[0].textContent = carData.brand;
        editingRow.cells[1].textContent = carData.modelName;
        editingRow.cells[2].textContent = carData.carRegNo;
        editingRow.cells[3].textContent = carData.availability;

        editingRow.dataset.year = carData.year;
        editingRow.dataset.transmission = carData.transmission;
        editingRow.dataset.fuel = carData.fuel;
        editingRow.dataset.fuelConsumption = carData.fuelConsumption;
        editingRow.dataset.noOfPeople = carData.noOfPeople;
        editingRow.dataset.price = carData.price;
        editingRow.dataset.image = carData.image;

        
        updateLocalStorage();
    }

    function createRow(carData) {
        const newRow = document.createElement('tr');
        newRow.innerHTML = `
            <td>${carData.brand}</td>
            <td>${carData.modelName}</td>
            <td>${carData.carRegNo}</td>
            <td>${carData.availability}</td> 
            <td><button class="editBtn">Edit</button></td>
            <td><button class="deleteBtn">Delete</button></td>
        `;

        newRow.dataset.year = carData.year;
        newRow.dataset.transmission = carData.transmission;
        newRow.dataset.fuel = carData.fuel;
        newRow.dataset.fuelConsumption = carData.fuelConsumption;
        newRow.dataset.noOfPeople = carData.noOfPeople;
        newRow.dataset.price = carData.price;
        newRow.dataset.image = carData.image;

        tableBody.appendChild(newRow);
        addEventListeners(newRow);

        updateLocalStorage();
    }

    function editRow(row) {
        editingRow = row;

        document.getElementById('brand').value = row.cells[0].textContent;
        document.getElementById('modelName').value = row.cells[1].textContent;
        document.getElementById('carRegNo').value = row.cells[2].textContent;
        document.getElementById('availability').value = row.cells[3].textContent;

        document.getElementById('year').value = row.dataset.year;
        document.getElementById('transmission').value = row.dataset.transmission;
        document.getElementById('fuel').value = row.dataset.fuel;
        document.getElementById('fuelConsumption').value = row.dataset.fuelConsumption;
        document.getElementById('noOfPeople').value = row.dataset.noOfPeople;
        document.getElementById('price').value = row.dataset.price;

        
        openModal();
    }

    function deleteRow(row) {
        tableBody.removeChild(row);

        updateLocalStorage();
    }

    function addEventListeners(row) {
        const editBtn = row.querySelector('.editBtn');
        const deleteBtn = row.querySelector('.deleteBtn');

        editBtn.addEventListener('click', function () {
            editRow(row);
        });

        deleteBtn.addEventListener('click', function () {
            deleteRow(row);
        });
    }

    function updateLocalStorage() {
        const cars = [];
        tableBody.querySelectorAll('tr').forEach(row => {
            const carData = {
                brand: row.cells[0].textContent,
                modelName: row.cells[1].textContent,
                carRegNo: row.cells[2].textContent,
                availability: row.cells[3].textContent,
                year: row.dataset.year,
                transmission: row.dataset.transmission,
                fuel: row.dataset.fuel,
                fuelConsumption: row.dataset.fuelConsumption,
                noOfPeople: row.dataset.noOfPeople,
                price: row.dataset.price,
                image: row.dataset.image
            };
            cars.push(carData);
        });
        localStorage.setItem('cars', JSON.stringify(cars));
    }

    function loadFromLocalStorage() {
        const cars = JSON.parse(localStorage.getItem('cars')) || [];
        cars.forEach(carData => {
            createRow(carData);
        });
    }

    Object.keys(dropdownOptions).forEach(key => {
        populateDropdown(key, dropdownOptions[key]);
    });

    openModalBtn.addEventListener('click', openModal);
    closeModalBtn.addEventListener('click', closeModal);
    window.addEventListener('click', function (event) {
        if (event.target === modal) {
            closeModal();
        } else if (event.target === manageModal) {
            closeManageModal();
        }
    });

    document.getElementById('manageBrandsBtn').addEventListener('click', function () {
        openManageModal('brand');
    });
    document.getElementById('manageModelBtn').addEventListener('click', function () {
        openManageModal('modelName');
    });
    document.getElementById('manageYearBtn').addEventListener('click', function () {
        openManageModal('year');
    });
    document.getElementById('manageTransmissionBtn').addEventListener('click', function () {
        openManageModal('transmission');
    });
    document.getElementById('manageFuelBtn').addEventListener('click', function () {
        openManageModal('fuel');
    });
    document.getElementById('managePeopleBtn').addEventListener('click', function () {
        openManageModal('noOfPeople');
    });

    addOptionBtn.addEventListener('click', addOption);
    closeManageBtn.addEventListener('click', closeManageModal);
    carForm.addEventListener('submit', addRow);

    loadFromLocalStorage();
});