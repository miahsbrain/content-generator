import React from "react"
import Header from "./_components/Header"
import SideNavServer from "./_components/SideNavServer"
import { TotalUsageProvider } from "../(context)/TotalUsageContext"
import { LayoutContextProvider } from "../(context)/LayoutContext"

const DashboardLayout: React.FC<React.PropsWithChildren> = ({children}) => {

	return (
		<LayoutContextProvider>
			<TotalUsageProvider>
				<div className="flex min-h-screen max-h-screen bg-slate-100">
					<SideNavServer />
					<div className="flex flex-col flex-1">
						<Header />
						<main className="flex-1 overflow-y-auto">
							<div className="container mx-auto p-4 lg:p-6">
								{children}
							</div>
						</main>
					</div>
				</div>
			</TotalUsageProvider>
		</LayoutContextProvider>
	)
}

export default DashboardLayout