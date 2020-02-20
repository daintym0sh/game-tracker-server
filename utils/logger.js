const winston = require('winston');
const { format } = winston;
const { errors } = format;

const logger = winston.createLogger({
    format: winston.format.simple(),
    transports: [
        new winston.transports.File({ filename: 'game-tracker-server.log' })
    ]
});

logger.add(new winston.transports.Console(
    {
        format: format.combine(
            errors({stack: true}),
            format.timestamp(),
            format.colorize(),
            format.simple()
        )
    }
));

module.exports = logger;