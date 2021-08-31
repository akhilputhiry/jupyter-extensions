import React from 'react';

import { Dialog, showDialog } from '@jupyterlab/apputils';

import Button from '@material-ui/core/Button';
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import Avatar from '@material-ui/core/Avatar';
import ForumIcon from '@material-ui/icons/Forum';
import ContactSupportIcon from '@material-ui/icons/ContactSupport';

import { ThemeProvider } from './theme-provider';

export const LabHeader = (props: {
  hubPrefix?: string;
  hubUser?: string;
  baseUrl: string;
}) => {
  const baseUrl = props.baseUrl; // contains a trailing /
  const userName = props.hubUser || 'swanuser';
  const shutdownUrl = (props.hubPrefix || props.baseUrl) + 'home?changeconfig';

  const onClickShutdown = async () => {
    const result = await showDialog({
      title: 'Shutdown Session?',
      body: 'Do you want to shut down your session? This will close all notebooks and shutdown all running kernels.',
      buttons: [
        Dialog.okButton({
          caption: 'Shutdown',
          displayType: 'warn',
          label: 'Shutdown Session'
        }),
        Dialog.cancelButton({
          caption: 'Cancel',
          label: 'Cancel'
        })
      ]
    });
    if (result.button.accept) {
      window.location.replace(shutdownUrl);
    }
  };

  const onClickLogout = async () => {
    const result = await showDialog({
      title: 'Logout?',
      body: 'Do you want to logout? This will NOT shutdown your session or stop your running notebooks. However sessions that are idle for an extended period of time will automatically be shut down.',
      buttons: [
        Dialog.okButton({
          caption: 'Logout',
          label: 'Logout'
        }),
        Dialog.cancelButton({
          caption: 'Cancel',
          label: 'Cancel'
        })
      ]
    });
    if (result.button.accept) {
      window.location.replace(baseUrl + 'logout');
    }
  };

  return (
    <div className="sw-header-toolbar">
      <div
        style={{
          flexGrow: 1
        }}
      >
        <div className="sw-swan-logo"></div>
      </div>
      <ThemeProvider theme={'light'}>
        <Button
          variant="text"
          size="small"
          startIcon={<ForumIcon />}
          component="a"
          target="_blank"
          href="https://swan-community.web.cern.ch/"
        >
          Community
        </Button>
        <Button
          variant="text"
          size="small"
          startIcon={<ContactSupportIcon />}
          component="a"
          target="_blank"
          href="https://cern.service-now.com/service-portal?id=functional_element&name=swan"
        >
          Support
        </Button>
        <div
          style={{
            display: 'flex',
            alignItems: 'center'
          }}
        >
          <Avatar
            style={{
              height: '30px',
              width: '30px',
              marginRight: '4px'
            }}
          >
            {userName[0].toUpperCase()}
          </Avatar>
          <u>{userName}</u>
        </div>
        <Button
          color="primary"
          variant="contained"
          size="small"
          startIcon={<MeetingRoomIcon />}
          onClick={onClickLogout}
        >
          Logout
        </Button>
        <Button
          color="secondary"
          variant="contained"
          size="small"
          startIcon={<PowerSettingsNewIcon />}
          onClick={onClickShutdown}
        >
          Shutdown
        </Button>
      </ThemeProvider>
    </div>
  );
};
