import React from "react";
import { Box, Alert, Button } from "@mui/material";
import { observer } from "mobx-react-lite";
import { repoStore } from "../../stores/RepoStore";


const ErrorAlert: React.FC = observer(() => (
  <Box sx={{ marginBottom: 2 }}>
    <Alert severity="error">{repoStore.error}</Alert>
    <Button variant="contained" color="primary" onClick={() => repoStore.fetchRepos()}>
      Обновить
    </Button>
  </Box>
));

export default ErrorAlert;
