import React from 'react';
import {
	View,
	Text,
	TextInput,
	TouchableOpacity,
	ActivityIndicator,
} from 'react-native';
import styles from './styles';
import colors from '../../../../assets/theme/colors';

const CustomButton = ({
	title,
	secondary,
	primary,
	danger,
	disabled,
	loading,
	onPress,
}) => {
	const getBgColor = () => {
		if (disabled) {
			return colors.grey;
		}
		if (primary) {
			return colors.primary;
		}
		if (danger) {
			return colors.danger;
		}
		if (secondary) {
			return colors.secondary;
		}
	};

	return (
		<TouchableOpacity
			disabled={disabled}
			onPress={onPress}
			style={[styles.wrapper, { backgroundColor: getBgColor() }]}
		>
			<View style={[styles.loaderSection]}>
				{loading && (
					<ActivityIndicator
						color={primary ? colors.secondary : colors.primary}
					/>
				)}
				{title && (
					<Text
						style={{
							color: disabled ? 'black' : colors.white,
							paddingLeft: loading ? 5 : 0,
						}}
					>
						{title}
					</Text>
				)}
			</View>
		</TouchableOpacity>
	);
};

export default CustomButton;
