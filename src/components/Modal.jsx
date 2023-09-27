import React from "react";
import Modal from "react-modal";
import { useCart } from "./CartContext";
import { useNavigate } from "react-router-dom";
import "../App.css"
import ModalCard from "./ModalCard";


const customStyles = {
    content: {
        width: "50%",
        height: "60%",
        margin: "auto",
        overflow: "auto",
        backgroundColor: "#f0f0f0",
    },
    overlay: {
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        backdropFilter: "blur(5px)"
    },
};

export default function ProductModal({ isOpen, closeModal, product }) {
  

    return (
        <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        contentLabel="Product Details"
        style={customStyles}
        >
        <h2 style={{ textAlign: 'center'}}>{product.title}</h2>
       <ModalCard product={product} closeModal={closeModal} />

        </Modal>
    );
};