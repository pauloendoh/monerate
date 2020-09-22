import { ErrorMessage, Field, Form, Formik } from 'formik';
import React from 'react'
import { connect } from 'react-redux';
import * as Yup from 'yup';
import expensesActions from '../../redux/actions/expensesActions';

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

    return (
        <div>
            <Formik
                initialValues={{ name: '', initialValue: 0, endValue: 100, ratingGTE: 0 }}
                validationSchema={Yup.object({
                    initialValue: Yup.number().min(0),
                    ratingGTE: Yup.number().min(0).max(5)
                })}


                onSubmit={(values, { setSubmitting }) => {
                    props.filterExpenses(values)
                    setSubmitting(false)
                }}

            >
                {({ isSubmitting }) => (
                    <Form>
                        <Field name="name" />
                        <ErrorMessage name="name" component="div" />

                        <Field type="number" min="0" name="initialValue" />
                        <Field type="number" min="0" name="endValue" />

                        <Field type="number" min="0" max="5" name="ratingGTE" />
                        <ErrorMessage name="ratingGTE" component="div" />

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