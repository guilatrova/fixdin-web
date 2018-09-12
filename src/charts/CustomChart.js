import React from 'react';
import PropTypes from 'prop-types';

import { VictoryPie, VictoryAnimation, VictoryLabel } from 'victory';

const data = [{ x: 1, y: 25 }, { x: 2, y: 100 - 25 }];

const CustomChart = (props) => {
    return (
        <div>
            <svg viewBox="0 0 400 400" width="100%" height="100%">
                <VictoryPie
                    standalone={false}
                    animate={{ duration: 1000 }}
                    width={400} height={400}
                    data={data}
                    innerRadius={180}
                    labels={() => null}
                    style={{
                        data: {
                            fill: (d) => {
                                const color = d.y > 30 ? "green" : "red";
                                return d.x === 1 ? color : "blue";
                            }
                        }
                    }}
                />
                <VictoryAnimation duration={1000} data={data}>
                    {() => {
                        return (
                            <VictoryLabel
                                textAnchor="middle" verticalAnchor="middle"
                                x={200} y={200}
                                text={"R$ 10.500,00"}
                                style={{ fontSize: 45 }}
                            />
                        );
                    }}
                </VictoryAnimation>
            </svg>
        </div>
    );
};

CustomChart.propTypes = {
    data: PropTypes.object
};

export default CustomChart;