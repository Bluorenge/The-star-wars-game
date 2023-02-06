import { Link } from 'react-router-dom'
import { Col, Row } from 'antd'
import * as ROUTES from '../../constants/routes'

const links = [
  {
    to: ROUTES.MAIN_PAGE_PATH,
    text: 'Main',
  },
  {
    to: ROUTES.AUTH_PAGE_PATH,
    text: 'Auth',
  },
  {
    to: ROUTES.REGISTRY_PAGE_PATH,
    text: 'Registry',
  },
  {
    to: ROUTES.GAME_PAGE_PATH,
    text: 'Game',
  },
  {
    to: ROUTES.LEADERBOARD_PAGE_PATH,
    text: 'Leaderboard',
  },
  {
    to: ROUTES.PROFILE_PAGE_PATH,
    text: 'Profile',
  },
]

//TODO: правильный тип данных поставить
export const Layout = ({ children }) => {
  return (
    <div>
      <nav>
        <Row>
          {links.map(({ to, text }, index) => (
            <Col key={index}>
              <Link to={to}>{text}</Link>
            </Col>
          ))}
        </Row>
      </nav>
      {children}
    </div>
  )
}
