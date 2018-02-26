import React from 'react';
import PropTypes from 'prop-types';

import { withMobileDialog } from 'material-ui/Dialog';
import { VictoryChart, VictoryBar, VictoryGroup, VictoryAxis } from 'victory';

class LastMonthsChart extends React.Component {
	static propTypes = {
		id: PropTypes.string.isRequired,
		data: PropTypes.array.isRequired,
		width: PropTypes.string.isRequired
	};
	
	render() {
		const { data, width } = this.props;
		const axisLabels = data.map(entry => entry.period);
		const expensesData = data.map((entry, index) => ({ x: index, y: entry.expenses}));
		const incomesData = data.map((entry, index) => ({ x: index, y: entry.incomes}));
		const height = width == "lg" || width == "xl" ? 150 : 300;
		return (			
			<VictoryChart height={height}>
				<VictoryGroup offset={20} colorScale={"qualitative"}>

					<VictoryBar data={expensesData} />

					<VictoryBar data={incomesData} />
				
				</VictoryGroup>

				<VictoryAxis dependentAxis 
					style={{ tickLabels: {fontSize: 6}}}
					tickFormat={t => `R$ ${t}`} />
				<VictoryAxis
					style={{tickLabels: {angle: 45, fontSize: 4, padding: 5}}}
					tickValues={axisLabels}					
				/>
			</VictoryChart>
		);
	}
}

export default withMobileDialog()(LastMonthsChart);