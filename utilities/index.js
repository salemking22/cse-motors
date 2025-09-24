function buildVehicleDetail(vehicle) {
  return `
    <div class="vehicle-detail-container">
        <div class="vehicle-image">
            <img src="${vehicle.inv_image}" alt="${vehicle.inv_make} ${vehicle.inv_model}">
        </div>
        <div class="vehicle-info">
            <h2>${vehicle.inv_make} ${vehicle.inv_model}</h2>
            <p class="vehicle-year"><strong>Year:</strong> ${vehicle.inv_year}</p>
            <p class="vehicle-price"><strong>Price:</strong> $${Number(vehicle.inv_price).toLocaleString()}</p>
            <p class="vehicle-miles"><strong>Mileage:</strong> ${Number(vehicle.inv_miles).toLocaleString()} miles</p>
            <p class="vehicle-description"><strong>Description:</strong> ${vehicle.inv_description}</p>
            <a href="/" class="back-button">← Back to Inventory</a>
        </div>
    </div>
  `;
}


module.exports = { buildVehicleDetail };
