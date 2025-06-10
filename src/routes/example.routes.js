import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Add a root path handler to show available examples
router.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Examples API',
    availableExamples: [
      { path: '/examples/job-search', description: 'Job Search Example' }
    ]
  });
});

router.get('/job-search', (req, res) => {
  res.sendFile(path.join(__dirname, '../examples/job-search.html'));
});

export default router; 