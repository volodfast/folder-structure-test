import {
  createContext,
  FC,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { ExplorerApi } from "./explorer.api";
import { IFolder } from "./explorer.interfaces";
import { ExplorerService } from "./explorer.service";

type IExplorerContext = {
  folder: IFolder | null;
  isLoading: boolean;
  service: ExplorerService | null;
  error: string | null;
  moveFileOption: (id: string, idTo: string) => void;
};

const ExplorerContext = createContext<IExplorerContext>({
  folder: null,
  isLoading: false,
  service: null,
  error: null,
  moveFileOption: () => {},
});

export const ExplorerContextProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [folder, setFolder] = useState<null | IFolder>(null);
  const [service, setService] = useState<null | ExplorerService>(null);

  const moveFileOption = useCallback(
    (idToMove: string, idTo: string) => {
      if (!service) {
        return;
      }

      const newFolder = service.moveOption(idToMove, idTo);

      setFolder(newFolder);

      console.log(newFolder);
    },
    [setFolder, service]
  );

  useEffect(() => {
    async function fetchRootFolder() {
      try {
        setIsLoading(true);
        const explorerService = new ExplorerService(new ExplorerApi());

        const folderData = await explorerService.fetchRoot();

        setIsLoading(false);
        setFolder({ ...folderData });
        setService(explorerService);
      } catch (err) {
        setError(String(err));
        setIsLoading(false);
      }
    }

    fetchRootFolder();
  }, [setIsLoading, setError, setFolder]);

  return (
    <ExplorerContext.Provider
      value={{
        isLoading,
        service,
        folder,
        error,
        moveFileOption,
      }}
    >
      {children}
    </ExplorerContext.Provider>
  );
};

export const useExplorer = () => {
  const context = useContext(ExplorerContext);

  return context;
};
