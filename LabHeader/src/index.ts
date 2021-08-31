import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';
import React from 'react';

import { ReactWidget } from '@jupyterlab/apputils';
import { LabHeader } from './header';

/**
 * Initialization data for the @swan-cern/labheader extension.
 */

const plugin: JupyterFrontEndPlugin<void> = {
  id: '@swan-cern/labheader:plugin',
  autoStart: true,
  requires: [JupyterFrontEnd.IPaths],
  activate: (app: JupyterFrontEnd, paths: JupyterFrontEnd.IPaths) => {
    (window as any).jp = app;
    console.log('JupyterLab extension @swan-cern/labheader is activated!');
    const headerWidget = ReactWidget.create(
      React.createElement(LabHeader, {
        hubPrefix: paths.urls.hubPrefix,
        hubUser: paths.urls.hubUser,
        baseUrl: paths.urls.base
      })
    );
    headerWidget.id = 'swan-header';

    app.shell.add(headerWidget, 'header');
  }
};

export default plugin;
