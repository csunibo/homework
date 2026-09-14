import { writable } from 'svelte/store';
import { API_ENDPOINT } from './const';

export interface Ban {
	name: string;
	description: string;
	approved: number;
	super: boolean;
}

function createBanStore() {
	const { subscribe, set, update } = writable<Ban[]>([]);

	return {
		subscribe,
		set,
		addBan: (ban: Ban) => update((bans) => [...bans, ban]),
		approveBan: (name: string, description: string) =>
			update((bans) =>
				bans.map((b) =>
					b.name === name && b.description === description ? { ...b, approved: b.approved + 1 } : b
				)
			),
		rejectBan: (name: string, description: string) =>
			update((bans) =>
				bans.map((b) =>
					b.name === name && b.description === description ? { ...b, approved: b.approved - 1 } : b
				)
			),
		refresh: async () => {
			const response = await fetch(API_ENDPOINT + '/getBans');
			const data = await response.json();
			set(data);
		}
	};
}

export const bans = createBanStore();
