import React from "react";

const Table = ({data}) => {
  console.log(data);

  return (
    <div className="overflow-x-auto mt-20 ml-64 m-5">
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">ID</th>
            <th className="py-2 px-4 border-b">Name</th>
            <th className="py-2 px-4 border-b">Email</th>
            <th className="py-2 px-4 border-b">Role</th>
          </tr>
        </thead>
        <tbody>
          {/* {data.map((user, index) => (
            <tr key={user.id}>
              <td className="py-2 px-4 border-b text-center">{index + 1}</td>
              <td className="py-2 px-4 border-b text-center">{user.name}</td>
              <td className="py-2 px-4 border-b text-center">{user.email}</td>
              <td className="py-2 px-4 border-b text-center">{user.role}</td>
            </tr>
          ))} */}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
