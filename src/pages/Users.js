import React from 'react';
import Http from '../services/Http'; // Assuming Http is configured to handle requests
import Pagination from '../shared/Pagination';

const Users = () => {
  const [users, setUsers] = React.useState([]);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [total, setTotal] = React.useState(0);
  const [totalPages, setTotalPages] = React.useState(1);

  const fetchUsers = async (page) => {
    try {
      const response = await Http.get('https://randomuser.me/api/', {
        params: { page: page, results: 10 }
      });
      const results = response.data.results;
      const info = response.data.info;
      setUsers(results);
      setTotal(info.results); // Total number of users
      setTotalPages(Math.ceil(info.results / 10)); // Calculate total pages
    } catch (error) {
      console.error("Error fetching users", error);
    }
  };

  React.useEffect(() => {
    fetchUsers(currentPage);
  }, [currentPage]);

  const pages = {
    total,
    currentPage,
    next: currentPage < totalPages ? currentPage + 1 : null,
    prev: currentPage > 1 ? currentPage - 1 : null,
    hasNext: currentPage < totalPages,
    hasPrev: currentPage > 1,
    limit: 10 // Number of results per page
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="py-2 px-4 border-r border-b border-gray-200 text-left">Full Name</th>
              <th className="py-2 px-4 border-r border-b border-gray-200 text-left">Username</th>
              <th className="py-2 px-4 border-r border-b border-gray-200 text-left">Thumbnail Icon</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users.map((user, index) => (
              <tr key={index}>
                <td className="py-2 px-4 border-r border-b border-gray-200">{`${user.name.title} ${user.name.first} ${user.name.last}`}</td>
                <td className="py-2 px-4 border-r border-b border-gray-200">{user.login.username}</td>
                <td className="py-2 px-4 border-r border-b border-gray-200">
                  <img src={user.picture.thumbnail} alt="thumbnail" className="w-10 h-10 rounded-full" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4">
        <Pagination pages={pages} onPageChange={handlePageChange} />
      </div>
    </div>
  );
};

export default Users;
