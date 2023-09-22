import React, { createContext, useContext, useEffect, useReducer} from "react";
import ProductModal from "./Modal";

const initialCart = {
    items: [],
    totalItems: 0
};

const CartContext = createContext();

function cartReducer(state, action) {
    switch (action.type) {
        case 'INITIALIZE_CART':
            const storedCart = JSON.parse(localStorage.getItem('cart')) || initialCart
            return { ...state, ...storedCart };

        case 'ADD_TO_CART':

        const existingItemIndex = state.items.findIndex(item => item.id === action.payload.id);

        if (existingItemIndex !== -1) {
            const updatedItems= [...state.items];
            const existingItem = updatedItems[existingItemIndex];
            existingItem.quantity += action.payload.quantity;
        
            const updatedState = {
                ...state,
                items: updatedItems,
                totalItems: state.totalItems + action.payload.quantity,
            };
           localStorage.setItem('cart', JSON.stringify(updatedState));
           return updatedState;
        } else {
            const updatedState = {
                ...state,
                items: [...state.items, action.payload],
                totalItems: state.totalItems + action.payload.quantity,
            };
            localStorage.setItem('cart', JSON.stringify(updatedState));

            return updatedState
        }
            
            case 'UPDATE_QUANTITY':
                const newTotalItems = action.payload.reduce((total, item) => total + item.quantity, 0)
                return {
                    ...state, items: action.payload, totalItems: newTotalItems,
                };

            
                  
            case 'REMOVE_FROM_CART':

            const updatedItems = state.items.filter(
                (item) => item.id !== action.payload.id
            );

            const updatedStateWithoutItem = {
                ...state,
                items: updatedItems,
                totalItems: state.totalItems - 1,
            }

            localStorage.setItem('cart', JSON.stringify(updatedStateWithoutItem))
            return updatedStateWithoutItem;


            case 'CLEAR_CART':
            const clearedState = {
                ...state,
                items: [],
                totalItems: 0,
            };

            localStorage.removeItem('cart');

            return clearedState

            default:
                return state;
    }
}

export function CartProvider({ children }) {
    const [cartState, dispatch] = useReducer(cartReducer, initialCart);

    useEffect(() => {
        dispatch({ type: 'INITIALIZE_CART' });
    }, []);

    return (
        <CartContext.Provider value={{cartState, dispatch}}>
            {children}
        </CartContext.Provider>
    )
}

export function useCart() {
    const context = useContext(CartContext)
    if (!context) {
        throw new Error('useCart must be used within a CartProvider')
    }
    return context
}

