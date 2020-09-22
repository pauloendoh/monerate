import axios from 'axios'
import actionTypes from './actionTypes'

const expensesActions = {
    fetchAllExpenses: (authUser) => {
        return dispatch => {
            axios.get('/expenses.json?auth=' + authUser.idToken + '&orderBy="userId"&equalTo="' + authUser.localId + '"')
            .then(res => {
                const expenses = []
                for (let key in res.data) {
                    expenses.push({
                        ...res.data[key],
                        id: key
                    })
                }
     
                dispatch({
                    type: actionTypes.SET_EXPENSES,
                    expenses
                })
            })
        }
    },

    filterExpenses: (formikFilterValues) => {
        return {
            type: actionTypes.FILTER_EXPENSES, 
            filter: formikFilterValues
        }
    } 
}

export default expensesActions