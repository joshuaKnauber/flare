import { useEffect, useRef, useState } from "react";
import { invoke } from "@tauri-apps/api";
import { CodeBracketSquareIcon } from "@heroicons/react/24/solid";
import useConfig from "./hooks/useConfig";
import useGlobalShortcut from "./hooks/useGlobalShortcut";
import useGpt from "./hooks/useGpt";
import useFocused from "./hooks/useFocused";
import useAutocomplete from "./hooks/useAutocomplete";
import usePlaceholder from "./hooks/usePlaceholder";

function App() {
  useGlobalShortcut();

  const focused = useFocused();
  const { config, setOpenAiApiKey } = useConfig();
  const { processInput, processing } = useGpt();

  const placeholder = usePlaceholder(focused);

  const [value, setValue] = useState<string>("");
  const completion = useAutocomplete(value);
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

  const onInputKeyDown = (e: React.KeyboardEvent) => {
    if (e.code === "Tab") {
      e.preventDefault();
      setValue(completion);
    } else if (e.code === "Escape") {
      invoke("close_window");
    }
  };

  useEffect(() => {
    if (focused && inpRef.current) {
      inpRef.current.focus();
    }
  }, [focused]);

  return (
    <div
      className={`background flex relative rounded-xl flex-col w-full h-full overflow-hidden duration-100 transition-all origin-top-left ${
        focused ? "scale-100" : "scale-0"
      }`}
    >
      <form
        onSubmit={onSubmit}
        className="w-full h-11 relative items-center px-4 flex flex-row gap-2 border-b border-white border-opacity-10"
      >
        <span className="text-sm text-white text-opacity-40 h-full flex items-center leading-none absolute">
          {completion}
        </span>
        <input
          autoFocus
          ref={inpRef}
          className="focus:outline-none flex-grow bg-transparent text-sm placeholder:text-white placeholder:text-opacity-50 text-white h-full"
          value={value}
          disabled={processing}
          onKeyDown={onInputKeyDown}
          onBlur={() => inpRef.current?.focus()}
          onChange={(e) => setValue(e.target.value)}
          placeholder={
            config?.open_ai_key ? placeholder : "Enter your Open AI key..."
          }
        />
        <div className="w-6 h-6 flex items-center justify-center">
          <CodeBracketSquareIcon
            className={`w-6 h-6 fill-white opacity-50 ${
              processing ? "magic-shake" : ""
            }`}
          />
        </div>
      </form>
      <div className={`flex-grow p-4 origin-top delay-100 transition-all`}>
        {actionReturn && (
          <span className="text-sm text-white leading-none opacity-75 font-light">
            {actionReturn}
          </span>
        )}
      </div>
      <div className="h-4 border-t border-white border-opacity-10 flex flex-row px-4 gap-2 items-center justify-between"></div>
    </div>
  );
}

export default App;
