import { gql } from 'apollo-server-express';
import { Resolvers } from 'types/resolvers-types';
import Diagnosis from 'models/diagnosis.model';
import Differential from 'models/differential.model';
import { permitAdmin } from 'graphql/utils';

export const diagnosisTypeDefs = gql`
	extend type Query {
		diagnoses: [Diagnosis]
	}

	extend type Mutation {
		createDiagnosis(data: DiagnosisInput): Diagnosis
		removeDiagnosis(id: Int): String
		addDifferential(data: DifferentialInput): Diagnosis
		removeDifferential(data: DifferentialInput): Diagnosis
	}

	type Diagnosis {
		id: Int
		name: String
		icd: String
		page: String
		differentialsHere: [Differential]
		differentialsThere: [Differential]
	}

	type Differential {
		diagnosis: Diagnosis
		description: String
	}

	input DiagnosisInput {
		id: Int
		name: String
		icd: String
		page: String
	}

	input DifferentialInput {
		diagnosisId: Int
		differentialId: Int
		description: String
	}
`;

export const diagnosisResolvers: Resolvers = {
	Query: {
		diagnoses: async () => {
			const diagnoses = await Diagnosis.query();
			return diagnoses.map((d) => ({ id: d.id }));
		}
	},

	Mutation: {
		createDiagnosis: async (root, { data }, ctx) => {
			permitAdmin(ctx);
			if (data.id) {
				await Diagnosis.query().updateAndFetchById(data.id, data);
				return { id: data.id };
			} else {
				const d = await Diagnosis.query().insertAndFetch(data);
				return { id: d.id };
			}
		},
		removeDiagnosis: async (root, { id }, ctx) => {
			permitAdmin(ctx);
			await Diagnosis.query().deleteById(id);
			return `Diagnosis ${id} has been deleted`;
		},
		addDifferential: async (root, { data }, ctx) => {
			permitAdmin(ctx);
			const { diagnosisId, differentialId, description } = data;
			const exists = await Differential.query().findOne({ diagnosisId, differentialId });
			if (exists) {
				await exists.$query().update({ description });
			} else {
				await Differential.query().insert({ diagnosisId, differentialId, description });
			}

			return { id: data.diagnosisId };
		},
		removeDifferential: async (root, { data }, ctx) => {
			permitAdmin(ctx);
			await Differential.query().where(data).delete();
			return { id: data.diagnosisId };
		}
	},

	Diagnosis: {
		id: ({ id }) => id,
		name: async ({ id }, args, ctx) => {
			const diagnosis = await ctx.diagnosisLoader.load(id);
			return diagnosis.name;
		},
		icd: async ({ id }, args, ctx) => {
			const diagnosis = await ctx.diagnosisLoader.load(id);
			return diagnosis.icd;
		},
		page: async ({ id }, args, ctx) => {
			const diagnosis = await ctx.diagnosisLoader.load(id);
			return diagnosis.page;
		},
		differentialsHere: async ({ id }, args, ctx) => {
			const differentials = await Differential.query().where({ diagnosisId: id });
			return differentials.map((d) => ({ diagnosis: { id: d.differentialId }, description: d.description }));
		},
		differentialsThere: async ({ id }, args, ctx) => {
			const differentialsHere = Differential.query().where({ diagnosisId: id }).select('differentialId');

			const differentials = await Differential.query()
				.where({ differentialId: id })
				.whereNotIn('diagnosisId', differentialsHere);
			return differentials.map((d) => ({ diagnosis: { id: d.diagnosisId } }));
		}
	}
};
