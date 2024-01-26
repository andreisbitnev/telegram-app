import bcrypt from "bcrypt";

let userData: User | undefined;
const tokens: Tokens = {}

export function checkSession(token?: string): void {
    if (!token || !tokens.session || token !== tokens.session) {
        throw new Error('Invalid session');
    }
}

export function generateToken(type: TokenKey): string {
    const token: string = crypto.randomUUID();
    tokens[type] = token;
    return token;
}

export async function checkUserData(telegramId?: string, password?: string): Promise<boolean> {
    if (userData && userData.telegramId === telegramId && userData.password && password && await bcrypt.compare(password, userData.password)) {
        return true;
    } else {
        throw new Error('Telegram Id or password incorrect');
    }
}

export function getUserData(session?: string, token?: string): User {
    if (!tokens.session || tokens.session !== session) {
        throw new Error('Invalid session');
    }
    if (!userData || userData.token !== token) {
        throw new Error('Invalid token');
    }
    return userData;
}

export async function signUp(token: string, telegramId?: string, password?: string): Promise<void> {
    if (!telegramId) {
		throw new Error('No telegramID provided');
	}
    if (!/[0-9]{6,}/.test(telegramId)) {
        throw new Error('invalid telegramID');
    }
    if (!password) {
		throw new Error('No password provided');
	}
    if (password && token === tokens['csrf']) {
        userData = {
            telegramId,
            password: await bcrypt.hash(password, 10),
            token,
            createdAt: new Date(),
        }
    }
}