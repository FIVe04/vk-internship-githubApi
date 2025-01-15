import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { repoStore } from "../../stores/RepoStore";
import { Box } from "@mui/material";
import RepoCard from "../RepoCard/RepoCard";
import LoadingIndicator from "../LoadingIndicator/LoadingIndicator";
import ErrorAlert from "../ErrorAlert/ErrorAlert";

const RepoList = observer(() => {

  const handleScroll = () => {
    const isBottom = document.body.scrollHeight - 100 < window.scrollY + window.innerHeight;
    if (isBottom && !repoStore.loading && repoStore.hasMore && !repoStore.error) {
      repoStore.fetchRepos();
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    repoStore.reset();
    repoStore.fetchRepos();
  }, []);

  return (
    <Box sx={{ padding: 2 }}>
      {repoStore.repos.map((repo) => (
        <RepoCard
          key={`${repo.id}-${repo.ownerLogin}`}
          repo={repo}
        />
      ))}

      {repoStore.loading && <LoadingIndicator />}
      {repoStore.error && !repoStore.loading && <ErrorAlert/>}
    </Box>
  );
});

export default RepoList;
