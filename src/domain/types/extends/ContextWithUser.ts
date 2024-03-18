import LoggedInUser from '../LoggedInUser';
import { ContextWithJWT } from './ContextWithJWT';

export interface ContextWithUser extends ContextWithJWT {
  readonly user: LoggedInUser;
}
