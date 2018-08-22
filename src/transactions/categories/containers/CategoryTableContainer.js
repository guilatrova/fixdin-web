import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import AddIcon from '@material-ui/icons/Add';
import RefreshIcon from '@material-ui/icons/Refresh';

import { selectors } from '../duck';
import { EXPENSE, INCOME } from '../../shared/kinds';
import CategoryTable from '../components/CategoryTable';
import ActionableTableWrapper from '../../../common/components/ActionableTableWrapper';

const ALL_TAB = 0;
const INCOMES_TAB = 1;
const EXPENSES_TAB = 2;

class CategoryTableContainer extends React.Component {
    static propTypes = {
        ...CategoryTable.propTypes,
        onAdd: PropTypes.func.isRequired,
        onRefresh: PropTypes.func.isRequired,
    }

    state = {
        tab: ALL_TAB
    }

    handleTabChange = (e, value) => this.setState({ tab: value });

    render() {
        const { onAdd, onRefresh, categories, ...props } = this.props;
        const { tab } = this.state;

        let shownCategories = categories;
        if (tab == INCOMES_TAB) {
            shownCategories = categories.filter(cat => cat.kind == INCOME.id);
        }
        else if (tab == EXPENSES_TAB) {
            shownCategories = categories.filter(cat => cat.kind == EXPENSE.id);
        }

        const actions = [
            { onClick: onAdd, icon: <AddIcon /> },
            { onClick: onRefresh, icon: <RefreshIcon /> }
        ];

        return (
            <ActionableTableWrapper
                selectedTab={tab}
                onTabChange={this.handleTabChange}
                tabs={["TOdas", "Receitas", "Despesas"]}
                title="CATEGORIAS"
                actions={actions}
            >

                <CategoryTable categories={shownCategories} {...props} />

            </ActionableTableWrapper>
        );
    }
}

const mapStateToProps = (state) => ({
    categories: selectors.getCategories(state)
});

export default connect(mapStateToProps)(CategoryTableContainer);
