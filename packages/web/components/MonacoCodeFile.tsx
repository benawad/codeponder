import dynamic from "next/dynamic"
import { useState } from "react"
import MonacoEditor from "react-monaco-editor"
import { filenameToLang } from "../utils/filenameToLang"

const MyMonacoEditor = dynamic(import("react-monaco-editor") as any, {
  ssr: false,
}) as typeof MonacoEditor

interface Props {
  code: string | null
  username: string
  branch: string
  path?: string
  repo: string
}

export const MonacoCodeFile: React.SFC<Props> = ({ code, path }) => {
  const [codeValue] = useState(code)
  const lang = filenameToLang(path || "")

  return (
    <MyMonacoEditor
      width="800"
      height="600"
      language={lang}
      theme="vs-dark"
      value={codeValue}
      options={{
        selectOnLineNumbers: true,
        readOnly: true,
      }}
      editorWillMount={monaco => {
        monaco.languages.typescript.javascriptDefaults.setCompilerOptions({
          jsx: 2,
        })
      }}
    />
  )
}
