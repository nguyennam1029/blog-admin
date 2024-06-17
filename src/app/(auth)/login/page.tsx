
import LoginForm from './login-form';

export default function page() {
  return (
    <div className="w-[600px] m-auto">
      <h1 className="text-lg font-medium text-center">Login</h1>
      <div>
        <LoginForm></LoginForm>
      </div>
    </div>
  );
}
