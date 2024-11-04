import React from 'react';
import { HistoryTable } from './HistoryTable';

export function HistorySection() {
  return (
    <div className="h-full w-full overflow-y-auto">
		<div className="p-6">
			<div className="mb-8">
				<h1 className="text-2xl font-bold text-gray-900 mb-2">History</h1>
				<p className="text-sm text-gray-600">
					View your previous operations and their results
				</p>
			</div>

			<HistoryTable />
		</div>
    </div>
  );
}