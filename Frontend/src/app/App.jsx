import "./App.css"
import {Editor} from "@monaco-editor/react"
function App() {

  return (
    <main className="h-screen w-full bg-gray-950 flex gap-4 p-4">
        <aside className="h-full w-1/4 bg-amber-50 rounded-lg"></aside>
        <section className="w-3/4 bg-neutral-800 rounded-lg overflow-hidden">
            <Editor
                height="100%"
                defaultLanguage="javascript"
                defaultValue="// Write your code here"
                theme="vs-dark"
            />
        </section>
    </main>
  )
}

export default App
