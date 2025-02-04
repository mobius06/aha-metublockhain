import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { v4 as uuidv4 } from 'uuid';
import winston from 'winston';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
// import OpenAI from 'openai';

/**
 * Logger Configuration
 */
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' })
  ]
});

// Initialize Express and OpenAI

const app = express();
// const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });


// Security Middleware
app.use(helmet());
app.use(cors({
  origin: ['http://localhost:3000', 'https://yourdomain.com']
}));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
});
app.use(limiter);

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/**
 * Validates required parameters in the request body
 * @param {Object} req - Express request object
 * @returns {Array} Array of missing parameter errors
 */
const checkRequiredParams = (req) => {
  const requiredParams = ['age', 'weight', 'height', 'bloodPressure', 'heartRate'];
  const missingParams = [];

  requiredParams.forEach(param => {
    if (!req.body[param]) {
      missingParams.push(param);
    }
  });

  return missingParams;
};

/**
 * Enhanced Health Data Validation Middleware
 */
const validateHealthData = (req, res, next) => {
  // Check required parameters
  const missingParams = checkRequiredParams(req);
  if (missingParams.length > 0) {
    return res.status(400).json({
      status: 'error',
      message: 'Missing required health parameters',
      missingParams
    });
  }

  const { age, weight, height, bloodPressure, heartRate, medicalHistory } = req.body;
  const errors = [];

  // Validate parameter ranges
  if (!age || !weight || !height || !bloodPressure || !heartRate)
    errors.push('Missing required health parameters')
  if (age < 0 || age > 120) 
    errors.push('Invalid age (must be between 0-120)');
  if (weight <= 0 || weight > 500) 
    errors.push('Invalid weight (must be between 0-500 kg)');
  if (height <= 0 || height > 300) 
    errors.push('Invalid height (must be between 0-300 cm)');
  if (heartRate <= 0 || heartRate > 220)
    errors.push('Invalid heart rate (must be between 0-220 bpm)');
  
  // Validate blood pressure format
  if (!/^\d{2,3}\/\d{2,3}$/.test(bloodPressure)) {
    errors.push('Invalid blood pressure format (should be like "120/80")');
  }

  if (errors.length > 0) {
    return res.status(400).json({ 
      status: 'error',
      errors 
    });
  }

  next();
};

/**
 * Root endpoint
 */
app.get('/', (req, res) => {
  res.json({
    message: 'Health Backend Server',
    status: 'running',
    endpoints: [
      '/recommendations',
      '/health-data',
      '/store-health-data'
    ]
  });
});

/**
 * AI-Powered Health Recommendations Endpoint (needed to api key)
 */
/*app.post('/recommendations', validateHealthData, async (req, res) => {
  try {
    const { age, weight, height, bloodPressure, heartRate, medicalHistory } = req.body;

    const aiResponse = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system", 
          content: "You are a health advisor providing personalized recommendations."
        },
        {
          role: "user", 
          content: `Provide health recommendations for a ${age} year old 
                    weighing ${weight}kg, height ${height}cm, 
                    blood pressure ${bloodPressure}, heart rate ${heartRate},
                    medical history: ${medicalHistory || 'None'}`
        }
      ]
    });

    const recommendations = {
      id: uuidv4(),
      diet: aiResponse.choices[0].message.content,
      timestamp: new Date().toISOString()
    };

    logger.info('Health Recommendation Generated', { 
      userId: req.body.userId, 
      recommendationId: recommendations.id 
    });

    res.json({
      status: 'success',
      data: recommendations
    });
  } catch (error) {
    logger.error('Recommendation Generation Error', { error });
    res.status(500).json({ 
      status: 'error', 
      message: 'Failed to generate recommendations' 
    });
  }
});
*/

// Remove OpenAI import and initialization
// Replace the recommendations endpoint with:

app.post('/recommendations', validateHealthData, async (req, res) => {
  try {
    const { age, weight, height, bloodPressure, heartRate } = req.body;

    const mockRecommendations = {
      id: uuidv4(),
      recommendations: {
        diet: "Balanced diet with plenty of vegetables",
        exercise: "30 minutes of moderate exercise daily",
        lifestyle: "Regular sleep schedule recommended",
        monitoring: `Regular monitoring of blood pressure (current: ${bloodPressure})`
      },
      timestamp: new Date().toISOString()
    };

    res.json({
      status: 'success',
      data: mockRecommendations
    });
  } catch (error) {
    logger.error('Recommendation Generation Error', { error });
    res.status(500).json({ 
      status: 'error', 
      message: 'Failed to generate recommendations' 
    });
  }
});

// Error Handler
app.use((err, req, res, next) => {
  logger.error(err.stack);
  res.status(500).json({
    status: 'error',
    message: 'Unexpected server error'
  });
});

// Server Configuration
const PORT = process.env.PORT || 5001;
const server = app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});

// Graceful Shutdown
process.on('SIGTERM', () => {
  logger.info('SIGTERM received. Shutting down gracefully');
  server.close(() => {
    logger.info('Process terminated');
    process.exit(0);
  });
});

export default app;