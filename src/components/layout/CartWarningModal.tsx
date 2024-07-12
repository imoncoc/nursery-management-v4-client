import { Modal } from "antd";

interface CartWarningModalProps {
  visible: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

const CartWarningModal: React.FC<CartWarningModalProps> = ({
  visible,
  onConfirm,
  onCancel,
}) => {
  return (
    <Modal
      title="Cart Warning"
      visible={visible}
      onOk={onConfirm}
      onCancel={onCancel}
      okText="Leave"
      cancelText="Stay"
    >
      <p>
        You have items in your cart. Leaving this page will clear your cart.
      </p>
      <p>Are you sure you want to leave?</p>
    </Modal>
  );
};

export default CartWarningModal;
