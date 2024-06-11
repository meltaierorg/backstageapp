/*
2 * Copyright 2021 The Backstage Authors
3 *
4 * Licensed under the Apache License, Version 2.0 (the "License");
5 * you may not use this file except in compliance with the License.
6 * You may obtain a copy of the License at
7 *
8 *     http://www.apache.org/licenses/LICENSE-2.0
9 *
10 * Unless required by applicable law or agreed to in writing, software
11 * distributed under the License is distributed on an "AS IS" BASIS,
12 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
13 * See the License for the specific language governing permissions and
14 * limitations under the License.
15 */

import {
HomePageCompanyLogo,
  HomePageStarredEntities,
  TemplateBackstageLogo,
} from '@backstage/plugin-home';
import { wrapInTestApp, TestApiProvider } from '@backstage/test-utils';
import { Content, Page, InfoCard } from '@backstage/core-components';
import {
  starredEntitiesApiRef,
  MockStarredEntitiesApi,
  entityRouteRef,
  catalogApiRef,
} from '@backstage/plugin-catalog-react';
import { configApiRef } from '@backstage/core-plugin-api';
import { ConfigReader } from '@backstage/config';
import { HomePageSearchBar, searchPlugin } from '@backstage/plugin-search';
import {
  searchApiRef,
  SearchContextProvider,
} from '@backstage/plugin-search-react';
import { Grid, makeStyles } from '@material-ui/core';
import React, { ComponentType, PropsWithChildren } from 'react';


const entities = [
  {
    apiVersion: '1',
    kind: 'Component',
    metadata: {
      name: 'mock-starred-entity',
      title: 'Mock Starred Entity!',
    },
  },
  {
    apiVersion: '1',
    kind: 'Component',
    metadata: {
      name: 'mock-starred-entity-2',
      title: 'Mock Starred Entity 2!',
    },
  },
  {
    apiVersion: '1',
    kind: 'Component',
    metadata: {
      name: 'mock-starred-entity-3',
      title: 'Mock Starred Entity 3!',
    },
  },
  {
    apiVersion: '1',
    kind: 'Component',
    metadata: {
      name: 'mock-starred-entity-4',
      title: 'Mock Starred Entity 4!',
    },
  },
];

const mockCatalogApi = {
  getEntities: async () => ({ items: entities }),
};

import { EntityRefLinks } from '@backstage/plugin-catalog-react';
const defaultArgs = {
entityRefs: ['component:default/sub-sandbox-meltaierorg', 
'component:default/sub-sandbox-placeholder'],
};
////

const starredEntitiesApi = new MockStarredEntitiesApi();
starredEntitiesApi.toggleStarred('component:default/example-starred-entity');
starredEntitiesApi.toggleStarred('component:default/example-starred-entity-2');
starredEntitiesApi.toggleStarred('component:default/example-starred-entity-3');
starredEntitiesApi.toggleStarred('component:default/example-starred-entity-4');

export default {
  title: 'Plugins/Home/Templates',
  decorators: [
    (Story: ComponentType<PropsWithChildren<{}>>) =>
      wrapInTestApp(
        <>
          <TestApiProvider
            apis={[
              [catalogApiRef, mockCatalogApi],
              [starredEntitiesApiRef, starredEntitiesApi],
              [searchApiRef, { query: () => Promise.resolve({ results: [] }) }],
              [
                configApiRef,
                new ConfigReader({
                  stackoverflow: {
                    baseUrl: 'https://api.stackexchange.com/2.2',
                  },
                }),
              ],
            ]}
          >
            <Story />
          </TestApiProvider>
        </>,
        {
          mountedRoutes: {
            '/hello-company': searchPlugin.routes.root,
            '/catalog/:namespace/:kind/:name': entityRouteRef,
          },
        },
      ),
    // extra
    (Story: ComponentType<PropsWithChildren<{}>>) =>
            wrapInTestApp(<Story />, {
              mountedRoutes: {
                '/catalog/:namespace/:kind/:name': entityRouteRef,
              },
    }),
        
  ],
};

const useStyles = makeStyles(theme => ({
  searchBarInput: {
    maxWidth: '60vw',
    margin: 'auto',
    backgroundColor: theme.palette.background.paper,
    borderRadius: '50px',
    boxShadow: theme.shadows[1],
  },
  searchBarOutline: {
    borderStyle: 'none',
  }

}));

const useLogoStyles = makeStyles(theme => ({
  container: {
    margin: theme.spacing(5, 0),
  },
  svg: {
    width: 'auto',
    height: 100,
  },
  path: {
   fill: '#7df3e1',
  },
}));


import { Typography, Icon } from '@material-ui/core';
import { Cloud } from '@material-ui/icons';


export const DefaultTemplate = () => {
  const classes = useStyles();
  const { svg, path, container } = useLogoStyles();

  return (
    <SearchContextProvider>
      <Page themeId="home">
        <Content>
          <Grid container justifyContent="center" spacing={6}>
            <HomePageCompanyLogo
              className={container}
              logo={<TemplateBackstageLogo classes={{ svg, path }} />}
            />
            <Grid container item xs={12} justifyContent='center'>
              <HomePageSearchBar
                InputProps={{ classes: { root: classes.searchBarInput, notchedOutline: classes.searchBarOutline }}}
                placeholder="Search"
              />
            </Grid>
            <Grid container item xs={12}>
              <Grid item xs={12} md={6}>
                <HomePageStarredEntities title='Favorites'  />
              </Grid>
  
              <Grid item xs={12} md={6}>
                <InfoCard >
                  <Grid container alignItems="center">
                    <Grid item>
                      <Icon component={Cloud} fontSize="large" />
                    </Grid>
                    <Grid item>
                      <Typography variant="h4">Active Azure Subscriptions</Typography>
                    </Grid>
                  </Grid>
                  <Grid item>

                  <Typography variant="h5"> 

                   <EntityRefLinks {...defaultArgs} /> 
                   
                   </Typography>

                  </Grid>
                </InfoCard>
              </Grid>
            </Grid>
          </Grid>
        </Content>
      </Page>
    </SearchContextProvider>
  )};