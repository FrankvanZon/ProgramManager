import { createBrowserRouter, Navigate } from "react-router";
import LoginForm from "../../../features/account/LoginForm";
import Counter from "../../../features/counter/counter";
import NotFound from "../../../features/errors/NotFound";
import ServerErrors from "../../../features/errors/ServerErrors";
import TestErrors from "../../../features/errors/TestErrors";
import HomePage from "../../../features/home/HomePage";
import LaunchCalendar from "../../../features/launchCalendar/LaunchCalendar";
import MilestoneBoard from "../../../features/milestones/MilestoneBoard";
import ProgramBoard from "../../../features/program/ProgramBoard";
import ProjectDashboard from "../../../features/projects/dashboard/ProjectDashboard";
import ProjectDetailsPage from "../../../features/projects/details/ProjectDetailsPage";
import ProjectForm from "../../../features/projects/form/ProjectForm";
import App from "../App";
import RequireAuth from "./RequireAuth";
import RegisterForm from "../../../features/account/RegisterForm";


export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {element: <RequireAuth/>, children: [
                {path: 'projects', element: <ProjectDashboard />},
                {path: 'projects/:id', element: <ProjectDetailsPage />},
                {path: 'program', element: <ProgramBoard />},
                {path: 'milestones', element: <MilestoneBoard />},
                {path: 'launchCalendar', element: <LaunchCalendar />},
                {path: 'createProject', element: <ProjectForm key='create'/>},
                {path: 'manage/:id', element: <ProjectForm />},
            ]},
            {path: '', element: <HomePage />},
            {path: 'counter', element: <Counter /> },
            {path: 'errors', element: <TestErrors /> },
            {path: 'not-found', element: <NotFound /> },
            {path: 'server-error', element: <ServerErrors /> },
            {path: 'login', element: <LoginForm /> },
            {path: 'register', element: <RegisterForm /> },
            {path: '*', element: <Navigate replace to='/not-found' /> },

        ]
    }
])

