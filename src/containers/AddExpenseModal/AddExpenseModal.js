import { Button, Modal, TextField } from '@material-ui/core';
import { ErrorMessage, Form, Formik } from 'formik';
import React, { useState } from 'react';
import * as Yup from 'yup';
import axios from 'axios'
import { connect } from 'react-redux';
import StarRatings from 'react-star-ratings'
import CurrencyTextField from '@unicef/material-ui-currency-textfield'
import './AddExpenseModal.css'

const mapStateToProps = state => {
    return {
        // authUser instead of 
        authUser: state.auth.user,
    }
}

const AddExpenseModal = (props) => {
    const [ratingStarsVal, setRatingStarsVal] = useState(0)

    // PE 2/3 
    const changeRatingHandler = (newRating) => {
        setRatingStarsVal(ratingStarsVal === newRating ? 0 : newRating)
    }

    const formikValues = { expenseName: '', expenseValue: 0 }
    const validationSchema = Yup.object({ expenseName: Yup.string().required('Required') })

    const submitHandler = (formikValues, setSubmitting) => {
        const valueInNumber = (typeof (formikValues.expenseValue) == 'number' ? formikValues.expenseValue : Number(formikValues.expenseValue.replaceAll(',', '')))

        const postData = {
            ...formikValues,
            value: valueInNumber,
            rating: ratingStarsVal,
            userId: props.authUser.localId,
            createdAt: new Date().toJSON()
        }

        axios.post('/expenses.json?auth=' + props.authUser.idToken, postData)
            .then(res => { alert('success?', res) })
            .catch(err => { alert('error', err) })
            .finally(() => {
                setSubmitting(false)
            })
    }

    // ================== TEMPLATE ========================
    return (
        <Modal onClose={props.onClose} open={props.open} className="modal">
            <div className="modal-div shadow-sm py-3 px-4 rounded">
                <h4>Add Expense</h4>

                <Formik initialValues={formikValues} validationSchema={validationSchema}
                    onSubmit={(formikValues, { setSubmitting }) => {
                        submitHandler(formikValues, setSubmitting)
                    }}
                >
                    {({ isSubmitting, handleChange }) => (
                        <Form>
                            <TextField id="expenseName" name="expenseName" label="Name"
                                onChange={handleChange} required className="mr-3 mt-3"
                                variant="outlined" size="small" autoComplete="off"
                                placeholder="Food, bills, clothing..."
                            />


                            <CurrencyTextField
                                id="expenseValue" name="expenseValue" label="Value" variant="outlined"
                                size="small" autoComplete="off" className="mr-3 mt-3"
                                onChange={handleChange} currencySymbol="$" outputFormat="number"
                                decimalCharacter="." digitGroupSeparator=","
                            />

                            <div className="star-ratings-outer-div">
                                <label className="mb-0" style={{ color: 'gray' }}>Rating</label>
                                <div className="d-flex align-items-end">
                                    <StarRatings id="star-ratings-input" rating={ratingStarsVal}
                                        changeRating={changeRatingHandler} starDimension="24px"
                                        starSpacing="0" starHoverColor="#169F8D"
                                        starRatedColor="#169F8D" className="star-ratings-div mr-2" />
                                    {ratingStarsVal ? <div>{ratingStarsVal}</div> : null}
                                </div>
                            </div>

                            <div className="mt-3 d-flex justify-content-end">
                                <ErrorMessage name="expenseName" component="div" />
                                <Button type="submit" variant="contained" color="primary" disabled={isSubmitting}>Save</Button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </Modal>)
}

export default connect(mapStateToProps, null)(AddExpenseModal)