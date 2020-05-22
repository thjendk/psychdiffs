import { ApolloServer } from 'apollo-server-express';
import { typeDefs, resolvers } from 'graphql/types';
import generateLoaders from 'graphql/loaders';
import express from 'express';
import User from 'models/user.model';

const generateContext = (req: express.Request & { user: User }, res: express.Response) => ({
	...generateLoaders(),
	res,
	req,
	user: req.user
});

export type Context = ReturnType<typeof generateContext>;

export default new ApolloServer({
	typeDefs,
	resolvers,
	context: ({ req, res }) => generateContext(req as any, res)
});
