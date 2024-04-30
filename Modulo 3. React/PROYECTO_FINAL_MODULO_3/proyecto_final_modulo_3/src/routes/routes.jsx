import { createBrowserRouter } from 'react-router-dom'
import  App from '../App'
import { Home, Register, Login, CheckCode, Dashboard, Profile, ForgotPassword, FormProfile, ChangePassword, UserData} from '../pages'
import { Protected, ProtectedCheckChildren } from '../components'


//CREAMOS LAS RUTAS DE NUESTRA PAGINA --> VERSION 6
export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                path:'/',
                element: <Home />
            },

            {
                path:'/register',
                element: <Register />
            },

            {
                path:'/login',
                element: <Login />
            },

            {
                path:'/verifyCode',
                element:(
                    <ProtectedCheckChildren>
                        <CheckCode />
                    </ProtectedCheckChildren>
                ),
            },
            {
                path:'/dashboard',
                element: <Dashboard />
            },
            {
                path:'/profile',
                element: (
                    <Protected>
                        <Profile />
                    </Protected>
                ),
                children: [
                    {
                        path:'/profile',
                        element: (
                            <Protected>
                                <UserData />
                            </Protected>
                        ),
                    },
                    {
                        path:'/profile/updateProfile',
                        element: 
                                <Protected>
                                    <FormProfile />
                                </Protected>
                    },
                    {
                        path:'/profile/changePassword',
                        element: <ChangePassword />
                    },
                ]
            },
            {
                path:'/forgotPassword',
                element:<ForgotPassword />,
            },


        ],
    }
])