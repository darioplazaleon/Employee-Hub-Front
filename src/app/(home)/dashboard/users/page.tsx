import {SidebarInset} from "@/components/ui/sidebar"
import {Button} from "@/components/ui/button"
import {PlusCircle} from "lucide-react"
import {UserListClient} from "@/components/user-list-client";
import {cookies} from "next/headers";
import Link from "next/link";

async function getUsers() {

    const cookieStore = await cookies()
    const access_token = cookieStore.get("access_token")?.value

    const response = await fetch("http://localhost:8080/api/v1/user/all", {
        headers: {
            "Authorization": `Bearer ${access_token}`
        }
    })
    const data = await response.json()

    return data.content
}

export default async function UsersListPage() {
    const users = await getUsers()

    return (
        <SidebarInset className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-semibold">User List</h1>
                <Button>
                    <Link href={"/dashboard/users/new"} className="flex">
                        <PlusCircle className="mr-2 h-4 w-4"/>
                        Add User
                    </Link>
                </Button>
            </div>
            <UserListClient initialUsers={users}/>
        </SidebarInset>
    )
}

