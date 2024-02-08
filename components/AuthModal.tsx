"use client"

import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { useSessionContext, useSupabaseClient } from "@supabase/auth-helpers-react"
import { useRouter } from "next/navigation";

import Modal from "./Modal"
import useAuthModal from '@/hooks/useAuthModal';
import { useEffect } from 'react';

const AuthModal = () => {
    const supabaseClient = useSupabaseClient();
    const router = useRouter();
    const { session } = useSessionContext();
    const { onClose, isOpen } = useAuthModal();

    /**
     * This useEffect will be checking if we have a session.
     * If we are able to succefully login -> have a session,
     * then the login modal will close.
     */
    useEffect(() => {
        if (session) {
            router.refresh();
            onClose();
        }
    }, [session, router, onClose])

    const onChange = (open: boolean) => {
        if (!open) {
            onClose();
        }
    }


    return (
        <Modal title="Welcome Back" isOpen={isOpen} onChange={onChange}
            description="Login to your account">
            <Auth
                theme='dark'
                magicLink
                providers={[]}
                supabaseClient={supabaseClient}
                appearance={{
                    theme: ThemeSupa,
                    variables: {
                        default: {
                            colors: {
                                brand: "#40404",
                                brandAccent: "#22c55e"
                            }
                        }
                    }
                }} />
        </Modal>
    )
}

export default AuthModal;