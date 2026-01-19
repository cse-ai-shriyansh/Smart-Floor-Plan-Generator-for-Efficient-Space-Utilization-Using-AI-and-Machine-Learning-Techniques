import type { NextApiRequest, NextApiResponse } from 'next';

type ResponseData = {
  success: boolean;
  message: string;
  data?: any;
  error?: string;
};

/**
 * API Route: /api/tutorial-status
 * 
 * Tracks user's tutorial completion status
 * 
 * GET: Retrieve tutorial status
 * POST: Update tutorial status
 */
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method === 'GET') {
    // TODO: Implement retrieval of tutorial status from database
    return res.status(200).json({
      success: true,
      message: 'Tutorial status retrieved',
      data: {
        completed: false,
        currentStep: 1,
        lastVisited: new Date().toISOString()
      }
    });
  }

  if (req.method === 'POST') {
    const { completed, currentStep } = req.body;

    // TODO: Implement saving tutorial status to database
    return res.status(200).json({
      success: true,
      message: 'Tutorial status updated',
      data: {
        completed,
        currentStep,
        updatedAt: new Date().toISOString()
      }
    });
  }

  return res.status(405).json({
    success: false,
    message: 'Method not allowed',
    error: 'Only GET and POST requests are accepted'
  });
}
