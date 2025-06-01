import { Dialog, DialogContent, DialogFooter } from '@/components/ui/dialog';
import { useModalContext } from '@/store/context';
import { REJECT_LEAVE_MODAL } from '../modal-names';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { rejectLeaveFormSchema } from '@/lib/form-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import type { z } from 'zod';
import { Textarea } from '@/components/ui/textarea';

const RejectLeaveModal = () => {
  const { modalState, closeModal } = useModalContext();

  const form = useForm<z.infer<typeof rejectLeaveFormSchema>>({
    resolver: zodResolver(rejectLeaveFormSchema),
    defaultValues: {
      reason: '',
    },
  });

  function onSubmit(values: z.infer<typeof rejectLeaveFormSchema>) {
    console.log(values);
  }

  return (
    <Dialog open={modalState[REJECT_LEAVE_MODAL]}>
      <DialogContent className='sm:max-w-[425px]'>
        <div className='mt-1.5'>
          <Form {...form}>
            <form
              id='reject-leave'
              onSubmit={form.handleSubmit(onSubmit)}
              className='space-y-6'
            >
              <FormField
                control={form.control}
                name='reason'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Reason for rejection</FormLabel>
                    <FormControl>
                      <Textarea
                        style={{ resize: 'none' }}
                        // placeholder='reason for rejecting the leave request'
                        className=''
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
            onClick={() => {
              form.reset();
              closeModal(REJECT_LEAVE_MODAL);
            }}
          >
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
export default RejectLeaveModal;
