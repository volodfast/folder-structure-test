import { FC } from "react";
import { useDrag } from "react-dnd";
// components
import Icon from "src/modules/core/components/Icon";
// utils
import { DnDTypes } from "src/modules/explorer/explorer.utils";
// interfaces
import { FileProps } from "./File.interfaces";

const File: FC<FileProps> = (props) => {
  const { data } = props;

  const [{ isDragging, monitorId }, drag] = useDrag(() => ({
    type: DnDTypes.FILE,
    item: {
      id: data.id,
    },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
      monitorId: monitor.getHandlerId() as string,
    }),
  }));

  return (
    <div
      ref={drag}
      style={{ opacity: isDragging ? 0.5 : 1 }}
      data-testid="file-element"
      data-monitorid={monitorId}
    >
      <span>
        <Icon type="file" />
      </span>
      <span> {data.name}</span>
    </div>
  );
};

export default File;
