import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteUser, fetchUser, updateUser } from '../actions/userActions'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faCheck, faTimes } from '@fortawesome/free-solid-svg-icons'; 
import Axios from 'axios'; 
import { server } from '../index';
import toast from 'react-hot-toast';

function UserList() {
  const users = useSelector((state) => state.users);
  const dispatch = useDispatch();

  useEffect(() => {
    Axios.get(`${server}`, { withCredentials: true })
      .then((res) => {
        dispatch(fetchUser(res.data));
      })
      .catch((e) => {
        toast.error(e.response.data.message);
      });
  }, [dispatch]);

  const [editMode, setEditMode] = useState(null);
  const [editedUser, setEditedUser] = useState(null);

  const handleDelete = (userId) => {
    Axios.delete(`${server}/${userId}`)
      .then(() => {
        dispatch(deleteUser(userId));
      })
      .catch((error) => {
        console.error('Error deleting user:', error);
      });
  };

  const handleEdit = (user) => {
    setEditedUser({ ...user });
    setEditMode(user.id);
  };

  const handleSave = () => {
    Axios.put(`${server}/${editedUser.id}`, editedUser)
      .then(() => {
        dispatch(updateUser(editedUser));
        setEditMode(null);
      })
      .catch((error) => {
        console.error('Error updating user:', error);
      });
  };

  const handleCancelEdit = () => {
    setEditedUser(null);
    setEditMode(null);
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">User List</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {users.map((user) => (
          <div key={user.id} className="bg-white p-4 rounded shadow flex items-center justify-between">
            {/* User details */}
            <div>
              <h2 className="text-xl font-semibold">
                {user.firstName} {user.lastName}
              </h2>
              <p className="text-gray-600 mb-2">{user.email}</p>
              <p className="text-gray-600 mb-2">{user.mobile}</p>
              {/* Display other user details here */}
            </div>

            {/* Edit and Delete icons */}
            <div className="flex space-x-2">
              {editMode === user.id ? (
                <>
                  <FontAwesomeIcon
                    icon={faCheck}
                    className="text-green-500 hover:text-green-600 cursor-pointer"
                    onClick={handleSave}
                  />
                  <FontAwesomeIcon
                    icon={faTimes}
                    className="text-red-500 hover:text-red-600 cursor-pointer"
                    onClick={handleCancelEdit}
                  />
                </>
              ) : (
                <>
                  <FontAwesomeIcon
                    icon={faEdit}
                    className="text-blue-500 hover:text-blue-600 cursor-pointer"
                    onClick={() => handleEdit(user)}
                  />
                  <FontAwesomeIcon
                    icon={faTrash}
                    className="text-red-500 hover:text-red-600 cursor-pointer"
                    onClick={() => handleDelete(user.id)}
                  />
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserList;
