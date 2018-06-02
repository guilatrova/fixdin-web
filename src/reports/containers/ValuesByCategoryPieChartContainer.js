import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import ValuesByCategoryPieChart from '../components/ValuesByCategoryPieChart';
import { selectors as categorySelectors } from './../../transactions/categories/duck';

const styles = theme => ({
	paper: {
		marginTop: theme.spacing.unit * 3,
		padding: 10
	}
});

class ValuesByCategoryPieChartContainer extends React.Component {

    static propTypes = {
        title: PropTypes.string,
        categoriesNames: PropTypes.array.isRequired,
        data: PropTypes.array.isRequired,
        classes: PropTypes.object.isRequired
    }

    render() {
        const { title, data, categoriesNames } = this.props;

        const formattedData = data
            .filter(category => category.total > 0)
            .map(category => ({
                x: categoriesNames[category.category_id] || category.category_id,
                y: Number(category.total),
            })
        );

        return (
            <Paper className={this.props.classes.paper}>

				<Typography variant="title">
					{title}
				</Typography>

                <ValuesByCategoryPieChart
                    data={formattedData}
                />

            </Paper>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        categoriesNames: categorySelectors.getCategoriesNamesMappedById(state)
    };
};

export default withStyles(styles)(
    connect(mapStateToProps)(ValuesByCategoryPieChartContainer)
);