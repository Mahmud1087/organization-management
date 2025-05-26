import AuthContainer from '../miscelleneous/auth-container';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { loginFormSchema } from '@/lib/form-schema';
import { useState } from 'react';
import { EyeClosed, EyeIcon, LoaderIcon } from 'lucide-react';
import { FORGOT_PASSWORD } from '@/config/page-routes';
import { useLoginMutation } from '@/store/queries/auth';
import { useAuthContext } from '@/store/context';
import { toast } from 'sonner';

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuthContext();
  const { mutate: loginUser, isPending: loggingIn } = useLoginMutation({
    onSuccess: (data) => {
      login(data.data);
      form.reset();
      toast.success(data.message);
    },
  });
  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  function onSubmit(values: z.infer<typeof loginFormSchema>) {
    loginUser(values);
  }

  return (
    <AuthContainer
      heading='Welcome back!'
      title='Please sign in to your account'
    >
      <section className='w-full shadow-xl rounded-lg p-5 border lg:border-none lg:shadow-none'>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='e.g. johdoe@mail.com'
                      className='py-5'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <div className='relative'>
                    <FormControl>
                      <Input
                        type={showPassword ? 'text' : 'password'}
                        placeholder='Enter your password'
                        className='py-5'
                        {...field}
                      />
                    </FormControl>
                    <button
                      className='absolute top-1/2 right-3 -translate-y-1/2'
                      type='button'
                      onClick={() => setShowPassword((prev) => !prev)}
                    >
                      {!showPassword ? (
                        <EyeClosed className='size-4 lg:size-5' />
                      ) : (
                        <EyeIcon className='size-4 lg:size-5' />
                      )}
                    </button>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className='flex items-center justify-between'>
              <div className='flex items-center gap-2'>
                <input
                  type='checkbox'
                  id='remember-me'
                  className='w-4 h-4 text-blue-600 bg-primary border-primary rounded focus:ring-blue-500 focus:ring-2'
                />
                <label
                  htmlFor='remember-me'
                  className='text-sm font-medium text-gray-900 cursor-pointer'
                >
                  Remember me
                </label>
              </div>
              <a
                href={FORGOT_PASSWORD}
                className='text-sm font-medium text-blue-600 hover:underline'
              >
                Forgot password?
              </a>
            </div>
            <div className='w-full flex items-center'>
              <Button size={'lg'} type='submit' className='w-full text-lg'>
                {loggingIn ? (
                  <span className='flex items-center justify-center'>
                    <LoaderIcon className='animate-spin' />
                    <span className='ml-2'>Logging in...</span>
                  </span>
                ) : (
                  'Login'
                )}
              </Button>
            </div>
          </form>
        </Form>
      </section>
    </AuthContainer>
  );
};
export default SignIn;
