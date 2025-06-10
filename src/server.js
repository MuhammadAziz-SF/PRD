import app from './app.js';
import config from './config/index.js';
import logger from './config/winston.js';

const PORT = config.port;

app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});
