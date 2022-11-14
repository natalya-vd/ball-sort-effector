import { FC } from 'react';
import { Outlet } from 'react-router-dom';

import './layout.css';

export const Layout: FC = () => (
  <>
    <main>
      <Outlet />
    </main>
    <nav className="navigation">
      <a href="https://effector.dev">Effector</a>
    </nav>
  </>
);
