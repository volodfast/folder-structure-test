import { FC, useState } from "react";
// components
import Icon from "src/modules/core/components/Icon";
import FileOption from "src/modules/explorer/components/FileOption";
// interfaces
import { FolderProps } from "./Folder.interfaces";
import { IconType } from "src/modules/core/components/Icon/Icon.interfaces";

const Folder: FC<FolderProps> = (props) => {
  const { data, initialIsOpen = false } = props;

  const [isOpen, setIsOpen] = useState(initialIsOpen);

  const iconType: IconType = isOpen ? "folderOpen" : "folder";

  return (
    <div>
      <div onClick={() => setIsOpen((prevIsOpen) => !prevIsOpen)}>
        <span>
          <Icon type={iconType} />
        </span>
        <span> {data.name}</span>
      </div>
      <div style={{ paddingLeft: 20 }}>
        {isOpen &&
          data.data.map((fileOption) => (
            <FileOption key={fileOption.id} option={fileOption} />
          ))}
      </div>
    </div>
  );
};

export default Folder;
