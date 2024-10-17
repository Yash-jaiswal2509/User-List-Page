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
