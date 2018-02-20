/*eslint no-console: ["error", { allow: ["warn", "error"] }] */
import React from 'react';
import PropTypes from 'prop-types';
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
import { operations } from '../duck';
import { ALL } from '../../transactions/kinds';

const styles = {
    root: {
        flexGrow: 1,
    },
};

class PaymentOrderStepper extends React.Component {
    static propTypes = {
        classes: PropTypes.object.isRequired,
        theme: PropTypes.object.isRequired,
        onStart: PropTypes.func.isRequired,
        onStep2: PropTypes.func.isRequired,
    };

    state = {
        activeStep: 0,
        previousStep: 0
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
                this.props.onStep2();
            }
        }
    }

    renderStep = () => {
        switch(this.state.activeStep) {

            case 0:
                return <Step1 />;

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

                {this.renderStep()}

                <MobileStepper
                    variant="dots"
                    steps={3}
                    position="static"
                    activeStep={this.state.activeStep}                    
                    nextButton={
                        <Button dense onClick={this.handleNext} disabled={this.state.activeStep === 2}>
                            Próximo
                            {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
                        </Button>
                    }
                    backButton={
                        <Button dense onClick={this.handleBack} disabled={this.state.activeStep === 0}>
                            {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
                            Anterior
                        </Button>
                    }
                />
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {    
    return {
        onStart: () => {
            dispatch(balanceOperations.fetchRealBalance());
            dispatch(transactionOperations.fetchTransactions(ALL)).then(() => {
                dispatch(operations.resetStep1());
                dispatch(operations.checkDefaultIncomes());
            });
        },
        onStep2: () => {
            dispatch(operations.resetStep2());
            dispatch(operations.checkDefaultExpenses());
        }
    };
};

export default withStyles(styles, { withTheme: true })(
    connect(null, mapDispatchToProps)(PaymentOrderStepper)
);