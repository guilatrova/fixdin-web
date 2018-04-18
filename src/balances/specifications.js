const isSameBalance = (balance, options) => {
    return (
        balance.based == options.based &&
        balance.from == options.from &&
        balance.until == options.until &&
        balance.date == options.date &&
        balance.output == options.output &&
        balance.pending == options.pending
    );
};

export default {
    isSameBalance
};