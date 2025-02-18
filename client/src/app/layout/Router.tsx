import { createBrowserRouter } from "react-router";
import App from "./App";
import HomePage from "../../features/home/HomePage";
import ProjectDashboard from "../../features/projects/dashboard/ProjectDashboard";
import ProjectForm from "../../features/projects/form/ProjectForm";
import ProgramBoard from "../../features/program/ProgramBoard";
import MilestoneBoard from "../../features/milestones/MilestoneBoard";
import LaunchCalendar from "../../features/launchCalendar/LaunchCalendar";
import ProjectDetails from "../../features/projects/details/ProjectDetails";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {path: '', element: <HomePage />},
            {path: 'projects', element: <ProjectDashboard />},
            {path: 'projects/:id', element: <ProjectDetails />},
            {path: 'program', element: <ProgramBoard />},
            {path: 'milestones', element: <MilestoneBoard />},
            {path: 'launchCalendar', element: <LaunchCalendar />},
            {path: 'createProject', element: <ProjectForm key='create'/>},
            {path: 'manage/:id', element: <ProjectForm />},
        ]
    }
])

