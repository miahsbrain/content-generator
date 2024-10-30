import SearchSection from "./_components/SearchSection"
import TemplateListSection from "./_components/TemplateListSection"


function Dashboard() {
	return (
		<div className="p-2">
			{/* Search section */}
			<div>
				<SearchSection />
			</div>
			{/* Template section */}
			<div>
				<TemplateListSection />
			</div>
		</div>
	)
}

export default Dashboard