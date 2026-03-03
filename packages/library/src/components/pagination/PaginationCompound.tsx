import ChevronLeftIcon from "@ui/icons/ChevronLeftIcon";
import ChevronRightIcon from "@ui/icons/ChevronRightIcon";
import { cn } from "@ui/utils/cn";

const Pagination = ({ className, ...props }: React.ComponentProps<"nav">) => {
  return (
    <nav
      role="navigation"
      aria-label="pagination"
      data-slot="pagination"
      className={cn("flex justify-end", className)}
      {...props}
    />
  );
};

const PaginationContent = ({
  className,
  ...props
}: React.ComponentProps<"ul">) => {
  return (
    <ul
      data-slot="pagination-content"
      className={cn("flex flex-row items-center gap-1", className)}
      {...props}
    />
  );
};

const PaginationItem = ({ ...props }: React.ComponentProps<"li">) => {
  return <li data-slot="pagination-item" {...props} />;
};

type PaginationLinkProps = {
  isSelected?: boolean;
} & React.ComponentProps<"button">;

const PaginationBtn = ({ isSelected, ...props }: PaginationLinkProps) => {
  return (
    <button
      type="button"
      aria-current={isSelected ? "page" : undefined}
      data-slot="pagination-link"
      data-active={isSelected}
      className={cn(
        "body4 border-line border-inz-line-border hover:border-inz-primary-50 border-1 flex size-8 cursor-pointer items-center justify-center rounded-sm",
        isSelected
          ? "bg-inz-primary-50 text-white"
          : "text-inz-coolgrey-20 bg-white"
      )}
      {...props}
    />
  );
};

const PaginationPrevious = ({
  ...props
}: React.ComponentProps<typeof PaginationBtn>) => {
  return (
    <PaginationBtn
      aria-label="Go to previous page"
      className="body4 border-line border-inz-line-border hover:bg-inz-greyscale-90 border-1 flex size-8 cursor-pointer items-center justify-center rounded-sm bg-white disabled:cursor-not-allowed"
      {...props}
    >
      <ChevronLeftIcon
        size={16}
        color={props.disabled ? "#aeb4b7" : "#576375"}
      />
    </PaginationBtn>
  );
};

const PaginationNext = ({
  ...props
}: React.ComponentProps<typeof PaginationBtn>) => {
  return (
    <PaginationBtn
      aria-label="Go to next page"
      className="body4 border-line border-inz-line-border hover:bg-inz-greyscale-90 border-1 flex size-8 cursor-pointer items-center justify-center rounded-sm bg-white disabled:cursor-not-allowed"
      {...props}
    >
      <ChevronRightIcon
        size={16}
        color={props.disabled ? "#aeb4b7" : "#576375"}
      />
    </PaginationBtn>
  );
};

export {
  Pagination,
  PaginationBtn,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
};
