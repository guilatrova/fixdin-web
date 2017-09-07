import React from 'react';
import PropTypes from 'prop-types';

import {
	Row,
	Col,
	Panel,
	PanelBody,
	PanelContainer,
} from '@sketchpixy/rubix';

const COLORS = [
	'#0088FE',
	'#00C49F',
	'#FFBB28',
	'#FF8042',
	'#4572a7',
	'#aa4643',
	'#89a54e',
	'#80699b',
	'#3d96ae',
	'#db843d',
]

export default class ValuesByCategoryPieChart extends React.Component {
	
	static propTypes = {
		id: PropTypes.string.isRequired,
		title: PropTypes.string.isRequired
	}

	componentDidMount() {
		this.chart = Rubix.Donut('#' + this.props.id, {
			title: this.props.title,
			height: 300
		});
		this.chart.addData(this.props.data);
	}
	
	componentWillReceiveProps(nextProps) {
		const dataWithColors = this.addColors(nextProps.data);
		this.chart.addData(dataWithColors);
	}

	addColors(data) {
		return data.map((entry, index) => ({
			...entry,
			color: COLORS[index % COLORS.length]
		}));
	}
	
	render() {
		return (
			<div id={this.props.id}></div>
		);
	}
}