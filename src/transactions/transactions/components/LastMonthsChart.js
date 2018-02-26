import React from 'react';
import PropTypes from 'prop-types';

import red from 'material-ui/colors/red';
import green from 'material-ui/colors/green';
import { VictoryChart, VictoryBar, VictoryLine, VictoryGroup, VictoryAxis } from 'victory';

const effectiveExpenseStyle = {
    data: { fill: red["A100"] } 
};
const effectiveIncomeStyle = {
    data: { fill: green["A700"] }
};
const realExpenseStyle = {
    data: { fill: red[900], opacity: 0.5 }
};
const realIncomeStyle = {
    data: { fill: green[900], opacity: 0.5 }
};

const LastMonthsChart = () => {
    const effectiveIncomesData =  [{ x: "Jan", y: 120 }, { x: "Fev", y: 80 }, { x: "Mar", y: 15 }];
    const effectiveExpensesData = [{ x: "Jan", y: 100 }, { x: "Fev", y: 40 }, { x: "Mar", y: 15 }];
    const realIncomesData =       [{ x: "Jan", y: 100 }, { x: "Fev", y: 50 }, { x: "Mar", y: 10 }];
    const realExpensesData =      [{ x: "Jan", y: 80 },  { x: "Fev", y: 10 }, { x: "Mar", y: 15 }];
    const lineData =              [{ x: "Jan", y: 20 },  { x: "Fev", y: 40 }, { x: "Mar", y: 0 }];
    const axisLabels = [ "Jan", "Fev", "Mar" ];

    return (
        <VictoryChart>
            <VictoryGroup offset={20}>
                <VictoryBar data={effectiveIncomesData} style={effectiveIncomeStyle} />
                <VictoryBar data={effectiveExpensesData} style={effectiveExpenseStyle} />
            </VictoryGroup>

            <VictoryGroup offset={20}>
                <VictoryBar data={realIncomesData} style={realIncomeStyle} />
                <VictoryBar data={realExpensesData} style={realExpenseStyle} />
            </VictoryGroup>

            <VictoryGroup>
                <VictoryLine
                    offsetY={45}
                    data={lineData}
                    interpolation="natural"
                    labels={(d) => `R$ ${d.y}`}
                />
            </VictoryGroup>

            <VictoryAxis tickFormat={axisLabels} />

        </VictoryChart>
    );
};

export default LastMonthsChart;