import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import { Card, CardContent, Typography, Button, Box, TextField } from "@mui/material";
import { repoStore } from "../../stores/RepoStore";
import LazyImage from "../LazyImage/LazyImage";

interface RepoCardProps {
  repo: {
    id: number;
    name: string;
    ownerLogin: string;
    ownerAvatarUrl: string;
    ownerUrl: string;
  };
}

const RepoCard: React.FC<RepoCardProps> = observer(({ repo }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState(repo.name);

  const handleRemove = () => {
    repoStore.removeRepo(repo.id);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    if (newName !== repo.name) {
      repoStore.editRepo(repo.id, newName);
    }
    setIsEditing(false);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewName(event.target.value);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      handleSave();
    }
  };

  return (
    <Card sx={{ marginBottom: 2 }}>
      <CardContent>
        <Typography variant="h6">
          {isEditing ? (
            <TextField
              value={newName}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              autoFocus
              fullWidth
            />
          ) : (
            repo.name
          )}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {repo.ownerLogin}
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", marginTop: 1 }}>
          <LazyImage 
            src={repo.ownerAvatarUrl}
            alt="Avatar"
            placeholder="img"
            width={40}
            height={40}
          />
          <Button variant="outlined" size="small" href={repo.ownerUrl} target="_blank" sx={{ marginRight: 2 }}>
            Перейти
          </Button>
          <Button variant="contained" color="error" size="small" onClick={handleRemove}>
            Удалить
          </Button>
          {isEditing ? (
            <Button
              variant="contained"
              color="success"
              size="small"
              onClick={handleSave}
            >
              Сохранить
            </Button>
          ) : (
            <Button variant="contained" color="primary" size="small" onClick={handleEdit}>
              Редактировать
            </Button>
          )}
        </Box>
      </CardContent>
    </Card>
  );
});

export default RepoCard;
