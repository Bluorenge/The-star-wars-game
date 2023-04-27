import { FC } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { Col, Row } from 'antd';
import { GlobalOutlined } from '@ant-design/icons';

import { useLocale } from 'hooks/useLocale';
import { useAppSelector } from 'hooks/useAppSelector';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { signOut } from 'app/actions/userActions';

import { navbarLinks } from 'constants/navbar';
import { ROUTES } from 'constants/routes';
import { ThemeButton } from 'components/ThemeButton';

import './Header.scss';

export const Header: FC = () => {
  const [, toggleLocale] = useLocale();

  const dispatch = useAppDispatch();
  const { isAuth } = useAppSelector((state) => state.user);

  const navigate = useNavigate();

  const handleSignOut = () => {
    dispatch(signOut());

    navigate(ROUTES.LOGIN_PAGE);
  };

  return (
    <header className="header">
      <Link to={ROUTES.MAIN_PAGE_PATH} className="header__link">
        <FormattedMessage id="team.name" defaultMessage="STAR WARS KITTENS" />
      </Link>

      <Row className="header__row">
        {isAuth && (
          <nav className="header__navbar">
            <Row>
              {navbarLinks.map(({ to, key }) => (
                <Col key={key} className="header__navbarItem">
                  <Link to={to} className="header__link">
                    <FormattedMessage
                      id={`navbar.link.${key}`}
                      defaultMessage={key}
                    />
                  </Link>
                </Col>
              ))}
            </Row>
          </nav>
        )}

        <Col className="header__navbarItem">
          <GlobalOutlined
            onClick={toggleLocale}
            className="header__link_langIcon"
          />
        </Col>

        <Col className="header__navbarItem">
          <ThemeButton />
        </Col>

        {isAuth && (
          <Col className="header__navbarItem">
            <div className="header__link" onClick={handleSignOut}>
              <FormattedMessage
                id="universal.sign-out"
                defaultMessage="Sign out"
              />
            </div>
          </Col>
        )}
      </Row>
    </header>
  );
};
