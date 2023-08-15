import * as DialogRadix from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
// Components
import { Content, FloatingButtonContainer, Overlay } from "./styles";
import { DialogOverlay, DialogTitle } from "@radix-ui/react-dialog";

export interface DialogProps {
  show: boolean;
  title?: string;
  titleProps?: React.ComponentProps<typeof DialogTitle>;
  contentProps?: React.ComponentProps<typeof Content>;
  overlayProps?: React.ComponentProps<typeof DialogOverlay>;
  onClose?: () => void;
  children?: React.ReactNode;
  showCloseButton?: boolean;
}

export const Dialog = ({
  show,
  title,
  titleProps,
  contentProps,
  overlayProps,
  onClose,
  children,
  showCloseButton = true,
}: DialogProps) => {
  return (
    <DialogRadix.Root open={show}>
      <DialogRadix.Portal>
        <Overlay {...overlayProps}/>
        <Content {...contentProps}>
          {title && <DialogTitle {...titleProps}>{title}</DialogTitle>}
          {showCloseButton && (
            <DialogRadix.Close asChild>
              <FloatingButtonContainer>
                <button onClick={onClose} style={{ cursor: "pointer" }}>
                  <Cross2Icon width="18px" height="18px" />
                </button>
              </FloatingButtonContainer>
            </DialogRadix.Close>
          )}
          {children}
        </Content>
      </DialogRadix.Portal>
    </DialogRadix.Root>
  );
};
