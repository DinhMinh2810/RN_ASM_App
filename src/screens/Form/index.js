import React, { useState } from 'react';
import FormComponent from '../../components/Form/Index';
import {
	Button,
	View,
	Text,
	StyleSheet,
	TextInput,
	TouchableOpacity,
	Picker,
	Platform,
	Alert,
} from 'react-native';

const Form = () => {
	const [form, setForm] = useState({});
	const [errors, setErrors] = useState({});
	const [selectedValue, setSelectedValue] = useState('');

	const onChange = ({ name, value }) => {
		setForm({ ...form, [name]: value });

		// value co gia tri
		if (value !== '') {
			if (name === 'firstName') {
				if (value.length < 6) {
					setErrors((prev) => {
						return { ...prev, [name]: 'This filed needs min 6 character' };
					});
				} else {
					setErrors((prev) => {
						return { ...prev, [name]: null };
					});
				}
			} else {
				setErrors((prev) => {
					return { ...prev, [name]: null };
				});
			}
		} else {
			setErrors((prev) => {
				return { ...prev, [name]: 'This field is required.' };
			});
		}
	};

	const onChangeOpinion = ({ itemValue, itemIndex, name }) => {
		if (itemIndex === 0) {
			setForm({ ...form });
		} else {
			setForm({ ...form, [itemValue]: itemIndex });
			setErrors((prev) => {
				return { ...prev, [name]: 'You choose ' + [itemValue] };
			});
		}
	};

	//validation here
	const onSubmit = () => {
		// setForm({ ...form });
		console.log(form);
		if (!form.userName) {
			setErrors((prev) => {
				return { ...prev, userName: 'Please add user name' };
			});
		}
		if (!form.firstName) {
			setErrors((prev) => {
				return { ...prev, firstName: 'Please add first name' };
			});
		}
		if (!form.opinions) {
			setErrors((prev) => {
				return { ...prev, opinions: 'Please choose options' };
			});
		}
	};

	return (
		<FormComponent
			onSubmit={onSubmit}
			onChange={onChange}
			form={form}
			errors={errors}
			// onChangeOpinion={onChangeOpinion}
		/>
	);
};

export default Form;
