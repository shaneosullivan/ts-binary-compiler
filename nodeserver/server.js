const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const multer = require('multer');

const app = express();
const PORT = 3101;

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
            'POST /test/form': 'Form data test (no files)',
            'POST /test/binary': 'Binary data test',
            'POST /test/upload': 'File upload test (single file)',
            'POST /test/multi-upload': 'Multiple file upload test',
            'POST /test/formdata-mixed': 'FormData with mixed fields and files',
            'GET /test/status/:code': 'Custom status code test',
            'GET /test/delay/:ms': 'Delayed response test',
            'POST /test/validate': 'Comprehensive validation test',
            'GET /test/blob/text': 'Returns text as blob',
            'GET /test/blob/binary': 'Returns binary data as blob',
            'GET /test/blob/image': 'Returns fake image data as blob',
            'GET /test/blob/json': 'Returns JSON as blob',
            'GET /test/blob/empty': 'Returns empty blob'
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
            mimetype: req.file.mimetype,
            content: req.file.buffer.toString('utf-8').substring(0, 100),
            formFields: req.body
        } : null
    ));
});

// Multi-file upload endpoint
app.post('/test/multi-upload', upload.array('files', 10), (req, res) => {
    const hasFiles = req.files && req.files.length > 0;

    res.json(createResponse(req, hasFiles,
        hasFiles ? `${req.files.length} file(s) uploaded` : 'No files uploaded',
        hasFiles ? {
            files: req.files.map(f => ({
                filename: f.originalname,
                size: f.size,
                mimetype: f.mimetype
            })),
            formFields: req.body
        } : null
    ));
});

// FormData with mixed fields and files
app.post('/test/formdata-mixed', upload.fields([
    { name: 'file', maxCount: 1 },
    { name: 'file1', maxCount: 1 },
    { name: 'file2', maxCount: 1 }
]), (req, res) => {
    const fileCount = req.files ? Object.keys(req.files).reduce((count, key) => count + req.files[key].length, 0) : 0;
    const fieldCount = Object.keys(req.body).length;

    const filesData = {};
    if (req.files) {
        for (const [fieldName, files] of Object.entries(req.files)) {
            filesData[fieldName] = files.map(f => ({
                filename: f.originalname,
                size: f.size,
                mimetype: f.mimetype,
                content: f.buffer.toString('utf-8').substring(0, 50)
            }));
        }
    }

    res.json(createResponse(req, true,
        `FormData received: ${fieldCount} field(s), ${fileCount} file(s)`,
        {
            fields: req.body,
            files: filesData
        }
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

// Blob endpoints - return binary data with proper content-type
app.get('/test/blob/text', (req, res) => {
    const text = 'Hello from blob endpoint! This is text data.';
    res.setHeader('Content-Type', 'text/plain');
    res.setHeader('Content-Length', Buffer.byteLength(text));
    res.send(text);
});

app.get('/test/blob/binary', (req, res) => {
    // Create binary data (sequence of bytes)
    const buffer = Buffer.from([0x48, 0x65, 0x6C, 0x6C, 0x6F, 0x20, 0x42, 0x69, 0x6E, 0x61, 0x72, 0x79]); // "Hello Binary"
    res.setHeader('Content-Type', 'application/octet-stream');
    res.setHeader('Content-Length', buffer.length);
    res.send(buffer);
});

app.get('/test/blob/image', (req, res) => {
    // Create fake PNG header + some data (not a real image, just for testing)
    const pngHeader = Buffer.from([0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A]); // PNG signature
    const fakeData = Buffer.from('fake image data');
    const buffer = Buffer.concat([pngHeader, fakeData]);

    res.setHeader('Content-Type', 'image/png');
    res.setHeader('Content-Length', buffer.length);
    res.send(buffer);
});

app.get('/test/blob/json', (req, res) => {
    const jsonData = JSON.stringify({ message: 'This is JSON as a blob', value: 42, nested: { key: 'value' } });
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Content-Length', Buffer.byteLength(jsonData));
    res.send(jsonData);
});

app.get('/test/blob/empty', (req, res) => {
    res.setHeader('Content-Type', 'application/octet-stream');
    res.setHeader('Content-Length', 0);
    res.send('');
});

app.get('/test/blob/large', (req, res) => {
    // Create a large binary blob (100KB)
    const size = 100 * 1024; // 100KB
    const buffer = Buffer.alloc(size);
    // Fill with pattern for verification
    for (let i = 0; i < size; i++) {
        buffer[i] = i % 256;
    }

    res.setHeader('Content-Type', 'application/octet-stream');
    res.setHeader('Content-Length', buffer.length);
    res.send(buffer);
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