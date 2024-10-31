'use client'

import { Button } from '@/components/ui/button'
import FormSection from '../../_components/FormSection'
import OutputSection from '../../_components/OutputSection'
import Templates, { ToolSchema } from '@/app/(data)/Templates'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { chatSession } from '@/utils/AIModel'
import { useState } from 'react'
import { db } from '@/utils/Db'
import { aiOutputModel } from '@/utils/Schema'
import { useUser } from '@clerk/nextjs'
import moment from 'moment'
import { useTotalUsage } from '@/app/(context)/TotalUsageContext'
import { useRouter } from 'next/navigation'

interface CreateContentProps {
    params: {
        'template-slug': string
    }
}

const CreateContent: React.FC<CreateContentProps> = ({ params }) => {

    const selectedTemplate: ToolSchema | undefined  = Templates.find(item => item.slug === params['template-slug'])
    const [loading, setLoading] = useState<boolean>(false)
    const [aiOutput, setAiOutput] = useState<string>('')
    const { user } = useUser()
    const { totalUsage } = useTotalUsage()
    const router = useRouter()

    const generateAIContent = async (formData: FormData) => {
        if (totalUsage >= 1000) {
            router.push('/dashboard/billing')
            return
        }
        setLoading(true)
        // Get the prompt from template
        const selectedPrompt = selectedTemplate?.aiPrompt
        // Convert form data to json and append prompt to it
        const finalAIPrompt = JSON.stringify(formData) + ', ' + selectedPrompt
        // Call chat session to return prompt from gemini
        const result = await chatSession.sendMessage(finalAIPrompt)
        // Save the output to aiOutput
        setAiOutput(result?.response.text())
        // Get the slug
        const slug = selectedTemplate?.slug
        // Verify slug exists
        if (!slug) {
            throw new Error('Slug for selected template is not defined')
        }
        await SaveInDb(JSON.stringify(formData), selectedTemplate?.slug, result?.response.text())
        setLoading(false)
    }

    const SaveInDb = async (formData: string, slug: string, aiResponse: string) => {
        if (!formData || !slug || !aiResponse || !user?.primaryEmailAddress?.emailAddress) {
            throw new Error('Missing required fields {formData, slug, aiResponse, or email }')
        }
        const result = await db.insert(aiOutputModel).values({
            formData:formData,
            templateSlug: slug,
            aiResponse: aiResponse,
            createdBy: user?.primaryEmailAddress?.emailAddress,
            createdAt: moment().format('DD/MM/YYYY')
        })

        console.log(result)
    }
    
    return (
        <div className=''>
            <Link href={'/dashboard'}>
                <Button><ArrowLeft /> Back</Button>
            </Link>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-y-10 md:gap-5 py-5'>
                {/* Form section */}
                <div className='w-full'>
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