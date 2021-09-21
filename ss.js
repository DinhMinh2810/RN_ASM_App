import React, { useState } from 'react';
import {
	SafeAreaView,
	TextInput,
	Button,
	ActivityIndicator,
	Text,
	View,
	Picker,
} from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import Index from './src/navigations/index';

const StyledInput = ({
	label,
	formikProps,
	formikKey,
	placeholder,
	...rest
}) => {
	const inputStyles = {
		borderWidth: 1,
		borderColor: 'black',
		padding: 10,
		marginBottom: 3,
	};
	if (formikProps.touched[formikKey] && formikProps.errors[formikKey]) {
		inputStyles.borderColor = 'red';
	}
	const [selectedValue, setSelectedValue] = useState('');
	return (
		<View style={{ marginHorizontal: 20, marginVertical: 5 }}>
			<Text style={{ marginBottom: 3 }}>{label}</Text>
			<TextInput
				style={inputStyles}
				onChangeText={formikProps.handleChange(formikKey)}
				onBlur={formikProps.handleBlur(formikKey)}
				{...rest}
			/>
			<Text style={{ color: 'red' }}>
				{formikProps.touched[formikKey] && formikProps.errors[formikKey]}
			</Text>
			<Picker
				selectedValue={selectedValue}
				style={{ height: 50, width: 150 }}
				onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
			>
				<Picker.Item label="Default" value="default" />
				<Picker.Item label="Flat" value="flat" />
				<Picker.Item label="House" value="house" />
				<Picker.Item label="Bungalow" value="bungalow" />
			</Picker>
		</View>
	);
};

const validationSchema = yup.object().shape({
	email: yup.string().label('Email').email().required(),
	password: yup
		.string()
		.label('Password')
		.required()
		.min(2, 'Seems a bit short...')
		.max(10, 'We prefer insecure system, try a shorter password.'),
});

export default SS = () => (
	<SafeAreaView style={{ marginTop: 90 }}>
		<Formik
			initialValues={{ email: '', password: '' }}
			onSubmit={(values, actions) => {
				alert(JSON.stringify(values));
				setTimeout(() => {
					actions.setSubmitting(false);
				}, 1000);
			}}
			validationSchema={validationSchema}
		>
			{(formikProps) => (
				<React.Fragment>
					<StyledInput
						label="Email"
						formikProps={formikProps}
						formikKey="email"
						placeholder="john@example.com"
						autoFocus
					/>
					<StyledInput
						label="Password"
						formikProps={formikProps}
						formikKey="password"
						placeholder="password"
						autoFocus
					/>

					{formikProps.isSubmitting ? (
						<ActivityIndicator />
					) : (
						<Button title="Submit" onPress={formikProps.handleSubmit} />
					)}
				</React.Fragment>
			)}
		</Formik>
	</SafeAreaView>
);
