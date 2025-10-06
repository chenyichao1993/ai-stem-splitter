import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { ApiResponse, AuthResponse, LoginRequest, RegisterRequest } from '../types';
import { createError } from '../middleware/errorHandler';

const router = express.Router();

// In-memory storage for demo (replace with database in production)
const users = new Map<string, any>();

// POST /api/auth/register - User registration
router.post('/register', async (req, res, next) => {
  try {
    const { email, password, name }: RegisterRequest = req.body;

    // Validation
    if (!email || !password || !name) {
      throw createError('Email, password, and name are required', 400);
    }

    if (password.length < 6) {
      throw createError('Password must be at least 6 characters', 400);
    }

    // Check if user already exists
    if (users.has(email)) {
      throw createError('User already exists', 409);
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create user
    const user = {
      id: Date.now().toString(),
      email,
      name,
      password: hashedPassword,
      subscriptionType: 'free',
      createdAt: new Date(),
      updatedAt: new Date()
    };

    users.set(email, user);

    // Generate JWT token
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET || 'fallback-secret',
      { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
    );

    const response: ApiResponse<AuthResponse> = {
      success: true,
      data: {
        user: {
          email: user.email,
          name: user.name,
          subscriptionType: user.subscriptionType,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt
        },
        token
      },
      message: 'User registered successfully'
    };

    res.status(201).json(response);
  } catch (error) {
    next(error);
  }
});

// POST /api/auth/login - User login
router.post('/login', async (req, res, next) => {
  try {
    const { email, password }: LoginRequest = req.body;

    // Validation
    if (!email || !password) {
      throw createError('Email and password are required', 400);
    }

    // Find user
    const user = users.get(email);
    if (!user) {
      throw createError('Invalid credentials', 401);
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw createError('Invalid credentials', 401);
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET || 'fallback-secret',
      { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
    );

    const response: ApiResponse<AuthResponse> = {
      success: true,
      data: {
        user: {
          email: user.email,
          name: user.name,
          subscriptionType: user.subscriptionType,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt
        },
        token
      },
      message: 'Login successful'
    };

    res.json(response);
  } catch (error) {
    next(error);
  }
});

// GET /api/auth/me - Get current user
router.get('/me', async (req, res, next) => {
  try {
    // TODO: Implement JWT middleware for authentication
    const response: ApiResponse = {
      success: true,
      message: 'Authentication middleware not implemented yet'
    };

    res.json(response);
  } catch (error) {
    next(error);
  }
});

export default router;
