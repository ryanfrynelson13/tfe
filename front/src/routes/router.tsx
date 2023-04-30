import App from "../App";
import LoginContainer from "../containers/auth/login/LoginContainer";
import SignupContainer from "../containers/auth/signup/SignupContainer";
import EventForm from "../containers/dashboard/event-form/EventForm";
import SessionsForm from "../containers/dashboard/sessions-form/SessionsForm";
import TicketsForm from "../containers/dashboard/tickets-form/TicketsForm";
import Confirmed from "../containers/order/confirmed/Confirmed";
import Order from "../containers/order/order/Order";
import StripeContainer from "../containers/order/stripe/StripeContainer";
import UserInfo from "../containers/order/user-info/UserInfo";
import AuthPage from "../pages/auth-page/AuthPage";
import CategoriesPage from "../pages/categories-page/CategoriesPage";
import CategoryEventsPage from "../pages/category-events-page/CategoryEventsPage";
import CheckOut from "../pages/check-out-page/CheckOut";
import DashBoardPage from "../pages/dashboard-page/DashboardPage";
import EventPage from "../pages/event-page/EventPage";
import FavoritesPage from "../pages/favorites-page/FavoritesPage";
import LandingPage from "../pages/landing-page/LandingPage";
import MyEventsPage from "../pages/my-events-page/MyEventsPage";
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
                    },
                    {
                        path: 'personnal-info',
                        element: <UserInfo />
                    },
                    {
                        path: 'pay',
                        element: <StripeContainer />
                    },
                    {
                        path: 'confirmed',
                        element: <Confirmed />
                    }
                ]
            }
            ,
            {
                path:'profile',
                element: <ProfilePage />
            },
            {
                path:'profile/orders',
                element: <SalesPage />
            },
            {
                path:'profile/favorites',
                element: <FavoritesPage />
            },
            {
                path:'profile/reviews',
                element: <UserReviewsPage />
            },
            {
                path:'profile/my-events',
                element: <MyEventsPage />
            },
            {
                path:'event-maker/dashboard',
                element: <DashBoardPage />,
                children: [
                    {
                        index: true,
                        element: <EventForm />
                    },
                    {
                        path: 'tickets',
                        element: <TicketsForm/>
                    },
                    {
                        path: 'sessions',
                        element: <SessionsForm/>
                    }
                ]
            }
        ]
    }
]