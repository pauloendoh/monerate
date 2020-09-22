import React from 'react'

const ExpenseList = (props) => {

    return (
        <div>
            {props.expenses.map(expense => {
                return (
                    <div key={expense.id} className="expense" style={{display: "flex"}}>
                        <div>
                            {expense.expenseName}
                        </div>
                        <div>
                            {expense.value}
                        </div>
                        <div>
                            {expense.rating}
                        </div>
                        <div>
                            {expense.createdAt}
                        </div>
                    </div>)
            })}
        </div>)
}

export default ExpenseList
