import React, { useContext } from 'react'
import ThemeContext from '../helpers/themeContext'
import UserContext from '../helpers/userContext'
import Settings from '../home/settings'
import CreateDate from '../createDate/createDate'
import Shuffle from '../shuffle/shuffle'
import CardList from '../cardList/cardList'
import './nav.scss'
import {
  useHistory,
  useRouteMatch,
  Link,
  Switch,
  Route,
} from 'react-router-dom'
import { signOut } from '../../api/authentication'
import { getDateIdeas } from '../../api/requests'

const routes = [
  {
    path: '/home',
    exact: true,
    main: () => <CardList />,
  },
  {
    path: '/home/card-list',
    main: () => <CardList />,
  },
  {
    path: '/home/create-new-date',
    main: () => <CreateDate />,
  },
  {
    path: '/home/shuffle',
    main: () => <Shuffle />,
  },
  {
    path: '/home/settings',
    main: () => <Settings />,
  },
]

const Nav = () => {
  let { url } = useRouteMatch()
  let history = useHistory()
  const [user, setUser] = useContext(UserContext)
  const [theme, setTheme] = useContext(ThemeContext)

  const loadShowCards = async () => {
    console.log(user.token)
    let response = await getDateIdeas(user.token)
    console.log(response)
  }

  const logout = async () => {
    await signOut()
    setUser({ name: '', email: '', token: '', id: '' }, 'user')
    setTheme('theme-dark')
    history.push('/')
  }
  return (
    <div className="grid-container">
      <div className={`nav ${theme}`}>
        <div className="logo-user">
          <div className="logo">V</div>
        </div>
        <div className="options-card">
          <Link to={`/home`} onClick={() => loadShowCards()}>
            home
          </Link>
          <Link to={`${url}/card-list`}>show cards</Link>
          <Link to={`${url}/create-new-date`}>create new date</Link>
          <Link to={`${url}/shuffle`}>shuffle</Link>
          <hr className="nav-split" />
        </div>
        <div className="options-user">
          <Link to={`${url}/settings`}>settings</Link>
          <Link to={`/`} onClick={() => logout()}>
            log out
          </Link>
        </div>
        <div className="logo-app">---------cozy---------</div>
      </div>

      <Switch>
        {routes.map((route, index) => (
          <Route
            key={index}
            path={route.path}
            exact={route.exact}
            children={<route.main />}
          />
        ))}
      </Switch>
    </div>
  )
}

export default Nav
