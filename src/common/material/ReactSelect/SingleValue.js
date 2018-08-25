/* eslint-disable react/prop-types */
import React from 'react';

import Typography from '@material-ui/core/Typography';

const SingleValue = (props) => {
    return (
        <Typography className={props.selectProps.classes.singleValue} {...props.innerProps}>
            {props.children}
        </Typography>
    );
};

export default SingleValue;
