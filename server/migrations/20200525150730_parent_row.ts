import * as Knex from 'knex';

export async function up(knex: Knex): Promise<any> {
	return knex.schema.alterTable('diagnoses', (t) => {
		t.integer('parent_id').unsigned().references('diagnoses.id').onDelete('set null').onUpdate('cascade');
	});
}

export async function down(knex: Knex): Promise<any> {
	return knex.schema.alterTable('diagnoses', (t) => {
		t.dropColumn('parent_id');
	});
}
