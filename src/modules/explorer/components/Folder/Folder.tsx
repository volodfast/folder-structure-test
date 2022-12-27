import { FC } from "react";
// components
import Icon from "src/modules/core/components/Icon";
import FileOption from "src/modules/explorer/components/FileOption";
// interfaces
import { FolderProps } from "./Folder.interfaces";

const Folder: FC<FolderProps> = (props) => {
  const { data } = props;

  return (
    <div>
      <div>
        <span>
          <Icon type="folder" />
        </span>
        <span> {data.name}</span>
      </div>
      {data.data.map((fileOption) => (
        <FileOption key={fileOption.id} option={fileOption} />
      ))}
    </div>
  );
};

export default Folder;
