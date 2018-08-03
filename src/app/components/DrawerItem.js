import React from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { withStyles } from '@material-ui/core/styles';

const styles = {
    icon: {
        maxWidth: 34,
        margin: 0
    },
    button: {
        padding: 0,
        marginBottom: 5,
        margin: 'auto',
        display: 'block',
        textAlign: 'center'
    },
    textWrapper: {
        padding: 0
    },
    text: {
        fontSize: "13px",
        color: "#2c2c2c"
    }
};

const DrawerItem = ({ icon, text, to, classes, onClick }) => {
    return (
        <ListItem button classes={{ button: classes.button }}>
            <Link to={to} onClick={onClick}>
                <ListItemIcon className={classes.icon}>
                    {icon}
                </ListItemIcon>

                <ListItemText primary={text} className={classes.textWrapper} classes={{ primary: classes.text }} />
            </Link>
        </ListItem>
    );
};

DrawerItem.propTypes = {
    icon: PropTypes.node,
    text: PropTypes.string.isRequired,
    to: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired
};

DrawerItem.defaultProps = {
    onClick: () => { }
};

export default withStyles(styles)(DrawerItem);
