const { default: actionTypes } = require('./actions/actionTypes')
const { default: expensesActions } = require('./actions/expensesActions')

const mapDispatchToProps = dispatch => {
    return {
      UPDATE_AUTH_USER: (user) => dispatch({ type: actionTypes.UPDATE_AUTH_USER, user }),
      CHECK_USER_OR_LOGOUT: () => dispatch({ type: actionTypes.CHECK_USER_OR_LOGOUT }),
      LOGOUT: () => dispatch({ type: actionTypes.LOGOUT }),
  
        fetchAllExpenses: (authUser) => dispatch(expensesActions.fetchAllExpenses(authUser)),
        filterExpenses: (formikValues) => dispatch(expensesActions.filterExpenses(formikValues))

    }
}
  
export default mapDispatchToProps