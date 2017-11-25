/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, Redirect } from 'react-router-dom';

import AppBodyContainer from './AppBodyContainer';
import LoginPage from '../../users/containers/LoginPage';
import DashboardPage from '../../dashboard/containers/DashboardPage';
import CategoryPage from  '../../transactions/categories/containers/CategoryPage';
import TransactionPage from '../../transactions/transactions/containers/TransactionPage';
import PaymentOrderPage from '../../paymentOrders/containers/PaymentOrderPage';
import CPFLSettingsPage from '../../integrations/CPFL/containers/CPFLSettingsPage';

import { isAuthenticated } from '../../services/session';

const PrivateRoute = ({ component: Component, ...childProps}) => {
	return (
		<Route
			{...childProps}
			render={(props) => isAuthenticated() ? 
				<Component {...props} /> : 
				<Redirect to={{pathname: '/login', state: {from: props.location}}} />}
		/>
	);
};

class App extends React.Component {
	render() {
		return (
			<div>
				<Switch>
					<Route exact path="/login" component={LoginPage} />

					<AppBodyContainer>

						<PrivateRoute exact path="/" component={DashboardPage} />
						<PrivateRoute exact path="/categories" component={CategoryPage} />
						<PrivateRoute exact path="/transactions" component={TransactionPage} />
						<PrivateRoute exact path="/payment-order" component={PaymentOrderPage} />
						<PrivateRoute exact path="/cpfl" component={CPFLSettingsPage} />

					</AppBodyContainer>

					<Route component={() => "not found"} />
				</Switch>
			</div>
		);
	}
}

App.propTypes = {
	children: PropTypes.element
};

export default App;