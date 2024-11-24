import s from "./Header.module.css";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <header className={s.header}>
      <ul className={s.navList}>
        <li className={s.navItem}>
          <NavLink to="/">Home</NavLink>
        </li>
        <li className={s.navItem}>
          <NavLink to="/movies">Movies</NavLink>
        </li>
      </ul>
    </header>
  );
};

export default Header;
