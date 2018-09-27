import React from 'react';
import PropTypes from 'prop-types';

import { VictoryPie, VictoryAnimation, VictoryLabel } from 'victory';

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

const data = [
    { x: EXPENSES_STYLE.index, y: 25, ...EXPENSES_STYLE },
    { x: INCOMES_STYLE.index, y: 100 - 25, ...INCOMES_STYLE }
];

const TransactionsDonutChart = (props) => {
    return (
        <div>
            <svg viewBox="0 0 400 400" width="100%" height="100%">
                <VictoryPie
                    standalone={false}
                    data={data}
                    startAngle={-15}
                    animate={{ duration: 1000 }}
                    width={400} height={400}
                    innerRadius={140} labelRadius={190}
                    labels={d => `${d.text}: ${d.y}`}
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

                <VictoryAnimation duration={1000} data={data}>
                    {() => {
                        return (
                            <VictoryLabel inline
                                textAnchor="middle" verticalAnchor="middle"
                                text={["R$", " 10.500,00"]}
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
    data: PropTypes.object
};

export default TransactionsDonutChart;
