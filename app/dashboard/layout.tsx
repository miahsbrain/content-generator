import React from "react"
import Header from "./_components/Header"
import SideNavServer from "./_components/SideNavServer"
import { TotalUsageProvider } from "../(context)/TotalUsageContext"

const DashboardLayout: React.FC<React.PropsWithChildren> = ({children}) => {
	return (
		<TotalUsageProvider>
			<div className="bg-slate-100 h-screen">
				<div className="fixed w-[15rem] hidden md:block">
					<SideNavServer />
				</div>
				<div className="md:ml-[15rem]">
					<Header />
					{ children }
				</div>
			</div>
		</TotalUsageProvider>
	)
}

export default DashboardLayout