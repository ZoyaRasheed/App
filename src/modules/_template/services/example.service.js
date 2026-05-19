import { getMongoose } from '../../../config/databases.js';
import { logger } from '../../../shared/index.js';

export const exampleService = async (data) => {
  try {
    logger.info('Example service called', { data });

    const mongoose = getMongoose();

    return { success: true };
  } catch (error) {
    logger.error('Example service failed', {
      error: error.message,
      data,
    });
    throw error;
  }
};
