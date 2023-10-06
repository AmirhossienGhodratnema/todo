import { compare, hash } from "bcryptjs";

async function hashPassword(password) {
    const hashPasswor = await hash(password, 12);
    return hashPasswor;
};

async function verifyPassword(password, hash) {
    const result = await compare(password, hash);
    return result;
};


export { hashPassword, verifyPassword };