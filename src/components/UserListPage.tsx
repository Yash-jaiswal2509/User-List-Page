import { useState } from 'react';
import { Plus, Loader, Search } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useUsers } from "./hooks/useUsers";
import { User } from '@/types/types';
import AddUserForm from './AddUserForm';
import { UserTable } from './UserTable';

const UserListPage = () => {
    // Custom hook to fetch users data and manage CRUD operations
    const { users, loading, error, addUser, updateUser, deleteUser } = useUsers();

    // Local state to manage search term, editing user, adding user and new user
    const [searchTerm, setSearchTerm] = useState('');
    const [editingUser, setEditingUser] = useState<User | null>(null);
    const [isAddingUser, setIsAddingUser] = useState(false);
    const [newUser, setNewUser] = useState<Partial<User>>({
        first_name: '',
        last_name: '',
        age: 0,
        username: '',
        is_employed: false,
        is_founder: false,
        marital_status: ''
    });

    // Filter users based on search term and display filtered users
    // It is filtering based on first name, last name, username and marital status
    const filteredUsers = users.filter(user =>
        `${user.first_name} ${user.last_name}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.marital_status.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Function: handleAddUser to handle adding new user
    const handleAddUser = () => {
        if (!newUser.first_name || !newUser.last_name || !newUser.username) {
            return;
        }

        // created a complete user object
        const completeUser: User = {
            first_name: newUser.first_name,
            last_name: newUser.last_name,
            age: newUser.age || 0,
            username: newUser.username,
            is_employed: newUser.is_employed || false,
            is_founder: newUser.is_founder || false,
            marital_status: newUser.marital_status || 'unmarried'
        };

        addUser(completeUser);
        setNewUser({
            first_name: '',
            last_name: '',
            age: 0,
            username: '',
            is_employed: false,
            is_founder: false,
            marital_status: 'unmarried'
        });
        setIsAddingUser(false);
    };

    // Function: handleEditUser to handle editing user
    const handleEditUser = (user: User) => {
        updateUser(user);
        setEditingUser(null);
    };

    // Loading state with spinning loader
    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <Loader className="w-8 h-8 animate-spin" />
            </div>
        );
    }

    // Error state with alert
    if (error) {
        return (
            <Alert variant="destructive" className="m-4">
                <AlertDescription>{error}</AlertDescription>
            </Alert>
        );
    }

    return (
        <div className="container mx-auto p-4 max-w-6xl">
            <Card className="mb-6">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold">User Directory</CardTitle>
                </CardHeader>
                <CardContent>
                    {/* Search and Add User */}
                    <div className="flex flex-col sm:flex-row gap-4 mb-6">
                        <div className="relative flex-1">
                            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                            <Input
                                placeholder="Search users..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-8"
                            />
                        </div>
                        <Button
                            onClick={() => setIsAddingUser(true)}
                            className="flex items-center gap-2"
                        >
                            <Plus className="w-4 h-4" /> Add User
                        </Button>
                    </div>

                    {/* Add User Form */}
                    {isAddingUser && (
                        <AddUserForm
                            newUser={newUser}
                            setNewUser={setNewUser}
                            setIsAddingUser={setIsAddingUser}
                            onSubmit={handleAddUser}
                        />
                    )}

                    {/* User List Table */}
                    <UserTable users={filteredUsers} editingUser={editingUser} setEditingUser={setEditingUser} deleteUser={deleteUser} handleEditUser={handleEditUser} />
                </CardContent>
            </Card>
        </div>
    );
};

export default UserListPage;