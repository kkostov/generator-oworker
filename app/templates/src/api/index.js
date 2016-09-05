import { version } from '../../package.json';
import { Router } from 'express';
<% if (usemssql) { %>
import * as userModel from '../models/user';
<% } %>

export default ({ config, db }) => {
	let api = Router();

	// perhaps expose some API metadata at the root
	api.get('/', (req, res) => {
		res.json({ version });
	});

	<% if (usemssql) { %>

	<% } %>

	api.get('/users/:id', (req, res) => {
		userModel.getById(db, req.params.id)
			.then(results => res.json(results))
			.catch((err) => res.json(err));
	});

	return api;
}
