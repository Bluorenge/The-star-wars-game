import { Link } from 'react-router-dom'
import { Col, Row } from 'antd'
import { links } from './data'

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
