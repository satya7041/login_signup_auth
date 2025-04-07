// app/signup/page.tsx
import LogInForm from '../../components/LogInForm';
const SignupPage = () => {
  return (
    <div className="max-w-md mx-auto mt-8 p-6 border rounded-lg bg-white">
      <h1 className="text-2xl font-semibold text-center">Login</h1>
      <LogInForm />
    </div>
  );
};

export default SignupPage;
