import { useSnippetStore } from "../store/snippetsStore";
import { twMerge } from "tailwind-merge";
import { readTextFile, removeFile } from "@tauri-apps/api/fs";
import { desktopDir, join } from "@tauri-apps/api/path";
import { toast } from "react-hot-toast";
import { FiTrash, FiX } from "react-icons/Fi";

interface Props {
  snippetName: string;
}

function SnippetItem({ snippetName }: Props) {
  const setSelectedSnippet = useSnippetStore(
    (state) => state.setSelectedSnippet
  );
  const removeSnippetName = useSnippetStore((state) => state.removeSnippetName);
  const selectedSnippet = useSnippetStore((state) => state.selectedSnippet);
  const handleDelete = async (snippetName: string) => {
    const accept = await window.confirm(
      "Are you sure you want to delete this snippet?"
    );
    if (!accept) return;
    //Esto quita el archivo
    const desktopPath = await desktopDir();
    const filePath = await join(desktopPath, "tauriFile", `${snippetName}.js`);
    removeFile(filePath);
    //Esto lo quita de la interface
    removeSnippetName(snippetName);
    toast.error(`${snippetName} Deleted`, {
      position: "top-right",
    });
  };
  return (
    <div
      className={twMerge(
        "py-2 px-4 hover:bg-sky-300 hover:cursor-pointer flex justify-between",
        selectedSnippet?.name === snippetName ? "bg-sky-500" : ""
      )}
      onClick={async () => {
        const desktopPath = await desktopDir();
        const filePath = await join(
          desktopPath,
          "tauriFile",
          `${snippetName}.js`
        );
        const snippet = await readTextFile(filePath);
        setSelectedSnippet({ name: snippetName, code: snippet });
      }}
    >
      <h1>{snippetName}</h1>
      {selectedSnippet?.name == snippetName && (
        <div className="flex gap-3 item-center justify-center">
        <FiTrash
          className="text-neutral-400"
          onClick={(e) => {
            e.stopPropagation();
            handleDelete(snippetName);
          }}
        />
        <FiX
        className="text-neutral-400"
          onClick={(e) => {
            e.stopPropagation();
            setSelectedSnippet(null);
          }}
        />
      </div>
      )}
    </div>
  );
}

export default SnippetItem;
