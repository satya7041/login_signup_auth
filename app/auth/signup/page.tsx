// app/signup/page.tsx
import SignupForm from '../../components/SignUpForm';

const SignupPage = () => {
  return (
    <div className="max-w-md mx-auto mt-8 p-6 border rounded-lg bg-white">
      <h1 className="text-2xl font-semibold text-center">Create an Account</h1>
      <SignupForm />
    </div>
  );
};

export default SignupPage;
