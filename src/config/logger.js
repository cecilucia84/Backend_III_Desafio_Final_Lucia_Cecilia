import winston from 'winston';
import fs from 'fs';
import path from 'path';

// Carpeta logs:
const logDir = 'logs';
if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir, { recursive: true });
}

const customLevels = {
    levels: {
        fatal: 0,
        error: 1,
        warn: 2,
        info: 3,
        http: 4,
        debug: 5,
    },
    colors: {
        fatal: 'redBG',
        error: 'red',
        warn: 'yellow',
        info: 'green',
        http: 'cyan',
        debug: 'blue',
    }
};

winston.addColors(customLevels.colors);


const logger = winston.createLogger({
    levels: customLevels.levels,
    level: 'debug',
    format: winston.format.combine(
        winston.format.colorize({ all: true }),
        winston.format.timestamp(),
        winston.format.printf(({ level, message, timestamp }) => {
            return `[${timestamp}] ${level}: ${message}`;
        })
    ),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: path.join(logDir, 'error.log'), level: 'error' }),
        new winston.transports.File({ filename: path.join(logDir, 'fatal.log'), level: 'fatal' }),
        new winston.transports.File({ filename: path.join(logDir, 'combined.log') })
    ],
});

export default logger;
