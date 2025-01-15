import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import { Card, CardContent, Typography, Button, Box, TextField } from "@mui/material";
import { repoStore } from "../../stores/RepoStore";
import styles from "./RepoCard.module.css";
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
  if (styles) {
    
  }
  return (
    <Card className={styles.card}>
      <CardContent className={styles.cardContent}>
        <Typography variant="h6" className={styles.typographyTitle}>
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
        <Typography variant="body2" className={styles.typographyBody}>
          {repo.ownerLogin}
        </Typography>
        <Box className={styles.box}>
          <LazyImage 
            src={repo.ownerAvatarUrl}
            alt="Avatar"
            placeholder="img"
            width={40}
            height={40}
          />
          <Button variant="outlined" size="small" href={repo.ownerUrl} target="_blank" className={styles.buttonLink}>
            Перейти
          </Button>
          <Button variant="contained" color="error" size="small" className={styles.buttonDelete} onClick={handleRemove}>
            Удалить
          </Button>
          {isEditing ? (
            <Button
              variant="contained"
              color="success"
              size="small"
              onClick={handleSave}
              className={styles.buttonSave}
            >
              Сохранить
            </Button>
          ) : (
            <Button variant="contained" color="primary" size="small" className={styles.buttonSave} onClick={handleEdit}>
              Редактировать
            </Button>
          )}
        </Box>
      </CardContent>
    </Card>
  );
});

export default RepoCard;
