import { json } from '@sveltejs/kit';
import { signUp } from '$lib/index';

export async function POST({ request }) {
    const {telegramId, password, token} = await request.json();
	try {
		await signUp(token, telegramId, password);
		return json({ success: true }, { status: 201 });
	} catch (error: any) {
		return json({ success: false, error: error.message }, { status: 400 });
	}
}
