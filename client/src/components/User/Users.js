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
import Box from "@mui/material/Box";

import { useQuery } from "@apollo/client";
import { GET_ALL_USERS } from "../../queries/users";
import CreateUser from "./CreateUser";

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

  const { loading, error, data } = useQuery(GET_ALL_USERS);

  if (loading) return <div>loading...</div>;
  if (error) return <div>{error.message}</div>;
  const { allUsers } = data;

  return (
    <>
      <CreateUser open={create} handleClose={() => setCreate(false)} />
      <Paper>
        <EnhancedTableToolbar handleAdd={() => setCreate(true)} />
        <TableContainer>
          <Table aria-label="users table">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {allUsers.map(({ id, name, email }) => (
                <TableRow key={id} onClick={() => console.log("hi")}>
                  <TableCell>{id}</TableCell>
                  <TableCell>{name}</TableCell>
                  <TableCell>{email}</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </>
  );
}
