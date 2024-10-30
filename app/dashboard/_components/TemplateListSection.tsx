import Templates from '@/app/(data)/Templates'
import React from 'react'
import { ToolSchema } from '@/app/(data)/Templates'
import TemplateCard from './TemplateCard'

function TemplateListSection() {
    return (
        <div>
            {Templates.map((item: ToolSchema, index: number) => (
                <div key={index}>
                    <TemplateCard {...item}/>
                </div>
            ))}
        </div>
    )
}

export default TemplateListSection