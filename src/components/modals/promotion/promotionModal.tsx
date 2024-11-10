import ModalComponent from "@/components/share/modal/modal";
import { ProMotionModalProps } from "./promotionModal.types";
import { PROMOTION_MODAL_STATE, initialValues } from "./promotionModal.utils";
import styles from "./promotionModal.module.css";
import { Formik, FormikProps } from "formik";

import { CreatePromotionFormKeysProps } from "../from/createPromotion.from.types";
import CreatPromotionFrom from "../from/createPromotion.from";
import { validationSchema } from "./promotion.validation";
import { usePromotionModal } from "./promotionModal.hooks";
const PromotionModal = ({
  isModalOpen,
  closeModal,
  status,
  name,
  promotion,
}: ProMotionModalProps) => {
  const {
    promotionInitialValues,
    handleAddPromotion,
    handleDelete,
    handleEdit,
  } = usePromotionModal({ promotion }, { closeModal });
  switch (status) {
    case PROMOTION_MODAL_STATE.CREATE:
      return (
        <ModalComponent
          isOpen={isModalOpen}
          closeModal={closeModal}
          maxWidth={412}
        >
          <Formik
            enableReinitialize
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleAddPromotion}
          >
            {(props: FormikProps<CreatePromotionFormKeysProps>) => {
              return (
                <CreatPromotionFrom
                  {...props}
                  closeModal={closeModal}
                  edit={false}
                />
              );
            }}
          </Formik>
        </ModalComponent>
      );
    case PROMOTION_MODAL_STATE.EDIT:
      return (
        <ModalComponent
          isOpen={isModalOpen}
          closeModal={closeModal}
          maxWidth={412}
        >
          <Formik
            enableReinitialize
            initialValues={promotionInitialValues}
            validationSchema={validationSchema}
            onSubmit={handleEdit}
          >
            {(props: FormikProps<CreatePromotionFormKeysProps>) => {
              return (
                <CreatPromotionFrom {...props} closeModal={closeModal} edit />
              );
            }}
          </Formik>
        </ModalComponent>
      );
    case PROMOTION_MODAL_STATE.DELETE:
      return (
        <ModalComponent
          isOpen={isModalOpen}
          closeModal={closeModal}
          maxWidth={412}
        >
          <div className={styles.container}>
            <h1>ลบแพ็คเกจ</h1>
            <p>
              ต้องการลบแพ็คเกจ
              <br />
              {name} หรือไม่
            </p>
            <div>
              <button
                type="button"
                className={styles.buttonSubmit}
                onClick={handleDelete}
              >
                ตกลง
              </button>
              <button
                type="button"
                className={styles.buttonClose}
                onClick={closeModal}
              >
                ยกเลิก
              </button>
            </div>
          </div>
        </ModalComponent>
      );
  }
};
export default PromotionModal;
