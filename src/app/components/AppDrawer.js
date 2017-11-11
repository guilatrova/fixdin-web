import React from 'react';
import PropTypes from 'prop-types';

import Drawer from 'material-ui/Drawer';
import Divider from 'material-ui/Divider';
import IconButton from 'material-ui/IconButton';
import ChevronLeftIcon from 'material-ui-icons/ChevronLeft';
import ChevronRightIcon from 'material-ui-icons/ChevronRight';
import { withStyles } from 'material-ui/styles';

import { drawerWidth } from '../contants';

const styles = theme => ({
    drawerPaper: {
        position: 'relative',
        height: '100%',
        width: drawerWidth,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    }
});

const AppDrawer = ({ classes, theme, open, handleDrawerClose }) => {
    return (
        <Drawer
          type="persistent"
          classes={{ paper: classes.drawerPaper, }}
          open={open} >
        
          <div className={classes.drawerInner}>

            <div className={classes.drawerHeader}>
              <IconButton onClick={handleDrawerClose}>
                {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
              </IconButton>
            </div>

            <Divider />
            {/* <List className={classes.list}>{mailFolderListItems}</List> */}
            <Divider />
            {/* <List className={classes.list}>{otherMailFolderListItems}</List> */}
          </div>
      </Drawer>        
    );
};

AppDrawer.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
    open: PropTypes.bool.isRequired,
    handleDrawerClose: PropTypes.func.isRequired,
};

export default withStyles(styles, { withTheme: true })(AppDrawer);