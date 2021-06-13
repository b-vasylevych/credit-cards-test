import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    cards: [],
}

const cardSlice = createSlice({
    name: 'card',
    initialState,
    reducers: {
        setCards: {
            reducer: (state, action) => {
                state.cards = action.payload || []
            },
        },
        addCard: (state, action) => {
            state.cards = [...state.cards, action.payload]
        },
        editCard: (state, action) => {
            const activeIndex = state.cards.findIndex(el => el.cardNumber === action.payload.oldNumber);
            state.cards[activeIndex] = action.payload.card
        },
        deleteCard: (state, action) => {
            state.cards = state.cards.filter(el => el.cardNumber !== action.payload.cardNumber)
        }
    },
})

export const selectCards = (state) => state.card.cards

export const { setCards, addCard, editCard, deleteCard } = cardSlice.actions

export default cardSlice.reducer
