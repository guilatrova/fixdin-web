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

const LastMonthsChart = ({ data }) => {
    const { effectiveIncomes, effectiveExpenses, realIncomes, realExpenses, effectiveTotal, periods } = data;

    return (
        <VictoryChart>
            <VictoryGroup offset={20}>
                <VictoryBar data={effectiveIncomes} style={effectiveIncomeStyle} />
                <VictoryBar data={effectiveExpenses} style={effectiveExpenseStyle} />
            </VictoryGroup>

            <VictoryGroup offset={20}>
                <VictoryBar data={realIncomes} style={realIncomeStyle} />
                <VictoryBar data={realExpenses} style={realExpenseStyle} />
            </VictoryGroup>

            <VictoryLine
                data={effectiveTotal}
                interpolation="natural"
                labels={(d) => `R$ ${d.y}`}
            />

            <VictoryAxis tickFormat={periods} />

        </VictoryChart>
    );
};

LastMonthsChart.propTypes = {
    data: PropTypes.object.isRequired
};

export default LastMonthsChart;