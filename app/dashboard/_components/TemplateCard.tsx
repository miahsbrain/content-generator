import { ToolSchema } from "@/app/(data)/Templates"
import Image from "next/image"

function TemplateCard( item: ToolSchema ) {
    return (
        <div>
            <Image src={item.icon} alt={item.name} width={40} height={40} />
            {item.name}
        </div>
    )
}

export default TemplateCard