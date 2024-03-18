import { ContextWithJWT } from './ContextWithJWT';
import LoggedInUser from './LoggedInUser';

export interface ContextWithUser extends ContextWithJWT {
  readonly user: LoggedInUser;
}
