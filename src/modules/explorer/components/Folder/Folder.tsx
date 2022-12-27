import React, { FC } from "react";
// components
import FileOption from "src/modules/explorer/components/FileOption";
// interfaces
import { FolderProps } from "./Folder.interfaces";

const Folder: FC<FolderProps> = (props) => {
  const { data } = props;

  return (
    <div>
      {data.data.map((fileOption) => (
        <FileOption key={fileOption.id} option={fileOption} />
      ))}
    </div>
  );
};

export default Folder;
