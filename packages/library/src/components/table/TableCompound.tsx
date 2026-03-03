import { cn } from "@ui/utils/cn";
import { HTMLAttributes, PropsWithChildren } from "react";

interface TableWrapperProps extends HTMLAttributes<HTMLDivElement> {
  tableWrapperClassName?: string;
  tableClassName?: string;
}

const TableWrapper = ({
  tableWrapperClassName,
  tableClassName,
  children,
  ...divProps
}: PropsWithChildren<TableWrapperProps>) => {
  return (
    <div
      data-slot="table-container"
      className={cn(
        "border-inz-line-container border-1 relative w-full overflow-x-auto rounded-sm bg-white",
        tableWrapperClassName
      )}
      {...divProps}
    >
      <table data-slot="table" className={cn("w-full", tableClassName)}>
        {children}
      </table>
    </div>
  );
};

const TableHeader = ({
  className,
  children,
  ...props
}: PropsWithChildren<{ className?: string }>) => {
  return (
    <thead
      data-slot="table-header"
      className={cn(
        "body3 border-inz-line-container text-inz-text-helper border-b",
        className
      )}
      {...props}
    >
      {children}
    </thead>
  );
};

const TableBody = ({
  className,
  children,
}: PropsWithChildren<{ className?: string }>) => {
  return (
    <tbody
      data-slot="table-body"
      className={cn("body4 text-inz-greyscale-10", className)}
    >
      {children}
    </tbody>
  );
};

const TableFooter = ({
  className,
  children,
}: PropsWithChildren<{ className?: string }>) => {
  return (
    <tfoot data-slot="table-footer" className={className}>
      {children}
    </tfoot>
  );
};

type TableRowProps = HTMLAttributes<HTMLTableRowElement> & {
  className?: string;
};

const TableRow = ({
  className,
  children,
  ...props
}: PropsWithChildren<TableRowProps>) => {
  return (
    <tr
      data-slot="table-row"
      className={cn(
        "border-inz-line-table [tbody_&]:hover:bg-inz-primary-95 border-b last:border-b-0",
        className
      )}
      {...props}
    >
      {children}
    </tr>
  );
};

const TableHead = ({
  className,
  children,
}: PropsWithChildren<{ className?: string }>) => {
  return (
    <th
      data-slot="table-head"
      className={cn(
        "text-foreground h-10 whitespace-nowrap px-4 py-3 text-left align-middle",
        className
      )}
    >
      {children}
    </th>
  );
};

const TableCell = ({
  className,
  children,
}: PropsWithChildren<{ className?: string }>) => {
  return (
    <td
      data-slot="table-cell"
      className={cn("whitespace-nowrap p-4 align-middle", className)}
    >
      {children}
    </td>
  );
};

const TableCaption = ({
  className,
  children,
}: PropsWithChildren<{ className?: string }>) => {
  return (
    <caption
      data-slot="table-caption"
      className={cn("mt-4 text-sm", className)}
    >
      {children}
    </caption>
  );
};

export {
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
  TableWrapper,
};
