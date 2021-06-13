import React, { useCallback, useMemo } from 'react';
import { makeStyles, Modal, TextField, Backdrop, InputAdornment } from '@material-ui/core';
import { Formik } from 'formik';
import { useDispatch } from 'react-redux';

import { addCard, editCard, deleteCard } from '../../../reducers/cardSlice';

import Theme from '../../../common/Theme';

import {
    initialValues,
    getValidationSchema
} from './config';

import Card from '../../Card';

import { ActiveBtn } from '../../../ui';

import blackCrossIcon from '../../../assets/images/black-cross.svg';
import redCrossIcon from '../../../assets/images/form-error.svg';
import successIcon from '../../../assets/images/form-success.svg';

const useStyles = makeStyles(() => ({
    modal: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        width: '100%',
    },
    content: {
        background: 'white',
        padding: '2.5em 2em',
        borderRadius: '20px 20px 0 0',
        position: 'relative',
        overflowY: 'auto',
        maxHeight: 450
    },
    modalHeadContainer: {
        paddingTop: '1em'
    },
    crossContainer: {
        position: 'absolute',
        top: '1.5em',
        right: '1em'
    },
    buttonContainer: {
        paddingTop: '1em'
    },
    formInputs: {
        padding: '1em 0'
    },
    formIcon: {
        marginBottom: '0.5em'
    },
    field: {
        '& .MuiInputBase-input': {
            fontSize: 14
        },
        '& .MuiInputLabel-formControl': {
            fontSize: 14
        }
    },
    fieldSuccess: {
        '& .MuiInputBase-input': {
            color: Theme.colors.success,
        },
        '& .MuiInput-underline:before': {
            borderColor: Theme.colors.success
        },
        '& .MuiInput-underline:after': {
            borderColor: Theme.colors.success
        },
        '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
            borderColor: Theme.colors.success
        },
        '& .MuiInputLabel-formControl': {
            color: Theme.colors.success
        }
    },
    deleteContainer: {
        display: 'flex',
        justifyContent: 'center',
        paddingTop: '1.5em'
    },
    deleteText: {
        cursor: 'pointer',
        fontSize: 16,
        color: 'rgba(0,0,0,0.3)'
    }
}));

