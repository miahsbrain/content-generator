'use client'

import React, { useState } from "react"
import SearchSection from "./_components/SearchSection"
import TemplateListSection from "./_components/TemplateListSection"


const Dashboard: React.FC = () => {
	const [userSearchInput, setUserSearchInput] = useState<string>('')

	return (
		<div className="p-2">
			{/* Search section */}
			<div>
				<SearchSection onSearchInput={setUserSearchInput} />
			</div>
			{/* Template section */}
			<div>
				<TemplateListSection userSearchInput={userSearchInput} />
			</div>
		</div>
	)
}

export default Dashboard