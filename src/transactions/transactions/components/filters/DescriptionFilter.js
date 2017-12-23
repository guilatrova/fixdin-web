import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Button from 'material-ui/Button';

import { selectors, operations } from '../../duck';
import TextField from 'material-ui/TextField'; //TODO: Change to use autocomplete (take Description as example)

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
                <TextField
                    label="Descrição"
                    value={this.state.description}
                    onChange={e => this.setState({ description: e.target.value })}
                    maxLength="120"
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