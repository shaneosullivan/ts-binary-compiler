const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const multer = require('multer');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.text({ limit: '10mb' }));
app.use(bodyParser.raw({ limit: '10mb', type: 'application/octet-stream' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));

// Multer for file uploads
const upload = multer({ storage: multer.memoryStorage() });

// Helper function to create standardized responses
function createResponse(req, success = true, message = 'Success', data = null) {
    const response = {
        success,
        message,
        method: req.method,
        url: req.url,
        headers: req.headers,
        query: req.query,
        timestamp: new Date().toISOString()
    };
    
    if (req.body && Object.keys(req.body).length > 0) {
        response.body = req.body;
    }
    
    if (data) {
        response.data = data;
    }
    
    return response;
}

// Validation helpers
function validateContentType(req, expectedType) {
    const contentType = req.get('content-type');
    return contentType && contentType.includes(expectedType);
}

function validateRequiredHeaders(req, requiredHeaders) {
    const missing = requiredHeaders.filter(header => !req.get(header));
    return missing.length === 0 ? null : missing;
}

function validateJsonBody(req) {
    if (!req.body) return false;
    try {
        if (typeof req.body === 'string') {
            JSON.parse(req.body);
        }
        return true;
    } catch {
        return false;
    }
}

// Root endpoint
app.get('/', (req, res) => {
    res.json({
        message: 'Fetch API Test Server',
        version: '1.0.0',
        endpoints: {
            'GET /test': 'Basic GET test',
            'POST /test': 'POST with JSON body',
            'PUT /test': 'PUT request test',
            'DELETE /test': 'DELETE request test',
            'PATCH /test': 'PATCH request test',
            'HEAD /test': 'HEAD request test',
            'OPTIONS /test': 'OPTIONS request test',
            'GET /test/headers': 'Header validation test',
            'POST /test/json': 'JSON validation test',
            'POST /test/form': 'Form data test',
            'POST /test/binary': 'Binary data test',
            'POST /test/upload': 'File upload test',
            'GET /test/status/:code': 'Custom status code test',
            'GET /test/delay/:ms': 'Delayed response test',
            'POST /test/validate': 'Comprehensive validation test'
        }
    });
});

// GET endpoint
app.get('/test', (req, res) => {
    res.json(createResponse(req, true, 'GET request successful'));
});

// GET with query parameters
app.get('/test/query', (req, res) => {
    const hasQuery = Object.keys(req.query).length > 0;
    res.json(createResponse(req, hasQuery, 
        hasQuery ? 'Query parameters received' : 'No query parameters'
    ));
});

// Header validation endpoint
app.get('/test/headers', (req, res) => {
    const userAgent = req.get('user-agent');
    const customHeader = req.get('x-custom-header');
    
    const hasUserAgent = !!userAgent;
    const hasCustomHeader = !!customHeader;
    
    res.json(createResponse(req, hasUserAgent && hasCustomHeader, 
        hasUserAgent && hasCustomHeader ? 'Required headers present' : 'Missing required headers',
        { userAgent, customHeader }
    ));
});

// POST endpoint
app.post('/test', (req, res) => {
    const hasBody = req.body && (typeof req.body === 'object' || typeof req.body === 'string');
    res.json(createResponse(req, hasBody, 
        hasBody ? 'POST request with body successful' : 'POST request missing body'
    ));
});

// JSON validation endpoint
app.post('/test/json', (req, res) => {
    const isValidContentType = validateContentType(req, 'application/json');
    const isValidJson = validateJsonBody(req);
    
    const success = isValidContentType && isValidJson;
    const message = success ? 'Valid JSON received' : 
        !isValidContentType ? 'Invalid content-type for JSON' : 'Invalid JSON body';
    
    res.json(createResponse(req, success, message));
});

// Form data endpoint
app.post('/test/form', upload.none(), (req, res) => {
    const isValidContentType = validateContentType(req, 'application/x-www-form-urlencoded') ||
                              validateContentType(req, 'multipart/form-data');
    const hasFormData = Object.keys(req.body).length > 0;
    
    const success = isValidContentType && hasFormData;
    const message = success ? 'Form data received' : 'Invalid or missing form data';
    
    res.json(createResponse(req, success, message));
});

// Binary data endpoint
app.post('/test/binary', (req, res) => {
    const isValidContentType = validateContentType(req, 'application/octet-stream');
    const hasBinaryData = req.body && Buffer.isBuffer(req.body);
    
    const success = isValidContentType && hasBinaryData;
    const message = success ? `Binary data received (${req.body.length} bytes)` : 'Invalid binary data';
    
    res.json(createResponse(req, success, message, 
        hasBinaryData ? { size: req.body.length } : null
    ));
});

// File upload endpoint
app.post('/test/upload', upload.single('file'), (req, res) => {
    const hasFile = req.file && req.file.buffer;
    
    res.json(createResponse(req, hasFile, 
        hasFile ? `File uploaded: ${req.file.originalname} (${req.file.size} bytes)` : 'No file uploaded',
        hasFile ? { 
            filename: req.file.originalname, 
            size: req.file.size, 
            mimetype: req.file.mimetype 
        } : null
    ));
});

// PUT endpoint
app.put('/test', (req, res) => {
    const hasBody = req.body && Object.keys(req.body).length > 0;
    res.json(createResponse(req, hasBody, 
        hasBody ? 'PUT request successful' : 'PUT request missing body'
    ));
});

// DELETE endpoint
app.delete('/test', (req, res) => {
    res.json(createResponse(req, true, 'DELETE request successful'));
});

// PATCH endpoint
app.patch('/test', (req, res) => {
    const hasBody = req.body && Object.keys(req.body).length > 0;
    res.json(createResponse(req, hasBody, 
        hasBody ? 'PATCH request successful' : 'PATCH request missing body'
    ));
});

// HEAD endpoint
app.head('/test', (req, res) => {
    res.set('x-test-header', 'HEAD response');
    res.status(200).end();
});

// OPTIONS endpoint
app.options('/test', (req, res) => {
    res.set('Allow', 'GET, POST, PUT, DELETE, PATCH, HEAD, OPTIONS');
    res.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, HEAD, OPTIONS');
    res.set('Access-Control-Allow-Headers', 'Content-Type, Authorization, x-custom-header');
    res.json(createResponse(req, true, 'OPTIONS request successful'));
});

// Custom status code endpoint
app.get('/test/status/:code', (req, res) => {
    const statusCode = parseInt(req.params.code);
    
    if (statusCode >= 100 && statusCode <= 599) {
        res.status(statusCode).json(createResponse(req, 
            statusCode >= 200 && statusCode < 300,
            `Custom status code ${statusCode}`,
            { requestedStatus: statusCode }
        ));
    } else {
        res.status(400).json(createResponse(req, false, 'Invalid status code'));
    }
});

// Delayed response endpoint
app.get('/test/delay/:ms', (req, res) => {
    const delayMs = parseInt(req.params.ms);
    
    if (delayMs >= 0 && delayMs <= 10000) {
        setTimeout(() => {
            res.json(createResponse(req, true, `Response delayed by ${delayMs}ms`, 
                { delay: delayMs }
            ));
        }, delayMs);
    } else {
        res.status(400).json(createResponse(req, false, 'Invalid delay (0-10000ms allowed)'));
    }
});

// Comprehensive validation endpoint
app.post('/test/validate', (req, res) => {
    const validations = {
        hasContentType: !!req.get('content-type'),
        hasUserAgent: !!req.get('user-agent'),
        hasBody: !!req.body,
        hasAuthHeader: !!req.get('authorization'),
        isJsonContentType: validateContentType(req, 'application/json'),
        isValidJson: validateJsonBody(req)
    };
    
    const requiredValidations = ['hasContentType', 'hasUserAgent', 'hasBody'];
    const passedRequired = requiredValidations.every(v => validations[v]);
    
    const score = Object.values(validations).filter(Boolean).length;
    const total = Object.keys(validations).length;
    
    res.json(createResponse(req, passedRequired, 
        `Validation score: ${score}/${total}`, 
        { validations, score, total, passedRequired }
    ));
});

// Error simulation endpoint
app.all('/test/error/:type', (req, res) => {
    const errorType = req.params.type;
    
    switch (errorType) {
        case 'timeout':
            // Simulate timeout (no response)
            setTimeout(() => {
                res.json(createResponse(req, false, 'Simulated timeout'));
            }, 35000); // Longer than typical fetch timeout
            break;
        case '400':
            res.status(400).json(createResponse(req, false, 'Bad Request'));
            break;
        case '401':
            res.status(401).json(createResponse(req, false, 'Unauthorized'));
            break;
        case '404':
            res.status(404).json(createResponse(req, false, 'Not Found'));
            break;
        case '500':
            res.status(500).json(createResponse(req, false, 'Internal Server Error'));
            break;
        default:
            res.status(400).json(createResponse(req, false, 'Unknown error type'));
    }
});

// Catch-all 404
app.use((req, res) => {
    res.status(404).json(createResponse(req, false, 'Endpoint not found'));
});

// Error handler
app.use((err, req, res, next) => {
    console.error('Server error:', err);
    res.status(500).json(createResponse(req, false, 'Server error', { error: err.message }));
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Fetch API Test Server running on http://localhost:${PORT}`);
    console.log(`📋 API documentation available at http://localhost:${PORT}`);
});

module.exports = app;