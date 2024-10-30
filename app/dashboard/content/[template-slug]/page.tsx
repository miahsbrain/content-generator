import React from 'react'
import FormSection from '../../_components/FormSection'
import OutputSection from '../../_components/OutputSection'
import Templates, { ToolSchema } from '@/app/(data)/Templates'

interface CreateContentProps {
    params: {
        'template-slug': string
    }
}

const CreateContent: React.FC<CreateContentProps> = ({ params }) => {

    const selectedTemplate: ToolSchema | undefined  = Templates.find(item => item.slug === params['template-slug'])

    return (
        <div className='grid grid-cols-1 md:grid-cols-2 gap-10 p-5'>
            {/* Form section */}
            <div>
                <FormSection selectedTemplate={selectedTemplate} />
            </div>

            {/* Output section */}
            <div>
                <OutputSection />
            </div>
        </div>
    )
}

export default CreateContent