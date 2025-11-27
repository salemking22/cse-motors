const pool = require('../database'); // use raw pool now
const invModel = require("../models/inventory-model");

// Format price as currency
function formatPrice(price) {
  if (price == null) return '$0.00';
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(price);
}

// Format number with commas
function formatNumber(num) {
  if (num == null) return '0';
  return new Intl.NumberFormat('en-US').format(num);
}

// Build the vehicle detail HTML
function buildVehicleDetailHTML(vehicle) {
  const title = `${vehicle.inv_year} ${vehicle.inv_make} ${vehicle.inv_model}`;
  const price = formatPrice(vehicle.inv_price);
  const miles = formatNumber(vehicle.inv_miles);

  return `
    <section class="vehicle-detail">
      <div class="vehicle-detail__grid">
        <figure class="vehicle-detail__image">
          <img src="${vehicle.inv_image}" alt="${title} full-size image" loading="lazy"/>
        </figure>

        <div class="vehicle-detail__info">
          <h1 class="vehicle-detail__title">${title}</h1>
          <p class="vehicle-detail__price">${price}</p>

          <dl class="vehicle-detail__specs">
            <div>
              <dt>Make</dt><dd>${vehicle.inv_make}</dd>
            </div>
            <div>
              <dt>Model</dt><dd>${vehicle.inv_model}</dd>
            </div>
            <div>
              <dt>Year</dt><dd>${vehicle.inv_year}</dd>
            </div>
            <div>
              <dt>Mileage</dt><dd>${miles} miles</dd>
            </div>
            <div>
              <dt>Color</dt><dd>${vehicle.inv_color || 'N/A'}</dd>
            </div>
            <div>
              <dt>Price</dt><dd>${price}</dd>
            </div>
          </dl>

          <div class="vehicle-detail__desc">
            <h2>Description</h2>
            <p>${vehicle.inv_description || 'No description available.'}</p>
          </div>
        </div>
      </div>
    </section>
  `;
}

// Build the classification grid HTML
function buildClassificationGrid(data) {
  let grid = '<ul id="inv-display">';
  data.forEach(vehicle => {
    grid += `
      <li>
        <a href="/inv/detail/${vehicle.inventory_id}" title="View ${vehicle.inv_make} ${vehicle.inv_model} details">
          <img src="${vehicle.inv_image}" alt="Image of ${vehicle.inv_make} ${vehicle.inv_model}">
        </a>
        <div class="namePrice">
          <h2>${vehicle.inv_make} ${vehicle.inv_model}</h2>
          <span>${formatPrice(vehicle.inv_price)}</span>
        </div>
      </li>
    `;
  });
  grid += '</ul>';
  return grid;
}

// ✅ Build the classification dropdown for forms
async function buildClassificationList(selectedId = null) {
  const data = await invModel.getClassifications();
  let list = "";
  data.forEach((classification) => {
    list += `<option value="${classification.classification_id}" ${selectedId == classification.classification_id ? "selected" : ""}>${classification.classification_name}</option>`;
  });
  return list;
}

// ✅ Build the navigation bar dynamically
async function getNav() {
  try {
    const sql = `
      SELECT classification_id, classification_name
      FROM classification
      ORDER BY classification_name;
    `;
    const result = await pool.query(sql);
    const rows = result.rows;

    let nav = '<ul>';
    nav += `<li><a href="/">Home</a></li>`;
    rows.forEach(row => {
      nav += `<li><a href="/inv/type/${row.classification_id}" title="View our ${row.classification_name} vehicles">${row.classification_name}</a></li>`;
    });
    nav += `<li><a href="/account" title="Manage your account">My Account</a></li>`;
    nav += '</ul>';
    return nav;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  buildVehicleDetailHTML,
  buildClassificationGrid,
  formatPrice,
  formatNumber,
  getNav,
  buildClassificationList
};