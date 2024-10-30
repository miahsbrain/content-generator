import React from 'react'

interface CreateContentProps {
    params: {
        'template-slug': string
    }
}

const CreateContent: React.FC<CreateContentProps> = ({ params }) => {
  return (
    <div>
        {params['template-slug']}
    </div>
  )
}

export default CreateContent