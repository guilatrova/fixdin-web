import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import PrimaryButton from '../../../../../common/components/PrimaryButton';
import CancelButton from '../../../../../common/components/CancelButton';

const styles = {
    root: {
        minWidth: 300,
        maxWidth: 500
    },
    actions: {
        display: 'flex',
        justifyContent: 'flex-end'
    }
};

const FilterWrapper = ({ classes, children, onSubmit, onClear, onClose }) => {
    return (
        <div className={classes.root}>
            {children}

            <div className={classes.actions}>
                <CancelButton onClick={() => { onClear(); onClose(); }}>
                    Limpar</CancelButton>

                <PrimaryButton onClick={() => { onSubmit(); onClose(); }}>
                    Filtrar</PrimaryButton>
            </div>
        </div>
    );
};

FilterWrapper.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    onClear: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
    classes: PropTypes.object.isRequired
};

FilterWrapper.defaultProps = {
    onClose: () => { }
};

export default withStyles(styles)(FilterWrapper);
