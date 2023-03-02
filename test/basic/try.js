const logger = require('../../logger');
const test = {};

try {
    console.log(test.aaa.bb);
} catch(e) {
    // logger.error('error : ', e);
    logger.error(e.stack);
}