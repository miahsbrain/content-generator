'use client'

import { Button } from '@/components/ui/button'
import { db } from '@/utils/Db'
import { aiOutputModel } from '@/utils/Schema'
import { eq } from 'drizzle-orm'
import React, { useEffect } from 'react'
import { DBResultProps } from '../history/page'
import { useTotalUsage } from '@/app/(context)/TotalUsageContext'

interface UsageTrackProps {
    email: string
}

const UsageTrack: React.FC<UsageTrackProps> = ({ email }) => {
    const {totalUsage, setTotalUsage} = useTotalUsage()

    // useEffect to fetch data from database
    useEffect(() => {
        // Fetch the data
        const fetchData = async () => {
            // Validate email exists
            if (!email) {
                throw new Error("User or email not defined");
            }
            // Get data
            try {
                const fetchedData = await db.select().from(aiOutputModel).where(eq(aiOutputModel.createdBy, email));
                getTotalUsage(fetchedData);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        // Calculate the total usage of `aiResponse` length
        const getTotalUsage = (data: DBResultProps[]) => {
            const total = data.reduce((acc, element) => acc + (element.aiResponse?.length || 0), 0);
            setTotalUsage(total)
        };

    fetchData();
    }, [email, setTotalUsage]);

  return (
    <div className='m-5'>
        <div className='bg-primary text-primary-foreground rounded-sm p-3 w-full'>
            <h3 className='font-semibold'>Credits</h3>
            <div className='h-2 w-full bg-primary-foreground/30 rounded-full mt-2'>
                <div className='h-2 bg-primary-foreground rounded-full' style={{width: `${(Number(totalUsage)/10000)*100}%`}}></div>
            </div>
            <h3 className='text-xs mt-2'>{totalUsage} / 10,000 Credits Used</h3>
        <Button className='w-full bg-white/70 hover:bg-white text-primary mt-2'>Upgrade</Button>
        </div>
    </div>
  )
}

export default UsageTrack