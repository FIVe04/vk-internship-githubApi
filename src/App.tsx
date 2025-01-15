// src/App.tsx
import React from "react";
import RepoList from "./components/RepoList/RepoList";
import Header from "./components/Header/Header";

const App: React.FC = () => {
  return (
    <div>
      <Header/>
      <RepoList />
    </div>
  );
};

export default App;
