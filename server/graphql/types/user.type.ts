import { gql } from 'apollo-server-express';
import { Resolvers } from 'types/resolvers-types';
import User from 'models/user.model';
import { permitAdmin } from 'graphql/utils';

export const userTypeDefs = gql`
	extend type Query {
		user: User
	}

	extend type Mutation {
		login(data: LoginInput): String
		logout: String
		createUser(data: UserInput): String
	}

	type User {
		id: Int
		username: String
	}

	input LoginInput {
		username: String
		password: String
	}

	input UserInput {
		username: String
		password: String
	}
`;

export const userResolvers: Resolvers = {
	Query: {
		user: async (obj, args, ctx, info) => {
			if (!ctx.req.user) return null;
			return { id: ctx.req.user.id };
		}
	},

	Mutation: {
		login: async (root, { data }, ctx) => {
			const user = await User.query().findOne({ username: data.username });
			if (!user) throw new Error('Incorrect username or password');
			const valid = user.verify(data.password);
			if (!valid) throw new Error('Incorrect username or password');
			const token = user.signToken();
			ctx.res.cookie('user', token, { expires: new Date(253402300000000) });
			return 'Logged in';
		},
		logout: async (root, args, ctx) => {
			ctx.res.cookie('user', {}, { expires: new Date(0) });
			return 'Logged out';
		},
		createUser: async (root, { data }, ctx) => {
			permitAdmin(ctx);
			await User.query().insert(data);
			return 'User has been created';
		}
	},

	User: {
		id: ({ id }) => id,
		username: async ({ id }, args, ctx) => {
			const user = await ctx.userLoader.load(id);
			return user.username;
		}
	}
};
