export interface ResultCardPageProps {
    onClickPreviousPage: () => void;
    onClickNextPage: () => void;
    onChange: ({ name, value }: { name: string; value: number }) => void;
    onBlur: (value: number) => void;
    page: number;
    totalPage: number;
    totalCount: number;
    perPage: number;
  }
  