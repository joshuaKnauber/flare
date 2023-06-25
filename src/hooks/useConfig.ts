import { FlareConfig } from "@/types";
import { getConfig, setConfigValue } from "@/utils/config";
import { listen } from "@tauri-apps/api/event";
import { useEffect, useMemo, useState } from "react";

const useConfig = () => {
  const [config, setConfig] = useState<FlareConfig>();

  const loadConfig = async () => {
    const config = await getConfig();
    setConfig(config);
  };

  const init = async () => {
    await loadConfig();
  };

  useEffect(() => {
    init();

    const unlisten = listen("focus_change", init);

    return () => {
      unlisten.then((f) => f());
    };
  }, []);

  const functions = useMemo(() => {
    return config?.functions.filter((func) => func.enabled) || [];
  }, [config]);

  const setOpenAiApiKey = async (key: string) => {
    await setConfigValue("open_ai_key", key);
    await loadConfig();
  };

  return {
    config,
    functions,
    setOpenAiApiKey,
  };
};

export default useConfig;
