import {
  Card,
  CardBody,
  RadioGroup,
  Radio,
  Button,
  Image,
} from "@nextui-org/react";
import React from "react";
import { shopCartStyles } from "./styles";
import { StarIcon } from "@/components";
import { ProductType } from "@/shared";
import NextImage from "next/image";

type Theme = "nextui" | "modern" | "elegant" | "retro";

export const CardItem = ({
  product: { items, productName },
}: {
  product: ProductType;
}) => {
  const image = items[0].images[0].imageUrl;
  const selectedTheme: Theme = "nextui";
  const itemSizes = ["xs", "s", "m", "l", "xl"];

  const slots = shopCartStyles({
    theme: selectedTheme as Theme,
  });

  return (
    <Card radius="lg">
      <CardBody className="relative flex-col md:flex-row md:items-center gap-4 md:gap-9 overflow-visible">
        <div>
          <Image
            removeWrapper
            alt="Shoes theme example"
            as={NextImage}
            height={300}
            width={300}
            src={image ?? ""}
          />
        </div>
        <div className={slots.contentWrapper()}>
          <div className="relative flex flex-wrap items-baseline">
            <h1 className={slots.title()}>{productName}</h1>
            <p className={slots.description()}>
              Consistent, customized fit, game-changing.
            </p>
            <p className={slots.price()}>$279.97</p>
            <p className={slots.previousPrice()}>$350</p>
            <p className={slots.percentOff()}>20% off</p>
          </div>
          <RadioGroup
            aria-label="select size"
            classNames={{
              base: "my-4",
            }}
            defaultValue="xs"
            orientation="horizontal"
          >
            {itemSizes.map((itemSize) => (
              <Radio
                key={itemSize}
                classNames={{
                  wrapper: "hidden",
                  labelWrapper: slots.sizeOption(),
                  label: slots.sizeOptionLabel(),
                }}
                value={itemSize}
              >
                {itemSize.toUpperCase()}
              </Radio>
            ))}
          </RadioGroup>
          <div className="flex space-x-4">
            <Button
              className={slots.buyButton()}
              color="primary"
              variant={selectedTheme === "nextui" ? "shadow" : "solid"}
            >
              Buy now
            </Button>
            <Button
              className={slots.addToBagButton()}
              color="primary"
              radius="full"
              variant="bordered"
            >
              Add to bag
            </Button>
          </div>
        </div>
        {/* <Button
          isIconOnly
          aria-label="like"
          className={slots.starButton()}
          data-liked={liked}
          radius="full"
          variant="light"
          onPress={() => setLiked((v: boolean) => !v)}
        >
          <StarIcon fill={liked ? "currentColor" : "none"} size={20} />
        </Button> */}
      </CardBody>
    </Card>
  );
};
