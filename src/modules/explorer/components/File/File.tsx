import React, { FC } from "react";
// interfaces
import { FileProps } from "./File.interfaces";

const File: FC<FileProps> = (props) => {
  const { data } = props;

  return <div>{data.name}</div>;
};

export default File;
