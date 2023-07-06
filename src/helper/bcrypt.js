/* eslint-disable no-return-await */
import { hash, genSalt, compareSync } from 'bcrypt';

const generate = async (password) => await hash(password, await (0, genSalt)(10));
const check = async (password, dbPassowrd) => compareSync(password, dbPassowrd);

export { generate, check };
