import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Position {
    id: number
    name: string
}

interface UserFilterProps {
    selectedRole: string | null
    selectedPosition: number | null
    positions: Position[]
    onRoleChange: (role: string | null) => void
    onPositionChange: (positionId: number | null) => void
}

export function UserFilter({
                               selectedRole,
                               selectedPosition,
                               positions,
                               onRoleChange,
                               onPositionChange,
                           }: UserFilterProps) {
    return (
        <div className="flex space-x-4">
            <Select value={selectedRole || "all"} onValueChange={(value) => onRoleChange(value === "all" ? null : value)}>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filtrar por rol" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">Todos los roles</SelectItem>
                    <SelectItem value="ADMIN">Admin</SelectItem>
                    <SelectItem value="MANAGER">Manager</SelectItem>
                    <SelectItem value="USER">User</SelectItem>
                </SelectContent>
            </Select>
            <Select
                value={selectedPosition ? selectedPosition.toString() : "all"}
                onValueChange={(value) => onPositionChange(value === "all" ? null : Number(value))}
            >
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filtrar por posición" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">Todas las posiciones</SelectItem>
                    {positions.map((position) => (
                        <SelectItem key={position.id} value={position.id.toString()}>
                            {position.name}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    )
}

