import * as Yup from 'yup';

export const initialValues = {
    firstName: '',
    cardNumber: '',
    expiryDate: '',
    cvc: '',
}

export const getValidationSchema = () => Yup.object().shape({
    firstName: Yup.string().required('Please fill your first name'),
    cardNumber: Yup.string()
        .min(16, 'Card number must be exactly 16 characters')
        .required('Please enter your card number'),
    expiryDate: Yup.date().typeError('Please enter a valid expiry date')
        .required('Please enter expiry date'),
    cvc: Yup.string().typeError('Please enter a valid CVC')
        .min(3, 'Must be exactly 3 characters')
        .required('Please enter CVC'),
});