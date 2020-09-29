import actionTypes from '../actions/actionTypes'
import axios from 'axios'

const initialState = {
    expenses: [],
    filteredExpenses: []
}

// ----------------------------------------


// ----------------------------------------
const expensesReducer = (state = initialState, action) => {
    switch (action.type) {

        case actionTypes.SET_EXPENSES:
            return {
                ...state,
                expenses: action.expenses,
                filteredExpenses: action.expenses
            }

        case actionTypes.FILTER_EXPENSES:
            let fExpenses = [...state.expenses]
            const filter = action.filter;

            if (filter.name.length) {
                fExpenses = fExpenses.filter(e => e.expenseName.toLowerCase().includes(filter.name.toLowerCase()))
            }

            fExpenses = fExpenses.filter(e => {
                return (filter.valueRange[0] <= e.value && e.value <= filter.valueRange[1])
            })

    
            if (filter.ratingGTE) {
                fExpenses = fExpenses.filter(e => e.rating >= filter.ratingGTE)
            }

            return {
                ...state,
                filteredExpenses: fExpenses
            }

        default:
            return state
    }
}

export default expensesReducer 