import { makeAutoObservable } from 'mobx';

export default class ProjectStore {
  projects: Project[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  setProjects(projects: Project[]) {
    this.projects = projects;
  }

  updateProject(updatedProject: Project) {
    const index = this.projects.findIndex(project => project.id === updatedProject.id);
    if (index !== -1) {
      this.projects[index] = updatedProject;
    }
  }
}