'use client'

import { db } from '@/utils/Db'
import { aiOutputModel } from '@/utils/Schema'
import { eq } from 'drizzle-orm'
import React, { useEffect, useState } from 'react'
import { aiOutputModelProps } from '@/utils/Schema'
import { useTotalUsage } from '@/app/(context)/TotalUsageContext'
import { useRouter } from 'next/navigation'
import { useUserContext } from '@/app/(context)/UserContext'
import { useSubscription } from '@/app/(context)/SubscriptionContext'

const UsageTrack: React.FC = () => {
    const {totalUsage, setTotalUsage} = useTotalUsage()
    const { currentPlan } = useSubscription()
    const [maxCredits, setMaxCredits] = useState<number>(10000)
    const router = useRouter()
    const { userEmail } = useUserContext()

    // useEffect to fetch data from database
    useEffect(() => {
        // Fetch the data
        const fetchData = async () => {
            // Validate email exists
            if (!userEmail) {
                throw new Error("User or email not defined");
            }
            // Get data
            try {
                const fetchedData = await db.select().from(aiOutputModel).where(eq(aiOutputModel.createdBy, userEmail));
                getTotalUsage(fetchedData);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        // Calculate the total usage of `aiResponse` length
        const getTotalUsage = (data: aiOutputModelProps[]) => {
            const total = data.reduce((acc, element) => acc + (element.aiResponse?.length || 0), 0);
            setTotalUsage(total)
            setMaxCredits(currentPlan == 'free' ? 10000 : 100000)
        };

    fetchData();
    }, [userEmail, setTotalUsage, currentPlan, setMaxCredits]);

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
            <button className="w-full py-2 px-4 bg-primary/90 text-primary-foreground rounded-md hover:bg-primary transition-colors duration-200" onClick={() => router.push('/dashboard/billing')}>
              Upgrade
            </button>
        </div>
  )
}

export default UsageTrack