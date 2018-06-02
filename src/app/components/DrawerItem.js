import React from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

const DrawerItem = ({ icon, text, to, onClick }) => {
    return (
        <Link to={to} onClick={onClick}>
            <ListItem button>
                <ListItemIcon>
                    {icon}
                </ListItemIcon>
                
                <ListItemText primary={text} />
            </ListItem>    
        </Link>
    );
};

DrawerItem.propTypes = {
    icon: PropTypes.node,
    text: PropTypes.string.isRequired,
    to: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired
};

export default DrawerItem;