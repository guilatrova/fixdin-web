import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Typography from 'material-ui/Typography';
import {
    Row,
	Col,
	Panel,
	PanelBody,
	PanelContainer,
} from '@sketchpixy/rubix';

import { INCOME, EXPENSE } from './../../transactions/kinds';
import ValuesByCategoryPieChart from './ValuesByCategoryPieChart';
import { operations, selectors } from './../duck';

class ValuesByCategoryPieChartContainer extends React.Component {

    static propTypes = {
        title: PropTypes.string.isRequired
    }

    componentDidMount() {
        this.props.fetch();
    }

    render() {
        const data = this.props.expenses.data.map(entry => ({
            key: entry.category_id,
            name: entry.category_id,
            value: Number(entry.total)
        }));

        return (
            <PanelContainer>
                <Panel>
                    <PanelBody style={{padding: 25}}>
                        <Typography type="title">
                            {this.props.title}
                        </Typography>
                        
                        <ValuesByCategoryPieChart data={data} />

                    </PanelBody>
                </Panel>
            </PanelContainer>
        );
    }
}

const mapStateToProps = (state) => selectors.getValuesByCategory(state);

const mapDispatchToProps = (dispatch) => {
    return {
        fetch: () => {
            dispatch(operations.fetchValuesByCategoryReport(INCOME));
            dispatch(operations.fetchValuesByCategoryReport(EXPENSE));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ValuesByCategoryPieChartContainer);