import React from 'react';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import { DialogActions, DialogContent } from '@material-ui/core/Dialog';
  
import TextFieldError from '../../../common/material/TextFieldError';
import KindSwitch from '../../shared/components/KindSwitch';
import { getKind, EXPENSE } from '../../shared/kinds';

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
            name: "",
            kind: EXPENSE.id
        }
    };

    constructor(props) {
        super(props);

        this.state = {
            ...this.props.category,
            name: this.props.category.name || "",
            kind: getKind(this.props.category.kind) || EXPENSE
        };
    }

    handleSubmit = () => this.props.onSubmit(this.state);

    render() {
        const { errors } = this.props;

        let disabled = true;
        if (!this.props.isFetching && this.state.name && this.state.kind) {
            disabled = false;
        }

        return (
            <div>
                <DialogContent>

                    <KindSwitch 
                        value={this.state.kind}
                        onChange={kind => this.setState({ kind })}
                    />                        

                    <TextFieldError
                        label="Nome" 
                        error={errors.name}
                        value={this.state.name}
                        onChange={e => this.setState({ name: e.target.value })}
                        maxLength="70"
                    />

                </DialogContent>

                <DialogActions>
                    <Button variant="raised" color="primary" disabled={disabled} onClick={this.handleSubmit}>
                        Salvar
                    </Button>
                </DialogActions>
            </div>
        );
    }
}

export default CategoryForm;