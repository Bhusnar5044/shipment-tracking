import { toast } from '@/components/common/Toast';
import { FC, memo, MouseEvent, ReactElement, useCallback, useMemo, useState } from 'react';
import Button from '../../Button';
import Icon from '../../Icon';
import TextField from '../../TextField';
import Typography from '../../Typography';
import { Props } from './types';

export const Pagination: FC<Props> = memo(({ table, onDownload, disableDownload, pageSize, totalCount, page, setQueryParams }) => {
  const [goto, setGoto] = useState<number>();

  const handlePageNextPrev = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
      const action = event.currentTarget.name;
      const newPage = action === 'prev' ? page - 1 : page + 1;
      setQueryParams({ page: newPage });
    },
    [page, setQueryParams]
  );
  const handlePageClick = useCallback((pageNum: number) => setQueryParams({ page: pageNum }), [setQueryParams]);

  const totalPages = useMemo(() => {
    table?.setPageCount?.(Math.ceil(totalCount / (pageSize ?? 10)));
    return Math.ceil(totalCount / (pageSize ?? 10));
  }, [pageSize, table, totalCount]);

  const handleGoto = useCallback(
    (page: string) => {
      const pageNum = +page;
      if (pageNum > 0 && pageNum <= totalPages) {
        setGoto(pageNum);
        setQueryParams({ page: pageNum });
        table.setPageIndex(pageNum - 1);
      } else {
        toast.error(`${page ? 'Page not found with number ' + page : 'Enter page number'}`);
      }
    },
    [setQueryParams, table, totalPages]
  );

  const maxPageButtons = 5; // Adjust this to control the number of page buttons shown
  const paginationButtons: ReactElement[] = useMemo(() => {
    const result = [];
    let startPage = Math.max(1, page - Math.floor(maxPageButtons / 2));
    const endPage = Math.min(totalPages, startPage + maxPageButtons - 1);

    if (endPage - startPage < maxPageButtons - 1) {
      startPage = Math.max(1, endPage - maxPageButtons + 1);
    }
    for (let pageNum = startPage; pageNum <= endPage; pageNum++) {
      result.push(
        <Button
          variant={pageNum === page ? 'solid' : 'outline'}
          className={`hidden lg:flex`}
          size="XS"
          key={pageNum}
          onClick={() => handlePageClick(pageNum)}
        >
          {pageNum}
        </Button>
      );
    }
    return result;
  }, [page, totalPages, handlePageClick]);

  const defaultPageSize = useMemo(() => {
    return table?.getState?.().pagination.pageSize > totalCount ? totalCount : table.getState().pagination.pageSize;
  }, [table, totalCount]);

  let toRange = (pageSize ?? defaultPageSize) * page;
  toRange = toRange > totalCount ? totalCount : toRange;
  const fromRange = (pageSize ?? defaultPageSize) * (page - 1) + (toRange ? 1 : 0);

  return (
    <>
      {!disableDownload && (
        <Button variant="outline" size="M" className="hidden lg:flex" onClick={onDownload}>
          <Icon iconName="download" /> Download Report
        </Button>
      )}
      <div className="flex w-full flex-col items-start gap-3 md:flex-row lg:w-auto lg:flex-row lg:items-center ">
        <Typography className="whitespace-nowrap" typoColor="grey">{`Showing data ${fromRange} to ${toRange} of ${
          totalCount ?? 0
        } entries`}</Typography>
        <div className="flex w-full justify-between">
          {!disableDownload && (
            <Button size="M" className="flex self-start lg:hidden" onClick={onDownload}>
              <Icon iconName="download" />
            </Button>
          )}
          <div className="flex gap-1 self-end">
            <Button variant="outline" size="XS" name="prev" onClick={handlePageNextPrev} disabled={page === 1}>
              <Icon iconName="chevron_left" />
            </Button>
            {paginationButtons?.map((item: ReactElement) => item)}
            <Button variant="outline" size="XS" name="next" onClick={handlePageNextPrev} disabled={page === totalPages || toRange === totalCount}>
              <Icon iconName="chevron_right" />
            </Button>
          </div>
        </div>
        <div className="hidden items-center gap-1 lg:flex">
          <Typography className="whitespace-nowrap" typoColor="grey">
            Go to
          </Typography>
          <TextField
            name="pageNumber"
            size="S"
            value={goto}
            handleOnEnter={handleGoto}
            enableOnEnter
            disableBottomMargin
            placeholder="Page No."
            maxWidth="3rem"
            minWidth="2rem"
            type="number"
          />
        </div>
      </div>
    </>
  );
});

Pagination.displayName = 'Pagination';
