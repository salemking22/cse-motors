const express = require('express')
const path = require('path')

const app = express()
const PORT = 5500

// Set EJS as the template engine
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

// Serve static files (CSS, images, etc.)
app.use(express.static(path.join(__dirname, 'public')))

// Route for home page
app.get('/', (req, res) => {
    res.render('index')
})

// Start the server
app.listen(PORT, () => {
    console.log(`🚗 CSE Motors server running at http://localhost:${PORT}`)
})
