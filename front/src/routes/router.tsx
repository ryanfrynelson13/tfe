import App from "../App";
import LoginContainer from "../containers/auth/login/LoginContainer";
import SignupContainer from "../containers/auth/signup/SignupContainer";
import AuthPage from "../pages/auth-page/AuthPage";
import CategoriesPage from "../pages/categories-page/CategoriesPage";
import CategoryEventsPage from "../pages/category-events-page/CategoryEventsPage";
import EventPage from "../pages/event-page/EventPage";
import LandingPage from "../pages/landing-page/LandingPage";

export const routes = [
    {
        path: '',
        element: <App />,
        children: [
            {
                index: true,
                element: <LandingPage />
            },
            {
                path: 'categories',
                element: <CategoriesPage />
            },
            {
                path: 'event/:id',
                element: <EventPage />
            },
            {
                path: 'categories/:id',
                element: <CategoryEventsPage />
            },
            {
                path: 'auth',
                element: <AuthPage />,
                children: [
                    {
                        path: 'login',
                        element: <LoginContainer />
                    },
                    {
                        path: 'register',
                        element: <SignupContainer />
                    }
                ]
            }
        ]
    }
]