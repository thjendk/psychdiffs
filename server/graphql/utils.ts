import { Context } from 'config/apolloServer';

export const permitAdmin = (ctx: Context) => {
	if (!ctx.user) throw new Error('not permitted');
};
