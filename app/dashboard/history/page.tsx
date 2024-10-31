import React from 'react'

export interface DBResultProps {
    id: number,
    formData: string,
    aiResponse: string | null,
    templateSlug: string,
    createdBy: string,
    createdAt: string | null
}

const History: React.FC = () => {
    return (
        <div>
            History
        </div>
    )
}

export default History