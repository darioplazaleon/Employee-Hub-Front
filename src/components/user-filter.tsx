import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface UserFilterProps {
    selectedRole: string | null
    onRoleChange: (role: string | null) => void
}

export function UserFilter({ selectedRole, onRoleChange }: UserFilterProps) {
    return (
        <div className="mb-4">
            <Select value={selectedRole || "all"} onValueChange={(value) => onRoleChange(value || null)}>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by role" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">All Roles</SelectItem>
                    <SelectItem value="MANAGER">Managers</SelectItem>
                    <SelectItem value="USER">Users</SelectItem>
                </SelectContent>
            </Select>
        </div>
    )
}

