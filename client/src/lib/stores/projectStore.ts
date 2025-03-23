import { makeAutoObservable } from 'mobx';

export default class ProjectStore {
  projects: Project[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  setProjects(projects: Project[]) {
    this.projects = projects;
  }

}

  // updateProject(updatedProject: Project) {
  //   const index = this.projects.findIndex(project => project.id === updatedProject.id);
  //   if (index !== -1) {
  //     this.projects[index] = updatedProject;
  //   }
  // }
  
//   get groupedProjectByCluster() {
//     return Object.entries(
//         this.projects.reduce((projects, project) => {
//             const cluster = project.cluster;
//             projects[cluster] = projects[cluster] ? [...projects[cluster], project] : [project];
//             return projects;
//         }, {} as { [key: string]: Project[] })
//     )
// }

