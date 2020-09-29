const mapStateToProps = state => {
    return {
      authUser: state.auth.user,
  
      expenses: state.expenses.expenses,
      filteredExpenses: state.expenses.filteredExpenses,
    }
}
  
export default mapStateToProps