import { v } from 'convex/values';
import type { Id } from './_generated/dataModel.js';
import { mutation, query } from './_generated/server.js';

// Получение всех задач пользователя
export const getTasks = query({
	args: {},
	handler: async (ctx) => {
		const identity = await ctx.auth.getUserIdentity();
		if (!identity) return [];

		return await ctx.db
			.query('tasks')
			.withIndex('by_user', (q) =>
				q.eq('userId', identity.subject as Id<'users'>),
			)
			.collect();
	},
});

// Добавление новой задачи
export const addTask = mutation({
	args: {
		name: v.string(),
		quantity: v.number(),
		unit: v.optional(v.string()),
	},
	handler: async (ctx, args) => {
		const identity = await ctx.auth.getUserIdentity();
		if (!identity) throw new Error('Not authenticated');

		return await ctx.db.insert('tasks', {
			...args,
			completed: false,
			userId: identity.subject as Id<'users'>,
		});
	},
});
