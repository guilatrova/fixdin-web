import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import TextField from 'material-ui/TextField'; //TODO: Change to use autocomplete
import Button from 'material-ui/Button';

import { selectors, operations } from '../../duck';

class PriorityFilter extends React.Component {
    static propTypes = {
        priority: PropTypes.string.isRequired,
        prioritySource: PropTypes.array.isRequired,
        onSubmit: PropTypes.func.isRequired
    };

    static defaultProps = {
        priority: ""
    };

    constructor(props) {
        super(props);

        this.state = {
            priority: props.priority
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ priority: nextProps.priority });
    }

    handleSubmit = () => this.props.onSubmit(this.state.priority);

    handleClear = () => this.props.onSubmit(undefined);

    render() {
        return (
            <div>
                <TextField
                    label="Importancia"
                    value={this.state.priority} 
                    onChange={e => this.setState({ priority: e.target.value })}
                /> 
                <br />
                
                <Button color="default" onClick={this.handleClear}>Limpar</Button>
                <Button color="primary" onClick={this.handleSubmit}>Aplicar</Button>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        priority: selectors.getFilters(state).priority || "",
        prioritySource: selectors.getVisiblePriorities(state) || []
    };
};

const mapDispatchToProps = (dispatch) => {
    return {        
        onSubmit: (priority) => {
            dispatch(operations.setFilters({ priority }, true));
            dispatch(operations.filterTransactions());
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PriorityFilter);