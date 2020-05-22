/* eslint-disable */
import dotenv from 'dotenv-flow';
dotenv.config({ default_node_env: 'development' });
import express from 'express';
import path from 'path';
import apollo from 'config/apolloServer';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import './config/objection';
import User from 'models/user.model';
import jwt from 'jsonwebtoken';
const app = express();
const port = process.env.PORT || 3001;
const secret = process.env.SECRET || '';

app.use(helmet());
app.use(cookieParser());
app.use(async (req: any, res, next) => {
	const notUser = () => {
		// If no user is logged in, user is null and cookie is deleted
		res.cookie('user', {}, { expires: new Date(0) });
		req.user = null;
	};

	const token = req.cookies?.user;
	if (token) {
		try {
			const tokenInfo = jwt.verify(token, secret) as User;
			const user = await User.query().findById(tokenInfo.userId);
			if (!user) {
				notUser();
			} else {
				req.user = user;
			}
		} catch (error) {
			notUser();
		}
	}

	next();
});

apollo.applyMiddleware({ app });

// Serve index.js
app.use(express.static(path.join(__dirname, '..')));
app.get('*', function (req, res) {
	res.sendFile(path.join(__dirname, '..', 'index.html'));
});

app.listen(port, () => {
	console.log(`Server started on http://localhost:${port}`);
});
