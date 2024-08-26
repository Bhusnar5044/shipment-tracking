"use client";
import { useOutsideClickNotifier } from "@/hooks/useOutsideClickNotifier";
import { cn } from "@/utils";
import { FC, memo } from "react";
import Icon from "../Icon";
import { ModalProps } from "./types";

const _alignmentStyles: Record<NonNullable<ModalProps["alignment"]>, string> = {
  bottom: "bottom-0",
  center: "top-1/2 -translate-y-2/4",
};

const Modal: FC<ModalProps> = memo(
  ({
    children,
    footer,
    modalClass,
    title,
    subtitle,
    childClassName,
    titleClassName,
    headerWrapperClassName,
    show,
    toggleClose,
    showCloseMark,
    closeMarkClassName,
    contentFullScreen,
    alignment = "center",
    isBottomSheet,
    styleForMenu,
    disableHeaderBorder,
  }) => {
    const ref = useOutsideClickNotifier(toggleClose, show);
    return (
      <div className={cn("absolute bottom-0 left-0 right-0 top-0", { hidden: !show })}>
        <div className="fixed inset-0 z-30 h-screen w-screen bg-black bg-opacity-30 " />
        <div
          className={cn(
            "fixed z-30 rounded bg-white p-3 shadow-default",
            isBottomSheet ? "" : "left-1/2 -translate-x-2/4 transform transition-opacity",
            { "left-0 right-0": isBottomSheet && styleForMenu },
            contentFullScreen ? "inset-0 h-screen w-screen" : _alignmentStyles[alignment],
            modalClass
          )}
          ref={ref}
        >
          {(showCloseMark || !!title || !!subtitle) && (
            <div className={cn("mb-3", { "border-b border-gray-30 p-3": !disableHeaderBorder }, headerWrapperClassName)}>
              {showCloseMark && (
                <Icon
                  iconName="close"
                  className={cn("float-right cursor-pointer font-bold", closeMarkClassName ?? "h-6 text-gray-400")}
                  onClick={toggleClose}
                />
              )}
              <h6 className={cn("mb-1", titleClassName)}>{title}</h6>
              {!!subtitle && <p className={cn("body-3 mb-3 text-gray-60")}>{subtitle}</p>}
            </div>
          )}
          <div className={childClassName}>{children}</div>
          {footer && <div className="flex items-center justify-center border-t border-gray-30 pt-5">{footer}</div>}
        </div>
      </div>
    );
  }
);

Modal.displayName = "Modal";
export default Modal;