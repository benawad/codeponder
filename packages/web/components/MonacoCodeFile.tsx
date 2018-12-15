import dynamic from "next/dynamic"
import { useState } from "react"
import MonacoEditor from "react-monaco-editor"
import * as monacoEditorOrig from "monaco-editor/esm/vs/editor/editor.api"
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
      editorWillMount={(monaco: typeof monacoEditorOrig) => {
        /* 
        Taken from https://github.com/supnate/rekit/blob/master/packages/rekit-studio/src/features/editor/configMonaco.js
        and further references at https://microsoft.github.io/monaco-editor/playground.html#extending-language-services-configure-javascript-defaults
         */
        const compilerDefaults = {
          jsxFactory: "React.createElement",
          reactNamespace: "React",
          jsx: monaco.languages.typescript.JsxEmit.React,
          target: monaco.languages.typescript.ScriptTarget.ES2016,
          allowNonTsExtensions: true,
          moduleResolution:
            monaco.languages.typescript.ModuleResolutionKind.NodeJs,
          experimentalDecorators: true,
          noEmit: true,
          allowJs: true,
          typeRoots: ["node_modules/@types"],
        }
        monaco.languages.typescript.typescriptDefaults.setCompilerOptions(
          compilerDefaults
        )
        monaco.languages.typescript.javascriptDefaults.setCompilerOptions(
          compilerDefaults
        )
        monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions({
          noSemanticValidation: true,
          noSyntaxValidation: false,
        })
        monaco.languages.typescript.javascriptDefaults.setDiagnosticsOptions({
          noSemanticValidation: true,
          noSyntaxValidation: false,
        })
        monaco.Uri.parse("file:///main.tsx")
        /* monaco.languages.typescript.typescriptDefaults.setEagerModelSync(true)
        monaco.languages.typescript.javascriptDefaults.setEagerModelSync(true) */
      }}
    />
  )
}
