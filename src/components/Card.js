import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core';
import checkCardType from 'credit-card-type';

import Theme from '../common/Theme';

import masterIcon from '../assets/images/mastercard-logo.svg';
import visaIcon from '../assets/images/visa-logo.svg';
import editIcon from '../assets/images/edit-icon.svg';
import masterBack from '../assets/images/card-background-shape.svg';
import visaBack from '../assets/images/visa-back.svg';

const useStyles = makeStyles(() => ({
    cardContainer: {
        padding: '1.5em',
        color: 'white',
        borderRadius: 14,
        margin: '1em 0',
        height: 130,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
    },
    visaBack: {
        backgroundColor: Theme.colors.secondary,
        backgroundImage: `url(${visaBack})`,
        backgroundSize: '100%',
        backgroundRepeat: 'no-repeat'
    },
    masterBack: {
        backgroundColor: Theme.colors.primary,
        backgroundImage: `url(${masterBack})`,
        backgroundSize: '100%',
        backgroundRepeat: 'no-repeat'
    },
    cardTop: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start'
    },
    dataContainer: {
        display: 'flex'
    },
    dataColumn: {
        marginLeft: '1.5em'
    },
    columnName: {
        color: 'rgba(255,255,255,0.5)',
        fontSize: 10,
        textAlign: 'right',
        textTransform: 'uppercase'
    },
    columnData: {
        fontSize: 16,
        fontWeight: '700'
    },
    cardOwner: {
        fontSize: 16
    },
    cardNumber: {
        fontSize: 15,
        color: 'rgba(255,255,255,0.7)',
        fontWeight: 600,

        '& span': {
            marginRight: '1em'
        }
    },
    numberContainer: {
        marginTop: '0.5em',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    visaColor: {
        color: 'rgba(0,0,0,0.6)',
    },
}));

const Card = ({ card, onEdit, isModal }) => {

    const classes = useStyles();

    const [isVisa, setIsVisa] = useState(false)

    useEffect(() => {
        const type = checkCardType(card.cardNumber)[0]?.type || 'visa';
        setIsVisa(type === 'visa');
    }, [card])

    const textColor = `${isVisa ? classes.visaColor : ''}`;
    const splitedNubmer = card?.cardNumber?.match(/.{1,4}/g);

    return (
        <div className={`${classes.cardContainer} ${isVisa ? classes.visaBack : classes.masterBack}`}>
            <div className={classes.cardTop}>
                <img src={isVisa ? visaIcon : masterIcon} alt='card icon' className={classes.cardIcon} />
                <div className={classes.dataContainer}>
                    <div className={classes.dataColumn}>
                        <h5 className={`${classes.columnName} ${textColor}`}>CVC</h5>
                        <h5 className={classes.columnData}>{card.cvc}</h5>
                    </div>
                    <div className={classes.dataColumn}>
                        <h5 className={`${classes.columnName} ${textColor}`}>Expires</h5>
                        <h5 className={classes.columnData}>{card.expiryDate}</h5>
                    </div>
                </div>
            </div>
            <div className={classes.cardBottom}>
                <h5 className={classes.cardOwner}>{card.firstName}</h5>
                <div className={classes.numberContainer}>
                    <h5 className={`${classes.cardNumber} ${textColor}`}>
                        {splitedNubmer.map((number, index) => (
                            <span key={`${number}-${index}`}>{number}</span>
                        ))}
                    </h5>
                    {!isModal &&
                        <img src={editIcon} alt='edit icon' onClick={() => onEdit(card)} />
                    }
                </div>
            </div>
        </div>
    );
};

export default Card;