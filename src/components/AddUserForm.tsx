import { useState } from 'react';
import { AddUserFormProps, ValidationErrors } from "@/types/types";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Checkbox } from "./ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Alert, AlertDescription } from "./ui/alert";

const AddUserForm = ({ newUser, setNewUser, setIsAddingUser, onSubmit }: AddUserFormProps) => {
    const [errors, setErrors] = useState<ValidationErrors>({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const validateForm = (): boolean => {
        const newErrors: ValidationErrors = {};

        if (!newUser.first_name?.trim()) {
            newErrors.first_name = 'First name is required';
        }

        if (!newUser.last_name?.trim()) {
            newErrors.last_name = 'Last name is required';
        }

        if (!newUser.username?.trim()) {
            newErrors.username = 'Username is required';
        } else if (newUser.username.length < 3) {
            newErrors.username = 'Username must be at least 3 characters';
        }

        if (newUser.age !== undefined && (newUser.age < 0 || newUser.age > 120)) {
            newErrors.age = 'Age must be between 0 and 120';
        }

        if (!newUser.marital_status) {
            newErrors.marital_status = 'Marital status is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        try {
            setIsSubmitting(true);
            // setTimeout(() => {}, 1000);
            onSubmit();
        } catch (error) {
            setErrors({
                submit: 'Failed to add user. Please try again.'
            });
        } finally {
            setIsSubmitting(false);
        }
    };


    const handleCancel = () => {
        setIsAddingUser(false);
        setNewUser({});
        setErrors({});
    };

    return (
        <Card className="mb-6">
            <CardHeader>
                <CardTitle className="text-xl">Add New User</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="first_name">First Name</Label>
                        <Input
                            id="first_name"
                            placeholder="Enter first name"
                            value={newUser.first_name || ''}
                            onChange={(e) => setNewUser({ ...newUser, first_name: e.target.value })}
                            className={errors.first_name ? 'border-red-500' : ''}
                        />
                        {errors.first_name && (
                            <p className="text-sm text-red-500">{errors.first_name}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="last_name">Last Name</Label>
                        <Input
                            id="last_name"
                            placeholder="Enter last name"
                            value={newUser.last_name || ''}
                            onChange={(e) => setNewUser({ ...newUser, last_name: e.target.value })}
                            className={errors.last_name ? 'border-red-500' : ''}
                        />
                        {errors.last_name && (
                            <p className="text-sm text-red-500">{errors.last_name}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="username">Username</Label>
                        <Input
                            id="username"
                            placeholder="Enter username"
                            value={newUser.username || ''}
                            onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
                            className={errors.username ? 'border-red-500' : ''}
                        />
                        {errors.username && (
                            <p className="text-sm text-red-500">{errors.username}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="age">Age</Label>
                        <Input
                            id="age"
                            type="number"
                            placeholder="Enter age"
                            value={newUser.age || ''}
                            onChange={(e) => setNewUser({ ...newUser, age: parseInt(e.target.value) })}
                            className={errors.age ? 'border-red-500' : ''}
                        />
                        {errors.age && (
                            <p className="text-sm text-red-500">{errors.age}</p>
                        )}
                    </div>

                    <div className="flex gap-6">
                        <div className="flex items-center space-x-2">
                            <Checkbox
                                id="is_employed"
                                checked={newUser.is_employed || false}
                                onCheckedChange={(checked) =>
                                    setNewUser({ ...newUser, is_employed: checked as boolean })
                                }
                            />
                            <Label htmlFor="is_employed">Employed</Label>
                        </div>

                        <div className="flex items-center space-x-2">
                            <Checkbox
                                id="is_founder"
                                checked={newUser.is_founder || false}
                                onCheckedChange={(checked) =>
                                    setNewUser({ ...newUser, is_founder: checked as boolean })
                                }
                            />
                            <Label htmlFor="is_founder">Founder</Label>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="marital_status">Marital Status</Label>
                        <Select
                            value={newUser.marital_status}
                            onValueChange={(value) => setNewUser({ ...newUser, marital_status: value })}
                        >
                            <SelectTrigger className={errors.marital_status ? 'border-red-500' : ''}>
                                <SelectValue placeholder="Select marital status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="married">Married</SelectItem>
                                <SelectItem value="unmarried">Unmarried</SelectItem>
                            </SelectContent>
                        </Select>
                        {errors.marital_status && (
                            <p className="text-sm text-red-500">{errors.marital_status}</p>
                        )}
                    </div>

                    {errors.submit && (
                        <Alert variant="destructive">
                            <AlertDescription>{errors.submit}</AlertDescription>
                        </Alert>
                    )}

                    <div className="flex gap-2 pt-4">
                        <Button type="submit" disabled={isSubmitting}>
                            {isSubmitting ? 'Adding...' : 'Save'}
                        </Button>
                        <Button type="button" variant="outline" onClick={handleCancel}>
                            Cancel
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
};

export default AddUserForm;