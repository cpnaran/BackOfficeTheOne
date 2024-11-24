import { Form } from "formik";
import DataTable from "../share/dataTable/dataTable";
import PerPage from "../share/perpage/perPage";
import ResultCardPage from "../share/resultCardPage/resultCardPage";
import { useManagement } from "./management.hooks";
import Input from "../share/input/input";
import styles from "./management.from.module.css";
import { ManagementFormProps } from "./management.types";
import cx from "classnames";
import ManagementModal from "../modals/management/managementModal";
import LoadingScreen from "../loadingScreen/loading";
import { ManagementType } from "../modals/management/managementModal.types";

const ManagementFrom = ({ values, setFieldValue }: ManagementFormProps) => {
  const {
    onChangePage,
    handleOnBlurCardPage,
    handleChangePerPage,
    handleUpdatePromote,
    closeModal,
    handleSubmit,
    show,
    isModalOpen,
    columnValues,
    totalPages,
    totalCount,
    managementPackageTable,
    columns,
    loading,
    management,
    modifiedPromotionOptions,
  } = useManagement({
    values,
    setFieldValue,
  });

  return (
    <Form className={styles.container}>
      <Input
        type="string"
        name="licensePlate"
        placeholder="ค้นหา"
        className={styles.inputstyle}
        label={""}
      />
      <button
        className={styles.buttonSubmit}
        type="submit"
        onClick={() => {
          handleSubmit(values);
        }}
      >
        ค้นหา
      </button>
      {show && (
        <section className={styles.search}>
          {managementPackageTable && managementPackageTable.length > 0 ? (
            <div className={styles.content}>
              <div id="แถบตัวเลือก" className={styles.sorting}>
                <PerPage
                  perPage={values.perPage}
                  handleClick={(e) => {
                    handleChangePerPage(e);
                  }}
                />
              </div>
              <DataTable
                values={columnValues}
                columns={columns}
                columnPinning={{ left: [], right: ["action"] }}
              />
              <ResultCardPage
                onClickPreviousPage={() => onChangePage(values.page - 1)}
                onClickNextPage={() => onChangePage(values.page + 1)}
                onChange={({ name, value }) => setFieldValue(name, value)}
                onBlur={(page) => handleOnBlurCardPage(page)}
                page={values.page}
                totalPage={totalPages}
                totalCount={totalCount}
                perPage={values.perPage}
              />
            </div>
          ) : (
            <div className={cx(styles.content, styles.notFound)}>
              <p>ไม่พบข้อมูลที่ท่านกำลังค้นหา</p>
            </div>
          )}
        </section>
      )}
      :<></>
      {isModalOpen && (
        <ManagementModal
          isModalOpen={isModalOpen}
          closeModal={closeModal}
          onSubmit={handleUpdatePromote}
          management={management as ManagementType}
          option={modifiedPromotionOptions}
        />
      )}
      {loading && <LoadingScreen />}
    </Form>
  );
};
export default ManagementFrom;
