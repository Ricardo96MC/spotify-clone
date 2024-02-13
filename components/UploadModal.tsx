"use client"

import uniqid from "uniqid";
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { useState } from 'react';
import toast from 'react-hot-toast';

import Input from './Input';
import Button from './Button';
import { useUser } from '@/hooks/useUser';
import useUploadModal from "@/hooks/useUploadModal";
import Modal from "./Modal"
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";

const UploadModal = () => {
    const [isLoading, setIsLoading] = useState(false);
    const uploadModal = useUploadModal();
    const { user } = useUser();
    const supabaseClient = useSupabaseClient();
    const router = useRouter();

    const { register, handleSubmit, reset } = useForm<FieldValues>({
        defaultValues: {
            artist: '',
            title: '',
            song: null,
            image: null
        }
    })
    const onChange = (open: boolean) => {
        if (!open) {
            //now when we close the modal it will reset safely
            reset();
            uploadModal.onClose();
        }
    }

    const onSubmit: SubmitHandler<FieldValues> = async (values) => {
        //upload to supabase
        try {
            setIsLoading(true);
            const songFile = values.song?.[0];
            const imageFile = values.image?.[0];
            if (!songFile || !imageFile || !user) {
                toast.error('Please fill out all fields.')
                //call a return so that way we can redisplay form
                //and not interrupt current flow and not attempt upload
                return;
            }

            const uniqueId = uniqid();
            /**
             * Here we will now upload the song to our supabase db, we are using
             * our 'songs' table and then upload the 
             * song-title to the title column
             * songFile to the song-path column
             * 
             */
            const {
                data: songData,
                error: songError
            } = await supabaseClient
                .storage
                .from('songs')
                .upload(`song-${values.title}-${uniqueId}`, songFile, {
                    cacheControl: '3600',
                    upsert: false
                });
            if (songError) {
                setIsLoading(false);
                return toast.error('Failed to upload the song');
            }

            // Now we attempt to uploade the image for the album cover
            const {
                data: imageData,
                error: imageError
            } = await supabaseClient
                .storage
                .from('images')
                .upload(`image-${values.title}-${uniqueId}`, imageFile, {
                    cacheControl: '3600',
                    upsert: false
                });
            if (imageError) {
                setIsLoading(false);
                return toast.error('Failed to upload the image.');
            }

            const {
                error: supaBaseError,
            } = await supabaseClient
                .from('songs')
                .insert({
                    user_id: user.id,
                    title: values.title,
                    artist: values.artist,
                    image_path: imageData.path,
                    song_path: songData.path
                });
            if (supaBaseError) {
                setIsLoading(false)
                return toast.error(supaBaseError.message);
            }
            router.refresh();
            setIsLoading(false);
            toast.success('Song was successfully uploaded.');
            reset();
            uploadModal.onClose();

        } catch (error) {
            toast.error("An error occured submittig the song.")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Modal title="Upload a song" description="Upload an mp3 file" isOpen={uploadModal.isOpen} onChange={onChange}>
            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-y-4'>
                <Input id='title' disabled={isLoading} {...register('title', { required: true })} placeholder='Song Title' />
                <Input id='artist' disabled={isLoading} {...register('artist', { required: true })} placeholder='Song Artist' />
                <div>
                    <div className='pb-1'>
                        Select a song file
                    </div>
                    <Input id='song' type='file' accept='.mp3' disabled={isLoading} {...register('song', { required: true })} />
                </div>
                <div>
                    <div className='pb-1'>
                        Select a album cover
                    </div>
                    <Input id='image' type='file' accept='image/*' disabled={isLoading} {...register('image', { required: true })} />
                </div>
                <Button disabled={isLoading} type='submit'>
                    Create
                </Button>
            </form>
        </Modal>
    )
}

export default UploadModal;