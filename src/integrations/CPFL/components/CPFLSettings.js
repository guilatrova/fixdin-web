import React from 'react';
import PropTypes from 'prop-types';

import TextFieldError from '../../../common/material/TextFieldError';

class CPFLSettings extends React.Component {
    static propTypes = {
        name: PropTypes.string.isRequired,
        documento: PropTypes.string.isRequired,
        imovel: PropTypes.string.isRequired,
        onChange: PropTypes.func.isRequired,
        errors: PropTypes.object.isRequired
    }

    static defaultProps = {
        errors: {}
    }

    handleChange = (e) => {
        this.props.onChange({ [e.target.name]: e.target.value });
    }

    render() {
        const { name, documento, imovel, errors } = this.props;
        return (
            <form>

                <TextFieldError
                    label="Descrição"
                    error={errors.name}
                    value={name}
                    onChange={this.handleChange} />

                <TextFieldError
                    label="Documento"
                    error={errors.documento}
                    value={documento}
                    onChange={this.handleChange} />

                <TextFieldError
                    label="Imóvel"
                    error={errors.imovel}
                    value={imovel}
                    onChange={this.handleChange} />
            </form>
        );
    }
}

export default CPFLSettings;