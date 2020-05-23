import { Model } from 'objection';

interface Differential {
	diagnosisId: number;
	differentialId: number;
	description: string;
}

class Differential extends Model {
	static tableName = 'differentials';
}

export default Differential;
