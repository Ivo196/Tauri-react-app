import { writeTextFile } from "@tauri-apps/api/fs";
import { desktopDir } from "@tauri-apps/api/path";
import { useState } from "react";
import { useSnippetStore } from "../store/snippetsStore";
import { toast } from "react-hot-toast";

function SnippetForm() {
  const [SnippetName, setSnippetName] = useState("");
  const addSnippetStore = useSnippetStore((state) => state.addSnippetName);
  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        // alert('Saved')
        const desktopPath = await desktopDir();
        console.log(desktopPath);
        await writeTextFile(`${desktopPath}/tauriFile/${SnippetName}.js`, "");
        setSnippetName("");
        addSnippetStore(SnippetName);
        toast.success(`Snippet ${SnippetName} Created`, {
          position: "top-right",
        });
      }}
    >
      <input
        type="text"
        placeholder="Write a Snippet"
        className="bg-zinc-900 w-full border-none outline-none p-4 rounded-md"
        onChange={(e) => {
          setSnippetName(e.target.value);
          console.log(SnippetName);
        }}
        value={SnippetName}
      />
      <button className="hidden">Save</button>
    </form>
  );
}

export default SnippetForm;
