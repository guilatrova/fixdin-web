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
import { selectors as categorySelectors } from './../../transactions/categories/duck';

class ValuesByCategoryPieChartContainer extends React.Component {

    static propTypes = {
        title: PropTypes.string
    }

    componentDidMount() {
        this.props.fetch();
    }    

    render() {
        const getCategoryName = this.props.getCategoryNameById;

        const expensesData = this.props.expenses.data.map(category => ({
            name: getCategoryName(category.category_id, category.category_id.toString()),
            value: Number(category.total),
        }));

        const incomesData = this.props.incomes.data.map(category => ({
            name: getCategoryName(category.category_id, category.category_id.toString()),
            value: Number(category.total),
        }));

        return (
            <PanelContainer>
                <Panel>
                    <PanelBody style={{padding: 25}}>
                        <Row>

                        <Col xs={12} md={6}>
                            <ValuesByCategoryPieChart 
                                id="expenses-donut-chart"
                                title="Despesas"
                                data={expensesData}
                            />
                        </Col>

                        <Col xs={12} md={6}>
                            <ValuesByCategoryPieChart 
                                id="incomes-donut-chart"
                                title="Receitas"
                                data={incomesData}
                            />
                        </Col>

                        </Row>
                    </PanelBody>
                </Panel>
            </PanelContainer>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        ...selectors.getValuesByCategory(state),
        getCategoryNameById: categorySelectors.getCategoryNameById(state)
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetch: () => {
            dispatch(operations.fetchValuesByCategoryReport(INCOME));
            dispatch(operations.fetchValuesByCategoryReport(EXPENSE));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ValuesByCategoryPieChartContainer);