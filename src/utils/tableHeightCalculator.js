const calculateHeight = (rows, rowHeight, rowsUntilScroll) => {
    const rowsAmount = rows.filter(row => row != null).length; // Filter empties
    const additionalHeight = rowHeight * 2; // header + footer
    const maxHeight = (rowHeight * rowsUntilScroll) + (rowHeight / 2) + additionalHeight; // Leave a half row + footer and header

    let actualHeight = (rowsAmount * rowHeight) + additionalHeight;
    if (actualHeight > maxHeight) {
        actualHeight = maxHeight;
    }

    return actualHeight;
};

export default {
    calculateHeight
};
