import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Button from 'material-ui/Button';

import { selectors, operations } from '../../duck';
import TransactionDescription from '../TransactionDescription';

class DescriptionFilter extends React.Component {
    static propTypes = {
        description: PropTypes.string.isRequired,
        onSubmit: PropTypes.func.isRequired
    };

    static defaultProps = {
        description: ""
    };

    constructor(props) {
        super(props);

        this.state = {
            description: props.description
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ description: nextProps.description });
    }

    handleSubmit = () => this.props.onSubmit(this.state.description);

    handleClear = () => this.props.onSubmit(undefined);

    render() {
        return (
            <div>
                <TransactionDescription
                    value={this.state.description}
                    onChange={description => this.setState({ description })}
                    onlyVisible={true}
                />
                <br />

                <Button color="accent" onClick={this.handleClear}>Limpar</Button>
                <Button color="primary" onClick={this.handleSubmit}>Aplicar</Button>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        description: selectors.getFilters(state).description || ""
    };
};

const mapDispatchToProps = (dispatch) => {
    return {        
        onSubmit: (description) => {
            dispatch(operations.setFilters({ description }, true));
            dispatch(operations.filterTransactions());
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DescriptionFilter);