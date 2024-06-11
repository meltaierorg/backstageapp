import React from 'react';
import { Navigate, Route } from 'react-router-dom';
import { apiDocsPlugin, ApiExplorerPage } from '@backstage/plugin-api-docs';
import {
  CatalogEntityPage,
  CatalogIndexPage,
  catalogPlugin,
} from '@backstage/plugin-catalog';
import {
  CatalogImportPage,
  catalogImportPlugin,
} from '@backstage/plugin-catalog-import';
import { ScaffolderPage, scaffolderPlugin } from '@backstage/plugin-scaffolder';
import { orgPlugin } from '@backstage/plugin-org';
import { SearchPage } from '@backstage/plugin-search';
import {
  TechDocsIndexPage,
  techdocsPlugin,
  TechDocsReaderPage,
} from '@backstage/plugin-techdocs';
import { TechDocsAddons } from '@backstage/plugin-techdocs-react';
import { ReportIssue } from '@backstage/plugin-techdocs-module-addons-contrib';
import { UserSettingsPage } from '@backstage/plugin-user-settings';
import { apis } from './apis';
import { entityPage } from './components/catalog/EntityPage';
import { searchPage } from './components/search/SearchPage';
import { Root } from './components/Root';

import {
  AlertDisplay,
  OAuthRequestDialog,
  SignInPage
} from '@backstage/core-components';



/////
import { microsoftAuthApiRef } from '@backstage/core-plugin-api';
import { githubAuthApiRef } from '@backstage/core-plugin-api';
//////





import { createApp } from '@backstage/app-defaults';
import { AppRouter, FlatRoutes } from '@backstage/core-app-api';
import { CatalogGraphPage } from '@backstage/plugin-catalog-graph';
import { RequirePermission } from '@backstage/plugin-permission-react';
import { catalogEntityCreatePermission } from '@backstage/plugin-catalog-common/alpha';




//////////////////////
// Add imports for the default themes
import { themes } from '@backstage/theme';

// Import to be able to build new themes
import {
  UnifiedThemeProvider
  
} from '@backstage/theme';
import LightIcon from  '@material-ui/icons/WbSunny';



const app = createApp({
  themes: [
    // Keeping the original themes is completely optional
    {
      id: 'default-dark',
      title: 'Default Dark',
      variant: 'dark',
      Provider: ({ children }) => <UnifiedThemeProvider theme={themes.dark} children={children} />,
    },
    {
      id: 'default-light',
      title: 'Default Light',
      variant: 'light',
      Provider: ({ children }) => <UnifiedThemeProvider theme={themes.light} children={children} />,
    }
  ],
  apis,
  bindRoutes({ bind }) {
    bind(catalogPlugin.externalRoutes, {
      createComponent: scaffolderPlugin.routes.root,
      viewTechDoc: techdocsPlugin.routes.docRoot,
      createFromTemplate: scaffolderPlugin.routes.selectedTemplate,
    });
    bind(apiDocsPlugin.externalRoutes, {
      registerApi: catalogImportPlugin.routes.importPage,
    });
    bind(scaffolderPlugin.externalRoutes, {
      registerComponent: catalogImportPlugin.routes.importPage,
      viewTechDoc: techdocsPlugin.routes.docRoot,
    });
    bind(orgPlugin.externalRoutes, {
      catalogIndex: catalogPlugin.routes.catalogIndex,
    });
  },
  components: {
    SignInPage: props => (
      <SignInPage
        {...props}
        auto
        title="Welcome to Contoso Internal Self Service Platform"
        align='center'
        
        providers={[
        'guest',
        {
          id: 'microsoft-auth-provider',
          title: 'EntraID Single Sign On',
          message: 'Welcome to Contoso Internal Self Service Platform. Sign in using EntraID meltaier.onmicrosoft.com Domain.',
          apiRef: microsoftAuthApiRef
        }
      ]}
      />
    ),
  },
});
import { HomepageCompositionRoot } from '@backstage/plugin-home';
import { DefaultTemplate } from './components/home/HomePage';
const routes = (
  <FlatRoutes>
    <Route path="/" element={<HomepageCompositionRoot />}>
    <DefaultTemplate />
    </Route>
    <Route path="/catalog" 
    //add table search element

    element={
    <CatalogIndexPage 
     tableOptions={{ 
      search: true,
      columnResizable : true,

      }}
     
     />
    }

    />
    <Route
      path="/catalog/:namespace/:kind/:name"
      element={<CatalogEntityPage />}
    >
      {entityPage}
    </Route>
    <Route path="/docs" element={<TechDocsIndexPage />} />
    <Route
      path="/docs/:namespace/:kind/:name/*"
      element={<TechDocsReaderPage />}
    >
      <TechDocsAddons>
        <ReportIssue />
      </TechDocsAddons>
    </Route>
    <Route path="/create" element={<ScaffolderPage />} />
    <Route path="/api-docs" element={<ApiExplorerPage />} />
    <Route
      path="/catalog-import"
      element={
        <RequirePermission permission={catalogEntityCreatePermission}>
          <CatalogImportPage />
        </RequirePermission>
      }
    />
    <Route path="/search" element={<SearchPage />}>
      {searchPage}
    </Route>
    <Route path="/settings" element={<UserSettingsPage />} />
    <Route path="/catalog-graph" element={<CatalogGraphPage />} />
  </FlatRoutes>
);

export default app.createRoot(
  <>
    <AlertDisplay />
    <OAuthRequestDialog />
    <AppRouter>
      <Root>{routes}</Root>
    </AppRouter>
  </>,
);
