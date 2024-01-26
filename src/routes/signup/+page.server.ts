import { generateToken } from '$lib/index';

export function load() {
	return { token: generateToken('csrf') };
}