'use client'

import { createNewEntry } from "@/utils/api"
import { useRouter } from "next/navigation"

const NewEntryCard = () => {
    const router = useRouter()

    const handleOnClick = async () => {
        const data = await createNewEntry()
        router.push(`journal/${data.id}`)
    }

    return <div className="cursor-pointer overflow-hidden rounded-sm" onClick={handleOnClick}>
        <span className="text-1xl">New Entry -></span>
    </div>
}

export default NewEntryCard;