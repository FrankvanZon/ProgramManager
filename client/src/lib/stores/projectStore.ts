import { makeAutoObservable } from 'mobx';

export default class ProjectStore {
  projects: Project[] = [];

  filterByCluster = 'all';
  filterByProgram = 'all';


  constructor() {
    makeAutoObservable(this);
  }

  setProjects(projects: Project[]) {
    this.projects = projects;
  }

  setFilterByCluster = (filter: string) => {
    this.filterByCluster = filter
  }

  setFilterByProgram = (filter: string) => {
    this.filterByProgram = filter
    this.filterByCluster = 'all';
  }


}


