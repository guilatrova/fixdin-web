import React from 'react';
import PropTypes from 'prop-types';

import RegularActions from './RegularActions';
import EditingPeriodicActions from './EditingPeriodicActions';

const Actions = ({ periodic, ...props }) => {
    if (periodic)
        return <EditingPeriodicActions {...props} />;

    return <RegularActions {...props} />;
};

Actions.propTypes = {
    periodic: PropTypes.bool,
    disabled: PropTypes.bool,
    onClick: PropTypes.func.isRequired
};

export default Actions;
