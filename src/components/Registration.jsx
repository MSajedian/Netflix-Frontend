import React from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';

// Schema for yup
const validationSchema = Yup.object().shape({
    // Name - Required, at least 2 chars
    firstName: Yup.string()
        .min(2, "*First Names must have at least 2 characters")
        .max(100, "*First Names can't be longer than 100 characters")
        .required("*First Name is required"),

    // Surname - Required, at least 3 chars
    surname: Yup.string()
        .min(3, "*surnames must have at least 3 characters")
        .max(100, "*surnames can't be longer than 100 characters")
        .required("*surname is required"),

    // Email - Required - Should be an email field
    email: Yup.string()
        .email("*Must be a valid email address")
        .max(100, "*Email must be less than 100 characters")
        .required("*Email is required"),

    // Password - Required - Should contain at least 8 chars, 1 digit, 1 letter
    password: Yup.string()
        .required('No password provided.')
        .min(8, 'Password is too short - should be 8 chars minimum.')
        .max(100, "*Password must be less than 100 characters")
        .matches(
            /^(?=.*[A-Za-z])(?=.*\d)/,
            "Must Contain 8 Characters, One letter, One Number"
        ),

    // (?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$

    // Year of Birth - Required - from 1910+
    yearofBirth: Yup.number()
        .min(1910, 'Year of Birth should be greater than 1910.')
        .required("*Password is required"),

    // Street Address - Required
    streetAddress: Yup.string()
        .required("*Password is required"),

    // City - Required
    city: Yup.string()
        .required("*Password is required"),

    // Postal Code - Required - Numeric 5 digits
    postalCode: Yup.number()
        .min(5, '*postalCode is not correct')
        .max(5, "*postalCode is not correct")
        .required("*Password is required"),

    // Credit card - XXXX-XXXX-XXXX-XXXX (EXTRA)
    creditCard: Yup.string()
        .required("*Password is required"),

});

