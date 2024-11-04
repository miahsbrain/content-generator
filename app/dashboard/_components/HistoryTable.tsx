'use client'

import React, { useEffect, useState } from 'react';
import { Clock } from 'lucide-react';
import { aiOutputModelProps } from '@/utils/Schema';
import { useUserContext } from '@/app/(context)/UserContext';
import { getHistory } from '@/utils/Db';

export const HistoryTable: React.FC = () => {

	const [historyData, setHistoryData] = useState<aiOutputModelProps[]>([])
	const { userEmail } = useUserContext()

	useEffect(() => {
		const fetchData = async () => {
			const data = await getHistory(userEmail || '')
			// set data to historyData
			if (data) {
				setHistoryData(data)
			}
		}

		fetchData();
	}, [userEmail])


  return (
    <div className="w-full">
      	{/* Mobile view */}
		<div className="block sm:hidden">
			{historyData ? historyData.map((entry) => (
			<div key={entry.id} className="bg-white mb-4 rounded-lg shadow-sm border border-gray-200">
				<div className="p-4 space-y-2">
				<div className="flex justify-between items-start">
					<span className="text-sm font-medium text-gray-900">#{entry.id}</span>
					<div className="flex items-center gap-1 text-sm text-gray-500">
						<Clock className="w-4 h-4 text-gray-400" />
						{entry.createdAt ? new Date(entry.createdAt).toLocaleDateString() : 'N/A'}
					</div>
				</div>
				
				<div className="space-y-1">
					<p className="text-sm text-gray-900 font-medium line-clamp-1">{entry.formData}</p>
					<p className="text-sm text-gray-600 line-clamp-2">
						{entry.aiResponse || <span className="text-gray-400">No response</span>}
					</p>
				</div>
				
				<div className="flex flex-wrap gap-2 items-center">
					<span className="px-2 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary">
						{entry.templateSlug}
					</span>
					<span className="text-xs text-gray-500">by {entry.createdBy}</span>
				</div>
				</div>
			</div>
			)) : 
			<div>
				No history yet
			</div>
			}
		</div>

		{/* Desktop view */}
		<div className="hidden sm:block overflow-x-auto">
			<table className="min-w-full divide-y divide-gray-200">
			<thead className="bg-primary">
				<tr>
					<th scope="col" className="px-4 py-3 text-left text-xs font-medium text-primary-foreground uppercase tracking-wider">ID</th>
					<th scope="col" className="px-4 py-3 text-left text-xs font-medium text-primary-foreground uppercase tracking-wider">Form Data</th>
					<th scope="col" className="px-4 py-3 text-left text-xs font-medium text-primary-foreground uppercase tracking-wider hidden md:table-cell">AI Response</th>
					<th scope="col" className="px-4 py-3 text-left text-xs font-medium text-primary-foreground uppercase tracking-wider">Template</th>
					<th scope="col" className="px-4 py-3 text-left text-xs font-medium text-primary-foreground uppercase tracking-wider hidden lg:table-cell">Created By</th>
					<th scope="col" className="px-4 py-3 text-left text-xs font-medium text-primary-foreground uppercase tracking-wider">Date</th>
				</tr>
			</thead>
			<tbody className="bg-white divide-y divide-gray-200">
				{historyData ? historyData.map((entry) => (
				<tr key={entry.id} className="hover:bg-gray-50 transition-colors">
					<td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">#{entry.id}</td>
					<td className="px-4 py-3 text-sm text-gray-600 max-w-[200px] truncate">{entry.formData}</td>
					<td className="px-4 py-3 text-sm text-gray-600 hidden md:table-cell max-w-[200px] truncate">
					{entry.aiResponse || <span className="text-gray-400">No response</span>}
					</td>
					<td className="px-4 py-3 whitespace-nowrap">
					<span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-primary/10 text-primary">
						{entry.templateSlug}
					</span>
					</td>
					<td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600 hidden lg:table-cell">{entry.createdBy}</td>
					<td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
					<div className="flex items-center gap-1">
						<Clock className="w-4 h-4 text-gray-400" />
						{entry.createdAt ? new Date(entry.createdAt).toLocaleDateString() : 'N/A'}
					</div>
					</td>
				</tr>
				)) : 
				<div>
					No history yet
				</div>
				}
			</tbody>
			</table>
		</div>

		{/* Pagination */}
		<div className="px-4 py-3 border-t border-gray-200">
			<div className="flex flex-col sm:flex-row items-center justify-between gap-4">
			<div>
				<p className="text-sm text-gray-700">
				Showing <span className="font-medium">1</span> to <span className="font-medium">2</span> of{' '}
				<span className="font-medium">2</span> results
				</p>
			</div>
			<nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
				<button className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
				Previous
				</button>
				<button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
				1
				</button>
				<button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
				Next
				</button>
			</nav>
			</div>
		</div>
    </div>
  );
}