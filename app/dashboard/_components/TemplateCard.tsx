import { ToolSchema } from "@/app/(data)/Templates"
import Image from "next/image"
import Link from "next/link"
import React from "react"

type TemplateCardProps = {
    item: ToolSchema
}

const TemplateCard: React.FC<TemplateCardProps> = ({ item }) => {
    return (
        <Link href={`/dashboard/content/${item?.slug}`}>
            <div className="mt-2 p-5 shadow-sm rounded-sm border bg-white flex flex-col gap-3 cursor-pointer hover:scale-105 transition-all duration-150">
                <Image src={item.icon} alt={item.name} width={40} height={40} />
                <h2 className="font-medium text-lg">{item.name}</h2>
                <p className="text-gray-500 line-clamp-3">{item.desc}</p>
            </div>
        </Link>
    )
}

export default TemplateCard