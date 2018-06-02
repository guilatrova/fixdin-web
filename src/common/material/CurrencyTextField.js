/* eslint-disable react/prefer-stateless-function */

import React from 'react';
import CurrencyInput from 'react-currency-input';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles'
import Input, { InputLabel } from '@material-ui/core/Input';
import { FormControl, FormHelperText } from '@material-ui/core/Form';

class CurrencyInputAdapter extends React.Component {
	static propTypes = {
		onChangeEvent: PropTypes.func.isRequired,
		prefix: PropTypes.string.isRequired,
		decimalSeparator: PropTypes.string.isRequired,
		thousandSeparator: PropTypes.string.isRequired,
		precision: PropTypes.number.isRequired
	}

	static defaultProps = {
		prefix: "R$ ",
		decimalSeparator: ",",
		thousandSeparator: ".",
		precision: 2
	}

	render() {
		// eslint-disable-next-line
		const { inputRef, ...props } = this.props;
		return (
			<CurrencyInput
				{...props}
			/>
		);
	}
}

class CurrencyTextField extends React.Component {	
	static propTypes = {
		classes: PropTypes.object.isRequired,
		id: PropTypes.string,
		value: PropTypes.number,
		label: PropTypes.string,
		error: PropTypes.string
	}
	
	render() {
		const { classes, id, label, error, value, ...other } = this.props;
		return (
			<FormControl error={!!error}>

				<InputLabel htmlFor={id}>{label}</InputLabel>
				<Input
					id={id}
					classes={classes}
					inputComponent={CurrencyInputAdapter}
					value={value}
					inputProps={{
						value,
						...other
					}}
				/>
				
				{error && <FormHelperText>{error}</FormHelperText>}

			</FormControl>
		);
	}
}

export default withStyles()(CurrencyTextField);