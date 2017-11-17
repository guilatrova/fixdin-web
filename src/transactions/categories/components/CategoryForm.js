import React from 'react';
import PropTypes from 'prop-types';

import Button from 'material-ui/Button';
import { DialogActions, DialogContent } from 'material-ui/Dialog';
  
import TextFieldError from '../../../common/material/TextFieldError';

class CategoryForm extends React.Component {

    static propTypes = {
        onSubmit: PropTypes.func.isRequired,
        errors: PropTypes.object.isRequired,
        isFetching: PropTypes.bool.isRequired,
        category: PropTypes.object.isRequired
    };

    static defaultProps = {
        errors: {},
        category: {
            id: 0,
            name: ""
        }
    };

    constructor(props) {
        super(props);

        this.state = {
            ...this.props.category,
            name: this.props.category.name || ""
        };
    }
    
    handleChange = e => this.setState({ [e.target.name]: e.target.value });

    handleSelectChange = ({value}) => this.setState({ kind: value });

    handleSubmit = () => this.props.onSubmit(this.state);

    render() {
        const { errors } = this.props;

        let disabled = true;
        if (!this.props.isFetching && this.state.name) {
            disabled = false;
        }

        return (
            <div>
                <DialogContent>

                    <TextFieldError
                        label="Nome" 
                        error={errors.name}
                        value={this.state.name}
                        onChange={this.handleChange}
                        maxLength="70"
                    />

                </DialogContent>

                <DialogActions>
                    <Button raised color="primary" disabled={disabled} onClick={this.handleSubmit}>
                        Salvar
                    </Button>
                </DialogActions>
            </div>
        );
    }
}

export default CategoryForm;