const winston = require('winston');
const { format } = winston;

const logger = winston.createLogger({
    format: winston.format.simple(),
    transports: [
        new winston.transports.File({ filename: 'game-tracker-server.log' })
    ]
});

if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console(
        {
            format: format.combine(
                format.timestamp(),
                format.colorize(),
                format.simple()
            )
        }
    ));
}

module.exports = logger;