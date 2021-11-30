import { useState } from "react";
import Paper from "@mui/material/Paper";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import Box from "@mui/material/Box";
import { useQuery } from "@apollo/client";
import { GET_ALL_USERS } from "../../queries/users";

import CreateUser from "./CreateUser";
import UpdateUser from "./UpdateUser";
import { User } from "../../types/users";
import UsersTable from "./UsersTable";

type EnhancedTableToolbarProps = {
  handleAdd: () => void;
};

const EnhancedTableToolbar = ({ handleAdd }: EnhancedTableToolbarProps) => {
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
  const [update, setUpdate] = useState<undefined | User>();

  const { loading, error, data } = useQuery(GET_ALL_USERS);

  if (loading) return <div>loading...</div>;
  if (error) return <div>{error.message}</div>;
  const { allUsers } = data;

  return (
    <>
      <CreateUser open={create} handleClose={() => setCreate(false)} />
      <UpdateUser
        open={Boolean(update)}
        handleClose={() => setUpdate(undefined)}
        data={update}
      />
      <Paper>
        <EnhancedTableToolbar handleAdd={() => setCreate(true)} />
        <UsersTable users={allUsers} setUpdate={setUpdate} />
      </Paper>
    </>
  );
}
