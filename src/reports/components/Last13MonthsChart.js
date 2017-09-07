import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
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

class Last13MonthsChart extends React.Component {
	static propTypes = {
		data: PropTypes.array.isRequired
	};

	state = {
		displayReal: true
	}

	componentDidMount() {
		this.props.fetch();      
	}

	getYAxisDomain() {
		const { realData, data } = this.props;

		const getMax = (a, b) => Math.max(a, b);
		const getGreaterValue = (item) => getMax(item.expenses, item.incomes);

		const maxReal = realData.map(getGreaterValue).reduce(getMax, 0);
		const maxRegular  = data.map(getGreaterValue).reduce(getMax, 0);
		const max = getMax(maxReal, maxRegular);
		const result = Math.ceil(max * 1.25); //Give some margin
		
		return [0, result];
	}

	render() {
		const source = this.state.displayReal ? this.props.realData : this.props.data;
		const yDomain = this.getYAxisDomain();

		const data = source.map(report => ({
			period: report.period.slice(-2) + '/' + report.period.slice(0, 4),//2017-01 becomes 01/2017
			expenses: -(Number(report.expenses)),
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

						<BarChart width={600} height={300} data={data} margin={{top: 25, bottom: 5}}>
							<XAxis dataKey="period"/>
							<YAxis domain={yDomain} />

							<Tooltip/>
							<Legend />
							<Bar dataKey="expenses" name="despesas" fill="#DB3340" />
							<Bar dataKey="incomes" name="receitas" fill="#1FDA9A" />
						</BarChart>

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

export default connect(mapStateToProps, mapDispatchToProps)(Last13MonthsChart);