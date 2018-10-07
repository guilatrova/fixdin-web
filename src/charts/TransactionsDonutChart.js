import React from 'react';
import PropTypes from 'prop-types';

import purple from '@material-ui/core/colors/purple';
import blue from '@material-ui/core/colors/blue';
import ReactHighcharts from 'react-highcharts';

import { formatCurrencyDisplay } from '../utils/formatters';

const expenseColor = blue["300"];
const incomeColor = purple['500'];
const duration = 1500;

const TransactionsDonutChart = ({ incomes, expenses, total }) => {

    const totalDisplay = formatCurrencyDisplay(total);

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
            text: totalDisplay,
            align: 'center',
            verticalAlign: 'middle',
            y: 10,
            style: {
                color: total < 0 ? expenseColor : 'inherit'
            }
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
            data: [{
                name: 'Despesas',
                y: -expenses
            }, {
                name: 'Receitas',
                y: incomes
            }]
        }]
    };

    return (
        <div>
            <ReactHighcharts config={config} />
        </div>
    );
};

TransactionsDonutChart.propTypes = {
    data: PropTypes.object,
    incomes: PropTypes.number,
    expenses: PropTypes.number,
    total: PropTypes.number
};

export default TransactionsDonutChart;
