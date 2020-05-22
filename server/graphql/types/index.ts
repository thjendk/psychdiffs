import { gql } from 'apollo-server-express';
import { userTypeDefs, userResolvers } from './user.type';

const rootDefs = gql`
	type Query {
		_empty: Boolean
	}

	type Mutation {
		_empty: Boolean
	}
`;

export const typeDefs = [rootDefs, userTypeDefs];

export const resolvers = [userResolvers];
