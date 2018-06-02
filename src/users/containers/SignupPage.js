import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles'

import SignupForm from '../components/SignupForm';
import { operations, selectors } from '../duck';

const styles = () => ({
    root: {
        margin: 'auto',
        width: 300
    }
});

class SignupPage extends React.Component {
	static propTypes = {
		onSubmit: PropTypes.func.isRequired,
		errors: PropTypes.object.isRequired,
		classes: PropTypes.object.isRequired
	}
	
	static defaultProps = {
		errors: {}
	}

	render() {
		return (
			<div className={this.props.classes.root}>
				<SignupForm {...this.props} />
			</div>
		);
	}
}

const mapStateToProps = (state) => {  
	return selectors.getSignupState(state);
};

const mapDispatchToProps = (dispatch) => {
	return {
		onSubmit: (data) => dispatch(operations.requestSignup(data))
	};
};

export default withStyles(styles)(
	connect(mapStateToProps, mapDispatchToProps)(SignupPage)
);