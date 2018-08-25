/* eslint-disable react/prop-types */
import React from 'react';

import Typography from '@material-ui/core/Typography';

const Placeholder = (props) => {
    return (
        <Typography
            color="textSecondary"
            className={props.selectProps.classes.placeholder}
            {...props.innerProps}
        >
            {props.children}
        </Typography>
    );
};

export default Placeholder;
