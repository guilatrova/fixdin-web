/* eslint-disable react/prefer-stateless-function */

import React from 'react';
import CurrencyInput from 'react-currency-input';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';

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
		error: PropTypes.string,
		fullWidth: PropTypes.bool
	}

	render() {
		const { classes, id, label, error, value, fullWidth, ...other } = this.props;
		return (
			<FormControl error={!!error} fullWidth={fullWidth}>

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

export default withStyles({})(CurrencyTextField);