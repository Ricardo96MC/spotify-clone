"use client";

import useAuthModal from "@/hooks/useAuthModal";
import useUploadModal from "@/hooks/useUploadModal";
import { useUser } from "@/hooks/useUser";
import { Song } from "@/types";
import { AiOutlinePlus } from "react-icons/ai";
import { TbPlaylist } from "react-icons/tb";
import MediaItem from "./MediaItem";

interface LibraryProps {
    songs: Song[];
}
const Library = ({ songs }: LibraryProps) => {
    const authModal = useAuthModal();
    const uploadModal = useUploadModal();
    const { user } = useUser();

    const onClick = () => {
        // Here we check if we are logged in via our useUser hook
        // if not then we open the login modal
        if (!user) {
            return authModal.onOpen();
        }
        // TODO: check user has a subscription
        //handle upload
        return uploadModal.onOpen();
    }

    return (
        <div className="flex flex-col">
            <div className="
            flex
            items-center 
            justify-between 
            px-5 
            pt-4">
                <div className="inline-flex items-center gap-x-2">
                    <TbPlaylist className="text-neutral-400" size={26} />
                    <p className="text-neutral-400 text-medium text-md">Your Library</p>
                </div>
                <AiOutlinePlus
                    onClick={onClick}
                    size={20}
                    className="text-neutral-400 hover:text-white transition"
                />
            </div>
            <div className="flex flex-col gap-y-2 mt-4 px-3">
                {songs.map((song) => (
                    <MediaItem song={song} />
                ))}
            </div>
        </div>
    )
}

export default Library;