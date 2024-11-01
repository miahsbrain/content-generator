'use client'

import { Search } from 'lucide-react'
import React from 'react'

type SearchSectionProps = {
    onSearchInput: React.Dispatch<React.SetStateAction<string>>;
};

const SearchSection: React.FC<SearchSectionProps> = ({ onSearchInput }) => {

    return (
        <div className='p-10 bg-gradient-to-br from-orange-400 via-orange-500 to-orange-600 rounded-sm flex flex-col justify-center items-center'>
            <h2 className='text-2xl font-semibold text-white text-center'>Browse All Templates</h2>
            <p className='text-center mt-2'>What would you like to create today?</p>
            <div className='w-full'>
                <div className='flex gap-2 items-center p-2 border rounded-sm bg-white mt-5 mb-3 w-full md:w-[30%] mx-auto'>
                    <Search className='text-primary' />
                    <input type="search" placeholder='search' className='bg-transparent outline-none w-full' onChange={(event: React.ChangeEvent<HTMLInputElement>) => onSearchInput(event.target.value)}/>
                </div>
            </div>
        </div>
    )
}

export default SearchSection