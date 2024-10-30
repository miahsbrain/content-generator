export type ToolList = ToolSchema[];

export interface ToolSchema {
    name: string;
    desc: string;
    category: string;
    icon: string;
    aiPrompt: string;
    slug: string;
    form: FormField[];
};

export interface FormField {
    label: string;
    field: "input" | "textarea" | "select" | "checkbox" | "radio"; // Add more field types as needed
    name: string;
    required?: boolean;
    options?: string[]; // For "select", "radio" fields
};

const Templates: ToolList =  [
    {
        "name": 'Blog Title',
        "desc": 'An AI tool that generates blog title based on your blog content',
        "category": 'Blog',
        "icon": './title.svg',
        "aiPrompt": 'Give me 5 blog topic idea in bullet wise based on a given niche and give me the result in rich text editor format',
        "slug": 'generate-blog-title',
        "form": [
            {
                "label": 'Enter yout blog niche',
                "field": 'input',
                "name": 'niche',
                "required": true
            },
            {
                "label": 'Enter blog outline',
                "field": 'textarea',
                "name": 'outline'
            }
        ]
    },
    {
        "name": "Blog Content",
        "desc": "An AI tool that generates full blog content based on your outline and niche.",
        "category": "Blog",
        "icon": "./content.svg",
        "aiPrompt": "Generate a comprehensive blog post in a professional tone, using the given outline and niche.",
        "slug": "generate-blog-content",
        "form": [
            {
                "label": "Enter your blog niche",
                "field": "input",
                "name": "niche",
                "required": true
            },
            {
                "label": "Enter blog outline",
                "field": "textarea",
                "name": "outline",
                "required": true
            }
        ]
    },
    {
        "name": "Blog Topic Ideas",
        "desc": "An AI tool that generates engaging blog topics based on your niche.",
        "category": "Blog",
        "icon": "./topic-ideas.svg",
        "aiPrompt": "Provide 5 creative blog topic ideas in bullet points for a blog on the given niche.",
        "slug": "generate-blog-topic-ideas",
        "form": [
            {
                "label": "Enter your blog niche",
                "field": "input",
                "name": "niche",
                "required": true
            }
        ]
    },
    {
        "name": "YouTube SEO Title",
        "desc": "An AI tool to create an SEO-optimized YouTube title based on your video topic.",
        "category": "YouTube",
        "icon": "./youtube-title.svg",
        "aiPrompt": "Generate an SEO-friendly YouTube title for a video about the given topic.",
        "slug": "generate-youtube-seo-title",
        "form": [
            {
                "label": "Enter your video topic",
                "field": "input",
                "name": "topic",
                "required": true
            }
        ]
    },
    {
        "name": "YouTube Description",
        "desc": "An AI tool that generates a compelling YouTube description based on your video topic.",
        "category": "YouTube",
        "icon": "./youtube-description.svg",
        "aiPrompt": "Write a YouTube video description with key details, tags, and a call-to-action for a video about the given topic.",
        "slug": "generate-youtube-description",
        "form": [
            {
                "label": "Enter your video topic",
                "field": "input",
                "name": "topic",
                "required": true
            },
            {
                "label": "Provide any key points to include",
                "field": "textarea",
                "name": "key_points"
            }
        ]
    },
    {
        "name": "Add Emojis to Text",
        "desc": "An AI tool that enhances your text with relevant emojis to make it more engaging.",
        "category": "Text",
        "icon": "./emojis.svg",
        "aiPrompt": "Add relevant emojis to enhance the given text in a friendly and engaging way.",
        "slug": "add-emojis-to-text",
        "form": [
            {
                "label": "Enter your text",
                "field": "textarea",
                "name": "text",
                "required": true
            }
        ]
    },            
    {
        "name": "Text Improver",
        "desc": "An AI tool that refines your text for clarity, conciseness, and style.",
        "category": "Text",
        "icon": "./text-improver.svg",
        "aiPrompt": "Improve the given text for readability, clarity, and conciseness, keeping the tone professional.",
        "slug": "improve-text",
        "form": [
            {
                "label": "Enter your text",
                "field": "textarea",
                "name": "text",
                "required": true
            }
        ]
    }    
    
]

export default Templates