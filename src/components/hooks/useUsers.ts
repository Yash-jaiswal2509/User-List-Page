import { useState, useEffect } from "react";
import { User, UseUsersReturn } from "../../types/types";

export const useUsers = (): UseUsersReturn => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Function: fetchUsers
  // "SetLoading" is a function that updates the state of loading, it takes a boolean value.
  // "SetError" is a function that updates the state of error, it takes a string or null.
  // "Fetch" is a function that fetches the data from the API.
  // "If" the response is not ok, it throws an error.
  // "SetUsers" is a function that updates the state of users, it takes the data from the response.
  // "Catch" the error and sets the error state.
  // "Finally" sets the loading state to false after 500ms.
  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(import.meta.env.VITE_MOCK_API_URL);
      if (!response.ok) throw new Error("Failed to fetch users");

      const data = await response.json();

      setUsers(data.length > 1 ? data : [data]);
    } catch (err) {
      setError("Failed to load users. Please try again later.");
    } finally {
      setTimeout(() => setLoading(false), 500);
    }
  };

  // Hook: useEffect
  // "FetchUsers" is called every time when the component is mounted.
  useEffect(() => {
    fetchUsers();
  }, []);

  // Function: addUser
  // "SetUsers" is a function that updates the state of users, it takes a function that returns the new state with the new user added to the array.
  const addUser = (user: User) => {
    setUsers((prevUsers) => [...prevUsers, user]);
  };

  // Function: updateUser
  // "Map" returns a new array with the updated user, when the username matches it updates the user else it keeps the user as it is.
  const updateUser = (updatedUser: User) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.username === updatedUser.username ? updatedUser : user
      )
    );
  };

  // Function: deleteUser
  // "Filter" only returns when the condition is true => When the username doesn't matches, it is kept in the array
  const deleteUser = (username: string) => {
    setUsers((prevUsers) =>
      prevUsers.filter((user) => user.username !== username)
    );
  };

  return {
    users,
    loading,
    error,
    refetch: fetchUsers,
    addUser,
    updateUser,
    deleteUser,
  };
};
