import SvgIcon from "../svgIcon/svgIcon";
import styles from "./resultCardPage.module.css";


import { PAGE_FORMAT_REGEX } from "@/utils/regex";
import { ResultCardPageProps } from "./resultCardPage.types";

const ResultCardPage = ({
  onClickPreviousPage,
  onClickNextPage,
  onChange,
  onBlur,
  page,
  totalPage,
  totalCount,
  perPage,
}: ResultCardPageProps) => {
  return (
    <div className={styles.container}>
      <p>
        แสดง {1 + (page - 1) * perPage} ถึง{" "}
        {page * perPage > totalCount ? totalCount : page * perPage} รายการ จาก{" "}
        {totalCount} รายการ
      </p>
      <div className={styles.wrapper}>
        <p>หน้า</p>
        <input
          id="page"
          name="page"
          value={page}
          type="number"
          placeholder=""
          className={styles.page}
          onChange={(e) => {
            const value: string = e.target.value;
            if (PAGE_FORMAT_REGEX.test(value)) {
              const page: number = parseInt(value);
              if (page > totalPage) {
                onChange({
                  name: e.target.name,
                  value: totalPage,
                });
              } else {
                onChange({
                  name: e.target.name,
                  value: page,
                });
              }
            }
          }}
          onBlur={(e) => {
            const value: string = e.target.value;
            if (PAGE_FORMAT_REGEX.test(value)) {
              const page: number = parseInt(value);
              if (page > 0) {
                onBlur(page);
              } else {
                onChange({ name: e.target.name, value: 1 });
              }
            }
          }}
          disabled
        />
        <p>จาก {totalPage}</p>
        <div>
          <button
            type="button"
            className={styles.prev}
            onClick={onClickPreviousPage}
            disabled={page === 1}
          >
            <SvgIcon icon="resultPrev" width={24} height={22} />
          </button>
          <button
            type="button"
            className={styles.next}
            onClick={onClickNextPage}
            disabled={page >= totalPage}
          >
            <SvgIcon icon="resultNext" width={24} height={22} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResultCardPage;
