import { useModalStoreSetup, useStoreContext } from "@/shared";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";

export const StoreSetupModal = () => {
  const { storeName, isOpen, onOpenChange } = useStoreContext();

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      placement="top-center"
      backdrop="blur"
      isDismissable={storeName ? true : false}
      hideCloseButton={storeName ? false : true}
      isKeyboardDismissDisabled={storeName ? true : false}
    >
      <ModalContent>
        {(onClose) => {
          const { isEnabled, store, setStoreName, handlerSaveStore } =
            useModalStoreSetup({
              onClose,
            });

          return (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Configure the store name to use
              </ModalHeader>
              <ModalBody>
                <Input
                  onChange={(e) => setStoreName(e.target.value)}
                  autoFocus
                  defaultValue={store ? store : undefined}
                  label="store name"
                  placeholder="Enter your store name"
                  variant="bordered"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handlerSaveStore();
                  }}
                />
              </ModalBody>
              <ModalFooter>
                {storeName && (
                  <Button color="danger" variant="flat" onPress={onClose}>
                    Close
                  </Button>
                )}
                <Button
                  color={!isEnabled ? "primary" : "default"}
                  disabled={isEnabled}
                  onPress={handlerSaveStore}
                >
                  Use this store
                </Button>
              </ModalFooter>
            </>
          );
        }}
      </ModalContent>
    </Modal>
  );
};
