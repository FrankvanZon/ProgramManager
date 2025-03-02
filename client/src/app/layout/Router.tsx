import { createBrowserRouter } from "react-router";
import App from "./App";
import HomePage from "../../features/home/HomePage";
import ProjectDashboard from "../../features/projects/dashboard/ProjectDashboard";
import ProjectForm from "../../features/projects/form/ProjectForm";
import ProgramBoard from "../../features/program/ProgramBoard";
import MilestoneBoard from "../../features/milestones/MilestoneBoard";
import LaunchCalendar from "../../features/launchCalendar/LaunchCalendar";
import ProjectDetailsPage from "../../features/projects/details/ProjectDetailsPage";
import Counter from "../../features/counter/counter";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {path: '', element: <HomePage />},
            {path: 'projects', element: <ProjectDashboard />},
            {path: 'projects/:id', element: <ProjectDetailsPage />},
            {path: 'program', element: <ProgramBoard />},
            {path: 'milestones', element: <MilestoneBoard />},
            {path: 'launchCalendar', element: <LaunchCalendar />},
            {path: 'createProject', element: <ProjectForm key='create'/>},
            {path: 'manage/:id', element: <ProjectForm />},
            {path: 'counter', element: <Counter /> },
        ]
    }
])

