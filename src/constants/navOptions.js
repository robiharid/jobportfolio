import * as ROUTES from './routes';

export const AuthedRoutes =  [
  {
    link: ROUTES.LANDING,
    label: "Home"
  },
  {
    link: ROUTES.PROFILE,
    label: "Profile"
  },

]

export const NonAuthedRoutes = [
  {
    link: ROUTES.LANDING,
    label: "Home"
  },
  // {
  //   link: ROUTES.SIGN_IN,
  //   label: "Sign In"
  // }
]