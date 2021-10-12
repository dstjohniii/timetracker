import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import DeleteIcon from "@mui/icons-material/Delete";
import { User } from "../../types/users";
import IconButton from "@mui/material/IconButton";
import { useMutation } from "@apollo/client";
import { DELETE_USER, GET_ALL_USERS } from "../../queries/users";

interface UsersTableProps {
  users: Array<User>;
  setUpdate: (user: undefined | User) => void;
}

export default function UsersTable({ users, setUpdate }: UsersTableProps) {
  const [deleteUser, { loading, error }] = useMutation(DELETE_USER, {
    refetchQueries: [GET_ALL_USERS],
  });

  const sortedUsers = React.useMemo(
    () => [...users].sort((a, b) => a.id - b.id),
    [users]
  );

  if (loading) return <div>loading...</div>;
  if (error) return <div>{error.message}</div>;

  return (
    <TableContainer>
      <Table aria-label="users table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedUsers.map(({ id, name, email }: User) => (
            <TableRow key={id} onClick={() => setUpdate({ id, name, email })}>
              <TableCell>{id}</TableCell>
              <TableCell>{name}</TableCell>
              <TableCell>{email}</TableCell>
              <TableCell align="right">
                <IconButton
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteUser({
                      variables: {
                        id,
                      },
                    });
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
