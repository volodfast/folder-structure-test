import {
  createContext,
  FC,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
// api
import { ExplorerApi } from "./explorer.api";
// services
import { ExplorerService } from "./explorer.service";
// interfaces
import { IFolder } from "./explorer.interfaces";

type IExplorerContext = {
  folder: IFolder | null;
  isLoading: boolean;
  error: string | null;
  checkIfCanMove: (id: string, idTo: string) => boolean;
  moveFileOption: (id: string, idTo: string) => void;
};

const ExplorerContext = createContext<IExplorerContext>({
  folder: null,
  isLoading: false,
  error: null,
  checkIfCanMove: () => false,
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
    },
    [setFolder, service]
  );

  const checkIfCanMove = useCallback(
    (id: string, idTo: string) => {
      return service!.checkIfCanMove(id, idTo);
    },
    [service]
  );

  useEffect(() => {
    async function fetchRootFolder() {
      try {
        setIsLoading(true);
        const explorerService = new ExplorerService(new ExplorerApi());

        const folderData = await explorerService.fetchRoot();

        setIsLoading(false);
        setFolder(folderData);
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
        folder,
        error,
        moveFileOption,
        checkIfCanMove,
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
