import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import AuthRouter from './routes/auth.routes.js';
import AddressRouter from './routes/address.routes.js';
import CertificationRouter from './routes/certification.routes.js';
import EducationRouter from './routes/education.routes.js';
import LanguageRouter from './routes/language.routes.js';
import SkillRouter from './routes/skill.routes.js';
import WorkExperienceRouter from './routes/work-experience.routes.js';
import jobSearchRoutes from './routes/job-search.routes.js';
import exampleRoutes from './routes/example.routes.js';
import errorHandler from './utils/errorHandler.js';

// Initialize express application
const app = express();

// Test edit - this should trigger a reload
// Configure middleware
app.use(cors());
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'", "unpkg.com"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      connectSrc: ["'self'", "localhost:*"],
      imgSrc: ["'self'", "data:"],
      fontSrc: ["'self'", "data:"],
    },
  },
}));
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Root route - welcome page
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Welcome to Job Platform API',
    version: '1.0.0'
  });
});

// API root endpoint
app.get('/api', (req, res) => {
  res.json({
    success: true,
    message: 'Job Platform API',
    version: '1.0.0',
    availableEndpoints: [
      { path: '/api/auth', description: 'Authentication and user management' },
      { path: '/api/jobs/search', description: 'Job search functionality' }
    ]
  });
});

app.use('/api/auth', AuthRouter);
app.use('/api/', AddressRouter);
app.use('/api/', CertificationRouter);
app.use('/api/', EducationRouter);
app.use('/api/', LanguageRouter);
app.use('/api/', SkillRouter);
app.use('/api/', WorkExperienceRouter);
app.use('/api/jobs/search', jobSearchRoutes);

// Example Routes
app.use('/examples', exampleRoutes);

app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'ok',
    serverTime: new Date().toISOString(),
    message: 'Server is healthy and running' 
  });
});

app.use(errorHandler);

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Resource not found',
  });
});

export default app;
