import React from 'react';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import {
    Row,
    Col,
    Panel,
    PanelBody,
    PanelContainer,
} from '@sketchpixy/rubix';

class Last13MonthsChart extends React.Component {

    componentDidMount() {
      
    }

    render() {
        return (
          <PanelContainer>
            <Panel>
              <PanelBody style={{padding: 25}}>
                
                <BarChart width={600} height={300} data={data} margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                  <XAxis dataKey="name"/>
                  <YAxis/>

                  <Legend />
                  <Bar dataKey="pv" fill="#8884d8" />
                </BarChart>

              </PanelBody>
            </Panel>
          </PanelContainer>
        );
    }
}

export default Last13MonthsChart;