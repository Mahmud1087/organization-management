/* eslint-disable @typescript-eslint/no-explicit-any */
import { ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons';
import { type Table } from '@tanstack/react-table';
import { Button, Flex } from 'antd';

type Props = {
  table: Table<any>;
};

export const NextPage = ({ table }: Props) => {
  return (
    <Button
      className='py-1 px-4 flex items-center gap-3 shadow bg-transparent disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:text-color-grey disabled:bg-slate-100'
      disabled={!table.getCanNextPage()}
      onClick={() => table.nextPage()}
    >
      <p className='text-sm'>Next</p>
      <p>
        <ArrowRightOutlined className='text-sm' />
      </p>
    </Button>
  );
};

export const PrevPage = ({ table }: Props) => {
  return (
    <Button
      className='py-1 px-4 flex items-center gap-3 shadow bg-transparent disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:text-color-grey disabled:bg-slate-100'
      disabled={!table.getCanPreviousPage()}
      onClick={() => table.previousPage()}
    >
      <p>
        <ArrowLeftOutlined className='text-sm' />
      </p>
      <p className='text-sm'>Previous</p>
    </Button>
  );
};

export const PaginationButtons = ({ table }: Props) => {
  return (
    <>
      <div className='px-6 flex items-center gap-2 text-gray-border-color w-full justify-between'>
        <PrevPage table={table} />
        <Flex gap={5}>
          {table.getPageOptions().map((opt) => {
            return (
              <button
                key={opt}
                onClick={() => table.setPageIndex(opt)}
                className={`h-8 w-8 rounded-full border-none flex items-center justify-center text-xs cursor-pointer font-inter hover:text-white hover:bg-light-green-bg transition-all  ${
                  table.getState().pagination.pageIndex + 1 === opt + 1
                    ? 'text-green-primary bg-primary shadow border-green-primary text-white font-semibold'
                    : 'bg-transparent text-color-grey'
                }`}
              >
                {opt + 1}
              </button>
            );
          })}
        </Flex>
        <NextPage table={table} />
      </div>
    </>
  );
};
