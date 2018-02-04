import moment from 'moment';

const getVisibleExpenses = (expenses, { text, sortBy, startDate, endDate }) => {
	return expenses.filter(expense => {
		const createAtMoment = moment(expense.createdAt);
		const startDateMatch = startDate ? startDate.isSameOrBefore(createAtMoment, 'day') : true;
		const endDateMatch = endDate ? endDate.isSameOrAfter(createAtMoment, 'day') : true;
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

export default getVisibleExpenses;