import React from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import classNames from 'classnames';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import { styles } from '@material-ui/core/TableSortLabel/TableSortLabel';
import ButtonBase from '@material-ui/core/ButtonBase';

const TableHeaderLabel = (props) => {
  const { sortable, children, ...otherProps } = props;
  const { active, classes, className, ...other } = otherProps;

  if (sortable) {
    return <TableSortLabel {...otherProps}>{children}</TableSortLabel>;
  }

  return (
    <ButtonBase
      className={classNames(classes.root, { [classes.active]: active }, className)}
      component="span"
      disableRipple
      {...other}
    >
      {children}

    </ButtonBase>
  );
};

TableHeaderLabel.propTypes = {
  sortable: PropTypes.bool,
  ...TableSortLabel.propTypes
};

export default withStyles(styles)(TableHeaderLabel);