const Registration = () => {
    return (
        <Container>
            {/* //Sets initial values for form inputs */}
            <Formik
                initialValues={{ firstName: "", surname: "", email: "", password: "", yearofBirth: 1910, streetAddress: "", city: '', postalCode: '', creditCard: 0 }}
                validationSchema={validationSchema}
                onSubmit={(values, { setSubmitting, resetForm }) => {
                    // When Button submits form and form is in the process of submitting, submit Button is disabled
                    setSubmitting(true);

                    // Simulate submitting to database, shows us values submitted, resets form
                    setTimeout(() => {
                        alert(JSON.stringify(values, null, 2));
                        resetForm();
                        setSubmitting(false);
                    }, 500);
                }}
            >
                {/* Callback function containing Formik state and helpers that handle common form actions */}
                {({ values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    isSubmitting }) => (
                    <Form onSubmit={handleSubmit} className="mx-auto">
                        {console.log(values)}
                        <Form.Group controlId="formFirstName">
                            <Form.Label className="text-white">First Name :</Form.Label>
                            <Form.Control
                                type="text"
                                /* This name property is used to access the value of the form element via values.nameOfElement */
                                name="firstName"
                                placeholder="First Name"
                                /* Set onChange to handleChange */
                                onChange={handleChange}
                                /* Set onBlur to handleBlur */
                                onBlur={handleBlur}
                                /* Store the value of this input in values.name, make sure this is named the same as the name property on the form element */
                                value={values.firstName}
                                /* Check if the name field (this field) has been touched and if there is an error, if so add the .error class styles defined in the CSS (make the input box red) */
                                className={touched.firstName && errors.firstName ? "error" : null}
                            />
                            {/* Applies the proper error message from validateSchema when the user has clicked the element and there is an error, also applies the .error-message CSS class for styling */}
                            {touched.firstName && errors.firstName ? (
                                <div className="error-message">{errors.firstName}</div>
                            ) : null}
                        </Form.Group>
                        <Form.Group controlId="formSurname">
                            <Form.Label className="text-white">Surname :</Form.Label>
                            <Form.Control
                                type="text"
                                /* This name property is used to access the value of the form element via values.nameOfElement */
                                name="surname"
                                placeholder="Surname"
                                /* Set onChange to handleChange */
                                onChange={handleChange}
                                /* Set onBlur to handleBlur */
                                onBlur={handleBlur}
                                /* Store the value of this input in values.name, make sure this is named the same as the name property on the form element */
                                value={values.surname}
                                /* Check if the name field (this field) has been touched and if there is an error, if so add the .error class styles defined in the CSS (make the input box red) */
                                className={touched.surname && errors.surname ? "error" : null}
                            />
                            {/* Applies the proper error message from validateSchema when the user has clicked the element and there is an error, also applies the .error-message CSS class for styling */}
                            {touched.surname && errors.surname ? (
                                <div className="error-message">{errors.surname}</div>
                            ) : null}
                        </Form.Group>
                        <Form.Group controlId="formEmail">
                            <Form.Label className="text-white">Email :</Form.Label>
                            <Form.Control
                                type="text"
                                name="email"
                                placeholder="Email"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.email}
                                className={touched.email && errors.email ? "error" : null}
                            />
                            {touched.email && errors.email ? (
                                <div className="error-message">{errors.email}</div>
                            ) : null}
                        </Form.Group>
                        <Form.Group controlId="formpassword">
                            <Form.Label className="text-white">Password :</Form.Label>
                            <Form.Control
                                type="password"
                                name="password"
                                placeholder="Password"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.password}
                                className={touched.password && errors.password ? "error" : null}
                            />
                            {touched.password && errors.password ? (
                                <div className="error-message">{errors.password}</div>
                            ) : null}
                        </Form.Group>
                        <Form.Group controlId="formyearofBirth">
                            <Form.Label className="text-white">Year of Birth :</Form.Label>
                            <Form.Control
                                type="number"
                                name="yearofBirth"
                                placeholder="Year of Birth"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.yearofBirth}
                                className={touched.yearofBirth && errors.yearofBirth ? "error" : null}
                            />
                            {touched.yearofBirth && errors.yearofBirth ? (
                                <div className="error-message">{errors.yearofBirth}</div>
                            ) : null}
                        </Form.Group>

                        <Form.Group controlId="formstreetAddress">
                            <Form.Label className="text-white">Street Address :</Form.Label>
                            <Form.Control
                                type="text"
                                name="streetAddress"
                                placeholder="Street Address"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.streetAddress}
                                className={touched.streetAddress && errors.streetAddress ? "error" : null}
                            />
                            {touched.streetAddress && errors.streetAddress ? (
                                <div className="error-message">{errors.streetAddress}</div>
                            ) : null}
                        </Form.Group>

                        <Form.Group controlId="formcity">
                            <Form.Label className="text-white">City :</Form.Label>
                            <Form.Control
                                type="text"
                                name="city"
                                placeholder="City"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.city}
                                className={touched.city && errors.city ? "error" : null}
                            />
                            {touched.city && errors.city ? (
                                <div className="error-message">{errors.city}</div>
                            ) : null}
                        </Form.Group>

                        <Form.Group controlId="formpostalCode">
                            <Form.Label className="text-white">Postal Code :</Form.Label>
                            <Form.Control
                                type="number"
                                name="postalCode"
                                placeholder="Postal Code"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.postalCode}
                                className={touched.postalCode && errors.postalCode ? "error" : null}
                            />
                            {touched.postalCode && errors.postalCode ? (
                                <div className="error-message">{errors.postalCode}</div>
                            ) : null}
                        </Form.Group>

                        <Form.Group controlId="formcreditCard">
                            <Form.Label className="text-white">Credit Card :</Form.Label>
                            <Form.Control
                                type="number"
                                name="creditCard"
                                placeholder="Credit Card"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.creditCard}
                                className={touched.creditCard && errors.creditCard ? "error" : null}
                            />
                            {touched.creditCard && errors.creditCard ? (
                                <div className="error-message">{errors.creditCard}</div>
                            ) : null}
                        </Form.Group>


                        <Button variant="primary" type="submit" disabled={isSubmitting}> Submit </Button>
                    </Form>
                )}
            </Formik>
        </Container>
    );
}


export default Registration;