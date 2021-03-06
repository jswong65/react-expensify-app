import { createStore, combineReducers } from 'redux'
import uuid from 'uuid';

// ADD_EXPENSE
const addExpense = (
		{ 
		 description = '',
		 note = '', 
		 amount = 0, 
		 createdAt = 0 
		} = {}
	) => ({
	type: 'ADD_EXPENSE',
	expenses: {
		id: uuid(),
		description,
		note,
		amount,
		createdAt
	}
});

// REMOVE_EXPENSE
const removeExpense = ({ id } = {} ) => ({
	type: 'REMOVE_EXPENSE',
	id
});

// EDIT_EXPENSE
const editExpense = (id, updates) => ({
	type: 'EDIT_EXPENSE',
	id,
	updates
});

// SET_TEXT_FILTER
const setTextFilter = ({ text = '' } = {}) => ({
	type: 'SET_TEXT_FILTER',
	text
});

// SORT_BY_DATE
const sortByDate = () => ({
	type: 'SORT_BY_DATE',
	sortBy: 'date'
});

// SORT_BY_AMOUNT
const sortByAmount = () => ({
	type: 'SORT_BY_AMOUNT',
	sortBy: 'amount'
});

// SET_START_DATE
const setStartDate = ( date ) => ({
	type: 'SET_START_DATE',
	date
});
// SET_END_DATE
const setEndDate = ( date ) => ({
	type: 'SET_END_DATE',
	date
});

 
const expensesReducerDefault = []
const expensesReducer = (state = expensesReducerDefault, action) => {
	switch (action.type){
		case 'ADD_EXPENSE':
			return [...state, action.expenses];
		case 'REMOVE_EXPENSE':
			return state.filter(expense => expense.id != action.id);
		case 'EDIT_EXPENSE':
			return state.map(expense => {
				if (expense.id === action.id){
					return { ...expense, ...action.updates };
				} else {
					return state;
				}
			});
		default:
			return state
	}
};

// Filters Reducer
const filtersReducerDefault = {
	text: '',
	sortBy: 'date',
	startDate: undefined,
	endDate: undefined
}
const filtersReducer = (state = filtersReducerDefault, action) => {
	switch (action.type){
		case 'SET_TEXT_FILTER':
			return { ...state, text: action.text};
		case 'SORT_BY_DATE':
			return { ...state, sortBy: action.sortBy };
		case 'SORT_BY_AMOUNT':
			return { ...state, sortBy: action.sortBy };
		case 'SET_START_DATE':
			return { ...state, startDate: action.date };
		case 'SET_END_DATE':
			return { ...state, endDate: action.date };
		default:
			return state
	}
};

// timestamps (milliseconds)
// January 1st 1970 (unix epoch) === 0
// 33400, 10, -203

// Get visible expenses
const getVisibleExpenses = (expenses, { text, sortBy, startDate, endDate }) => {
	return expenses.filter(expense => {
		const startDateMatch = typeof startDate !== 'number' || expense.createdAt >= startDate;
		const endDateMatch = typeof endDate !== 'number' || expense.createdAt <= endDate;
		const textMatch = expense.description.toLowerCase().indexOf(text.toLowerCase()) > -1;

		return startDateMatch && endDateMatch && textMatch;
	}).sort((a, b) => {
		if (sortBy === 'date'){
			return a.createdAt - b.createdAt;
		} else if (sortBy === 'amount'){
			return a.amount - b.amount;
		}
	});
};

// Store creation
const store = createStore(
	combineReducers({
		expenses: expensesReducer,
		filters: filtersReducer
	})
);

store.subscribe(() => {
	const state = store.getState();
	const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);
	console.log(visibleExpenses);

});

const expenseOne = store.dispatch(addExpense({ description: 'Rent', amount: 500, createdAt: 1000 }));
const expenseTwo = store.dispatch(addExpense({ description: 'Coffee', amount: 7, createdAt: -1000 }));

// store.dispatch(removeExpense( { id: expenseOne.expenses.id } ));
// store.dispatch(editExpense( expenseTwo.expenses.id, { amount: 10 } ));

// store.dispatch(setTextFilter({ text: 'rent' }));
// store.dispatch(setTextFilter());

// store.dispatch(sortByAmount())
store.dispatch(sortByDate())

// store.dispatch(setStartDate(0));
// store.dispatch(setStartDate());
// store.dispatch(setEndDate(1250));
// store.dispatch(setEndDate());


const demoState = {
	expenses: [{
		id: 'abcdogc',
		description: 'January Rent',
		note: 'This was the final payment for that address',
		amount: 500,
		createdAt: 0
	}],
	filters: {
		text: 'rent',
		sortBy: 'amount', //date or amount
		startDate: undefined,
		endDate: undefined
	}
}
