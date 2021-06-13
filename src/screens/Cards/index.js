import React, { useState, useCallback } from 'react';
import { makeStyles } from '@material-ui/core';
import { useSelector } from 'react-redux';

import { selectCards } from '../../reducers/cardSlice';

import { ActiveBtn } from '../../ui';

import PageWrapper from '../../components/wrappers/PageWrapper';
import PageTitle from '../../components/PageTitle';
import CardModal from '../../components/modals/CardModal';
import Card from '../../components/Card';

const useStyles = makeStyles(() => ({
    content: {
    },
    cardsContainer: {
        padding: '2em 0'
    },
    buttonContainer: {
        display: 'flex',
        justifyContent: 'center'
    }
}));

const Cards = () => {

    const classes = useStyles();
    const cards = useSelector(selectCards);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [activeCard, setActiveCard] = useState(null);

    const handleClose = useCallback(() => {
        setIsModalOpen(false);
        setIsEdit(false);
        setActiveCard(null);
    }, []);

    const handleOpen = useCallback((edit, card) => {
        if (edit) {
            setActiveCard(card)
            setIsEdit(true)
        }
        setIsModalOpen(true)
    }, [])

    return (
        <PageWrapper>
            <CardModal isEdit={isEdit} isOpen={isModalOpen} onModalClose={handleClose} card={activeCard} />
            <div className={classes.content}>
                <PageTitle title='Your cards' subTitle='Add, edit or delete your cards any time' />
                <div className={classes.cardsContainer}>
                    {cards?.map(card => (
                        <Card card={card} key={card.cardNumber} onEdit={(card) => handleOpen(true, card)} />
                    ))}
                </div>
            </div>
            <div className={classes.buttonContainer}>
                <ActiveBtn className={classes.button} onClick={() => handleOpen(false)}>
                    Add new card
                </ActiveBtn>
            </div>
        </PageWrapper>
    );
};

export default Cards;