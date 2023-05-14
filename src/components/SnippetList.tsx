import { readDir } from "@tauri-apps/api/fs"
import { useEffect } from "react"
import { desktopDir } from "@tauri-apps/api/path"
import { useSnippetStore } from "../store/snippetsStore"
import SnippetItem from "./SnippetItem"

function SnippetList() {
  const setSnippetsNames = useSnippetStore(state => state.setSnippetsNames)
  const snippetNames = useSnippetStore(state => state.snippetsNames)
  useEffect(() => {
    async function  loadFiles() {
      const desktopPath = await desktopDir()
       const result = await readDir(`${desktopPath}/tauriFile`)
       const filenames = result.map(file => file.name!.split('.')[0])
       setSnippetsNames(filenames)
    }
    loadFiles()
  }, [])
  return (
    <div>
      {snippetNames.map(snippetName => (
        <SnippetItem snippetName={snippetName} key={snippetName}/>
      ))}
    </div>
  )
}

export default SnippetList