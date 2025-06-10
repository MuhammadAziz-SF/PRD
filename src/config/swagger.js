import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUI from 'swagger-ui-express';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Job Platform API',
      version: '1.0.0',
      description: 'API documentation for the Job Platform',
      contact: {
        name: 'API Support',
        email: 'support@jobplatform.com',
      },
    },
    servers: [
      {
        url: '/api',
        description: 'Development server',
      },
    ],
    components: {
      schemas: {
        Job: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              format: 'uuid',
              description: 'Unique identifier for the job',
            },
            companyId: {
              type: 'string',
              format: 'uuid',
              description: 'ID of the company posting the job',
            },
            title: {
              type: 'string',
              description: 'Job title',
            },
            description: {
              type: 'string',
              description: 'Detailed job description',
            },
            category: {
              type: 'string',
              description: 'Job category',
            },
            type: {
              type: 'string',
              enum: ['full-time', 'part-time'],
              description: 'Job type',
            },
            country: {
              type: 'string',
              description: 'Country where the job is located',
            },
            city: {
              type: 'string',
              description: 'City where the job is located',
            },
            relocationAssistance: {
              type: 'boolean',
              description: 'Whether relocation assistance is provided',
            },
            remoteOption: {
              type: 'boolean',
              description: 'Whether remote work is an option',
            },
            salaryMin: {
              type: 'integer',
              description: 'Minimum salary',
            },
            salaryMax: {
              type: 'integer',
              description: 'Maximum salary',
            },
            salaryCurrency: {
              type: 'string',
              description: 'Currency of the salary',
            },
            salaryPeriod: {
              type: 'boolean',
              description: 'Salary period (true: annual, false: monthly)',
            },
            visaSponsorship: {
              type: 'boolean',
              description: 'Whether visa sponsorship is provided',
            },
            experienceLevel: {
              type: 'string',
              description: 'Required experience level',
            },
            educationRequirement: {
              type: 'string',
              description: 'Required education level',
            },
            status: {
              type: 'string',
              enum: ['draft', 'active', 'closed', 'expired'],
              description: 'Current status of the job posting',
            },
            deadline: {
              type: 'string',
              format: 'date',
              description: 'Application deadline',
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'When the job was created',
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
              description: 'When the job was last updated',
            },
          },
        },
        JobSearchResponse: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
              example: true,
            },
            count: {
              type: 'integer',
              example: 10,
            },
            data: {
              type: 'array',
              items: {
                $ref: '#/components/schemas/Job',
              },
            },
            pagination: {
              type: 'object',
              properties: {
                limit: {
                  type: 'integer',
                  example: 10,
                },
                offset: {
                  type: 'integer',
                  example: 0,
                },
                total: {
                  type: 'integer',
                  example: 100,
                },
                hasMore: {
                  type: 'boolean',
                  example: true,
                },
              },
            },
          },
        },
        Error: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
              example: false,
            },
            message: {
              type: 'string',
              example: 'An error occurred',
            },
            error: {
              type: 'string',
              example: 'Error details',
            },
          },
        },
      }
    },
  },
  apis: ['./src/routes/**/*.js'], // Path to the API routes files
};

const swaggerSpec = swaggerJSDoc(options);

export const setupSwagger = (app) => {
  // Swagger UI setup
  app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));

  // Serve swagger.json
  app.get('/api-docs.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  });
}; 