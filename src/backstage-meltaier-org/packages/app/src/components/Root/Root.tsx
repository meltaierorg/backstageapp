import React, { PropsWithChildren } from 'react';
import { makeStyles } from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import ExtensionIcon from '@material-ui/icons/Extension';
import MapIcon from '@material-ui/icons/MyLocation';
import LibraryBooks from '@material-ui/icons/LibraryBooks';
import CreateComponentIcon from '@material-ui/icons/AddCircleOutline';
import LogoFull from './LogoFull';
import LogoIcon from './LogoIcon';
import {
  Settings as SidebarSettings,
  UserSettingsSignInAvatar,
} from '@backstage/plugin-user-settings';
import { SidebarSearchModal } from '@backstage/plugin-search';
import {
  Sidebar,
  sidebarConfig,
  SidebarDivider,
  SidebarGroup,
  SidebarItem,
  SidebarPage,
  SidebarScrollWrapper,
  SidebarSpace,
  useSidebarOpenState,
  Link,
} from '@backstage/core-components';
import MenuIcon from '@material-ui/icons/Menu';
import CloudIcon from '@material-ui/icons/Cloud';
import SecretIcon from '@material-ui/icons/VpnKey';
import GroupIcon from '@material-ui/icons/Group';
import DeploymentIcon from '@material-ui/icons/CloudUpload';
import SearchIcon from '@material-ui/icons/Search';

const useSidebarLogoStyles = makeStyles({
  root: {
    width: sidebarConfig.drawerWidthClosed,
    height: 3 * sidebarConfig.logoHeight,
    display: 'flex',
    flexFlow: 'row nowrap',
    alignItems: 'center',
    marginBottom: -14,
  },
  link: {
    width: sidebarConfig.drawerWidthClosed,
    marginLeft: 24,
  },
});

const SidebarLogo = () => {
  const classes = useSidebarLogoStyles();
  const { isOpen } = useSidebarOpenState();

  return (
    <div className={classes.root}>
      <Link to="/" underline="none" className={classes.link} aria-label="Home">
        {isOpen ? <LogoFull /> : <LogoIcon />}
      </Link>
    </div>
  );
};

import CategoryIcon from '@material-ui/icons/Category';

const handleSearch = (input: string) => {
    console.log(input);
};


  export const Root = ({ children }: PropsWithChildren<{}>) => (
    <SidebarPage >

      <Sidebar>
        <SidebarLogo />
        <SidebarGroup label="Search" icon={<SearchIcon />} to="/search">
          <SidebarSearchModal />
        </SidebarGroup>
        <SidebarDivider />
        <SidebarGroup label="Menu" icon={<MenuIcon />}>
          {/* Global nav, not org-specific */}
          <SidebarItem icon={DeploymentIcon} to="catalog?filters%5Bkind%5D=template&filters%5Buser%5D=all" text="Catalog" />
          <SidebarItem icon={GroupIcon} to="catalog?filters%5Bkind%5D=group&filters%5Btype%5D=team&filters%5Buser%5D=all" text="Teams" />
          <SidebarDivider />
          
          <SidebarItem icon={CloudIcon} to="catalog?filters%5Bkind%5D=component&filters%5Btype%5D=subscription&filters%5Buser%5D=all" text="Subscriptions" />
          <SidebarItem icon={SecretIcon} to="catalog?filters%5Bkind%5D=component&filters%5Btype%5D=keyvault&filters%5Buser%5D=all" text="KeyVaults" />
          <SidebarItem icon={CategoryIcon} to="catalog?filters%5Bkind%5D=component&filters%5Btype%5D=resourcegroup&filters%5Buser%5D=all" text="Resource Groups" />
          <SidebarItem icon={LibraryBooks} to="catalog?filters%5Bkind%5D=component&filters%5Buser%5D=all" text="Components" />
          <SidebarDivider />

          
          <SidebarItem icon={CreateComponentIcon} to="create" text="Create..." />
          <SidebarScrollWrapper>
          
          </SidebarScrollWrapper>
        </SidebarGroup>
        <SidebarSpace />
        <SidebarDivider />
        <SidebarGroup
          label="Settings"
          icon={<UserSettingsSignInAvatar />}
          to="/settings"
        >
          <SidebarSettings />
        </SidebarGroup>
      </Sidebar>
      {children}
    </SidebarPage>
  );