import { makeAutoObservable, runInAction } from "mobx";
import axios from "axios";

class RepoStore {
  repos: any[] = [];
  loading: boolean = false;
  hasMore: boolean = true;
  page: number = 1;
  error: string | null = null;
  uniqueIds: number[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  reset() {
    this.repos = [];
    this.hasMore = true;
    this.page = 1;
    this.error = null;
    this.loading = false;
    this.uniqueIds = [];
  }

  async fetchRepos() {
    if (this.loading || !this.hasMore) return;
    this.loading = true;

    try {
      const response = await axios.get(`https://api.github.com/search/repositories?q=python&sort=start&order=asc&page=${this.page}&per_page=10`);
      console.log("REQUEST");
      console.log(response);
      
      const newRepos = response.data.items
        .filter((item: any) => !this.uniqueIds.includes(item.id))
        .map((item: any) => {
          // Добавляем id в массив uniqueIds
          this.uniqueIds.push(item.id);
          return {
            id: item.id,
            name: item.name,
            private: item.private,
            ownerLogin: item.owner.login,
            repoUrl: item.html_url,
            ownerAvatarUrl: item.owner.avatar_url,
          };
        });
      runInAction(() => {
        this.repos = [...this.repos, ...newRepos];
        this.hasMore = response.data.items.length > 0;
        this.page += 1;
        this.error = null;
      });
      
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.error = "Ошибка при загрузке данных. Попробуйте снова.";
      });
    } finally {
      runInAction(() => {
        this.loading = false;
      }); 
    }
  }

  removeRepo(id: number) {
    runInAction(()=>{
      this.repos = this.repos.filter((repo) => repo.id !== id);
      this.uniqueIds = this.uniqueIds.filter((uniqueId) => uniqueId !== id);
    });
   
  }

  editRepo(id: number, newName: string) {
    const repo = this.repos.find((repo) => repo.id === id);
    if (repo) {
      repo.name = newName;
    }
  }
}

export const repoStore = new RepoStore();
