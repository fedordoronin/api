import * as nconf from 'nconf';
import * as path from 'path';

export default nconf.file({ file: path.resolve(__dirname, '../../config.json') });