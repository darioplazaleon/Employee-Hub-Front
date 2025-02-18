import {SidebarInset} from "@/components/ui/sidebar";

export default function HomePage(){

    return (
        <SidebarInset className="p-6">
            <h1 className="text-2xl font-semibold mb-4">Dashboard</h1>
            <p>Welcome to your admin dashboard. Select an option from the sidebar to get started.</p>
        </SidebarInset>
    )
}