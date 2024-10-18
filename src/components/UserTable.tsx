import { Briefcase, Star, Pencil, Trash2 } from "lucide-react"
import { Badge } from "./ui/badge"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { UserTableProps } from "@/types/types"

export const UserTable = ({ users, editingUser, setEditingUser, handleEditUser, deleteUser }: UserTableProps) => {
    return (
        <Table>
            <TableHeader className="bg-[#f4f9ff]">
                <TableRow>
                    <TableHead className="text-center">Name</TableHead>
                    <TableHead className="text-center">Username</TableHead>
                    <TableHead className="text-center">Age</TableHead>
                    <TableHead className="text-center">Status</TableHead>
                    <TableHead className="text-center">Marital Status</TableHead>
                    <TableHead className="text-center">Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {users.map((user) => (
                    <TableRow key={user.username}>
                        {editingUser?.username === user.username ? (
                            <TableCell colSpan={6}>
                                <div className="grid gap-4">
                                    <Input
                                        value={editingUser.first_name}
                                        onChange={(e) => setEditingUser({ ...editingUser, first_name: e.target.value })}
                                    />
                                    <Input
                                        value={editingUser.last_name}
                                        onChange={(e) => setEditingUser({ ...editingUser, last_name: e.target.value })}
                                    />
                                    <Input
                                        type="number"
                                        value={editingUser.age}
                                        onChange={(e) => setEditingUser({ ...editingUser, age: parseInt(e.target.value) })}
                                    />
                                    <div className="flex justify-center gap-4">
                                        <label className="flex items-center gap-2">
                                            <input
                                                type="checkbox"
                                                checked={editingUser.is_employed}
                                                onChange={(e) => setEditingUser({ ...editingUser, is_employed: e.target.checked })}
                                            />
                                            Employed
                                        </label>
                                        <label className="flex items-center gap-2">
                                            <input
                                                type="checkbox"
                                                checked={editingUser.is_founder}
                                                onChange={(e) => setEditingUser({ ...editingUser, is_founder: e.target.checked })}
                                            />
                                            Founder
                                        </label>
                                    </div>
                                    <select
                                        value={editingUser.marital_status}
                                        onChange={(e) => setEditingUser({ ...editingUser, marital_status: e.target.value })}
                                        className="border rounded p-2"
                                    >
                                        <option value="married">Married</option>
                                        <option value="unmarried">Unmarried</option>
                                    </select>
                                    <div className="flex justify-center gap-2">
                                        <Button onClick={() => handleEditUser(editingUser)}>Save</Button>
                                        <Button variant="outline" onClick={() => setEditingUser(null)}>Cancel</Button>
                                    </div>
                                </div>
                            </TableCell>
                        ) : (
                            <>
                                <TableCell className="text-center">
                                    {user.first_name} {user.last_name}
                                </TableCell>
                                <TableCell className="text-center">@{user.username}</TableCell>
                                <TableCell className="text-center">{user.age}</TableCell>
                                <TableCell>
                                    <div className="flex justify-center flex-wrap gap-2">
                                        <Badge variant={user.is_employed ? "default" : "secondary"} className="p-1.5">
                                            <Briefcase className="w-3 h-3 mr-1" />
                                            {user.is_employed ? 'Employed' : 'Unemployed'}
                                        </Badge>
                                        {user.is_founder && (
                                            <Badge variant="default">
                                                <Star className="w-3 h-3 mr-1" />
                                                Founder
                                            </Badge>
                                        )}
                                    </div>
                                </TableCell>

                                <TableCell className="text-center">
                                    <Badge variant="outline" className="p-1.5">
                                        {user.marital_status}
                                    </Badge>
                                </TableCell>

                                <TableCell>
                                    <div className="flex justify-center gap-2">
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => setEditingUser(user)}
                                        >
                                            <Pencil className="w-5 h-5" />
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => deleteUser(user.username)}
                                        >
                                            <Trash2 className="w-5 h-5" />
                                        </Button>
                                    </div>
                                </TableCell>
                            </>
                        )}
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}

export default UserTable