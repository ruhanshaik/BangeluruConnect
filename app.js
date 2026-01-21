const express = require('express');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Set view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Sample jobs data (temporary, until we add database)
let jobs = [
    {
        id: 1,
        title: 'Software Developer',
        company: 'TechCorp',
        location: 'Bangalore',
        type: 'Full-time',
        experience: '0-2 years',
        salary: '₹8-12 LPA',
        postedDate: new Date().toISOString(),
        shortDescription: 'Looking for a passionate software developer.',
        fullDescription: 'Full job description goes here...',
        status: 'active'
    }
];

// Helper function
function formatDate(dateString) {
    return 'Today';
}

// ============ ROUTES ============

// Homepage
app.get('/', (req, res) => {
    res.render('index', {
        title: 'Bangalore Connect - Find Your Dream Job',
        jobs: jobs.filter(job => job.status === 'active'),
        formatDate: formatDate
    });
});

// Job Detail Page
app.get('/job/:id', (req, res) => {
    const job = jobs.find(j => j.id === parseInt(req.params.id));
    if (!job) {
        return res.status(404).send('Job not found');
    }
    res.render('job-detail', {
        title: `${job.title} at ${job.company}`,
        job,
        formatDate: formatDate
    });
});

// Admin Login Page
app.get('/admin/login', (req, res) => {
    res.render('admin', {
        title: 'Admin Login',
        error: null,
        captcha: 'TEST123'
    });
});

// Health check for Railway (IMPORTANT!)
app.get('/health', (req, res) => {
    res.status(200).json({ 
        status: 'OK', 
        message: 'BangaloreConnect is running',
        timestamp: new Date().toISOString()
    });
});

// Basic test route
app.get('/test', (req, res) => {
    res.send('🚀 BangaloreConnect is working!');
});

// Start server - MUST use 0.0.0.0 for Railway
app.listen(PORT, '0.0.0.0', () => {
    console.log(`✅ Server running on port ${PORT}`);
    console.log(`🌐 URL: http://0.0.0.0:${PORT}`);
    console.log(`🔗 Test URL: http://0.0.0.0:${PORT}/test`);
    console.log(`💚 Health check: http://0.0.0.0:${PORT}/health`);
});
