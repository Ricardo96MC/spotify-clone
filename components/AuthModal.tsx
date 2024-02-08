"use client"

import Modal from "./Modal"

const AuthModal = () => {
    return (
        <Modal title="Welcome Back" isOpen onChange={() => { }}
            description="Login to your account">
            Auth Modal Children
        </Modal>
    )
}

export default AuthModal;