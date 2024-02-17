"use client"

import userLoadImage from "@/hooks/useLoadImage";
import { Song } from "@/types";
import Image from "next/image";

interface MediaItemProps {
    song: Song;
    onClick?: (id: string) => void;
}

const MediaItem = ({ song, onClick }: MediaItemProps) => {

    const imageUrl = userLoadImage(song);
    const handleClick = () => {
        if (onClick) {
            return onClick(song.id);
        }
        //turn on player
    }
    return (
        <div onClick={handleClick} className="flex items-center gap-x-4 cursor-pointer
            hover:bg-neutral-800/50 w-full p-2 rounded-md">
            <div className="relative rounded-md min-h-[48px] min-w-[48px] overflow-hidden">
                <Image fill className="object-cover" src={imageUrl || '/images/likedSongs.png'} alt='image' />
            </div>
            <div className="flex flex-col gap-y-1 overflow-hidden">
                <p className="text-white truncate">
                    {song.title}
                </p>
                <p className="text-neutral-400 text-sm truncate">
                    {song.artist}
                </p>
            </div>
        </div>
    )
}

export default MediaItem;