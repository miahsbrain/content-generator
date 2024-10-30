import { ToolSchema } from "@/app/(data)/Templates"

function TemplateCard( item: ToolSchema ) {
    return (
        <div>
            {item.name}
        </div>
    )
}

export default TemplateCard