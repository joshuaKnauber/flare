import { useEffect, useRef, useState } from "react";
import { invoke } from "@tauri-apps/api";
import useConfig from "./hooks/useConfig";
import useGlobalShortcut from "./hooks/useGlobalShortcut";
import useGpt from "./hooks/useGpt";
import useFocused from "./hooks/useFocused";

function App() {
  useGlobalShortcut();

  const focused = useFocused();
  const { functions, config, setOpenAiApiKey } = useConfig();
  const { processInput, processing } = useGpt();

  const [value, setValue] = useState<string>("");
  const [actionReturn, setActionReturn] = useState<string | null>(null);

  const inpRef = useRef<HTMLInputElement>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!value) return;

    if (!config?.open_ai_key) {
      setOpenAiApiKey(value);
      setValue("");
    } else {
      const res = await processInput(value);
      setActionReturn(res);
      setValue("");
    }
  };

  const onBackgroundClick = () => {
    // invoke("close_window");
  };

  useEffect(() => {
    if (focused && inpRef.current) {
      inpRef.current.focus();
    }
  }, [focused]);

  return (
    <div
      className={`flex relative flex-row gap-4 w-full h-full overflow-hidden duration-100 transition-all origin-top-left ${
        focused ? "scale-100" : "scale-0"
      }`}
      onClick={onBackgroundClick}
    >
      {processing && (
        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-white leading-none opacity-50 font-light z-10">
          Running...
        </span>
      )}
      <form onSubmit={onSubmit} className="w-full h-full">
        <input
          autoFocus
          ref={inpRef}
          className="focus:outline-none bg-bg-500 rounded-lg text-sm text-white h-full w-full px-3"
          value={value}
          disabled={processing}
          onChange={(e) => setValue(e.target.value)}
          placeholder={
            config?.open_ai_key
              ? "Type a magical command..."
              : "Enter your Open AI key..."
          }
        />
      </form>
    </div>
  );
}

export default App;
