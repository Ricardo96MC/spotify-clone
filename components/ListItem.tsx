"use client";

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { AiFillPlayCircle } from 'react-icons/ai';
import { FaPlay } from 'react-icons/fa';

interface ListItemProps {
    thumbnailImage: string;
    name: string;
    href: string;
}

const ListItem = ({ thumbnailImage, name, href }: ListItemProps) => {
    const router = useRouter();

    const onClick = () => {
        //add authentication button
        router.push(href);
    }

    return (
        <button onClick={onClick} className="relative group flex items-center rounded-md overflow-hidden gap-x-4 bg-neutral-100/10 hover:bg-neutral-100/20 transition pr-4">
            <div className="relative min-h-[64px] min-w-[64px]">
                <Image className="object-cover" fill src={thumbnailImage} alt="image" />
            </div>
            <p className="font-small truncate py-5">{name}</p>
            <div className="absolute transition opacity-0 bg-green-500 flex items-center justify-center 
                p-4 right-3 rounded-full drop-shadow-md group-hover:opacity-100 hover:scale-110">
                <FaPlay className="text-black" />
            </div>
        </button>
    )
}

export default ListItem;