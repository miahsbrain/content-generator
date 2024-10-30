'use client'

import { Button } from '@/components/ui/button'
import FormSection from '../../_components/FormSection'
import OutputSection from '../../_components/OutputSection'
import Templates, { ToolSchema } from '@/app/(data)/Templates'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { chatSession } from '@/utils/AIModel'
import { useState } from 'react'

interface CreateContentProps {
    params: {
        'template-slug': string
    }
}

const CreateContent: React.FC<CreateContentProps> = ({ params }) => {

    const selectedTemplate: ToolSchema | undefined  = Templates.find(item => item.slug === params['template-slug'])
    const [loading, setLoading] = useState<boolean>(false)
    const [aiOutput, setAiOutput] = useState<string>('')

    const generateAIContent = async (formData: FormData) => {
        setLoading(true)
        // Get the prompt from template
        const selectedPrompt = selectedTemplate?.aiPrompt
        // Convert form data to json and append prompt to it
        const finalAIPrompt = JSON.stringify(formData) + ', ' + selectedPrompt
        // Call chat session to return prompt from gemini
        const result = await chatSession.sendMessage(finalAIPrompt)
        // Save the output to aiOutput
        setAiOutput(result.response.text())
        setLoading(false)
    }
    
    return (
        <div className='p-5'>
            <Link href={'/dashboard'}>
                <Button><ArrowLeft /> Back</Button>
            </Link>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-10 py-5'>
                {/* Form section */}
                <div>
                    <FormSection selectedTemplate={selectedTemplate} userFormInput={generateAIContent} loading={loading} />
                </div>

                {/* Output section */}
                <div className='col-span-2'>
                    <OutputSection aiOutput={aiOutput} />
                </div>
            </div>
        </div>
    )
}

export default CreateContent