import * as Knex from 'knex';

export async function up(knex: Knex): Promise<any> {
	return knex.schema.createTable('differentials', (t) => {
		t.integer('diagnosis_id').unsigned().references('diagnoses.id').onUpdate('cascade').onDelete('cascade');
		t.integer('differential_id').unsigned().references('diagnoses.id').onUpdate('cascade').onDelete('cascade');
		t.text('description');
		t.primary(['diagnosis_id', 'differential_id']);
	});
}

export async function down(knex: Knex): Promise<any> {
	return knex.schema.dropTableIfExists('differentials');
}
