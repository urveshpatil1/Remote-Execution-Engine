import Card from './common/Card';
import googleLogo from '../assets/google.svg';
import siginBg from '../assets/signin-bg.jpg';
import { Link, useNavigate } from 'react-router-dom';
import { signInService } from '../services';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { useForm, FieldError, SubmitHandler } from 'react-hook-form';
import { SignInType } from '../interfaces';
import { useSetRecoilState } from 'recoil';
import { userAtom } from '../store';

function SignIn() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const setUser = useSetRecoilState(userAtom);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SignInType>();

  /* The `signinMutation` is a mutation function created using the `useMutation` hook from the
`@tanstack/react-query` library. It is used to handle the sign-in functionality. */
  const signinMutation = useMutation({
    mutationFn: signInService,
    onSuccess: (data) => {
      setUser(data.data.user);
      localStorage.setItem('token', data.data.token);
      localStorage.setItem('role', data.data.user.role);
      queryClient.invalidateQueries({ queryKey: ['signin'] });
      toast.success(data.data.message);
      reset({ email: '', password: '' });
      navigate('/problems');
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const onHandleSignIn: SubmitHandler<SignInType> = (data) => {
    if (data.email && data.password) {
      signinMutation.mutate(data);
    }
  };

  return (
    <div className="flex h-[92vh] w-screen ">
      <div className="w-[30vw]">
        <img
          src={siginBg}
          alt="High Tech Image"
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>

      <div className="w-[70vw] flex items-center justify-center bg-gradient-to-r from-black to-gray-800">
        <Card>
          <div className="mb-5 float-left text-left">
            <div className="mb-5">
              <h2 className="text-2xl font-semibold">Login</h2>
              <span className="text-white pr-2">New to CodeX?</span>
              <Link
                to={'/signup'}
                className="text-blue-600 hover:text-blue-500 hover:cursor-pointer"
              >
                Signup
              </Link>
            </div>

            <div className="mb-4">
              <label htmlFor="email" className="text-sm text-gray-400">
                Email:
              </label>
              <input
                type="email"
                id="email"
                className="w-full py-2 px-3 mt-1 bg-gray-700 text-white rounded-md active:bg-inherit focus:outline-none focus:border-blue-500"
                {...register('email', {
                  required: 'This field is required !',
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: 'The value should be an email !',
                  },
                })}
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{(errors.email as FieldError).message}</p>
              )}
            </div>

            <div className="mb-6">
              <label htmlFor="password" className="text-sm text-gray-400">
                Password:
              </label>
              <input
                type="password"
                id="password"
                className="w-full py-2 px-3 mt-1 bg-gray-700 text-white rounded-md focus:outline-none focus:border-blue-500"
                {...register('password', {
                  required: 'This field is required !',
                  minLength: {
                    value: 6,
                    message: 'Password should be min 6 characters !',
                  },
                })}
              />
              {errors.password && (
                <p className="text-red-500 text-sm">{(errors.password as FieldError).message}</p>
              )}
            </div>

            <button
              onClick={handleSubmit(onHandleSignIn)}
              className="w-full bg-blue-500 text-white px-4 py-2 rounded-md focus:outline-none hover:bg-blue-600"
            >
              Sign In
            </button>
          </div>
          <button
            onClick={() => alert('Goggle sign in')}
            className="flex items-center justify-center text-white mt-5 rounded-md focus:outline-none"
          >
            <img src={googleLogo} alt="Google Logo" className="h-5 w-5 mr-2" />
            Login with Google
          </button>
        </Card>
      </div>
    </div>
  );
}

export default SignIn;
