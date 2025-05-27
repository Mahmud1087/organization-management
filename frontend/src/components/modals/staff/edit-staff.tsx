import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useModalContext } from '@/store/context';
import { EDIT_STAFF_MODAL } from '../modal-names';
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
import { useForm } from 'react-hook-form';
import { addStaffFormSchema } from '@/lib/form-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import type { z } from 'zod';
import { ROLES } from '@/config/constants';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useStaffData } from '@/data/staff-data';

const EditStaff = () => {
  const { rowId, modalState, closeModal } = useModalContext();
  const { staffData } = useStaffData();
  const staff = staffData.find((staff) => staff.id === rowId);

  const form = useForm<z.infer<typeof addStaffFormSchema>>({
    resolver: zodResolver(addStaffFormSchema),
    defaultValues: {
      firstName: staff?.fullName.split(' ')[0] || '',
      lastName: staff?.fullName.split(' ')[1] || '',
      email: staff?.email || '',
      phoneNumber: staff?.phoneNumber || '',
      address: staff?.address || '',
      role: staff?.role || ROLES.Employee,
      departmentName: staff?.dept || '',
    },
  });

  function onSubmit(values: z.infer<typeof addStaffFormSchema>) {
    console.log(values);
  }

  return (
    <Dialog open={modalState[EDIT_STAFF_MODAL]}>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader className='border-b pb-2'>
          <DialogTitle>Add Staff</DialogTitle>
          <DialogDescription>
            Fill in the details to add a new staff.
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className='mt-1.5 h-[15rem]'>
          <Form {...form}>
            <form
              id='add-staff'
              onSubmit={form.handleSubmit(onSubmit)}
              className='space-y-6'
            >
              <FormField
                control={form.control}
                name='firstName'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Firstname</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='e.g. John'
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
                name='lastName'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Lastname</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='e.g. Doe'
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
                name='phoneNumber'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>

                    <FormControl>
                      <Input
                        placeholder='+2348012345678 or 08012345678'
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
                name='role'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Role</FormLabel>

                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl className='w-full'>
                          <SelectTrigger>
                            <SelectValue placeholder='Select role' />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value='manager'>
                            {ROLES.Manager}
                          </SelectItem>
                          <SelectItem value='employee'>
                            {ROLES.Employee}
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='departmentName'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Department</FormLabel>

                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl className='w-full'>
                          <SelectTrigger>
                            <SelectValue placeholder='Select department' />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value='frontend'>Frontend</SelectItem>
                          <SelectItem value='ui/ux'>UI/UX</SelectItem>
                          <SelectItem value='backend'>Backend</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='address'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address</FormLabel>

                    <FormControl>
                      <Input
                        placeholder='e.g. 123 Main St, City, Country'
                        className='py-5'
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </ScrollArea>
        <DialogFooter className='pt-5 border-t'>
          <Button
            variant={'outline'}
            onClick={() => closeModal(EDIT_STAFF_MODAL)}
          >
            Cancel
          </Button>
          <Button form='add-staff' className=''>
            Add Staff
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
export default EditStaff;
