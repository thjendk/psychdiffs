import { Model } from 'objection';

interface Diagnosis {
	id: number;
	name: string;
	icd: string;
	page: string;
	parentId: number;
}

class Diagnosis extends Model {
	static tableName = 'diagnoses';
}

export default Diagnosis;
