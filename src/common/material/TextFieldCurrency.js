import React from 'react';
import NumberFormat from 'react-number-format';
import PropTypes from 'prop-types';
import Input, { InputLabel } from 'material-ui/Input';
import { FormControl, FormHelperText } from 'material-ui/Form';

class NumberFormatCustom extends React.Component {
	render() {
		const { onChange, ...other} = this.props;
		return (
			<NumberFormat
				{...other}
				onValueChange={onChange}
				thousandSeparator="."
				decimalSeparator=","
				decimalScale={2}
				fixedDecimalScale={false}
				allowNegative={false}
				prefix="R$ "
			/>
		);
	}
  }

NumberFormatCustom.propTypes = {
	onChange: PropTypes.func.isRequired,
};

export const CurrencyInput = ({value, onChange, ...other}) => {
	return (
		<Input
			{...other}
			value={value}
			onChange={onChange}
			inputComponent={NumberFormatCustom}
		/>
	);
};

CurrencyInput.propTypes = {
	value: PropTypes.number.isRequired,
	onChange: PropTypes.func.isRequired
};

const TextFieldCurrency = ({ onChange, label, value, error, id, ...other}) => {
	return (
		<FormControl error={!!error}>

			<InputLabel htmlFor={id}>{label}</InputLabel>

			<CurrencyInput id={id} value={value} onChange={onChange} {...other} />

			{error && <FormHelperText>{error}</FormHelperText>}

		</FormControl>
	);
};

TextFieldCurrency.propTypes = {
	id: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired,
	label: PropTypes.string.isRequired,
	value: PropTypes.number.isRequired,
	error: PropTypes.string,
};

export default TextFieldCurrency;