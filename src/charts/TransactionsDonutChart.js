import React from 'react';
import PropTypes from 'prop-types';

import { VictoryPie, VictoryAnimation, VictoryLabel } from 'victory';
import { formatCurrencyDisplay } from '../utils/formatters';

const EXPENSES_STYLE = {
    index: 1,
    fill: "#981192",
    strokeWidth: 0,
    fillOpacity: 0.5,
    text: "EXPENSE"
};

const INCOMES_STYLE = {
    index: 2,
    fill: "#981192",
    strokeWidth: 5,
    fillOpacity: 1,
    text: "INCOME"
};

const duration = 1500;

const TransactionsDonutChart = ({ incomes, expenses, total }) => {

    const data = [
        { x: EXPENSES_STYLE.index, y: -expenses, ...EXPENSES_STYLE },
        { x: INCOMES_STYLE.index, y: incomes, ...INCOMES_STYLE }
    ];
    const totalData = [
        ...data,
        { x: 3, y: total }
    ];

    let totalValue = total;
    if (totalValue < 0) {
        totalValue = -totalValue;
    }
    const totalDisplay = formatCurrencyDisplay(totalValue, false);

    return (
        <div>
            <svg viewBox="0 0 550 400">
                <VictoryPie
                    standalone={false}
                    data={data}
                    startAngle={-15}
                    animate={{ duration: duration }}
                    width={400} height={400}
                    innerRadius={140} labelRadius={170}
                    labels={d => formatCurrencyDisplay(d.y)}
                    style={{
                        data: {
                            fill: (d) => d.fill,
                            stroke: (d) => d.fill,
                            strokeWidth: (d) => d.strokeWidth,
                            fillOpacity: (d) => d.fillOpacity
                        },
                        labels: {
                            fontSize: 20
                        }
                    }}
                />

                <VictoryAnimation duration={duration} data={totalData}>
                    {() => {
                        return (
                            <VictoryLabel inline
                                textAnchor="middle" verticalAnchor="middle"
                                text={["R$", totalDisplay]}
                                x={200} y={220}
                                style={[{ fontSize: 20 }, { fontSize: 40 }]}
                            />
                        );
                    }}
                </VictoryAnimation>
            </svg>
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
