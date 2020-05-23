import * as Knex from 'knex';

export async function up(knex: Knex): Promise<any> {
	await knex.schema.createTable('users', (t) => {
		t.increments();
		t.string('username');
		t.string('password');
	});

	await knex('users').insert({
		id: 1,
		username: 'thomas',
		password: '$2b$10$WEhhTpKiiYJnZmEPLEuXZ.zBWSiR.sKQU3sBaeIhIvMhgoK1Ux/I2'
	});
}

export async function down(knex: Knex): Promise<any> {
	return knex.schema.dropTableIfExists('users');
}
