import moment from 'moment';
import expensesReducer from '../../reducers/expenses';
import expenses from '../fixtures/expenses';

test('should set default state', () => {
    const state = expensesReducer(undefined, { type: '@@INIT' });
    expect(state).toEqual([]);
});

test('should remove expense by id', () => {
    const action = {
        type: 'REMOVE_EXPENSE',
        id: expenses[1].id
    };
    const state = expensesReducer(expenses, action);
    expect(state).toEqual([expenses[0], expenses[2]]);
});

test('should not remove expenses if id not found', () => {
    const action = {
        type: 'REMOVE_EXPENSE',
        id: '-1'
    };
    const state = expensesReducer(expenses, action);
    expect(state).toEqual(expenses);
});

test('should add an expense', () => {
    const action = {
        type: 'ADD_EXPENSE',
        expenses: {
            id: '3',
            description: 'Credit Card',
            note: '',
            amount: 4500,
            createdAt:  moment(0).add(4, 'days').valueOf()
        }
    };
    const state = expensesReducer(undefined, action);
    expect(state[0]).toEqual(expenses[2]);
});

test('should edit an expense', () => {
    const description = 'Debit Card';
    const action = {
        type: 'EDIT_EXPENSE',
        id: '3',
        updates: {
            description
        }
    };
    const state = expensesReducer(expenses, action);
    expect(state[2].description).toBe('Debit Card');
});

test('should not edit expenses if id not found', () => {
    const action = {
        type: 'EDIT_EXPENSE',
        id: '-1'
    };
    const state = expensesReducer(expenses, action);
    expect(state).toEqual(expenses);
});