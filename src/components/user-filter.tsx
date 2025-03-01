import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface UserFilterProps {
    selectedRole: string | null
    selectedPosition: string | null
    onRoleChange: (role: string | null) => void
    onPositionChange: (position: string | null) => void
}

export function UserFilter({ selectedRole, selectedPosition, onRoleChange, onPositionChange }: UserFilterProps) {
    return (
        <div className="flex space-x-4">
            <Select value={selectedRole || "all"} onValueChange={(value) => onRoleChange(value === "all" ? null : value)}>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by role" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">All Roles</SelectItem>
                    <SelectItem value="ADMIN">Admin</SelectItem>
                    <SelectItem value="MANAGER">Manager</SelectItem>
                    <SelectItem value="USER">User</SelectItem>
                </SelectContent>
            </Select>
            <Select
                value={selectedPosition || "all"}
                onValueChange={(value) => onPositionChange(value === "all" ? null : value)}
            >
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by position" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">All Positions</SelectItem>
                    <SelectItem value="INGENIERO">Ingeniero</SelectItem>
                    <SelectItem value="RR.HH">RR.HH</SelectItem>
                </SelectContent>
            </Select>
        </div>
    )
}

