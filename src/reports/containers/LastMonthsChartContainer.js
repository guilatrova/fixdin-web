import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import { FormControlLabel } from 'material-ui/Form';
import Switch from 'material-ui/Switch';
import Typography from 'material-ui/Typography';

import { operations, selectors } from '../duck';
import LastMonthsChart from '../components/LastMonthsChart';

const styles = theme => ({
	paper: {
		marginTop: theme.spacing.unit * 3,
		padding: 10
	}
});

class LastMonthsChartContainer extends React.Component {
	static propTypes = {
		onFetch: PropTypes.func.isRequired,
		realData: PropTypes.array.isRequired,
		data: PropTypes.array.isRequired,
		classes: PropTypes.object.isRequired
	}

	state = {
		displayReal: true
	}

	componentDidMount() {
		this.props.onFetch();      
	}

	render() {
		const { classes } = this.props;
		const source = this.state.displayReal ? this.props.realData : this.props.data;

		const data = source.map(report => ({
			period: report.period.slice(-2) + '/' + report.period.slice(0, 4),//2017-01 becomes 01/2017
			expenses: (Number(report.expenses)),
			incomes: Number(report.incomes),
			total: Number(report.total)
		}));

		return (
			<Paper className={classes.paper}>
				<Typography variant="title">
					Últimos 12 meses
				</Typography>

				<FormControlLabel label="Exibir real"
					control={
						<Switch
							checked={this.state.displayReal}
							onChange={(e, checked) => this.setState({ displayReal: checked })}
						/>
					}
				/>

				<LastMonthsChart id="last-months-chart" data={data} />
			</Paper>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		data: selectors.getLastMonths(state),
		realData: selectors.getRealLastMonths(state)
	};
};

const mapDispatchToProps = () => {
	return {
		onFetch: () => {
			// dispatch(operations.fetchLastMonthsReport());
			// dispatch(operations.fetchLastMonthsReport(true));
		}
	};
};

export default withStyles(styles)(
	connect(mapStateToProps, mapDispatchToProps)(LastMonthsChartContainer)
);