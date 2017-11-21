import React from 'react';
import NumberFormat from 'react-number-format';
import PropTypes from 'prop-types';
import Input from 'material-ui/Input';

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

const TextFieldCurrency = ({value, onChange}) => {
	return (
		<Input
			value={value}
			onChange={onChange}
			inputComponent={NumberFormatCustom}
		/>
	);
};

TextFieldCurrency.propTypes = {
	value: PropTypes.number.isRequired,
	onChange: PropTypes.func.isRequired
};

export default TextFieldCurrency;