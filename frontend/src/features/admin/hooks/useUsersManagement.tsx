import { useState } from "react";
import type { User, UserRole } from "../types/admin.types";
import { MOCK_USERS } from "../constants/adminConstants";

export const useUsersManagement = () => {
  const [users, setUsers] = useState<User[]>(MOCK_USERS);

  const handleRoleChange = (userId: number, newRole: UserRole) => {
    try {
      setUsers((prev) =>
        prev.map((user) =>
          user.id === userId ? { ...user, role: newRole } : user
        )
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleToggleBlock = (userId: number) => {
    try {
      setUsers((prev) =>
        prev.map((user) =>
          user.id === userId ? { ...user, isBlocked: !user.isBlocked } : user
        )
      );
    } catch (error) {
      console.log(error);
    }
  };

  return {
    users,
    handleRoleChange,
    handleToggleBlock,
  };
};
