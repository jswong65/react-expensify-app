import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'

export const ExpenseListItem = (props) => (
	<div>
		<Link to={`/edit/${props.expense.id}`}>
			<h3>{props.expense.description}</h3>
		</Link>
		<p>{props.expense.amount} - {props.expense.createdAt}</p>
	</div>
);

export default connect()(ExpenseListItem);