import ModalComponent from "@/components/share/modal/modal";
import { Form, Formik, FormikProps } from "formik";
import {
  ManagementFormKeysProps,
  ManagementModalProps,
} from "./managementModal.types";
import Input from "@/components/share/input/input";
import CustomsSelect from "@/components/share/customSelect.tsx/customSelect";
import styles from "./managementModal.module.css";
import { validationSchema } from "./management.validation";
import { values } from "lodash";
const ManagementModal = ({
  isModalOpen,
  closeModal,
  onSubmit,
  management,
  option,
}: ManagementModalProps) => {
  const initialValues: ManagementFormKeysProps = {
    name: management?.name || "", // กรณี management ไม่มีค่า ให้ default เป็น ""
    license: management?.license || "",
    package: "",
  };

  return (
    <ModalComponent isOpen={isModalOpen} closeModal={closeModal} maxWidth={412}>
      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={() => {}}
      >
        {(props: FormikProps<ManagementFormKeysProps>) => {
          return (
            <Form className={styles.container}>
              <h1>จัดการผูกสมาชิกกับแพ็คเกจรายปี</h1>
              <section>
                <Input
                  disabled={true}
                  label="ชื่อ-นามสกุล"
                  type="text"
                  id="name"
                  name="name"
                  placeholder="ชื่อ-นามสกุล"
                  className={styles.inputstyle}
                />

                <Input
                  disabled={true}
                  label="ทะเบียน"
                  type="text"
                  id="license"
                  name="license"
                  placeholder="ทะเบียน"
                  className={styles.inputstyle}
                />

                <CustomsSelect
                  label="แพ็คเกจรายปี"
                  name="package"
                  placeholder="เลือกแพ็คเกจ"
                  size="large"
                  options={option}
                  className={styles.inputstyle}
                />

                <div className={styles.button_div}>
                  <button
                    className={styles.buttonSubmit}
                    type="button"
                    onClick={() => {
                      onSubmit(management.id, props.values.package);
                    }}
                  >
                    ตกลง
                  </button>
                  <button
                    className={styles.buttonClose}
                    type="button"
                    onClick={closeModal}
                  >
                    ยกเลิก
                  </button>
                </div>
              </section>
            </Form>
          );
        }}
      </Formik>
    </ModalComponent>
  );
};

export default ManagementModal;
