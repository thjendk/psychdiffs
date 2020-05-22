import { gql } from 'apollo-server-express';
import User from 'models/user.model';
import { Resolvers } from 'types/resolvers-types';

export const userTypeDefs = gql`
	extend type Query {
		user: User
	}

	type User {
		id: Int
		username: String
	}
`;

export const userResolvers: Resolvers = {
	Query: {
		user: async (obj, args, ctx, info) => {
			if (!ctx.user) return null;

			const user = await User.query().findById(ctx.user.userId);
			if (!user) return null;
			return { id: user.userId };
		}
	}
};
