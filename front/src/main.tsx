'use-strict'
import ReactDOM from 'react-dom/client'
import './index.css'
import {RecoilRoot} from 'recoil'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { routes } from './routes/router'

const router = createBrowserRouter(routes)


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <RecoilRoot>
        <RouterProvider router={router} />
    </RecoilRoot>
)
