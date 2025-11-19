// controllers/homeController.js
const buildHome = async function(req, res) {
  res.render("index", { title: "Home" });
};

module.exports = { buildHome };