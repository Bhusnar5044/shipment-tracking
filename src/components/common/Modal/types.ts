export type ModalProps = {
  children: React.ReactNode;
  footer?: React.ReactNode;
  title?: string;
  subtitle?: string;
  show: boolean;
  titleClassName?: string;
  headerWrapperClassName?: string;
  childClassName?: string;
  toggleClose: () => void;
  modalClass?: string;
  showCloseMark?: boolean;
  contentFullScreen?: boolean;
  alignment?: 'bottom' | 'center';
  closeMarkClassName?: string;
  isBottomSheet?: boolean;
  styleForMenu?: boolean;
  disableHeaderBorder?: boolean;
};
