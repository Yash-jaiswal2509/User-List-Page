import { useState } from 'react';
import { Plus, Loader } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useUsers } from "./hooks/useUsers";
import { User } from '@/types/types';
import AddUserForm from './AddUserForm';
import { UserTable } from './UserTable';
import Header from './Header';

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
    const filteredUsers = users.filter(user =>
        `${user.first_name} ${user.last_name}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.marital_status.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleAddUser = () => {
        if (!newUser.first_name || !newUser.last_name || !newUser.username) {
            return;
        }

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

    const handleEditUser = (user: User) => {
        updateUser(user);
        setEditingUser(null);
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <Loader className="w-8 h-8 animate-spin" />
            </div>
        );
    }

    if (error) {
        return (
            <Alert variant="destructive" className="m-4">
                <AlertDescription>{error}</AlertDescription>
            </Alert>
        );
    }

    return (
        <div className="min-h-screen flex flex-col">
            <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            <div className="container mx-auto p-4 max-w-6xl flex-1">
                <Card className="mb-6">
                    <CardHeader>
                        <CardTitle className="text-2xl text-primary font-bold">User Directory</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {/* Add User Button */}
                        <div className="mb-6">
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
                        <UserTable 
                            users={filteredUsers} 
                            editingUser={editingUser} 
                            setEditingUser={setEditingUser} 
                            deleteUser={deleteUser} 
                            handleEditUser={handleEditUser} 
                        />
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default UserListPage;