import { formatDate } from '../utils/formatters';

class OptionsBuilder {
    constructor() {
        this.options = {};
    }

    reset() {
        this.options = {};
    }

    real() {
        this.options = { ...this.options, based: 'real' };
        return this;        
    }

    pending() {
        this.options = { ...this.options, pending: 1 };
        return this;
    }

    range(from, until) {
        this.options = { 
            ...this.options, 
            from: formatDate(from), 
            until: formatDate(until) 
        };
        return this;
    }

    until(date) {
        this.options = { ...this.options, until: formatDate(date) };
        return this;
    }

    build = () => this.options;
}

const optionsBuilder = () => new OptionsBuilder();

export default optionsBuilder;