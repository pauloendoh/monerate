import { makeStyles, Modal } from '@material-ui/core';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import React, { useState } from 'react';
import * as Yup from 'yup';
import CurrencyInput from 'react-currency-masked-input'
import axios from 'axios'
import { connect } from 'react-redux';
import StarRatings from 'react-star-ratings'

function rand() {
    return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
    const top = 50 + rand();
    const left = 50 + rand();

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

// ------------------------------------
const AddExpenseModal = (props) => {
    const classes = useStyles();
    // getModalStyle is not a pure function, we roll the style only on the first render
    const [modalStyle] = React.useState(getModalStyle);

    const [rating, setRating] = useState(0)
    const changeRatingHandler = (newRating, name) => {
      if (rating === newRating)
        setRating(0)
      else
        setRating(newRating)
    }

    return (<Modal
        open={props.open}
        onClose={props.onClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
    >
        <div style={modalStyle} className={classes.paper}>
            <h2 id="simple-modal-title">Text in a modal</h2>
            <p id="simple-modal-description">
                Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
            </p>
            <Formik
                initialValues={{
                    expenseName: '',
                    rating: '',
                    value: null
                }}

                validationSchema={Yup.object({
                    expenseName: Yup.string().required('Required'),
                    rating: Yup.number().min(1).max(5),
                    value: Yup.number()
                })}

                onSubmit={(values, { setSubmitting }) => {

                    let postData = {
                        ...values, 
                        value: Number(values.value), 
                        rating,

                        userId: props.authUser.localId, 
                        createdAt: new Date().toJSON()
                    }

                    axios.post('/expenses.json?auth=' + props.authUser.idToken, postData)
                        .then(res => { alert('success?', res) })
                        .catch(err => { alert('error', err) })
                        .finally(() => {
                            setSubmitting(false)
                        })
                }}

            >
                {({ isSubmitting, values, setFieldValue }) => (
                    <Form>
                        <Field name="expenseName" />
                        <ErrorMessage name="expenseName" component="div" />

                        <StarRatings
              starDimension="24px"
              starSpacing="0"
              rating={rating}
              starRatedColor="orange"
              changeRating={changeRatingHandler} />
                        <CurrencyInput
                            name="value"
                            onChange={(e, maskedValue) =>
                                setFieldValue('value', maskedValue)
                            }
                        />
                        <ErrorMessage name="value" component="div" />

                        {values.value}
                        <button type="submit"  disabled={isSubmitting}>Save
                  </button>
                    </Form>
                )}
            </Formik>
        </div>
    </Modal>)
}

const mapStateToProps = state => {
    return {
        authUser: state.auth.user,
        token: state.auth.user.idToken
    }
}

export default connect(mapStateToProps, null)(AddExpenseModal)