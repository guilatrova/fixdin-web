import { Operation } from "./operations";

describe('common/genericDuck/operations', () => {
    describe('getId()', () => {

        it('should be equal when operation got same properties', () => {
            const operation = new Operation(1, 2);
            const equalOperation = new Operation(1, 2);            
            
            expect(
                operation.getId()
            )
            .toEqual(equalOperation.getId());
        });

        it('should be different when operation got different properties', () => {
            const operation = new Operation(1, 2);
            const differentOperation = new Operation(3, 4);            
            
            expect(
                operation.getId()
            )
            .not.equal(differentOperation.getId());
        });

    });
});