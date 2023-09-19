import React, { useEffect, useState } from "react";
import {  useDispatch } from "react-redux";
import {  updateUser } from "../actions/userActions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { deleteUserById } from "../services/user.service";
import {
  faEdit,
  faTrash,
  faCheck,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import Axios from "axios";
import { server } from "../index";
import { getAllUsers } from "../services/user.service";
import { Link } from "react-router-dom";

function UserList() {
  const dispatch = useDispatch();
  const [allUsersFromDB, setAllUsersFromDB] = useState([]);

 

  const [editMode, setEditMode] = useState(null);
  const [editedUser, setEditedUser] = useState(null);

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
        console.error("Error updating user:", error);
      });
  };

  const handleCancelEdit = () => {
    setEditedUser(null);
    setEditMode(null);
  };

  const fetchAllUsers = async () => {
    const fetchedUsers = await getAllUsers();
    console.log("f=>", fetchedUsers);
    setAllUsersFromDB(fetchedUsers);
    console.log("allusers=>", allUsersFromDB);
  };

  const deleteUserWithId = async (userId) => {
    const deleteUserResponseMessage = await deleteUserById(userId);
    fetchAllUsers();
  };

  //Added code
  useEffect(() => {
    fetchAllUsers();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">User List</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {allUsersFromDB.length === 0 ? (
          <div>No Users Added to DB.</div>
        ) : (
          allUsersFromDB?.map((user) => (
            <div
              key={user.id}
              className="bg-white p-4 rounded shadow flex items-center justify-between"
            >
              {/* User details */}
              <div>
                <h2 className="text-xl font-semibold">
                  {user.firstName} {user.lastName}
                </h2>
                <p className="text-gray-600 mb-2">{user.email}</p>
                <p className="text-gray-600 mb-2">{user.mobile}</p>
                <p className="text-gray-600 mb-2">{user.address1}</p>
              <p className="text-gray-600 mb-2">{user.address2}</p>
              <p className="text-gray-600 mb-2">
              {user.country},{user.city}, {user.state}, {user.zipCode}
              </p>
              </div>

              
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
                      onClick={() => deleteUserWithId(user._id)}
                    />
                  </>
                )}
              </div>
            </div>
          ))
        )}
      </div>
      <button className="px-4 mt-2 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-500">
            <Link to="/create">Create New User</Link>
          </button>
    </div>
    
  );
}

export default UserList;
