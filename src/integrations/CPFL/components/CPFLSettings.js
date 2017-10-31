import React from 'react'
import PropTypes from 'prop-types';

import { Form } from '@sketchpixy/rubix';

import HorizontalFormGroupError from './../../../common/components/forms/HorizontalFormGroupError';

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
            <Form horizontal>

                <HorizontalFormGroupError
                    id="name"
                    label="Descrição"
                    error={errors.name}
                    value={name}
                    onChange={this.handleChange} />

                <HorizontalFormGroupError
                    id="documento"
                    label="Documento"
                    error={errors.documento}
                    value={documento}
                    onChange={this.handleChange} />

                <HorizontalFormGroupError
                    id="imovel"
                    label="Imóvel"
                    error={errors.imovel}
                    value={imovel}
                    onChange={this.handleChange} />
            </Form>
        )
    }
}

export default CPFLSettings;