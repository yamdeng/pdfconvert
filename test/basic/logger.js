const logger = require('../../logger');

logger.info('aaa');

setTimeout(() => {
    logger.info('bbb');
}, 1000);