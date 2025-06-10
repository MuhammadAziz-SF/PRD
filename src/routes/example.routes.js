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
    examples: [
      {
        id: '1',
        name: 'Example 1',
        description: 'This is an example',
      },
      {
        id: '2',
        name: 'Example 2',
        description: 'This is another example',
      },
    ],
  });
});

router.get('/:id', (req, res) => {
  res.json({
    success: true,
    data: {
      id: req.params.id,
      name: `Example ${req.params.id}`,
      description: 'This is an example',
    },
  });
});

export default router; 