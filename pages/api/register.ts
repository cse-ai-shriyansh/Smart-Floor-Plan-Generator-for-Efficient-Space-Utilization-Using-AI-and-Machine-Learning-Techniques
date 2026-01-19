import type { NextApiRequest, NextApiResponse } from 'next';

type ResponseData = {
  success: boolean;
  message: string;
  data?: any;
  error?: string;
};

/**
 * API Route: /api/register
 * 
 * Handles user registration
 * 
 * Expected Request Body:
 * {
 *   fullName: string,
 *   email: string,
 *   password: string,
 *   confirmPassword: string,
 *   role?: string
 * }
 */
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      message: 'Method not allowed',
      error: 'Only POST requests are accepted'
    });
  }

  try {
    const { fullName, email, password, confirmPassword, role } = req.body;

    // Validation
    if (!fullName || !email || !password || !confirmPassword) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        error: 'All required fields must be provided'
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        error: 'Passwords do not match'
      });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        error: 'Invalid email format'
      });
    }

    // TODO: Implement actual user registration logic
    // - Check if user already exists
    // - Hash password
    // - Save to database
    // - Send verification email

    // Simulate successful registration
    return res.status(201).json({
      success: true,
      message: 'Registration successful',
      data: {
        userId: 'user_' + Date.now(),
        fullName,
        email,
        role: role || 'student'
      }
    });

  } catch (error) {
    console.error('Registration error:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: 'Failed to process registration'
    });
  }
}
