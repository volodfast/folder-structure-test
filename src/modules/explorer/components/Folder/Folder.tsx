import { FC, useState } from "react";
import { useDrag, useDrop } from "react-dnd";
// components
import Icon from "src/modules/core/components/Icon";
import FileOption from "src/modules/explorer/components/FileOption";
// hooks
import { useExplorer } from "src/modules/explorer/explorer.context";
// utils
import { DnDTypes } from "src/modules/explorer/explorer.utils";
// interfaces
import { FolderProps } from "./Folder.interfaces";
import { IconType } from "src/modules/core/components/Icon/Icon.interfaces";

const Folder: FC<FolderProps> = (props) => {
  const { data, initialIsOpen = false } = props;

  const [isOpen, setIsOpen] = useState(initialIsOpen);

  const { checkIfCanMove, moveFileOption } = useExplorer();

  const [{ isDragging, monitorId }, drag] = useDrag(() => ({
    type: DnDTypes.FOLDER,
    item: { id: data.id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
      monitorId: monitor.getHandlerId() as string,
    }),
  }));

  const [{ isOver, canDrop }, drop] = useDrop<
    { id: string },
    unknown,
    { isOver: boolean; canDrop: boolean }
  >(() => ({
    accept: [DnDTypes.FILE, DnDTypes.FOLDER],
    drop: (item, monitor) => {
      const didDrop = monitor.didDrop();
      if (didDrop) {
        return;
      }

      moveFileOption(item.id, data.id);
    },
    canDrop: (item) => {
      return checkIfCanMove(item.id, data.id);
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver({ shallow: true }),
      canDrop: !!monitor.canDrop(),
    }),
  }));

  const iconType: IconType = isOpen ? "folderOpen" : "folder";

  return (
    <div
      ref={(node) => drag(drop(node))}
      style={{
        opacity: isDragging ? 0.5 : 1,
        color: isOver && canDrop ? "red" : "black",
      }}
      data-testid="folder-element"
      data-monitorid={monitorId}
    >
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
