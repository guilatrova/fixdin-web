import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import TextField from 'material-ui/TextField'; //TODO: Change to use autocomplete
import Button from 'material-ui/Button';

import { selectors, operations } from '../../duck';

class DeadlineFilter extends React.Component {
    static propTypes = {
        deadline: PropTypes.string.isRequired,
        deadlineSource: PropTypes.array.isRequired,
        onSubmit: PropTypes.func.isRequired
    };

    static defaultProps = {
        deadline: ""
    };

    constructor(props) {
        super(props);

        this.state = {
            deadline: props.deadline
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ deadline: nextProps.deadline });
    }

    handleSubmit = () => this.props.onSubmit(this.state.deadline);

    render() {
        return (
            <div>
                <TextField 
                    name="deadline" 
                    label="Tolerância"
                    value={this.state.deadline} 
                    onChange={e => this.setState({ deadline: e.target.value })}
                /> 
                
                <Button color="primary" onClick={this.handleSubmit}>Aplicar</Button>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        deadline: selectors.getFilters(state).deadline || "",
        deadlineSource: selectors.getVisibleDeadlines(state) || []
    };
};

const mapDispatchToProps = (dispatch) => {
    return {        
        onSubmit: (deadline) => {
            dispatch(operations.setFilters({ deadline }, true));
            dispatch(operations.filterTransactions());
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DeadlineFilter);