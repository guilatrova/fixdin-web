import React from 'react';
import PropTypes from 'prop-types';

export default class Last13MonthsChart extends React.Component {
	static propTypes = {
		id: PropTypes.string.isRequired,
		data: PropTypes.array.isRequired
	};
		
	componentWillReceiveProps(nextProps) {
		this.updateData(nextProps.data);
	}
	
	updateData(data) {
		if (data.length > 0) {
			$('#' + this.props.id).empty();
			this.chart = new Rubix('#' + this.props.id, {
				title: 'Últimos 13 meses',
				subtitle: 'Receives/Despesas',
				titleColor: '#0080FF',
				subtitleColor: '#0080FF',
				height: 300,
				axis: {
					x: {
						type: 'ordinal',
						label: 'Mês/ano'
					},
					y:  {
						type: 'linear',
						tickFormat: '$.2f',
						label: 'Saldo'
					}
				},
				tooltip: {
					color: 'white',
					format: {
						y: ',.0f'
					}
				},
				grouped: true,
				show_markers: true,
				noSort: true
			});

			this.incomesCol = this.chart.column_series({
				name: 'Receitas',
				color: '#0080FF'
			});

			this.expensesCol = this.chart.column_series({
				name: 'Despesas',
				color: '#FF6666'
			});
			
			const incomesData = data.map(entry => {
				return {
					x: entry.period, 
					y: Number(entry.incomes)
				}
			});

			const expensesData = data.map(entry => {
				return {
					x: entry.period,
					y: -(Number(entry.expenses))
				}
			});
		
			this.incomesCol.addData(incomesData);
			this.expensesCol.addData(expensesData);
		}
	}
	
	render() {
		return (
			<div id={this.props.id}></div>
		);
	}
}