import moment from 'moment';
import { formatTransactionToSend } from '../formatters';
import { INCOME, EXPENSE } from '../../shared/kinds';
import types from './types';
import { 
    FetchOperation, 
    FilterOperation, 
    SaveOperation,
    DeleteOperation,
    PayOperation
} from './operations';

describe('transactions/duck/operations', () => {
    const apiSpy = {
        post: jest.fn(),
        put: jest.fn(),
        patch: jest.fn()
    };

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

    describe('DeleteOperation', () => {
        describe('getEndpoint', () => {
            const operation = (id, type) => new DeleteOperation(id, EXPENSE, type);

            it('DELETE_TRANSACTION', () => {
                const id = 1;
                expect(
                    operation(id, types.DELETE_TRANSACTION).getEndpoint()
                )
                .toEqual(`${EXPENSE.apiEndpoint}${id}`);
            });

            it('DELETE_THIS_AND_NEXT_TRANSACTIONS', () => {
                const id = 2;
                expect(
                    operation(id, types.DELETE_THIS_AND_NEXT_TRANSACTIONS).getEndpoint()
                )
                .toEqual(`${EXPENSE.apiEndpoint}${id}?next=1`);
            });

            it('DELETE_ALL_PERIODIC_TRANSACTIONS', () => {
                const id = 3;
                expect(
                    operation(id, types.DELETE_ALL_PERIODIC_TRANSACTIONS).getEndpoint()
                )
                .toEqual(`${EXPENSE.apiEndpoint}?periodic_transaction=${id}`);
            });
        });
    });

    describe('PayOperation', () => {

        it('getSucceedData always returns array', () => {
            const dummy = { a: 1 };
            const dummyArray = [ dummy ];
            const operation = new PayOperation();

            expect(operation.getSucceedData(dummyArray)).toEqual(dummyArray);
            expect(operation.getSucceedData(dummy)).toEqual(dummyArray);            
        });

        it('getApiPromise sends only payment_date', () => {
            apiSpy.patch.mockReset();
            const operation = new PayOperation(INCOME, [ 1, 2, 3]);

            operation.getApiPromise(apiSpy);

            expect(apiSpy.patch).toHaveBeenCalledTimes(1);
            expect(Object.keys(apiSpy.patch.mock.calls[0][1])).toHaveLength(1);
            expect(apiSpy.patch.mock.calls[0][1]).toHaveProperty('payment_date');
        });

        describe('getEndpoint', () => {
            it('handles one id', () => {
                const id = 1;
                const operation = new PayOperation(INCOME, id);

                expect(operation.getEndpoint()).toEqual(`${INCOME.apiEndpoint}${id}`);
            });

            it('handles several ids', () => {                
                const operation = new PayOperation(INCOME, [ 1, 2, 3]);

                expect(operation.getEndpoint()).toEqual(`${INCOME.apiEndpoint}?ids=1,2,3`);
            });
        });

    });

});