import { ErrorMessage, Field, Form, Formik } from 'formik';
import React, { useState } from 'react'
import { connect } from 'react-redux';
import * as Yup from 'yup';
import expensesActions from '../../redux/actions/expensesActions';
import StarRatings from 'react-star-ratings'

const mapStateToProps = state => {
  return {

  }
}

const mapDispatchToProps = dispatch => {
  return {
    filterExpenses: (formikValues) => dispatch(expensesActions.filterExpenses(formikValues))
  }
}

const ExpenseFilter = (props) => {
  const [ratingGTE, setRatingGTE] = useState(0)
  const changeRatingGTEHandler = (newRating, name) => {
    if (ratingGTE === newRating)
      setRatingGTE(0)
    else
      setRatingGTE(newRating)
  }

  return (
    <div>
      <Formik
        initialValues={{ name: '', initialValue: 0, endValue: 100, ratingGTE: 0 }}
        validationSchema={Yup.object({
          initialValue: Yup.number().min(0),
        })}


        onSubmit={(values, { setSubmitting }) => {
          props.filterExpenses({...values, ratingGTE})
          setSubmitting(false)
        }}

      >
        {({ isSubmitting }) => (
          <Form>
            <Field name="name" />
            <ErrorMessage name="name" component="div" />

            <Field type="number" min="0" name="initialValue" />
            <Field type="number" min="0" name="endValue" />

          

            <StarRatings
              starDimension="24px"
              starSpacing="0"
              rating={ratingGTE}
              starRatedColor="orange"
              changeRating={changeRatingGTEHandler} />

            <button type="submit">
              Filtrar
            </button>
          </Form>
        )}
      </Formik>
            Ronaldo
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseFilter)