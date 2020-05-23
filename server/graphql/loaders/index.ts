import Dataloader from 'dataloader';
import User from 'models/user.model';
import Diagnosis from 'models/diagnosis.model';

const batchUsers = async (ids: number[]) => {
	const users = await User.query().findByIds(ids);
	return ids.map((id) => users.find((u) => u.id === id));
};
const batchDiagnoses = async (ids: number[]) => {
	const diagnoses = await Diagnosis.query().findByIds(ids);
	return ids.map((id) => diagnoses.find((d) => d.id === id));
};

const generateUserLoader = () => new Dataloader((ids: number[]) => batchUsers(ids));
const generateDiagnosisLoader = () => new Dataloader((ids: number[]) => batchDiagnoses(ids));

export default function generateLoaders() {
	return {
		userLoader: generateUserLoader(),
		diagnosisLoader: generateDiagnosisLoader()
	};
}
