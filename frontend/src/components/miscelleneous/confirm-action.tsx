import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Loader } from 'lucide-react';
import { useState, type Dispatch, type SetStateAction } from 'react';

interface Props {
  openDialog: boolean;
  title: string;
  desc: string;
  setOpenDialog: Dispatch<SetStateAction<boolean>>;
  action: () => void;
  variant?:
    | 'default'
    | 'link'
    | 'destructive'
    | 'outline'
    | 'secondary'
    | 'ghost'
    | null
    | undefined;
  btnText?: string;
}

export function ConfirmAction({
  openDialog,
  title,
  desc,
  setOpenDialog,
  action,
  variant = 'default',
  btnText = 'Confirm',
}: Props) {
  const [loading, setLoading] = useState(false);

  const confirm = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      action();
    }, 3000);
  };

  return (
    <Dialog open={openDialog}>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{desc}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            disabled={loading}
            variant={'secondary'}
            onClick={() => setOpenDialog(false)}
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
