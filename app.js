const express = require('express');
const path = require('path');

const app = express();

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Serve static files (CSS, images)
app.use(express.static(path.join(__dirname, 'public')));

// Parse JSON and form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Import inventory routes
const inventoryRoutes = require('./routes/inventory.route');

// Home route
app.get('/', (req, res) => {
    res.render('index', { title: 'CSE Motors' });
});

// Mount inventory routes
app.use('/inventory', inventoryRoutes);

// 404 handler (must be after routes)
app.use((req, res, next) => {
    res.status(404).render('errors/404', {
        title: 'Page Not Found',
        message: 'The page you are looking for does not exist.'
    });
});

// 500 error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).render('errors/500', {
        title: 'Server Error',
        message: err.message
    });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
