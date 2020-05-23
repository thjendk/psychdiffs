import { gql } from 'apollo-server-express';
import { userTypeDefs, userResolvers } from './user.type';
import { diagnosisTypeDefs, diagnosisResolvers } from './diagnosis.type';

const rootDefs = gql`
	type Query {
		_empty: Boolean
	}

	type Mutation {
		_empty: Boolean
	}
`;

export const typeDefs = [rootDefs, userTypeDefs, diagnosisTypeDefs];

export const resolvers = [userResolvers, diagnosisResolvers];
