import { httpResponse, responseMessage, httpError, asyncHandler, logger } from '../../../shared/index.js';
import aiFuction from '../../../config/ai.js';

const health = asyncHandler(async (req, res) => {
  return httpResponse(req, res, 200, responseMessage.custom('AI module is healthy'), {
    module: 'AI',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    version: process.env.npm_package_version || '1.0.0'
  });
});

const ai = asyncHandler(async (req, res) => {
  try {
    const response = await aiFuction(req.body.userPrompt);

    return httpResponse(req, res, 200, responseMessage.SUCCESS.OK, response);
  } catch (error) {
    logger.error(`AI request failed: ${error.message}`, { error });
    return httpError(req, res, 500, responseMessage.error('AI request failed'));
  }
});
export {
  health,
  ai
};
