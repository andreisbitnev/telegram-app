interface UserInputs {
    telegramId?: string;
    password?: string;
}

interface User {
    readonly telegramId: string;
    password: string;
    token: string;
    readonly createdAt: Date;
}

interface Tokens {
    csrf?: string,
    session?: string,
}

type TokenKey = 'csrf' | 'session';
