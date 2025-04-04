import React, { PropsWithChildren, ReactElement } from "react";

import styles from "./card-component.module.css";

type Props = PropsWithChildren;

export default function CardComponent({ children }: Props): ReactElement {
  return <div className={styles.card}>{children}</div>;
}
