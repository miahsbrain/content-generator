import React, { useEffect, useRef } from 'react'
import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/react-editor';
import { Button } from '@/components/ui/button';
import { Copy } from 'lucide-react';

interface OutputSectionProps {
    aiOutput: string
}

const OutputSection: React.FC<OutputSectionProps> = ({ aiOutput }) => {
    // Reference to editor object
    const editorRef = useRef<Editor | null>()
    // Update output on aiOutput change
    useEffect(() => {
        // Get editor instance
        const editorInstance = editorRef.current?.getInstance()
        // Set editor instance markdown
        editorInstance?.setMarkdown(aiOutput)
    }, [aiOutput])

    return (
        <div className='bg-white shadow-sm border rounded-sm'>
            <div className='flex justify-between items-center p-5'>
                <h3 className='text-xl font-semibold'>Your result</h3>
                <Button onClick={() => navigator.clipboard.writeText(editorRef.current?.getInstance().getMarkdown() || "")}><Copy /> Copy</Button>
            </div>
            <Editor
                ref={editorRef as React.LegacyRef<Editor>}
                initialValue="Your result will appear here"
                previewStyle="vertical"
                height="500px"
                initialEditType="wysiwyg"
                useCommandShortcut={true}
                // onChange={() => console.log(editorRef.current?.getInstance().getMarkdown())}
            />
        </div>
    )
}

export default OutputSection