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
                fExpenses = fExpenses.filter(e => e.expenseName.includes(filter.name))
            }

            if (filter.initialValue !== '' && filter.endValue !== '') {
                if (filter.initialValue <= filter.endValue) {
                    fExpenses = fExpenses.filter(e => {
                        return (filter.initialValue <= e.value && e.value <= filter.endValue)
                    })
                }
    
                if (filter.initialValue >= filter.endValue) {
                    fExpenses = fExpenses.filter(e => {
                        return (filter.initialValue >= e.value && e.value >= filter.endValue)
                    })
                }
            }
           


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