import React from 'react';
import PropTypes from 'prop-types';

import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { withStyles } from '@material-ui/core/styles';

import { drawerWidth, headerHeight } from '../contants';
import DrawerItem from './DrawerItem';
import homeSrc from '../../styles/icons/drawer/home.png';
import transactionsSrc from '../../styles/icons/drawer/transactions.png';
import decisionsSrc from '../../styles/icons/drawer/decisions.png';
import resultsSrc from '../../styles/icons/drawer/results.png';
import accountsSrc from '../../styles/icons/drawer/accounts.png';
import categoriesSrc from '../../styles/icons/drawer/categories.png';

const styles = theme => ({
    drawerPaper: {
        paddingTop: headerHeight,
        position: 'relative',
        whiteSpace: 'nowrap',
        overflowX: 'hidden',
        height: '100%',
        width: drawerWidth,
        border: "none"
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
            variant="persistent"
            classes={{ paper: classes.drawerPaper, }}
            open={open}
        >

            <div className={classes.drawerInner}>

                <List>
                    <DrawerItem icon={<img src={homeSrc} />} text="Início" to="/" />
                    <DrawerItem icon={<img src={accountsSrc} />} text="Contas" to="/accounts" />
                    <DrawerItem icon={<img src={categoriesSrc} />} text="Categorias" to="/categories" />
                    <DrawerItem icon={<img src={transactionsSrc} />} text="Operações" to="/transactions" />
                    <DrawerItem icon={<img src={decisionsSrc} />} text="Decisões" to="/payment-order" />
                    <DrawerItem icon={<img src={resultsSrc} />} text="Resultados" to="/" />
                </List>

                <div className={classes.drawerHeader}>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                    </IconButton>
                </div>

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
