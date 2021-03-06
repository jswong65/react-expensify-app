import React from 'react';
import { connect } from 'react-redux';
import ExpenseListItem from './ExpenseListItem';
import selectExpenses from '../selectors/expenses';
import expenses from '../selectors/expenses';

export const ExpenseList = (props) => (
	<div>
		<h1> Expense List </h1>
		{
			props.expenses.length === 0 ? (
				<p> No expenses </p>
			) : (
				props.expenses.map((expense) => {
					return <ExpenseListItem key={expense.id} expense={expense} />;
				})
			)
		}

	</div>
);

const mapStateProps = (state) => {
	return {
		expenses: selectExpenses(state.expenses, state.filters)
	};
};

export default connect(mapStateProps)(ExpenseList);
