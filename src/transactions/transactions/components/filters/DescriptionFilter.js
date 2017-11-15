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

    render() {
        return (
            <div>
                <TransactionDescription
                    name="description"
                    value={this.state.description}
                    onChange={e => this.setState({ description: e.target.value })}
                    maxLength="120"
                />

                <Button raised onClick={this.handleSubmit}>Aplicar</Button>
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