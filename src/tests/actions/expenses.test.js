import { addExpense, editExpense, removeExpense } from '../../actions/expenses';

test('should setup remove expense action object', () => {
    const action = removeExpense({ id: '123abc' });
    expect(action).toEqual({
        type: 'REMOVE_EXPENSE',
	    id: '123abc'
    });
});

test('should setup update expense action object', () => {
    const action = editExpense( 
                        '123abc',
                        { note: 'test', amount: 1000 }
                    );

    expect(action).toEqual({
        type: 'EDIT_EXPENSE',
        id: '123abc',
        updates: {note: 'test', amount: 1000}
    });
});


test('should setup add expense action object with provided values', () => {
    const expenseData = { 
        description : 'Rent',
        note : 'This was last month rent', 
        amount : 1500, 
        createdAt : 1000 
    };

    const action = addExpense(expenseData);
    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expenses: {
            id: expect.any(String),
            ...expenseData
        }
    });
});

test('should setup add expense action object with default values', () => {
    const expenseData = { 
        description : '',
        note : '', 
        amount : 0, 
        createdAt : 0 
    };

    const action = addExpense();
    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expenses: {
            id: expect.any(String),
            ...expenseData
        }
    });
});