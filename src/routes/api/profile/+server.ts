import { getUserData } from '$lib/index';
import { json, type RequestEvent } from '@sveltejs/kit';

export async function POST({ request, cookies }: RequestEvent) {
    const session: string | undefined = cookies.get('session');
    const { token } = await request.json();
	try {
		const {telegramId, createdAt} = getUserData(session, token);
		return json({ telegramId, createdAt }, { status: 200 });
	} catch (error: any) {
        cookies.delete('session', {path: '/'});
		return json({ success: false, error: error.message }, { status: 401 });
	}
}