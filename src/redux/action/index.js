import * as authActions from './auth';
import * as chatActions from './chat';
import * as workspaceActions from './workspace';
import * as errorActions from './error';

export const ActionCreators = Object.assign(
  {},
  authActions,
  chatActions,
  errorActions,
  workspaceActions,
);
