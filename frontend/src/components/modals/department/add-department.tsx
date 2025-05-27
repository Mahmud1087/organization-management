import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useModalContext } from '@/store/context';
import { ADD_DEPARTMENT_MODAL } from '../modal-names';
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
import { departmentFormSchema } from '@/lib/form-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import type { z } from 'zod';
import { Building2 } from 'lucide-react';

const AddDepartment = () => {
  const { modalState, closeModal } = useModalContext();

  const form = useForm<z.infer<typeof departmentFormSchema>>({
    resolver: zodResolver(departmentFormSchema),
    defaultValues: {
      name: '',
    },
  });

  function onSubmit(values: z.infer<typeof departmentFormSchema>) {
    console.log(values);
  }

  return (
    <Dialog open={modalState[ADD_DEPARTMENT_MODAL]}>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader className='border-b pb-2'>
          <DialogTitle className='flex items-center gap-2'>
            <Building2 />
            <p>Add Department</p>
          </DialogTitle>
        </DialogHeader>

        <div className='mt-1.5'>
          <Form {...form}>
            <form
              id='add-dept'
              onSubmit={form.handleSubmit(onSubmit)}
              className='space-y-6'
            >
              <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Department Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='e.g. Quality Assurance'
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
        </div>
        <DialogFooter className='pt-5 border-t'>
          <Button
            variant={'outline'}
            onClick={() => {
              form.reset();
              closeModal(ADD_DEPARTMENT_MODAL);
            }}
          >
            Cancel
          </Button>
          <Button form='add-dept' className=''>
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
export default AddDepartment;
