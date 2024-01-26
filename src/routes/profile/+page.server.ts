import { redirect, type RequestEvent } from '@sveltejs/kit';
import { checkSession } from '$lib/index';

export function load({ cookies } : RequestEvent) {
    const session = cookies.get('session');
    try {
        checkSession(session);
    } catch {
        cookies.delete('session', {path: '/'});
        throw redirect(307, '/login');
    }
}