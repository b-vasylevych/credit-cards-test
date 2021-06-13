import cardReducer, { setCards } from './cardSlice';

describe('Cards reducer', () => {
    it('Should return default state', () => {
        const newState = cardReducer(undefined, {});
        expect(newState.cards).toEqual([]);
    });

    it('Should update cards state in store', () => {
        const cards = [{
            cardNumber: '1234123412341234'
        }];
        const newState = cardReducer(undefined, {
            type: setCards,
            payload: cards
        });
        expect(newState.cards).toEqual(cards);
    });
});