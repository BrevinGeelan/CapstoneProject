import React from "react";
import Modal from "react-modal";
import { useCart } from "./CartContext";

export default function ProductModal({ isOpen, closeModal, product }) {
    const {dispatch} = useCart();

    const addToCart = () => {
        const addedProduct = {
            id: product.id,
            image: product.image,
            title: product.title,
            price: product.price,
            quantity: 1,
        };
        console.log('adding to cart:', addedProduct)

        dispatch({type: 'ADD_TO_CART', payload: addedProduct });


        closeModal();
    }
    return (
        <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        contentLabel="Product Details"
        >
        <h2>{product.title}</h2>
        <p>Price: ${product.price}</p>
        <p>Description: {product.description}</p>
        <p>Category: {product.category}</p>
        <p>Rating: {product.rating.rate} (Count: {product.rating.count})</p>
        <img src={product.image} alt={product.title} />
        <button onClick={addToCart}>Add to Cart</button>
        <button onClick={closeModal}>Close</button>
        </Modal>
    );
};