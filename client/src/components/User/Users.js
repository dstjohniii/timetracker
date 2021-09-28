import { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import Box from "@mui/material/Box";

import { useMutation, useQuery } from "@apollo/client";
import { DELETE_USER, GET_ALL_USERS } from "../../queries/users";
import CreateUser from "./CreateUser";
import UpdateUser from "./UpdateUser";

const EnhancedTableToolbar = ({ handleAdd }) => {
  return (
    <Toolbar>
      <Box display="flex" justifyContent="flex-end" width="100%">
        <Tooltip title="Add">
          <IconButton onClick={handleAdd}>
            <AddIcon />
          </IconButton>
        </Tooltip>
      </Box>
    </Toolbar>
  );
};

export default function Users() {
  const [create, setCreate] = useState(false);
  const [update, setUpdate] = useState(false);

  const { loading, error, data } = useQuery(GET_ALL_USERS);
  const [deleteUser, { loading: deleteLoading, error: deleteError }] =
    useMutation(DELETE_USER, {
      refetchQueries: [GET_ALL_USERS],
    });

  if (loading || deleteLoading) return <div>loading...</div>;
  if (error) return <div>{error.message}</div>;
  if (deleteError) return <div>{deleteError.message}</div>;
  const { allUsers } = data;

  return (
    <>
      <CreateUser open={create} handleClose={() => setCreate(false)} />
      <UpdateUser
        open={Boolean(update)}
        handleClose={() => setUpdate(false)}
        data={update}
      />
      <Paper>
        <EnhancedTableToolbar handleAdd={() => setCreate(true)} />
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
              {allUsers.map(({ id, name, email }) => (
                <TableRow
                  key={id}
                  onClick={() => setUpdate({ id, name, email })}
                >
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
      </Paper>
    </>
  );
}
