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
import { orgSettingsFormSchema } from '@/lib/form-schema';
import { Button } from '../ui/button';
import { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger } from '../ui/select';
import { Textarea } from '../ui/textarea';

const OrgSettings = () => {
  const [isDisabled, setIsDisabled] = useState(true);

  const form = useForm<z.infer<typeof orgSettingsFormSchema>>({
    resolver: zodResolver(orgSettingsFormSchema),
    defaultValues: {
      orgName: '',
      sector: '',
      officeEmail: 'hacknest@gmail.com',
      phoneNumber: '',
      officeAddress: '',
    },
  });

  function onSubmit(values: z.infer<typeof orgSettingsFormSchema>) {
    console.log(values);
    setIsDisabled(true);
  }

  return (
    <Form {...form}>
      <form
        id='org-settings-form'
        onSubmit={form.handleSubmit(onSubmit)}
        className='space-y-6 flex flex-col gap-x-6 gap-y-2 md:grid md:grid-cols-2 relative pr-8'
      >
        <Button
          className='absolute -top-14 right-0 bg-black text-white hover:bg-black/55 hover:text-white lg:-top-20'
          variant={'outline'}
          type='button'
          onClick={() => setIsDisabled(false)}
        >
          Edit Details
        </Button>

        <FormField
          control={form.control}
          disabled={isDisabled}
          name='orgName'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Organization Name</FormLabel>
              <FormControl>
                <Input
                  placeholder='e.g. Hacknest'
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
          name='sector'
          disabled={isDisabled}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Sector</FormLabel>
              <FormControl>
                <Select {...field}>
                  <SelectTrigger className='w-full py-5'>Select</SelectTrigger>
                  <SelectContent>
                    <SelectItem value='IT'>Information Technology</SelectItem>
                    <SelectItem value='automotive'>Automotive</SelectItem>
                    <SelectItem value='engineering'>Engineering</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='officeEmail'
          disabled
          render={({ field }) => (
            <FormItem>
              <FormLabel>Office Email</FormLabel>
              <FormControl>
                <Input
                  placeholder='e.g. hacknest@mail.com'
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
              <FormLabel>Office Phone</FormLabel>

              <FormControl>
                <Input placeholder='08012345678' className='py-5' {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='officeAddress'
          disabled={isDisabled}
          render={({ field }) => (
            <FormItem className='col-span-2'>
              <FormLabel>Office Address</FormLabel>
              <FormControl>
                <Textarea
                  placeholder='e.g. 123 Main St, City, Country'
                  style={{
                    resize: 'none',
                  }}
                  className=''
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
      </form>
      <div className='w-full flex justify-end mt-6 px-8'>
        <Button type='submit' form='org-settings-form'>
          Save Changes
        </Button>
      </div>
    </Form>
  );
};
export default OrgSettings;
