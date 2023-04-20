import App from "../App";
import LoginContainer from "../containers/auth/login/LoginContainer";
import SignupContainer from "../containers/auth/signup/SignupContainer";
import Order from "../containers/order/Order";
import AuthPage from "../pages/auth-page/AuthPage";
import CategoriesPage from "../pages/categories-page/CategoriesPage";
import CategoryEventsPage from "../pages/category-events-page/CategoryEventsPage";
import CheckOut from "../pages/check-out-page/CheckOut";
import EventPage from "../pages/event-page/EventPage";
import FavoritesPage from "../pages/favorites-page/FavoritesPage";
import LandingPage from "../pages/landing-page/LandingPage";
import ProfilePage from "../pages/profile-page/ProfilePage";
import SalesPage from "../pages/sales-page/SalesPage";
import UserReviewsPage from "../pages/user-reviews-page/UserReviewPage";

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
            },
            {
                path:'check-out',
                element: <CheckOut />,
                children: [
                    {
                        index: true,
                        element: <Order />
                    }
                ]
            }
            ,
            {
                path:'profile',
                element: <ProfilePage />
            },
            {
                path:'profile/sales',
                element: <SalesPage />
            },
            {
                path:'profile/favorites',
                element: <FavoritesPage />
            },
            {
                path:'profile/reviews',
                element: <UserReviewsPage />
            }
        ]
    }
]