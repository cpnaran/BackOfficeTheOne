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
import ManagementFrom from "./management.from";

const ManagementContainer: React.FC = () => {
  return (
    <div className={styles.wrapper}>
      <h1>จัดการผู้ใช้งาน</h1>
      <div className={styles.search}>
        <Formik
          enableReinitialize
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={() => {}}
        >
          {(props: FormikProps<ManagementFormKeysProps>) => {
            return <ManagementFrom {...props} />;
          }}
        </Formik>
      </div>
    </div>
  );
};

export default ManagementContainer;
