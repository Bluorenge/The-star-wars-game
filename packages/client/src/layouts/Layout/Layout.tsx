import React from 'react';
import { Link } from 'react-router-dom';
import { Col, Row } from 'antd';
import { links } from './data';

interface LayoutProps {
  children: any;
}

//TODO: правильный тип данных поставить
export const Layout: React.FC<LayoutProps> = ({ children }) => {
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
  );
};
