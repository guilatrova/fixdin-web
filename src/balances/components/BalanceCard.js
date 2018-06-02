import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  card: {
    minWidth: 275,
  },
  title: {
    marginBottom: 16,
    fontSize: 14,
    color: theme.palette.text.secondary,
  },
  pos: {
    marginBottom: 12,
    color: theme.palette.text.secondary,
  },
});

const BalanceCard = ({ children, title, classes }) => {
    return (
        <Card className={classes.Card}>
            <CardContent>
                <Typography type="body1" className={classes.title}>
                    {title}
                </Typography>
                <Typography type="headline" component="h2">
                    {children}
                </Typography>
            </CardContent>
        </Card>
    );
};

BalanceCard.propTypes = {
    children: PropTypes.node,
    title: PropTypes.string.isRequired,
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(BalanceCard);