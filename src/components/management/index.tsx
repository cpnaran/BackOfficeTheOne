import { Form, Formik, FormikProps } from "formik";
import { validationSchema } from "../login/login.validation";
import Input from "../share/input/input";
import styles from "./management.module.css";
import { initialValues } from "./management.utils";
import { ManagementFormKeysProps } from "./management.types";
import cx from "classnames";
import PerPage from "../share/perpage/perPage";
import DataTable from "../share/dataTable/dataTable";
import ResultCardPage from "../share/resultCardPage/resultCardPage";
import { useManagement } from "./management.hooks";

const ManagementContainer = () => {
    const {
       
        onChangePage,
        handleOnBlurCardPage,
        handleChangePerPage,
        handleChangeOrder,
        isModalOpen,
        closeModal,
      } = useManagement({
        props.values,
        setFieldValue,
      });
  return (
    <div className={styles.wrapper}>
      <div className={styles.search}>
        <Formik
          enableReinitialize
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={() => {}}
        >
          {(props: FormikProps<ManagementFormKeysProps>) => {
            return (
              <Form className={styles.container}>
                <Input
                  type="string"
                  name="licensePlate"
                  placeholder="ค้นหา"
                  className={styles.inputstyle}
                  label={""}
                />
                <button className={styles.buttonSubmit} type="submit">
                  ค้นหา
                </button>
                <section className={styles.search}>
          {salesReport && salesReport && salesReport.length > 0 ? (
            <div className={styles.content}>
              <div id="แถบตัวเลือก" className={styles.sorting}>
                <PerPage
                  perPage={props.values.perPage}
                  handleClick={(e) => {
                    // handleChangePerPage(e);
                  }}
                />
              </div>
              <DataTable
                values={searchValues}
                columns={columns}
                columnPinning={{ left: [], right: ["action"] }}
              />
              <ResultCardPage
                onClickPreviousPage={() => onChangePage(props.values.page - 1)}
                onClickNextPage={() => onChangePage(props.values.page + 1)}
                onChange={({ name, value }) => props.setFieldValue(name, value)}
                onBlur={(page) => handleOnBlurCardPage(page)}
                page={props.values.page}
                totalPage={totalPages}
                totalCount={totalCount}
                perPage={props.values.perPage}
              />
            </div>
          ) : (
            <div className={cx(styles.content, styles.notFound)}>
              <p>ไม่พบข้อมูลที่ท่านกำลังค้นหา</p>
            </div>
          )}
        </section>
              </Form>
              
            );
          }}
        </Formik>
      </div>
    </div>
  );
};

export default ManagementContainer;
