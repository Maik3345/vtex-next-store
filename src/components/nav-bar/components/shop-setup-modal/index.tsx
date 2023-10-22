"use client";

import { useShopSetupModal, useShopStore } from "@/shared";
import {
  Button,
  Chip,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import styles from "./index.module.css";

export const ShopSetupModal = () => {
  const { shopName, disclosure } = useShopStore();
  const { isOpen, onClose, onOpenChange } = disclosure ?? {};
  const { isEnabled, shop, handlerSetShop, handlerSaveShop } =
    useShopSetupModal();

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      onClose={onClose}
      placement="top-center"
      backdrop="blur"
      isDismissable={shopName ? true : false}
      hideCloseButton={shopName ? false : true}
      isKeyboardDismissDisabled={shopName ? false : true}
      closeButton={
        <Chip size="sm" radius="sm" classNames={{ base: styles.chipEsc }}>
          ESC
        </Chip>
      }
    >
      <ModalContent>
        {(onClose) => {
          return (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Configure account name to use
              </ModalHeader>
              <ModalBody>
                <Input
                  onChange={(e) => handlerSetShop(e.target.value)}
                  autoFocus
                  defaultValue={shop ? shop : undefined}
                  label="shop name"
                  placeholder="Enter your account name"
                  variant="bordered"
                  onKeyDown={(e) => {
                    if (e.key === "Escape" && shopName) onClose();
                    if (e.key === "Enter") handlerSaveShop();
                  }}
                />
              </ModalBody>
              <ModalFooter>
                {shopName && (
                  <Button color="danger" variant="flat" onPress={onClose}>
                    Close
                  </Button>
                )}
                <Button
                  color={!isEnabled ? "primary" : "default"}
                  disabled={isEnabled}
                  onPress={handlerSaveShop}
                >
                  Use this account
                </Button>
              </ModalFooter>
            </>
          );
        }}
      </ModalContent>
    </Modal>
  );
};
