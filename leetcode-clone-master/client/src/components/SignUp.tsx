import Card from './common/Card';
import googleLogo from '../assets/google.svg';
import signUpBg from '../assets/signup-bg.jpg';
import { Link } from 'react-router-dom';
import { FieldError, SubmitHandler, useForm } from 'react-hook-form';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { signUpService } from '../services';
import { SignUpType, SignUpTypeForm } from '../interfaces';

function SignUp() {
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    reset,
    watch,
    setError,
    formState: { errors },
  } = useForm<SignUpTypeForm>();

  /* The `signupMutation` is a mutation function created using the `useMutation` hook from the
`@tanstack/react-query` library. It is used to handle the sign-up functionality. */
  const signupMutation = useMutation({
    mutationFn: signUpService,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['signup'] });
      toast.success(data.data.message);
      reset({ name: '', email: '', password: '', confirmPassword: '' });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const confirmPwd = watch('confirmPassword', '');

  const onHandleSignUp: SubmitHandler<SignUpTypeForm> = (data) => {
    if (data.name && data.email && data.password && data.password === confirmPwd) {
      const apiPayloadData: SignUpType = {
        email: data.email,
        password: data.confirmPassword,
        name: data.name,
      };
      signupMutation.mutate(apiPayloadData);
    } else {
      setError('confirmPassword', {
        type: 'manual',
        message: 'Passwords do not match.',
      });
    }
  };

  return (
    <div className="flex h-[92vh] w-screen ">
      <div className="w-[30vw]">
        <img
          src={signUpBg}
          alt="High Tech Image"
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>

      <div className="w-[70vw] flex items-center justify-center bg-gradient-to-r from-black to-gray-800">
        <Card>
          <div className="mb-5 float-left text-left">
            <div className="mb-5">
              <h2 className="text-2xl font-semibold">Sign Up</h2>
              <span className="text-white pr-2">Already have an account?</span>
              <Link
                to={'/login'}
                className="text-blue-600 hover:text-blue-500 hover:cursor-pointer"
              >
                Sign In
              </Link>
            </div>

            <div className="mb-4">
              <label htmlFor="name" className="text-sm text-gray-400">
                Name:
              </label>
              <input
                type="text"
                id="name"
                className="w-full py-2 px-3 mt-1 bg-gray-700 text-white rounded-md active:bg-inherit focus:outline-none focus:border-blue-500"
                {...register('name', {
                  required: 'This field is required!',
                })}
              />
              {errors.name && (
                <p className="text-red-500 text-sm">{(errors.name as FieldError).message}</p>
              )}
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

            <div className="mb-6">
              <label htmlFor="confirmPassword" className="text-sm text-gray-400">
                Confirm Password:
              </label>
              <input
                type="password"
                id="confirmPassword"
                className="w-full py-2 px-3 mt-1 bg-gray-700 text-white rounded-md focus:outline-none focus:border-blue-500"
                {...register('confirmPassword', {
                  required: 'This field is required !',
                  validate: (value) => value === confirmPwd || 'Passwords do not match.', // Add validation
                })}
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm">
                  {(errors.confirmPassword as FieldError).message}
                </p>
              )}
            </div>

            <button
              onClick={handleSubmit(onHandleSignUp)}
              className="w-full bg-blue-500 text-white px-4 py-2 rounded-md focus:outline-none hover:bg-blue-600"
            >
              Sign Up
            </button>
          </div>
          <button
            onClick={() => alert('Signup with google')}
            className="flex items-center justify-center text-white mt-5 rounded-md focus:outline-none"
          >
            <img src={googleLogo} alt="Google Logo" className="h-5 w-5 mr-2" />
            Sign Up with Google
          </button>
        </Card>
      </div>
    </div>
  );
}

export default SignUp;
