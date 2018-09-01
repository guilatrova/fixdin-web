import React from 'react';
import PropTypes from 'prop-types';

import PrimaryButton from '../../../../../common/components/PrimaryButton';
import CancelButton from '../../../../../common/components/CancelButton';
import saveOptions from '../consts/saveOptions';

const RegularActions = ({ onClick, onCancel, disabled }) => {
    return (
        <React.Fragment>
            <CancelButton onClick={onCancel}>
                Cancelar</CancelButton>

            <PrimaryButton onClick={() => onClick(saveOptions.CLOSE)} disabled={disabled}>
                Salvar</PrimaryButton>

            <PrimaryButton onClick={() => onClick(saveOptions.NEW)} disabled={disabled}>
                Salvar e novo</PrimaryButton>
        </React.Fragment>
    );
};

RegularActions.propTypes = {
    onClick: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    disabled: PropTypes.bool,
};

export default RegularActions;
