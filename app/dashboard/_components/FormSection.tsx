'use client'

import { FormField, ToolSchema } from '@/app/(data)/Templates'
import React, { useState } from 'react'
import Image from 'next/image'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'

interface FormSectionProps {
    selectedTemplate?: ToolSchema,
    userFormInput: (formData: FormData) => void
}

const FormSection: React.FC<FormSectionProps> = ({ selectedTemplate, userFormInput }) => {

    const [formData, setFormData] = useState<FormData>(new FormData())

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = event.target
        setFormData({...formData, [name]: value})
    }
    
    const onSubmit = (event: React.FormEvent) => {
        event.preventDefault()
        userFormInput(formData)
    }

    return (
        <div className='p-5 shadow-sm border rounded-sm bg-white'>
            <div>
                <Image src={selectedTemplate?.icon ? selectedTemplate?.icon : ''} alt={selectedTemplate?.name ? selectedTemplate?.name : ''} height={70} width={70} />
                <h2 className='font-semibold text-2xl mb-2 text-primary'>{selectedTemplate?.name}</h2>
                <p className='text-gray-500 text-sm'>{selectedTemplate?.desc}</p>
            </div>
            <form className='mt-6' onSubmit={onSubmit}>
                {selectedTemplate?.form.map((item: FormField, index: number) => (
                    <div key={index} className='my-2 flex flex-col gap-2 mb-7'>
                        <label htmlFor={item.label} className='font-semibold'>{item.label}</label>
                        {item.field == 'text' ?
                            <Input name={item.name} required={item.required} onChange={handleInputChange} /> :
                        item.field == 'textarea' ?
                            <Textarea name={item.name} required={item.required} onChange={handleInputChange} /> :
                        null}
                    </div>
                ))}
                <Button type='submit' className='w-full py-5 bg-primary text-primary-foreground'>Generate Content</Button>
            </form>
        </div>
    )
}

export default FormSection