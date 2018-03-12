import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { connect } from 'react-redux';

import { withStyles } from 'material-ui/styles';
import MobileStepper from 'material-ui/MobileStepper';
import Button from 'material-ui/Button';
import KeyboardArrowLeft from 'material-ui-icons/KeyboardArrowLeft';
import KeyboardArrowRight from 'material-ui-icons/KeyboardArrowRight';

import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import { operations as balanceOperations } from '../../balances/duck';
import { operations as transactionOperations } from '../../transactions/transactions/duck';
import { selectors, operations } from '../duck';
import { ALL } from '../../transactions/shared/kinds';

const styles = {
    root: {
        flexGrow: 1,
    }
};

class PaymentOrderStepper extends React.Component {
    static propTypes = {
        classes: PropTypes.object.isRequired,
        theme: PropTypes.object.isRequired,
        untilDate: PropTypes.object.isRequired,
        
        onStart: PropTypes.func.isRequired,
        onStep2: PropTypes.func.isRequired,
    };

    state = {
        activeStep: 0,
        previousStep: 0,
        fromDate: moment().startOf('month')
    };
    
    componentDidMount() {
        this.props.onStart();
    }

    handleNext = () => {
        const newStep = this.state.activeStep + 1;
        this.onStepChange(this.state.activeStep, newStep);
        this.setState({
            activeStep: newStep,
        });
    };
    
    handleBack = () => {
        const newStep = this.state.activeStep - 1;
        this.onStepChange(this.state.activeStep, newStep);
        this.setState({
            activeStep: newStep,
        });
    };
    
    onStepChange = (prevStep, newStep) => {
        if (prevStep < newStep) {
            if (newStep == 1) {
                const { untilDate } = this.props;
                const { fromDate } = this.state;
                this.props.onStep2(fromDate.format('YYYY-MM-DD'), untilDate.format('YYYY-MM-DD'));
            }
        }
    }

    handleChangeDate = fromDate => this.setState({ fromDate });

    renderStep = () => {
        switch(this.state.activeStep) {

            case 0:
                return <Step1 fromDate={this.state.fromDate} onChangeFromDate={this.handleChangeDate} />;

            case 1:
                return <Step2 />;
            
            case 2:
                return <Step3 />;

            default:
                console.error("step: " + this.state.activeStep);
                return <h1>INVALID STEP</h1>;
        }
    }
    
    render() {
        const { classes, theme } = this.props;
        
        return (
            <div className={classes.root}>

                <div className={classes.content}>
                    {this.renderStep()}
                </div>

                <MobileStepper
                    steps={3}
                    variant="dots"
                    position="static"
                    activeStep={this.state.activeStep}                    
                    nextButton={
                        <Button onClick={this.handleNext} disabled={this.state.activeStep === 2}>
                            Próximo
                            {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
                        </Button>
                    }
                    backButton={
                        <Button onClick={this.handleBack} disabled={this.state.activeStep === 0}>
                            {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
                            Anterior
                        </Button>
                    }
                />
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    untilDate: selectors.step1.getUntilDate(state)
});

const mapDispatchToProps = (dispatch) => {    
    return {
        onStart: () => {
            const balancePromise = dispatch(balanceOperations.fetchRealBalance());
            const transactionsPromise = dispatch(transactionOperations.fetchTransactions(ALL));
            
            Promise.all([balancePromise, transactionsPromise]).then(() => {
                dispatch(operations.resetStep1());
                dispatch(operations.checkDefaultIncomes());
            });
        },
        onStep2: (fromDate, untilDate) => {
            dispatch(operations.resetStep2());
            dispatch(operations.fetchNextExpenses(fromDate, untilDate)).then(() => {
                dispatch(operations.checkDefaultExpenses());
            });
        }
    };
};

export default withStyles(styles, { withTheme: true })(
    connect(mapStateToProps, mapDispatchToProps)(PaymentOrderStepper)
);