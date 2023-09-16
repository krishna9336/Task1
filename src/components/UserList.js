// src/components/UserList.js
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteUser } from '../actions/userActions';

function UserList() {
  const users = useSelector((state) => state.users);
  const dispatch = useDispatch();

  const handleDelete = (userId) => {
    dispatch(deleteUser(userId));
  };

  return (
    <div>
    <h1>Home Page</h1>
    {users.map((user) => (
        <div key={user.id}>
          {/* Display user details */}
          <button onClick={() => handleDelete(user.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default UserList;
