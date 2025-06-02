/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  flexRender,
  getCoreRowModel,
  type Row,
  useReactTable,
  getPaginationRowModel,
} from '@tanstack/react-table';

import { useVirtualizer } from '@tanstack/react-virtual';
import { useMemo, useRef } from 'react';
// import { TColumn, any } from '../../../types/table-types';
import { PaginationButtons } from './pagination';
import useNavigation from '../../../hooks/use-navigate';

type TableProps = {
  t_data: any;
  columns: any;
  paginate?: boolean;
  tableHeaderClass?: string;
  tableCellClass?: string;
  pagesize?: number;
  hasModal?: boolean;
  hasLink?: boolean;
  link?: string;
  setRowId?: (id: number) => void;
  showModal?: () => void;
};

const Table = ({
  columns,
  t_data,
  paginate,
  tableHeaderClass,
  tableCellClass,
  pagesize,
  link,
  hasLink,
  hasModal,
  setRowId,
  showModal,
}: TableProps) => {
  const data = useMemo(() => t_data, [t_data]);
  const cols = useMemo(() => columns, [columns]);

  const table = useReactTable({
    data,
    columns: cols,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize: pagesize || 5,
      },
    },
  });
  const { rows } = table.getRowModel();
  const { navigate } = useNavigation();

  const visibleColumns = table.getVisibleLeafColumns();
  const tableContainerRef = useRef<HTMLDivElement>(null);

  const columnVirtualizer = useVirtualizer({
    count: visibleColumns.length,
    estimateSize: (index) => visibleColumns[index].getSize(),
    getScrollElement: () => tableContainerRef.current,
    horizontal: true,
    overscan: 6,
  });

  const rowVirtualizer = useVirtualizer({
    count: rows.length,
    estimateSize: () => 33,
    getScrollElement: () => tableContainerRef.current,
    measureElement:
      typeof window !== 'undefined' &&
      navigator.userAgent.indexOf('Firefox') === -1
        ? (element) => element?.getBoundingClientRect().height
        : undefined,
    overscan: 6,
  });

  const virtualColumns = columnVirtualizer.getVirtualItems();
  const virtualRows = rowVirtualizer.getVirtualItems();

  let virtualPaddingLeft: number | undefined;
  let virtualPaddingRight: number | undefined;

  if (columnVirtualizer && virtualColumns?.length) {
    virtualPaddingLeft = virtualColumns[0]?.start ?? 0;
    virtualPaddingRight =
      columnVirtualizer.getTotalSize() -
      (virtualColumns[virtualColumns.length - 1]?.end ?? 0);
  }

  return (
    <div
      ref={tableContainerRef}
      style={{
        overflow: 'auto',
        position: 'relative',
        height: '100%',
      }}
    >
      <table className='w-full' style={{ display: 'grid' }}>
        <thead
          style={{
            display: 'grid',
            position: 'sticky',
            top: 0,
            zIndex: 1,
          }}
          className={`py-3 w-full border-y ${tableHeaderClass}`}
        >
          {table.getHeaderGroups().map((headerGroup) => (
            <tr
              key={headerGroup.id}
              className='w-full flex justify-between items-center lg:overflow-hidden'
            >
              {virtualPaddingLeft ? (
                <th style={{ display: 'flex', width: virtualPaddingLeft }} />
              ) : null}
              {virtualColumns.map((vc) => {
                const header = headerGroup.headers[vc.index];
                return (
                  <th
                    key={header.id}
                    style={{
                      display: 'flex',
                      width: header.getSize(),
                    }}
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </th>
                );
              })}
              {virtualPaddingRight ? (
                <th style={{ display: 'flex', width: virtualPaddingRight }} />
              ) : null}
            </tr>
          ))}
        </thead>
        {data.length === 0 ? (
          <tbody className='w-full flex justify-center items-center h-32 text-gray-500 text-xl italic'>
            <tr>
              <td colSpan={visibleColumns.length}>No data available.</td>
            </tr>
          </tbody>
        ) : (
          <tbody
            style={{
              display: 'grid',
              height: `${rowVirtualizer.getTotalSize()}px`,
              position: 'relative',
            }}
          >
            {virtualRows.map((virtualRow) => {
              const row = rows[virtualRow.index] as Row<any>;
              const visibleCells = row.getVisibleCells();

              return (
                <tr
                  data-index={virtualRow.index}
                  ref={(node) => rowVirtualizer.measureElement(node)}
                  key={row.id}
                  style={{
                    display: 'flex',
                    position: 'absolute',
                    transform: `translateY(${virtualRow.start}px)`,
                    width: '100%',
                    borderBottom: '1px solid hsla(150, 13%, 91%, 1)',
                  }}
                  className={`flex items-center justify-between ${tableCellClass}`}
                  onClick={() => {
                    if (setRowId) {
                      setRowId(row.getValue('id'));
                    }
                    if (hasModal && showModal) {
                      showModal();
                    } else if (hasLink) {
                      navigate(link as string);
                    }
                  }}
                >
                  {virtualPaddingLeft ? (
                    <td
                      style={{ display: 'flex', width: virtualPaddingLeft }}
                    />
                  ) : null}
                  {virtualColumns.map((vc) => {
                    const cell = visibleCells[vc.index];
                    return (
                      <td
                        key={cell.id}
                        style={{
                          display: 'flex',
                          width: cell.column.getSize(),
                        }}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    );
                  })}
                  {virtualPaddingRight ? (
                    <td
                      style={{ display: 'flex', width: virtualPaddingRight }}
                    />
                  ) : null}
                </tr>
              );
            })}
          </tbody>
        )}
      </table>
      {paginate && data.length !== 0 && (
        <div className='flex flex-col w-full gap-4 items-start mt-6 px-5 lg:items-center lg:px-0 lg:gap-9 lg:flex-row lg:justify-between'>
          {/* <p className='text-black/85 text-[15px]'>
            Total {table.getPageCount()} pages
          </p> */}

          <PaginationButtons table={table} />
        </div>
      )}
    </div>
  );
};
export default Table;
