import { LoginForm } from '@components/loginform';
//hocs
import { withAuthentication } from '@hocs/withAuthentication';
export default withAuthentication(LoginForm);