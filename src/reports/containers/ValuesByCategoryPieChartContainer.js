import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';

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
        getCategoryNameById: PropTypes.func.isRequired,
        data: PropTypes.array.isRequired,
        classes: PropTypes.object.isRequired
    }

    render() {
        const { title, data, getCategoryNameById } = this.props;

        const formattedData = data
            .filter(category => category.total > 0)
            .map(category => ({
                x: getCategoryNameById(category.category_id, category.category_id.toString()),
                y: Number(category.total),
            })
        );

        return (
            <Paper className={this.props.classes.paper}>

				<Typography type="title">
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
        // ...selectors.getValuesByCategory(state),
        getCategoryNameById: categorySelectors.getCategoryNameById(state)
    };
};

export default withStyles(styles)(
    connect(mapStateToProps)(ValuesByCategoryPieChartContainer)
);