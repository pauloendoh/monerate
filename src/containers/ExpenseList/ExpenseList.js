import { Grid } from '@material-ui/core';
import React from 'react'
import StarRatings from 'react-star-ratings'
import TimeAgo from 'timeago-react'; // var TimeAgo = require('timeago-react');
import currencyFormatter from '../../utils/currencyFormatter';
import { DateTime } from "luxon";

const arrangeExpensesPerDay = (expenses) => {
    let expensesPerDay = {}

    const todayStr = new Date().toJSON().substring(0, 10)
    const yesterdayStr = new Date(new Date().setDate(new Date().getDate() - 1)).toJSON().substr(0, 10)


    for (let expense of expenses) {
        const expenseDateStr = expense.createdAt.substring(0, 10)
        if (expenseDateStr === todayStr) {
            if ('Today' in expensesPerDay == false) {
                expensesPerDay['Today'] = []
            }
            expensesPerDay['Today'].push(expense)
        }
        else if (expenseDateStr === yesterdayStr) {
            if ('Yesterday' in expensesPerDay == false) {
                expensesPerDay['Yesterday'] = []
            }
            expensesPerDay['Yesterday'].push(expense)
        }
        else {
            const formattedExpenseDate = DateTime.fromISO(expenseDateStr).toFormat('LLL dd, yyyy')
            if (formattedExpenseDate in expensesPerDay === false) {
                expensesPerDay[formattedExpenseDate] = []
            }
            expensesPerDay[formattedExpenseDate].push(expense)
        }

    }

    return expensesPerDay
}

const expensesPerDayToJSX = (expensesPerDay) => {
    let jsxArr = []

    const keys = Object.keys(expensesPerDay)
    for (const key of keys) {
        jsxArr.push(
            <div key={key}>
                <h6>
                    {key}
                </h6>


                {expensesPerDay[key]
                    .map(expense => {
                        if (!expense.rating)
                            expense.rating = 0
                        return (
                            <Grid
                                key={expense.id}
                                container style={{ display: 'flex' }} spacing={3}>
                                <Grid item
                                    xs={8}>
                                    {expense.expenseName}
                                </Grid>
                                <Grid item
                                    xs={2}>
                                    <StarRatings
                                        starDimension="24px"
                                        starSpacing="0"
                                        rating={expense.rating}
                                        starRatedColor="orange"
                                    />
                                </Grid>
                                <Grid item xs={2}>
                                    <div style={{ fontWeight: 500, color: '#df0000' }}>
                                        {/* {expense.value} */}
                                        {currencyFormatter.format(expense.value)}
                                    </div>
                                </Grid>


                            </Grid>
                        )

                    }

                    )}

                {key === keys[keys.length - 1] ? null : <hr></hr>}

            </div>)
    }

    return jsxArr
}

const ExpenseList = (props) => {
    const expensesPerDay = arrangeExpensesPerDay(props.expenses)
    console.log(expensesPerDay)

    return (
        <Grid className={props.className + 'p-3 bg-white shadow-sm rounded'}>
            {/*  */}
            {expensesPerDayToJSX(expensesPerDay)}
            {/*  */}


            {/* {props.expenses.map(expense => {
                if (!expense.rating)
                    expense.rating = 0

                // transformar em subcomponent

                return (
                    <Grid container
                        key={expense.id}
                        style={{ display: "flex" }}
                        spacing={3}>

                        <Grid item
                            xs={6}>
                            {expense.expenseName}
                        </Grid>
                        <Grid item xs={2}>
                            <div style={{ fontWeight: 500 }}>
                                {currencyFormatter.format(expense.value)}
                            </div>
                        </Grid>
                        <Grid item
                            xs={2}>
                            <StarRatings
                                starDimension="24px"
                                starSpacing="0"
                                rating={expense.rating}
                                starRatedColor="orange"
                            />
                        </Grid>
                        <Grid item
                            xs={2}>
                            <TimeAgo
                                datetime={expense.createdAt}
                                opts={{ minInterval: 5 }} />
                        </Grid>
                    </Grid>)
            })} */}
        </Grid>)
}

export default ExpenseList
