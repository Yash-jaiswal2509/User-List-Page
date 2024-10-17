export interface User {
  age: number;
  first_name: string;
  last_name: string;
  is_employed: boolean;
  is_founder: boolean;
  marital_status: string;
  username: string;
}

export interface UseUsersReturn {
  users: User[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  addUser: (user: User) => void;
  updateUser: (user: User) => void;
  deleteUser: (username: string) => void;
}

export interface AddUserFormProps {
  newUser: Partial<User>;
  setNewUser: (value: User | {}) => void;
  setIsAddingUser: (value: boolean) => void;
  onSubmit: () => void;
}

export interface ValidationErrors {
  first_name?: string;
  last_name?: string;
  age?: string;
  username?: string;
  is_employed?: string;
  is_founder?: string;
  marital_status?: string;
  submit?: string;
}
