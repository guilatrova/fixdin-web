import actions from './actions.js';
import { createGetOperation } from './../../common/generic_duck/operations';

const fetchBalance = createGetOperation(
    'balances/current', 
    actions.requestBalance,
    actions.receiveBalance, 
    (data) => data.balance
);

const fetchRealBalance = createGetOperation(
    'balances/current?payed=1', 
    actions.requestRealBalance, 
    actions.receiveRealBalance, 
    (data) => data.balance
);

export default {
    fetchBalance,
    fetchRealBalance
};