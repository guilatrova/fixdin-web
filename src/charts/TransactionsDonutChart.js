import React from 'react';
import PropTypes from 'prop-types';

import purple from '@material-ui/core/colors/purple';
import blue from '@material-ui/core/colors/blue';
import ReactHighcharts from 'react-highcharts';
import drilldown from 'highcharts/modules/drilldown';

import { formatCurrencyDisplay } from '../utils/formatters';

drilldown(ReactHighcharts.Highcharts);
ReactHighcharts.Highcharts.setOptions({
    lang: { drillUpText: "Voltar" }
});

const expenseColor = blue["300"];
const incomeColor = purple['500'];
const duration = 1500;

class TransactionsDonutChart extends React.Component {
    static propTypes = {
        data: PropTypes.object,
        incomes: PropTypes.number,
        expenses: PropTypes.number,
        total: PropTypes.number,
        height: PropTypes.number,
    }

    componentWillReceiveProps(nextProps) {
        const { incomes, expenses, total, height } = nextProps;
        const chart = this.refs.chart.getChart();

        const data = this.getData(incomes, expenses);
        const totalDisplay = formatCurrencyDisplay(total);

        chart.series[0].update({ data });
        chart.setSize(null, height);
        chart.title.update({ text: totalDisplay });
    }

    setTitle = (text = "") => {
        const chart = this.refs.chart.getChart();
        chart.title.update({ text });
    }

    getData = (incomes, expenses) => (
        [
            {
                name: 'Despesas',
                y: -expenses,
                drilldown: "Chrome"
            }, {
                name: 'Receitas',
                y: incomes,
                drilldown: "Firefox"
            }
        ]
    );

    handleDrilldown = () => {
        this.setTitle();
    }

    handleDrillup = () => {
        const totalDisplay = formatCurrencyDisplay(this.props.total);
        this.setTitle(totalDisplay);
    }

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
                },
                events: {
                    drilldown: this.handleDrilldown,
                    drillup: this.handleDrillup
                }
            },
            credits: false,
            title: {
                text: "R$ 0,00",
                align: 'center',
                verticalAlign: 'middle',
                y: 10,
                style: {
                    textShadow: '-2px 0 white, 0 2px white, 2px 0 white, 0 -2px white'
                }
            },
            tooltip: {
                pointFormat: '<b>{point.percentage:.2f}%</b>'
            },
            plotOptions: {
                pie: {
                    cursor: 'pointer',
                    colors: [expenseColor, incomeColor],
                    dataLabels: {
                        enabled: true,
                        format: '<b>{point.name}</b><br/> R$ {point.y:.2f}',
                    }
                }
            },
            series: [{
                name: 'Transações',
                innerSize: '80%',
                data: this.getData(0, 0)
            }],
            drilldown: {
                activeDataLabelStyle: {
                    textDecoration: 'none',
                    color: 'black'
                },
                series: [
                    {
                        name: "Chrome",
                        id: "Chrome",
                        data: [
                            [
                                "v65.0",
                                0.1
                            ],
                            [
                                "v64.0",
                                1.3
                            ],
                        ]
                    },
                    {
                        name: "Firefox",
                        id: "Firefox",
                        data: [
                            [
                                "v65.0",
                                0.1
                            ],
                            [
                                "v64.0",
                                1.3
                            ],
                        ]
                    }
                ]
            }
        };

        return (
            <div>
                <ReactHighcharts neverReflow={true} config={config} ref="chart" />
            </div>
        );
    }
}

export default TransactionsDonutChart;
