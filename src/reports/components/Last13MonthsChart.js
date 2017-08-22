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

import Typography from 'material-ui/Typography';
import { operations } from './../duck';

class Last13MonthsChart extends React.Component {
	static propTypes = {
		data: PropTypes.array.isRequired
	};

	componentDidMount() {
		this.props.fetch();      
	}

	render() {
		const data = this.props.data.map(report => ({
			period: report.period.slice(-2) + '/' + report.period.slice(0, 4),
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

						<BarChart width={600} height={300} data={data} margin={{top: 25, bottom: 5}}>
							<XAxis dataKey="period"/>
							<YAxis/>

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
		data: state.reports.last13Months.data
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		fetch: () => dispatch(operations.fetchLast13MonthsReport())
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Last13MonthsChart);