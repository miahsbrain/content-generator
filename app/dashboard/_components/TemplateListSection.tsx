import Templates, { ToolList } from '@/app/(data)/Templates'
import React, { useEffect, useState } from 'react'
import { ToolSchema } from '@/app/(data)/Templates'
import TemplateCard from './TemplateCard'

type TemplateListSectionProps = {
    userSearchInput: string;
};

const TemplateListSection: React.FC<TemplateListSectionProps> = ({userSearchInput}) => {
    
    const [templateList, setTemplateList] = useState<ToolList>(Templates)

    useEffect(() => {
        if (userSearchInput) {
            const filteredData: ToolList = Templates.filter(item => item.name.toLowerCase().includes(userSearchInput.toLowerCase()))
            setTemplateList(filteredData)
        } else {
            setTemplateList(Templates)
        }
    }, [userSearchInput])

    return (
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
            {templateList.map((item: ToolSchema, index: number) => (
                <div key={index}>
                    <TemplateCard item={item} />
                </div>
            ))}
        </div>
    )
}

export default TemplateListSection