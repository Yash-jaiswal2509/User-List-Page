import { Briefcase, Star, Pencil, Trash2 } from "lucide-react"
import { Badge } from "./ui/badge"
import { Button } from "./ui/button"
import { Card, CardContent } from "./ui/card"
import { Input } from "./ui/input"
import { CardComponentProps } from "@/types/types"

const CardComponent = ({ editingUser, setEditingUser, user, handleEditUser, deleteUser }: CardComponentProps) => {
    return (
        <Card key={user.username} className="relative">
            <CardContent className="pt-6">
                {editingUser?.username === user.username ? (
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
                        <div className="flex gap-4">
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
                        <div className="flex gap-2">
                            <Button onClick={() => handleEditUser(editingUser)}>Save</Button>
                            <Button variant="outline" onClick={() => setEditingUser(null)}>Cancel</Button>
                        </div>
                    </div>
                ) : (
                    <>
                        <h3 className="font-semibold text-lg mb-2">
                            {user.first_name} {user.last_name}
                        </h3>
                        <p className="text-sm text-gray-600 mb-1">@{user.username}</p>
                        <p className="text-sm text-gray-600 mb-2">{user.age} years old</p>
                        <div className="flex flex-wrap gap-2 mb-2">
                            <Badge variant={user.is_employed ? "default" : "secondary"}>
                                <Briefcase className="w-3 h-3 mr-1" />
                                {user.is_employed ? 'Employed' : 'Unemployed'}
                            </Badge>
                            {user.is_founder && (
                                <Badge variant="default">
                                    <Star className="w-3 h-3 mr-1" />
                                    Founder
                                </Badge>
                            )}
                            <Badge variant="outline">
                                {user.marital_status}
                            </Badge>
                        </div>
                        <div className="absolute top-4 right-4 flex gap-2">
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => setEditingUser(user)}
                            >
                                <Pencil className="w-4 h-4" />
                            </Button>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => deleteUser(user.username)}
                            >
                                <Trash2 className="w-4 h-4" />
                            </Button>
                        </div>
                    </>
                )}
            </CardContent>
        </Card>
    )
}

export default CardComponent