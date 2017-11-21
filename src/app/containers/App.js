import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';
import AppBodyContainer from './AppBodyContainer';

import CategoryPage from  '../../transactions/categories/containers/CategoryPage';
import TransactionForm from '../../transactions/transactions/components/TransactionForm';

class App extends React.Component {
	render() {
		return (
			<div>
				<AppBodyContainer>
					<Switch>
						<Route exact path="/" component={CategoryPage} />
						<Route exact path="/categories" component={CategoryPage} />
						<Route exact path="/transactions" component={TransactionForm} />
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