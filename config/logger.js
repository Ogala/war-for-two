// Logging system activity
const { createLogger, format, transports } = require('winston');
const { combine, timestamp, printf } = format;
const targets = [];

// omit logger transport during tests
if (process.env.NODE_ENV === 'test') {
  // Write logs from latest test to a file. Overwrites file each time tests are run.
  targets.push(new transports.File({
    filename: './tests/log/test.log',
    level: 'debug',
    maxsize: 10000,
    maxFiles: 10,
  }));
} else {
  targets.push(new transports.Console());
}

const logFormat = printf(({ level, message, timestamp }) => `${timestamp} ${level.toUpperCase()} - ${message}`); // eslint-disable-line no-shadow

const logger = createLogger({
  transports: targets,
  level: 'debug',
  format: combine(
    timestamp(),
    logFormat,
  ),
});

logger.stream = {
  write(message) {
    logger.info(message);
  },
};

module.exports = logger;