const CardModal = ({ isEdit, isOpen, onModalClose, card }) => {

    const classes = useStyles();
    const dispatch = useDispatch();

    const onlyNumbersRegExp = useMemo(() => /^\d*\.?\d*$/, [])

    const handleNumberChange = useCallback(({target: { name, value }}, values, setFieldValue) => {
        const updatedValue = onlyNumbersRegExp.test(value) ? value : values[name]
        setFieldValue(name, updatedValue)
    }, [onlyNumbersRegExp])

    const submitHandler = useCallback((values) => {
        if (isEdit && card?.cardNumber) {
            dispatch(editCard({
                card: { ...values },
                oldNumber: card.cardNumber
            }))
        } else {
            dispatch(addCard(values))
        }
        onModalClose()
    }, [isEdit, card, onModalClose, dispatch]);

    const onDelete = useCallback(() => {
        dispatch(deleteCard(card));
        onModalClose();
    }, [card, onModalClose, dispatch])

    const takeFieldIcon = useCallback((touch, error) => {
        if (touch) {
            if (error) {
                return (
                    <InputAdornment position="end">
                        <img src={redCrossIcon} alt='red cross' className={classes.formIcon} />
                    </InputAdornment>
                );
            } else {
                return (
                    <InputAdornment position="end">
                        <img src={successIcon} alt='green check' className={classes.formIcon} />
                    </InputAdornment>
                );
            };
        }
    }, [classes.formIcon]);

    return (
        <Modal
            open={isOpen}
            onClose={onModalClose}
            className={classes.modal}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
        >
            <div className={classes.content}>
                <div className={classes.modalHeadContainer}>
                    <div className={classes.crossContainer}>
                        <img src={blackCrossIcon} alt='black cross' className={classes.crossIcon} onClick={onModalClose} />
                    </div>
                    <h2>
                        {isEdit ? 'Edit your card' : 'Add your card details'}
                    </h2>
                    {card && (
                        <Card card={card} isModal={true} />
                    )}
                </div>
                <Formik
                    initialValues={(isEdit && card) ? card : initialValues}
                    validationSchema={getValidationSchema.bind(null)}
                    onSubmit={submitHandler}
                >
                    {({
                        errors,
                        handleSubmit,
                        setFieldValue,
                        handleChange,
                        handleReset,
                        values,
                        touched
                    }) => {
                        return (
                            <form
                                className='basket-contact-form'
                                noValidate
                                onSubmit={handleSubmit}
                            >
                                <div className={classes.formInputs}>
                                    <TextField
                                        error={touched['firstName'] && errors['firstName']}
                                        variant="standard"
                                        margin="normal"
                                        fullWidth
                                        onChange={handleChange}
                                        value={values.firstName}
                                        inputProps={{
                                            maxLength: 64,
                                        }}
                                        InputProps={{
                                            endAdornment: takeFieldIcon(touched['firstName'], errors['firstName'])
                                        }}
                                        id="firstName"
                                        label="Name in card"
                                        placeholder='John Doe'
                                        name="firstName"
                                        required
                                        className={`${classes.field} ${(touched['firstName'] && !errors['firstName']) ? classes.fieldSuccess : ''}`}
                                        helperText={touched['firstName'] && errors['firstName']}
                                    />
                                    <TextField
                                        error={touched['cardNumber'] && errors['cardNumber']}
                                        variant="standard"
                                        margin="normal"
                                        fullWidth
                                        onChange={(e) =>
                                            handleNumberChange(e, values, setFieldValue)
                                        }
                                        value={values.cardNumber}
                                        inputProps={{
                                            maxLength: 16,
                                        }}
                                        InputProps={{
                                            endAdornment: takeFieldIcon(touched['cardNumber'], errors['cardNumber'])
                                        }}
                                        id="cardNumber"
                                        label="Card Number"
                                        placeholder='0000 0000 0000 0000'
                                        name="cardNumber"
                                        required
                                        className={(touched['cardNumber'] && !errors['cardNumber']) ? classes.fieldSuccess : ''}
                                        helperText={touched['cardNumber'] && errors['cardNumber']}
                                    />
                                    <TextField
                                        error={touched['expiryDate'] && errors['expiryDate']}
                                        variant="standard"
                                        margin="normal"
                                        fullWidth
                                        onChange={({ target: { value }}) => {
                                            let updatedValue = (values.expiryDate.length === 1 && value.length === 2) ? `${value}/` : value
                                            setFieldValue('expiryDate', updatedValue)
                                        }}
                                        value={values.expiryDate}
                                        inputProps={{
                                            maxLength: 5,
                                        }}
                                        InputProps={{
                                            endAdornment: takeFieldIcon(touched['expiryDate'], errors['expiryDate'])
                                        }}
                                        id="expiryDate"
                                        label="Expiry date"
                                        placeholder='00/00'
                                        name="expiryDate"
                                        required
                                        className={(touched['expiryDate'] && !errors['expiryDate']) ? classes.fieldSuccess : ''}
                                        helperText={touched['expiryDate'] && errors['expiryDate']}
                                    />
                                    <TextField
                                        error={touched['cvc'] && errors['cvc']}
                                        variant="standard"
                                        margin="normal"
                                        fullWidth
                                        onChange={(e) => {
                                            handleNumberChange(e, values, setFieldValue)
                                        }}
                                        inputProps={{
                                            maxLength: 3,
                                        }}
                                        InputProps={{
                                            endAdornment: takeFieldIcon(touched['cvc'], errors['cvc'])
                                        }}
                                        value={values.cvc}
                                        id="cvc"
                                        label="CVC (Security code)"
                                        placeholder='000'
                                        name="cvc"
                                        required
                                        className={(touched['cvc'] && !errors['cvc']) ? classes.fieldSuccess : ''}
                                        helperText={touched['cvc'] && errors['cvc']}
                                    />
                                </div>
                                <div className={classes.buttonContainer}>
                                    <ActiveBtn type='submit'>
                                        Confirm
                                    </ActiveBtn>
                                    {card && (
                                        <div className={classes.deleteContainer}>
                                            <h5
                                                className={classes.deleteText}
                                                onClick={onDelete}
                                            >
                                                Delete card
                                            </h5>
                                        </div>
                                    )}
                                </div>
                            </form>
                        )
                    }}

                </Formik>
            </div>
        </Modal>
    );
};

export default CardModal;