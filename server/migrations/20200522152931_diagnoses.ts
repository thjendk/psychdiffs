import * as Knex from 'knex';

export async function up(knex: Knex): Promise<any> {
	return knex.schema.createTable('diagnoses', (t) => {
		t.increments();
		t.string('name').unique();
		t.string('icd').unique();
		t.string('page');
	});
}

export async function down(knex: Knex): Promise<any> {
	return knex.schema.dropTableIfExists('diagnoses');
}
