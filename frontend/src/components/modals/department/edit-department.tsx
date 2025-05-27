import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useModalContext } from '@/store/context';
import { EDIT_DEPARTMENT_MODAL } from '../modal-names';
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
import { zodResolver } from '@hookform/resolvers/zod';
import type { z } from 'zod';
import { useDepartmentData } from '@/data/department-data';
import { departmentFormSchema } from '@/lib/form-schema';

const EditDepartment = () => {
  const { rowId, modalState, closeModal } = useModalContext();
  const { departmentData } = useDepartmentData();
  const department = departmentData.find(
    (department) => department.id === rowId
  );

  const form = useForm<z.infer<typeof departmentFormSchema>>({
    resolver: zodResolver(departmentFormSchema),
    defaultValues: {
      name: department?.name || '',
    },
  });

  function onSubmit(values: z.infer<typeof departmentFormSchema>) {
    console.log(values);
  }

  return (
    <Dialog open={modalState[EDIT_DEPARTMENT_MODAL]}>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader className='mb-3.5 pb-3.5 border-b'>
          <DialogTitle>Edit Department</DialogTitle>
        </DialogHeader>

        <div className='mt-1.5'>
          <Form {...form}>
            <form
              id='edit-department'
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
        <DialogFooter className='pt-5'>
          <Button
            variant={'outline'}
            onClick={() => closeModal(EDIT_DEPARTMENT_MODAL)}
          >
            Cancel
          </Button>
          <Button form='edit-department' className=''>
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
export default EditDepartment;
