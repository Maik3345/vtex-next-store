"use client";

import { Prisma } from "@prisma/client";
import dynamic from "next/dynamic";
import React from "react";

export const RenderManager = ({
  content,
}: {
  content: {
    id: string;
    section: string;
    props: Prisma.JsonValue;
    createdAt: Date | null;
  }[];
}) => {
  return content.map((item, index) => {
    const { section, props } = item;
    const Component = dynamic(() =>
      import(`@/components`).then((m: any) => m[section])
    );
    return (
      <React.Suspense
        key={`component-${index}-${section}`}
        fallback={<div>Loading...</div>}
      >
        <Component {...(props as any)} />
      </React.Suspense>
    );
  });
};
