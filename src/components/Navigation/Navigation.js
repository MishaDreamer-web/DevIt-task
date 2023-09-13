import { NavLink } from 'react-router-dom';
import { styled } from 'styled-components';

import styles from './Navigation.module.scss';

const StyledLink = styled(NavLink)`
  color: blue;

  &.active {
    color: orange;
  }
`;

// Site Navigation

const Navigation = () => (
  <nav className={styles.navigation}>
    <StyledLink to="/" className={styles.navLink}>
      HomePage
    </StyledLink>

    <StyledLink to="/layout-flex" className={styles.navLink}>
      Layout Flex
    </StyledLink>

    <StyledLink to="/layout-grid" className={styles.navLink}>
      Layout Grid
    </StyledLink>

    <StyledLink to="/animation" className={styles.navLink}>
      Animation
    </StyledLink>

    <StyledLink to="/javascript" className={styles.navLink}>
      JavaScript
    </StyledLink>
  </nav>
);

export default Navigation;
