import { json, type RequestEvent } from '@sveltejs/kit';
import { checkUserData, generateToken } from '$lib/index';

export async function POST({ request, cookies }: RequestEvent) {
    const {telegramId, password}: UserForm = await request.json();
	try {
		await checkUserData(telegramId, password);
        cookies.set('session', generateToken('session'), { path: '/' });
		return json({ success: true }, { status: 200 });
	} catch (error: any) {
		return json({ success: false, error: error.message }, { status: 400 });
	}
    
}
