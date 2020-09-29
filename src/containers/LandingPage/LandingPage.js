import React, { useState } from 'react'
import { connect } from 'react-redux'
import mapDispatchToProps from '../../redux/mapDispatchToProps'
import mapStateToProps from '../../redux/mapStateToProps'
import * as Yup from 'yup'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import Axios from 'axios'

function LandingPage(props) {

    const [signupIsSelected, setSignupIsSelected] = useState(false)

    const validationSchema = Yup.object({ email: Yup.string().email('Invalid email').required('Required') })

    return (
        <div>
            <Formik
                initialValues={{ email: '', password: '' }}
                validationSchema={validationSchema}

                // PE 2/3 jogar pra fora 
                onSubmit={(values, { setSubmitting }) => {
                    const authData = {
                        email: values.email,
                        password: values.password,
                        returnSecureToken: true
                    }

                    let endpoint = ''
                    if (signupIsSelected)
                        endpoint = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyD9XDA4Ttqp0QDuzJsYyRmLLKA-fh80kNo'
                    else
                        endpoint = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyD9XDA4Ttqp0QDuzJsYyRmLLKA-fh80kNo'

                    Axios.post(endpoint, authData)
                        .then(res => {
                            props.UPDATE_AUTH_USER(res.data)
                        })
                        .catch(err => {
                            alert(err)
                        }).finally(() => {
                            setSubmitting(false)
                        })
                }}

            >
                {({ isSubmitting }) => (
                    <Form>
                        <Field type="email" name="email" />
                        <ErrorMessage name="email" component="div" />
                        <Field type="password" name="password" />
                        <ErrorMessage name="password" component="div" />
                        <button type="submit" disabled={isSubmitting}>
                            {signupIsSelected ? 'Sign Up' : 'Sign In'}
                        </button>
                    </Form>
                )}
            </Formik>

            <div>
                {signupIsSelected ?
                    <div>
                        Already has an account? <button onClick={() => setSignupIsSelected(false)}> Sign in </button>
                    </div> :
                    <div>
                        Don't have an account? <button onClick={() => setSignupIsSelected(true)}> Sign up </button>
                    </div>}
            </div>
        </div>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(LandingPage);
