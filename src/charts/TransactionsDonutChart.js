import React from 'react';
import PropTypes from 'prop-types';

import purple from '@material-ui/core/colors/purple';
import blue from '@material-ui/core/colors/blue';
import ReactHighcharts from 'react-highcharts';

import { formatCurrencyDisplay } from '../utils/formatters';

const expenseColor = blue["300"];
const incomeColor = purple['500'];
const duration = 1500;

class TransactionsDonutChart extends React.Component {
    static propTypes = {
        data: PropTypes.object,
        incomes: PropTypes.number,
        expenses: PropTypes.number,
        total: PropTypes.number
    }

    componentWillReceiveProps(nextProps) {
        const { incomes, expenses, total } = nextProps;
        const chart = this.refs.chart.getChart();

        const data = this.getData(incomes, expenses);
        const totalDisplay = formatCurrencyDisplay(total);

        chart.series[0].update({ data });
        chart.title.update({ text: totalDisplay });
    }

    getData = (incomes, expenses) => (
        [
            {
                name: 'Despesas',
                y: incomes
            }, {
                name: 'Receitas',
                y: -expenses
            }
        ]
    );

    render() {
        const config = {
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie',
                height: 220,
                animation: {
                    duration: duration
                }
            },
            credits: false,
            title: {
                text: "R$ 0,00",
                align: 'center',
                verticalAlign: 'middle',
                y: 10,
                // style: {
                //     color: total < 0 ? expenseColor : 'inherit'
                // }
            },
            tooltip: {
                pointFormat: '<b>{point.percentage:.2f}%</b>'
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    startAngle: -35,
                    colors: [expenseColor, incomeColor],
                    dataLabels: {
                        enabled: true,
                        format: '<b>{point.name}</b><br/> R$ {point.y:.2f}'
                    }
                }
            },
            series: [{
                name: 'Transações',
                innerSize: '80%',
                data: this.getData(0, 0)
            }]
        };

        return (
            <div>
                <ReactHighcharts neverReflow={true} config={config} ref="chart" />
            </div>
        );
    }
}

export default TransactionsDonutChart;
