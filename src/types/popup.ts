export interface PopUpProps {
  message: string;
  onOk: () => void;
  onCancel?: () => void;
}