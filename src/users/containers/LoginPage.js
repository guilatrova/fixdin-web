import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { withStyles } from 'material-ui/styles';

import LoginForm from '../components/LoginForm';
import { operations, selectors } from '../duck';

const styles = () => ({
    root: {
        margin: 'auto',
        width: 300
    }
});

class LoginPage extends React.Component {

    static propTypes = {
        onSubmit: PropTypes.func.isRequired,
        error: PropTypes.string.isRequired,
        classes: PropTypes.object.isRequired
    }
    
    static defaultProps = {
        error: ""
    }

    render() {
        // eslint-disable-next-line
        const { classes, ...childProps } = this.props;
        return (
            <div className={this.props.classes.root}>
                <LoginForm {...childProps} />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return selectors.getLoginState(state);
};

const mapDispatchToProps = (dispatch) => {
    return {
        onSubmit: (data) => dispatch(operations.fetchToken(data))
    };
};

export default withStyles(styles)(
    connect(mapStateToProps, mapDispatchToProps)(LoginPage)
);