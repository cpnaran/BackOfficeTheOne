import LoadingScreen from "../loadingScreen/loading";
import PromotionModal from "../modals/promotion/promotionModal";
import DataTable from "../share/dataTable/dataTable";
import SvgIcon from "../share/svgIcon/svgIcon";
import { usePromotion } from "./promotion.hooks";
import styles from "./promotion.module.css";

const PromotionContainer = () => {
  const {
    columns,
    packageTableData,
    promotionName,
    isOpen,
    modalState,
    promotion,
    closeModal,
    openModal,
    createPromotion,
    loading,
  } = usePromotion();
  return (
    <div className={styles.wrapper}>
      <div className={styles.select_container}>
        <p>แพ็คเก็จทั้งหมด</p>
        <div
          onClick={() => {
            createPromotion();
          }}
        >
          <SvgIcon icon="plus" width={24} height={24} />
        </div>
      </div>
      <DataTable values={packageTableData} columns={columns} />

      {isOpen && (
        <PromotionModal
          isModalOpen={isOpen}
          closeModal={closeModal}
          status={modalState}
          onSubmit={() => {}}
          name={promotionName || ""}
          promotion={promotion}
        />
      )}
      {loading && <LoadingScreen />}
    </div>
  );
};

export default PromotionContainer;
