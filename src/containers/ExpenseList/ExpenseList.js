import React from 'react'
import StarRatings from 'react-star-ratings'

const ExpenseList = (props) => {

    return (
        <div>
            {props.expenses.map(expense => {
                if (!expense.rating)
                    expense.rating = 0
                
                return (
                    <div key={expense.id} className="expense" style={{ display: "flex" }}>
                        <div>
                            {expense.expenseName}
                        </div>
                        <div>
                            {expense.value}
                        </div>
                        <div>
                            Rating: 
                                <StarRatings
                                    starDimension="24px"
                                    starSpacing="0"
                                    rating={expense.rating}
                                    starRatedColor="orange"
                                /> 
                        </div>
                        <div>
                            {expense.createdAt}
                        </div>
                    </div>)
            })}
        </div>)
}

export default ExpenseList
