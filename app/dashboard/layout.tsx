import React from "react"
import Header from "./_components/Header"
import SideNav from "./_components/SideNav"


const DashboardLayout: React.FC<React.PropsWithChildren> = ({children}) => {
	return (
		<div>
			<div className="fixed w-[15rem] hidden md:block">
				<SideNav />
			</div>
			<div className="md:ml-[15rem]">
				<Header />
				{ children }
			</div>
		</div>
	)
}

export default DashboardLayout