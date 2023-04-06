import App from "../App";
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
                path: 'event/:id',
                element: <EventPage />
            }
        ]
    }
]