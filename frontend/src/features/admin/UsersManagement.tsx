import { useState } from 'react';
import type { User, UserRole } from './types/adminTypes';
import { MOCK_USERS } from './constants/adminConstants';

const UsersManagement = () => {
  const [users, setUsers] = useState<User[]>(MOCK_USERS);

  const handleRoleChange = (userId: number, newRole: UserRole) => {
    const updatedUsers = users.map((user) => {
      if (user.id === userId) {
        return { ...user, role: newRole };
      }
      return user;
    });
    setUsers(updatedUsers);
    console.log(`Kullanıcı ${userId} yeni rolü: ${newRole}`);
  };

  // 2. Engelleme / Engel Kaldırma Fonksiyonu
  const handleToggleBlock = (userId: number) => {
    const updatedUsers = users.map((user) => {
      if (user.id === userId) {
        const newStatus = !user.isBlocked;
        return { ...user, isBlocked: newStatus };
      }
      return user;
    });
    setUsers(updatedUsers);
  };

 

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Kullanıcı Yönetimi</h1>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kullanıcı</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rol</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Durum</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kayıt Tarihi</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">İşlemler</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users.map((user) => (
              <tr key={user.id} className={user.isBlocked ? "bg-red-50" : "hover:bg-gray-50"}>
                
                {/* Kullanıcı Bilgisi */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="ml-0">
                      <div className="text-sm font-medium text-gray-900">{user.fullName}</div>
                      <div className="text-sm text-gray-500">{user.email}</div>
                    </div>
                  </div>
                </td>

                {/* Rol Değiştirme Dropdown */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <select
                    value={user.role}
                    onChange={(e) => handleRoleChange(user.id, e.target.value as UserRole)}
                    className={`text-xs font-semibold px-2 py-1 rounded  cursor-pointer border border-gray-200 outline-none`}
                  >
                    <option value="hasta">Hasta</option>
                    <option value="doktor">Doktor</option>
                    <option value="admin">Yönetici</option>
                  </select>
                </td>

                {/* Durum Badge */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${user.isBlocked ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
                    {user.isBlocked ? 'Engellendi' : 'Aktif'}
                  </span>
                </td>

                {/* Tarih */}
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {user.createdAt}
                </td>

                {/* Engelleme Butonu */}
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => handleToggleBlock(user.id)}
                    className={`${
                      user.isBlocked 
                        ? 'text-green-600 hover:text-green-900' 
                        : 'text-red-600 hover:text-red-900'
                    } font-bold`}
                  >
                    {user.isBlocked ? 'Engeli Kaldır' : 'Engelle'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersManagement;