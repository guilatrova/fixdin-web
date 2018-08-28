import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Slider from '@material-ui/lab/Slider';
import FormLabel from '@material-ui/core/FormLabel';
import Badge from '@material-ui/core/Badge';

const styles = {
    root: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    badge: {
        minWidth: 10
    },
    label: {
        minWidth: 60
    },
    slider: {
        marginLeft: 50,
    }
};

const SliderWrapper = ({ label, classes, ...props }) => {
    return (
        <div className={classes.root}>
            {label &&
                <div className={classes.label}>
                    <FormLabel coomponent="legend">{label}</FormLabel>
                </div>
            }

            <Slider className={classes.slider} {...props} />

            <Badge className={classes.badge} color="primary" badgeContent={props.value} />
        </div>
    );
};

SliderWrapper.propTypes = {
    label: PropTypes.string.isRequired,
    classes: PropTypes.object.isRequired,
    ...Slider.propTypes
};

SliderWrapper.defaultProps = {
    value: 0
};

export default withStyles(styles)(SliderWrapper);
