import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

interface UserSearchProps {
    searchQuery: string
    onSearchChange: (query: string) => void
}

export function UserSearch({ searchQuery, onSearchChange }: UserSearchProps) {
    return (
        <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
                type="text"
                placeholder="Search users..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="pl-8"
            />
        </div>
    )
}

