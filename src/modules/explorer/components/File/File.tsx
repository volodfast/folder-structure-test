import { FC } from "react";
// components
import Icon from "src/modules/core/components/Icon";
// interfaces
import { FileProps } from "./File.interfaces";

const File: FC<FileProps> = (props) => {
  const { data } = props;

  return (
    <div>
      <span>
        <Icon type="file" />
      </span>
      <span> {data.name}</span>
    </div>
  );
};

export default File;
