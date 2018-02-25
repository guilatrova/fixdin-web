import React from 'react';
import PropTypes from 'prop-types';

import red from 'material-ui/colors/red';
import green from 'material-ui/colors/green';
import { VictoryChart, VictoryBar, VictoryLine, VictoryGroup, VictoryAxis } from 'victory';

const LastMonthsChart = () => {
    const incomesData =  [{ x: 1, y: 120 }, { x: 2, y: 80 }, { x: 3, y: 15 }];
    const expensesData =  [{ x: 1, y: 100 }, { x: 2, y: 40 }, { x: 3, y: 15 }];
    const lineData = [{ x: 1, y: 20 }, { x: 2, y: 40 }, { x: 3, y: 0 }];
    const axisLabels = [ "Jan", "Fev", "Mar" ];
    const expenseStyle = {
        data: {
            fill: red["A700"]
        }
    };
    const incomeStyle = {
        data: {
            fill: green["A700"]
        }
    };

    return (
        <div height={400} width={400}>
            <VictoryChart height={400} width={400}
                domainPadding={{ x: 50, y: [0, 10] }}
            >
                <VictoryGroup offset={20}>
                    <VictoryBar data={incomesData} style={incomeStyle} labels={(d) => d.y} />
                    <VictoryBar data={expensesData} style={expenseStyle} labels={(d) => d.y} />
                </VictoryGroup>

                <VictoryGroup>
                    <VictoryLine
                        data={lineData}
                        interpolation="natural"
                        labels={(d => d.y)}
                    />
                </VictoryGroup>

                <VictoryAxis tickValues={axisLabels} />
            </VictoryChart>
        </div>
    );
};

export default LastMonthsChart;