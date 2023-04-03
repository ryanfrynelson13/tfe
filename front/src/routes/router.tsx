import App from "../App";
import LandingPage from "../pages/landing-page/LandingPage";

export const routes = [
    {
        path: '',
        element: <App />,
        children: [
            {
                index: true,
                element: <LandingPage />
            }
        ]
    }
]