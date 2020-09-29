import axios from 'axios'
import actionTypes from './actionTypes'

const expensesActions = {
  fetchAllExpenses: (authUser) => {
    return dispatch => {
      axios.get('/expenses.json?auth=' + authUser.idToken + '&orderBy="userId"&equalTo="' + authUser.localId + '"')
        .then(res => {
          let expenses = []
          for (let key in res.data) {
            expenses.push({
              ...res.data[key],
              id: key
            })
          }

          // sorting by date...
          expenses = expenses.sort((a, b) => {
         
            if (a.createdAt !== undefined && b.createdAt !== undefined) {
              return new Date(b.createdAt) - new Date(a.createdAt) 
            }
            else {
              return 1
            }
          })


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