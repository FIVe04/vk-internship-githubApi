import React from "react";
import { Box, CircularProgress } from "@mui/material";

const LoadingIndicator: React.FC = () => (
  <Box sx={{ display: "flex", justifyContent: "center", paddingTop: 2 }}>
    <CircularProgress />
  </Box>
);

export default LoadingIndicator;
