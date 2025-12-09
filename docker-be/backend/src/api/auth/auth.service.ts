import bcrypt from 'bcrypt';
import { POOL } from '../../server'

const regiterUser = async (
    name: string,
    email: string,
    password: string
) => {

    const userExists = await POOL.query('SELECT id FROM users WHERE email = $1', [email]);

    if (userExists.rowCount != null && userExists.rowCount > 0) {
        throw { message: 'User with this email already exists', code: 'EMAIL_EXISTS' };
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await POOL.query('INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id', [name, email, hashedPassword]);

    // return user without password
    const { password: _pwd, ...userWithoutPassword } = user.rows[0];

    return userWithoutPassword;
}

const loginUser = async (
    email: string,
    password: string
) => {
    const user = await POOL.query('SELECT * FROM users WHERE email = $1', [email]);

    if (user.rows.length === 0) {
        throw { message: 'No user found with this email', code: 'USER_NOT_FOUND' };
    }

    const isPasswordValid = await bcrypt.compare(password, user.rows[0].password);

    if (!isPasswordValid) {
        throw { message: 'Invalid password', code: 'INVALID_PASSWORD' };
    }

    // return user without password
    const { password: _pwd, ...userWithoutPassword } = user.rows[0];

    return userWithoutPassword;
}

export { regiterUser, loginUser };

