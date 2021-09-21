import React from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import Container from '../../components/commom/Container/index';
import Input from '../../components/commom/Input/index';
import CustomButton from '../../components/commom/CustomButton/index';
import Dropdown from '../../components/commom/Dropdown/index';
import Datee from '../../components/commom/Date/index';

const FormComponent = ({
	onSubmit,
	onChange,
	form,
	errors,
	error,
	onChangeOpinion,
}) => {
	const [selectedValue, setSelectedValue] = React.useState('');
	return (
		<Container>
			<Dropdown
				// onValueChange={(itemValue, itemIndex) =>
				// 	onChangeOpinion({ itemValue, itemIndex, name: 'opinions' })
				// }
				selectedValue={selectedValue}
				onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
				error={errors.opinions}
			/>
			<Input
				label="User name"
				placeholder="Enter User Name"
				onChangeText={(value) => onChange({ name: 'userName', value })}
				error={errors.userName}
			/>
			<Input
				label="First name"
				placeholder="Enter First Name"
				onChangeText={(value) => onChange({ name: 'firstName', value })}
				error={errors.firstName}
			/>
			<Datee />
			<CustomButton onPress={onSubmit} primary title="Submit" />
		</Container>
	);
};

export default FormComponent;
