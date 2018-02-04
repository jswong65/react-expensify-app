import { createStore } from 'redux'

// Action generators - functions that return action objects
const incrementCount = ({ incrementBy = 1 } = {}) => {
	return {
		type: 'INCREMENT',
		incrementBy
	};
};

const decrementCount = ({ decrementBy = 1 } = {}) => {
	return {
		type: 'DECREMENT',
		decrementBy
	};
};

const resetCount = () => {
	return {
		type: 'RESET'
	};
};

const setCount = ({ count = 1 } = {}) => {
	return {
		type: 'SET',
		count
	};
};

// Reducers
// 1. Reducers are pure functions
// 2. never change state or action


const countReducer = (state = { count: 0 }, action) => {
	switch (action.type) {
		case 'INCREMENT':
			return {
				count: state.count + action.incrementBy 
			};
		case 'DECREMENT':
			return {
				count: state.count - action.decrementBy
			};
		case 'SET':
			return {
				count: action.count
			};
		case 'RESET':
			return {
				count: 0
			};
		default:
			return state;
	}
}


const store = createStore(countReducer);

const unsubscribe = store.subscribe(() => {
	console.log(store.getState());
});

store.dispatch(incrementCount({incrementBy: 50}));

store.dispatch(decrementCount({decrementBy: 20}));

store.dispatch(resetCount());

store.dispatch(setCount({count: 10}));
