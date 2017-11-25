import React from 'react';
import PropTypes from 'prop-types';

import { VictoryPie } from 'victory';

export default class ValuesByCategoryPieChart extends React.Component {
	
	static propTypes = {
		data: PropTypes.array.isRequired
	}
	
	render() {		
		return (
			<VictoryPie
				innerRadius={100}
				labelRadius={120}
				style={{ labels: { fontSize: 10, angle: 45, padding: 5}}}
				colorScale={"qualitative"}
				data={this.props.data}
			/>
		);
	}
}