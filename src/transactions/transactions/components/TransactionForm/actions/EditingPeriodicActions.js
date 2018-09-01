import React from 'react';
import PropTypes from 'prop-types';

import PrimaryButton from '../../../../../common/components/PrimaryButton';
import CancelButton from '../../../../../common/components/CancelButton';
import { types } from '../../../duck';

// TODO: Create a dialog to popup after save with options
const EditingPeriodicActions = ({ onClick, onCancel, disabled }) => {
    return (
        <React.Fragment>
            <CancelButton onClick={() => onCancel()}>
                Cancelar</CancelButton>

            <PrimaryButton disabled={disabled}
                onClick={() => onClick(types.SAVE_TRANSACTION)}>
                Somenta esta</PrimaryButton>

            <PrimaryButton disabled={disabled}
                onClick={() => onClick(types.SAVE_THIS_AND_NEXT_TRANSACTIONS)}>
                Esta e futuras</PrimaryButton>

            <PrimaryButton disabled={disabled}
                onClick={() => onClick(types.SAVE_ALL_PERIODIC_TRANSACTIONS)}>
                Todas as recorrências</PrimaryButton>
        </React.Fragment>
    );
};

EditingPeriodicActions.propTypes = {
    classes: PropTypes.object.isRequired,
    onClick: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    disabled: PropTypes.bool,
};

export default EditingPeriodicActions;
