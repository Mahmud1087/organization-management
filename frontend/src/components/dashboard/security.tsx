import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { z } from 'zod';
import { securityFormSchema } from '@/lib/form-schema';
import { Button } from '../ui/button';

const Security = () => {
  const form = useForm<z.infer<typeof securityFormSchema>>({
    resolver: zodResolver(securityFormSchema),
    defaultValues: {
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  });

  function onSubmit(values: z.infer<typeof securityFormSchema>) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form
        id='profile-form'
        onSubmit={form.handleSubmit(onSubmit)}
        className='space-y-6 grid gap-x-6 gap-y-2 md:w-1/2'
      >
        <FormField
          control={form.control}
          name='oldPassword'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Old Password</FormLabel>
              <FormControl>
                <Input placeholder='' className='py-5' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='newPassword'
          render={({ field }) => (
            <FormItem>
              <FormLabel>New Password</FormLabel>
              <FormControl>
                <Input placeholder='' className='py-5' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='confirmPassword'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <Input placeholder='' className='py-5' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
      <div className='w-1/2 flex justify-end mt-6'>
        <Button type='submit' form='profile-form' onClick={() => {}}>
          Save Changes
        </Button>
      </div>
    </Form>
  );
};
export default Security;
