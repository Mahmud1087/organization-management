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
import { profileFormSchema } from '@/lib/form-schema';
import { Button } from '../ui/button';
import { useState } from 'react';
import { useAuthContext } from '@/store/context';
import { Textarea } from '../ui/textarea';

const Profile = () => {
  const [isDisabled, setIsDisabled] = useState(true);
  const { data: user } = useAuthContext();

  const form = useForm<z.infer<typeof profileFormSchema>>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      firstName: user?.firstName,
      lastName: user?.lastName,
      email: user?.email,
      phoneNumber: '',
      address: '',
    },
  });

  function onSubmit(values: z.infer<typeof profileFormSchema>) {
    console.log(values);
    setIsDisabled(true);
  }

  return (
    <Form {...form}>
      <form
        id='profile-form'
        onSubmit={form.handleSubmit(onSubmit)}
        className='space-y-6 flex flex-col gap-x-6 gap-y-2 md:grid md:grid-cols-2 relative lg:pr-8'
      >
        <Button
          className='absolute -top-14 right-0 bg-black text-white hover:bg-black/55 hover:text-white lg:-top-20'
          variant={'outline'}
          type='button'
          onClick={() => setIsDisabled(false)}
        >
          Edit Profile
        </Button>

        <FormField
          control={form.control}
          disabled={isDisabled}
          name='firstName'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Firstname</FormLabel>
              <FormControl>
                <Input placeholder='e.g. John' className='py-5' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='lastName'
          disabled={isDisabled}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Lastname</FormLabel>
              <FormControl>
                <Input placeholder='e.g. Doe' className='py-5' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='email'
          disabled
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
          name='phoneNumber'
          disabled={isDisabled}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Number</FormLabel>

              <FormControl>
                <Input placeholder='08012345678' className='py-5' {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='address'
          disabled={isDisabled}
          render={({ field }) => (
            <FormItem className='col-span-2'>
              <FormLabel>Address</FormLabel>

              <FormControl>
                <Textarea
                  placeholder='e.g. 123 Main St, City, Country'
                  className=''
                  style={{
                    resize: 'none',
                  }}
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
      </form>
      <div className='w-full flex justify-end mt-6 px-8'>
        <Button type='submit' form='profile-form'>
          Save Changes
        </Button>
      </div>
    </Form>
  );
};
export default Profile;
