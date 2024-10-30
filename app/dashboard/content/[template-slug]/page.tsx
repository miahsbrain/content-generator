'use client'

import { Button } from '@/components/ui/button'
import FormSection from '../../_components/FormSection'
import OutputSection from '../../_components/OutputSection'
import Templates, { ToolSchema } from '@/app/(data)/Templates'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

interface CreateContentProps {
    params: {
        'template-slug': string
    }
}

const CreateContent: React.FC<CreateContentProps> = ({ params }) => {

    const generateAIContent = (formData: FormData) => {
        console.log(formData)
    }

    const selectedTemplate: ToolSchema | undefined  = Templates.find(item => item.slug === params['template-slug'])

    return (
        <div className='p-5'>
            <Link href={'/dashboard'}>
                <Button><ArrowLeft /> Back</Button>
            </Link>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-10 py-5'>
                {/* Form section */}
                <div>
                    <FormSection selectedTemplate={selectedTemplate} userFormInput={generateAIContent} />
                </div>

                {/* Output section */}
                <div className='col-span-2'>
                    <OutputSection />
                </div>
            </div>
        </div>
    )
}

export default CreateContent