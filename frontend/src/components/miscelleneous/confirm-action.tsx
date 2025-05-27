import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useModalContext } from '@/store/context';
import { Loader } from 'lucide-react';
import { useState } from 'react';
import { CONFIRM_ACTION__MODAL } from '../modals/modal-names';
import { toast } from 'sonner';

export function ConfirmAction() {
  const [loading, setLoading] = useState(false);
  const { confirmActionModalState, closeConfirmActionModal } =
    useModalContext();
  const modalData = confirmActionModalState[CONFIRM_ACTION__MODAL] || {};
  const { isOpen, payload } = modalData;
  const { desc, successText, title, action, btnText, variant } = payload || {};

  const confirm = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      action!();
      closeConfirmActionModal(CONFIRM_ACTION__MODAL);
      toast.success(successText || 'Action completed successfully!');
    }, 3000);
  };

  return (
    <Dialog open={isOpen}>
      <DialogContent className='sm:max-w-[425px] flex flex-col gap-7'>
        <DialogHeader className='flex flex-col gap-3.5'>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription className='text-base'>{desc}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            disabled={loading}
            variant={'outline'}
            onClick={() => closeConfirmActionModal(CONFIRM_ACTION__MODAL)}
          >
            Cancel
          </Button>
          <Button disabled={loading} variant={variant} onClick={confirm}>
            {loading ? <Loader className='animate-spin' /> : btnText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
