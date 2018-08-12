import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import ActionableTableBar from './ActionableTableBar';

const styles = {
    tableWrapper: {
        overflow: 'auto'
    }
};

class ActionableTableWrapper extends React.Component {
    static propTypes = {
        ...ActionableTableBar.propTypes,
        children: PropTypes.node.isRequired
    }

    render() {
        const { classes, ...props } = this.props;

        return (
            <div>
                <ActionableTableBar {...props} />

                <div className={classes.tableWrapper}>
                    {this.props.children}
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(ActionableTableWrapper);
