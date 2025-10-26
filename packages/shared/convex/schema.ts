import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';

export default defineSchema({
	tasks: defineTable({
		name: v.string(),
		quantity: v.number(),
		unit: v.optional(v.string()),
		completed: v.boolean(),
		userId: v.id('users'),
	}).index('by_user', ['userId']),

	users: defineTable({
		email: v.string(),
		name: v.optional(v.string()),
	}),
});
