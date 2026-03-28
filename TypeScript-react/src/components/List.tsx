import React from "react";
import Card from "./Card";
import type { ListProps } from "../types";

export default function List({ items }: ListProps) {
  return (
    <div>
      {items.map((item) => (
        <Card
          key={item.name}
          name={item.name}
          price={item.price}
          isSpecial={item.isSpecial}
        />
      ))}
    </div>
  );
}
