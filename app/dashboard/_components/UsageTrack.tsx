'use client'

import { useTotalUsage } from '@/app/(context)/TotalUsageContext'
import { useRouter } from 'next/navigation'

const UsageTrack: React.FC = () => {
    const {totalUsage, maxCredits} = useTotalUsage()
    const router = useRouter()

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