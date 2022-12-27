import { FC } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// utils
import { getIconByType } from "./Icon.utils";
// interfaces
import { IconProps } from "./Icon.interfaces";

const Icon: FC<IconProps> = (props) => {
  const { type } = props;

  return (
    <span style={{ width: 20, height: 20, display: "inline-block" }}>
      <FontAwesomeIcon icon={getIconByType(type)} />
    </span>
  );
};

export default Icon;
