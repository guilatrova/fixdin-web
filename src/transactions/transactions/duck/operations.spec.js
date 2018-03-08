import moment from 'moment';
import { formatTransactionToSend } from '../formatters';
import { INCOME, EXPENSE } from '../../kinds';
import types from './types';
import { FetchOperation, FilterOperation, SaveOperation } from './operations';

describe('transactions/duck/operations', () => {
    
    describe('FetchOperation', () => {
        it('getEndpoint', () => {
            const operation = new FetchOperation(INCOME);

            expect(operation.getEndpoint()).toEqual(INCOME.apiEndpoint);
        });
    });

    describe('FilterOperation', () => {
        it('getEndpoint with no filters', () => {
            const operation = new FilterOperation({});

            expect(operation.getEndpoint()).toEqual("transactions/");
        });

        it('getEndpoint with some filters', () => {
            const operation = new FilterOperation({ filter1: "1", filter2: "2" });

            expect(operation.getEndpoint()).toEqual("transactions/?filter1=1&filter2=2");
        });

        it('getEndpoint with kind and filters', () => {
            const operation = new FilterOperation({ kind: { value: INCOME }, filter1: "1", filter2: "2" });

            expect(operation.getEndpoint()).toEqual(`${INCOME.apiEndpoint}?filter1=1&filter2=2`);
        });
    });

    describe('SaveOperation', () => {
        it('getSucceedData always returns array', () => {
            const dummy = { a: 1 };
            const dummyArray = [ dummy ];
            const operation = new SaveOperation();

            expect(operation.getSucceedData(dummyArray)).toEqual(dummyArray);
            expect(operation.getSucceedData(dummy)).toEqual(dummyArray);            
        });

        describe('getApiPromise', () => {
            const momentStub = moment(new Date(2017, 6, 1, 0, 0, 0));
            const baseTransaction = { //only necessary fields...
                value: '0',
                due_date: momentStub,
                payment_date: momentStub
            };
            const apiSpy = {
                post: jest.fn(),
                put: jest.fn(),
                patch: jest.fn()
            };

            beforeEach(() => {
                apiSpy.patch.mockReset();
            });

            it('creates a transaction', () => {
                const operation = new SaveOperation(baseTransaction, INCOME, types.SAVE_TRANSACTION);

                operation.getApiPromise(apiSpy);

                expect(apiSpy.post).toHaveBeenCalledTimes(1);
                expect(apiSpy.post).toHaveBeenCalledWith(INCOME.apiEndpoint, formatTransactionToSend(baseTransaction));
            });

            it('updates a transaction', () => {
                const id = 1;
                const transaction = { id, ...baseTransaction };
                const operation = new SaveOperation(transaction, INCOME, types.SAVE_TRANSACTION);

                operation.getApiPromise(apiSpy);

                expect(apiSpy.put).toHaveBeenCalledTimes(1);
                expect(apiSpy.put).toHaveBeenCalledWith(`${INCOME.apiEndpoint}${id}`, formatTransactionToSend(transaction));
            });

            it('updates all periodics', () => {
                const bound_transaction = 2;
                const transaction = { bound_transaction, ...baseTransaction };
                const operation = new SaveOperation(transaction, EXPENSE, types.SAVE_ALL_PERIODIC_TRANSACTIONS);

                operation.getApiPromise(apiSpy);

                expect(apiSpy.patch).toHaveBeenCalledTimes(1);
                expect(apiSpy.patch).toHaveBeenCalledWith(`${EXPENSE.apiEndpoint}?periodic_transaction=${bound_transaction}`, formatTransactionToSend(transaction));
            });

            it('updates all periodics', () => {
                const id = 1;
                const transaction = { id, ...baseTransaction };
                const operation = new SaveOperation(transaction, EXPENSE, types.SAVE_THIS_AND_NEXT_TRANSACTIONS);

                operation.getApiPromise(apiSpy);

                expect(apiSpy.patch).toHaveBeenCalledTimes(1);
                expect(apiSpy.patch).toHaveBeenCalledWith(`${EXPENSE.apiEndpoint}${id}?next=1`, formatTransactionToSend(transaction));
            });
        });
    });

});