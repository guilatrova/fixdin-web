import actions from './actions.js';
import createOperation from './../../common/generic_duck/operations';

const fetchBalance = createOperation(
    'balances/current', 
    actions.requestBalance,
    actions.receiveBalance, 
    (data) => data.balance
);

const fetchRealBalance = createOperation(
    'balances/current?payed=1', 
    actions.requestRealBalance, 
    actions.receiveRealBalance, 
    (data) => data.balance
);

export default {
    fetchBalance,
    fetchRealBalance
};