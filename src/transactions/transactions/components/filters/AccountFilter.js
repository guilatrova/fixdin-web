import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Button from '@material-ui/core/Button';

import { selectors, operations } from '../../duck';
import MultiAccountSelectPicker from './../../../accounts/components/MultiAccountSelectPicker';

class AccountFilter extends React.Component {
    static propTypes = {
        account: PropTypes.array.isRequired, //Although name is "account", actually it's an array of selected
        onSubmit: PropTypes.func.isRequired
    };

    static defaultProps = {
        account: []
    };

    constructor(props) {
        super(props);

        this.state = {
            account: props.account
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ account: nextProps.account });
    }

    handleSubmit = () => this.props.onSubmit(this.state.account);

    handleClear = () => this.props.onSubmit([]);

    render() {
        return (
            <div>
                <MultiAccountSelectPicker
                    value={this.state.account}
                    onChange={(account) => this.setState({ account })} />

                <Button color="default" onClick={this.handleClear}>Limpar</Button>
                <Button color="primary" onClick={this.handleSubmit}>Aplicar</Button>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        account: selectors.getFilters(state).account || []
    };
};

const mapDispatchToProps = (dispatch) => {
    return {        
        onSubmit: (account) => {
            dispatch(operations.setFilters({ account }, true));
            dispatch(operations.filterTransactions());
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AccountFilter);