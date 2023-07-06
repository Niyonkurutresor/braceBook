import { randomBytes } from 'crypto';

const randomString = async () => randomBytes(30).toString('hex');

export default randomString;
