"use client"

import SongItem from "@/components/SongItem";
import { Song } from "@/types";

interface PageContentProps {
    songs: Song[];
}

const PageContent = (props: PageContentProps) => {
    if (props.songs.length === 0) {
        return (
            <div className="mt-4 text-neutral-400">
                No songs are available
            </div>
        )
    }

    return (
        <div className="
            grid 
            grid-cols-2
            sm:grid-cols-3
            md:grid-cols-4
            lg:grid-cols-5
            xl:grid-cols-6
            2xl:grid-cols-8
            gap-4
            mt-4
            ">
            {props.songs.map((song) => (
                <SongItem key={song.id} onClick={() => { }} data={song} />
            ))}
        </div>
    )
}

export default PageContent;