import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import AccountFormDialog from '../components/AccountFormDialog';
import { operations, selectors } from '../duck';

class AccountFormDialogContainer extends React.Component {
    static propTypes = {
        onSave: PropTypes.func.isRequired,
        onClose: PropTypes.func.isRequired,
        
        open: PropTypes.bool.isRequired,
        isFetching: PropTypes.bool.isRequired,

        errors: PropTypes.object,
        editingAccount: PropTypes.object,
    }

    handleAccountFormSubmit = (id, account) => {
        this.props.onSave(id, account).then(({result}) => {
            if (result == 'success') {
                this.props.onClose();
            }
        });
    }

    render() {
        const { open, errors, isFetching, editingAccount, onClose } = this.props;

        return (
            <AccountFormDialog 
                onSubmit={this.handleAccountFormSubmit}
                open={open}
                onClose={onClose}
                title={editingAccount.id ? "Editar conta" : "Criar conta"}
                account={editingAccount}
                errors={errors}
                isFetching={isFetching}
            />
        );
    }
}

const mapStateToProps = (state) => ({
    isFetching: selectors.isFetching(state),
    errors: selectors.getErrors(state),
    editingAccount: selectors.getEditingAccount(state)
});

const mapDispatchToProps = (dispatch) => ({
    onSave: (id, account) => dispatch(operations.saveAccount(id, account)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AccountFormDialogContainer);
