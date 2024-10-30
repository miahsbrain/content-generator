import { FormField, ToolSchema } from '@/app/(data)/Templates'
import React from 'react'
import Image from 'next/image'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

interface FormSectionProps {
    selectedTemplate?: ToolSchema
}

const FormSection: React.FC<FormSectionProps> = ({ selectedTemplate }) => {
    return (
        <div>
            <div className='p-5 shadow-sm border rounded-sm'>
                <Image src={selectedTemplate?.icon ? selectedTemplate?.icon : ''} alt={selectedTemplate?.name ? selectedTemplate?.name : ''} height={70} width={70} />
                <h2 className='font-semibold text-2xl mb-2 text-primary'>{selectedTemplate?.name}</h2>
                <p className='text-gray-500 text-sm'>{selectedTemplate?.desc}</p>
            </div>
            <form className='mt-6'>
                {selectedTemplate?.form.map((item: FormField, index: number) => (
                    <div key={index} className='my-2 flex flex-col gap-2 mb-7'>
                        <label htmlFor={item.label}>{item.label}</label>
                        {item.field == 'text' ?
                            <Input /> :
                        item.field == 'textarea' ?
                            <Textarea /> :
                        null}
                    </div>
                ))}
            </form>
        </div>
    )
}

export default FormSection