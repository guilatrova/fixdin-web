const calculateHeight = (rows, rowHeight, rowsUntilScroll) => {
    const additionalHeight = (rowHeight * 2); // footer/header
    const maxHeight = (rowHeight * rowsUntilScroll) + (rowHeight / 2) + additionalHeight; // Leave a half row

    let actualHeight = (rows.length * rowHeight) + additionalHeight;
    if (actualHeight > maxHeight) {
        actualHeight = maxHeight;
    }

    return actualHeight;
};

export default {
    calculateHeight
};
