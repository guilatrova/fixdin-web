import React from 'react';
import { connect } from 'react-redux';

import {
	Row,
	Col,
	Panel,
	PanelBody,
	PanelContainer,
} from '@sketchpixy/rubix';

import { FormControlLabel } from 'material-ui/Form';
import Switch from 'material-ui/Switch';
import Typography from 'material-ui/Typography';
import { operations, selectors } from './../duck';
import Last13MonthsChart from './Last13MonthsChart';

class Last13MonthsChartContainer extends React.Component {

	state = {
		displayReal: true
	}

	componentDidMount() {
		this.props.fetch();      
	}

	render() {
		const source = this.state.displayReal ? this.props.realData : this.props.data;

		const data = source.map(report => ({
			period: report.period.slice(-2) + '/' + report.period.slice(0, 4),//2017-01 becomes 01/2017
			expenses: (Number(report.expenses)),
			incomes: Number(report.incomes),
			total: Number(report.total)
		}));

		return (
			<PanelContainer>
				<Panel>
					<PanelBody style={{padding: 25}}>
						<Typography type="title">
							Últimos 13 meses
						</Typography>

						<FormControlLabel label="Exibir real"
							control={
								<Switch
									checked={this.state.displayReal}
									onChange={(e, checked) => this.setState({ displayReal: checked })}
								/>
							}
						/>

						<Last13MonthsChart id="last-13-months-chart" data={data} />

			  		</PanelBody>
				</Panel>
		  	</PanelContainer>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		data: selectors.getLast13Months(state),
		realData: selectors.getRealLast13Months(state)
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		fetch: () => {
			dispatch(operations.fetchLast13MonthsReport());
			dispatch(operations.fetchLast13MonthsReport(true));
		}
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Last13MonthsChartContainer);