import tableHeightCalculator from './tableHeightCalculator';

describe("utils/calculateHeight", () => {

    const { calculateHeight } = tableHeightCalculator;
    const createRows = (amt) => {
        const arr = [];
        for (let i = 0; i < amt; i++) {
            arr.push(i);
        }
        return arr;
    };

    it("calculates one row", () => {
        expect(calculateHeight(createRows(1), 40, 5)).toBe(120);
    });

    it("calculates two rows", () => {
        expect(calculateHeight(createRows(2), 40, 5)).toBe(160);
    });

    it("calculates tree rows", () => {
        expect(calculateHeight(createRows(3), 40, 5)).toBe(200);
    });

    it("calculates tree rows with empties", () => {
        const dataRows = createRows(3);
        const emptyRows = Array(3);
        const rows = [...dataRows, ...emptyRows];

        expect(rows.length).toBe(6);
        expect(calculateHeight(rows, 40, 5)).toBe(200);
    });

    it("calculates ten rows", () => {
        expect(calculateHeight(createRows(10), 40, 5)).toBe(300);
    });

});
