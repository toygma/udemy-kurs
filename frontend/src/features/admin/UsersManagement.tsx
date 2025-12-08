import { formatDate } from "@/shared/utils/helper";
import { useUsersManagement } from "./hooks/useUsersManagement";
import type { User, UserRole } from "./types/admin.types";
import Pagination from "@/shared/ui/Pagination";

const UsersManagement = () => {
  const { handleRoleChange, handleToggleBlock, users ,handlePageClick} = useUsersManagement();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">
        Kullanıcı Yönetimi
      </h1>
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Kullanıcı
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Rol
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Durum
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Kayıt Tarihi
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                İşlemler
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users?.data?.map((user: User) => (
              <tr
                key={user._id}
                className={`${
                  !user.isActive ? "bg-red-50" : "hover:bg-gray-50"
                }`}
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="ml-0">
                      <div className="text-sm font-medium text-gray-900">
                        {user.name}
                      </div>
                      <div className="text-sm text-gray-500">{user.email}</div>
                    </div>
                  </div>
                </td>

                <td className="px-6 py-4 whitespace-nowrap">
                  <select
                    value={user.role}
                    onChange={(e) =>
                      handleRoleChange(user._id, e.target.value as UserRole)
                    }
                    className={`text-xs font-semibold px-2 py-1 rounded  cursor-pointer border border-gray-200 outline-none`}
                  >
                    <option value="hasta">Hasta</option>
                    <option value="doktor">Doktor</option>
                    <option value="admin">Yönetici</option>
                  </select>
                </td>

                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      !user.isActive
                        ? "bg-red-100 text-red-800"
                        : "bg-green-100 text-green-800"
                    }`}
                  >
                    {!user.isActive ? "Engellendi" : "Aktif"}
                  </span>
                </td>

                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {formatDate(user.createdAt)}
                </td>

                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => handleToggleBlock(user._id)}
                    className={`${
                      user.isActive
                        ? "text-green-600 hover:text-green-900"
                        : "text-red-600 hover:text-red-900"
                    } font-bold`}
                  >
                    {!user.isActive ? "Engeli Kaldır" : "Engelle"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* PAGINATION  */}
      {users?.pagination && users.pagination.totalPages > 1 && (
        <div className="mt-6 flex justify-center">
          <Pagination
            handlePageClick={handlePageClick}
            pageCount={users.pagination.totalPages}
          />
        </div>
      )}
    </div>
  );
};

export default UsersManagement;
