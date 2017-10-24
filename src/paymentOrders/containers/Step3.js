import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Button } from '@sketchpixy/rubix';

import { selectors } from '../duck';
import { selectors as balanceSelectors } from '../../balances/duck';
import { formatCurrencyDisplay } from '../../services/formatter';

class Step3 extends React.Component {
    static propTypes = {
        balance: PropTypes.number.isRequired,
        totalIncomes: PropTypes.number.isRequired,
        toSave: PropTypes.number.isRequired,
        totalExpenses: PropTypes.number.isRequired,
        expectedBalance: PropTypes.number.isRequired
    }

    render() {
        const balance = formatCurrencyDisplay(this.props.balance);
        const totalIncomes = formatCurrencyDisplay(this.props.totalIncomes);
        const toSave = formatCurrencyDisplay(this.props.toSave);
        const totalExpenses = formatCurrencyDisplay(this.props.totalExpenses);
        const expectedBalance = formatCurrencyDisplay(this.props.expectedBalance);

        return (
            <div>
                <h2>Saldo inicial: {balance}</h2>
                <h2>Receitas a receber: {totalIncomes}</h2>
                <h2>Valor a poupar: {toSave}</h2>
                <h2>Despesas a pagar: {totalExpenses}</h2>
                <h1>Saldo final: {expectedBalance}</h1>
            
                <Button onClick={() => {}}>Pagar todos</Button>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        balance: balanceSelectors.getRealBalance(state),
        totalIncomes: selectors.step1.getTotalChecked(state),
        toSave: selectors.step1.getValueToSave(state),
        totalExpenses: selectors.step2.getTotalChecked(state),
        expectedBalance: selectors.step3.getExpectedBalanceAfterPayment(state)
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onSubmit: dispatch()
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Step3);