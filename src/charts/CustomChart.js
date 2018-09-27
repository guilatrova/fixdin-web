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
                    data={data}
                    animate={{ duration: 1000 }}
                    width={400}
                    height={400}
                    innerRadius={140}
                    padAngle={3}
                    labels={d => d.y}
                    labelRadius={190}
                    style={{
                        data: {
                            fill: (d) => {
                                const color = d.y > 30 ? "green" : "red";
                                return d.x === 1 ? color : "blue";
                            },
                            stroke: "blue",
                            strokeWidth: (d) => {
                                return d.x === 2 ? 10 : 0;
                            }
                        }
                    }}
                />

                <VictoryAnimation duration={1000} data={data}>
                    {() => {
                        return (
                            <VictoryLabel inline
                                textAnchor="middle" verticalAnchor="middle"
                                text={["R$", "10.500,00"]}
                                x={200} y={200}
                                style={[{ fontSize: 20 }, { fontSize: 45 }]}
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
