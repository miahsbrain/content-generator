'use client'

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
    const maxCredits = 10000

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
        <div className="space-y-4">
            <div className="space-y-2">
                <div className="text-sm">Credits</div>
                <div className="h-2 bg-primary/30 rounded-full overflow-hidden">
                    <div 
                    className="h-full bg-primary transition-all duration-300 ease-in-out" 
                    style={{ 
                        width: `${(totalUsage / maxCredits) * 100}%` 
                    }}
                    />
                </div>
                <div className="text-xs text-gray-500">
                    {totalUsage.toLocaleString()} / {maxCredits.toLocaleString()} Credits Used
                </div>
            </div>
            <button className="w-full py-2 px-4 bg-primary/90 text-primary-foreground rounded-md hover:bg-primary transition-colors duration-200">
              Upgrade
            </button>
        </div>
  )
}

export default UsageTrack