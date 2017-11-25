import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';
import AppBodyContainer from './AppBodyContainer';

import LoginPage from '../../users/containers/LoginPage';
import DashboardPage from '../../dashboard/containers/DashboardPage';
import CategoryPage from  '../../transactions/categories/containers/CategoryPage';
import TransactionPage from '../../transactions/transactions/containers/TransactionPage';
import PaymentOrderPage from '../../paymentOrders/containers/PaymentOrderPage';
import CPFLSettingsPage from '../../integrations/CPFL/containers/CPFLSettingsPage';

class App extends React.Component {
	render() {
		return (
			<div>
				<AppBodyContainer>
					<Switch>
						<Route exact path="/login" component={LoginPage} />

						<Route exact path="/" component={DashboardPage} />
						<Route exact path="/categories" component={CategoryPage} />
						<Route exact path="/transactions" component={TransactionPage} />
						<Route exact path="/payment-order" component={PaymentOrderPage} />
						<Route exact path="/cpfl" component={CPFLSettingsPage} />
						{/* <Route exact path="/home" component={HomePage} /> */}
						{/* <Route exact path="/test" com1ponent={() => "TESTE"} /> */}
						{/* <Route path="/fuel-savings" component={FuelSavingsPage} /> */}
						{<Route component={() => "not found"} />}
					</Switch>
				</AppBodyContainer>
			</div>
		);
	}
}

App.propTypes = {
	children: PropTypes.element
};

export default App;