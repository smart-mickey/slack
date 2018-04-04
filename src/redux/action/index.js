import * as authActions from './auth';
import * as chatActions from './chat';
import * as workspaceActions from './workspace';

export const ActionCreators = Object.assign(
  {},
  authActions,
  chatActions,
  workspaceActions,
);
