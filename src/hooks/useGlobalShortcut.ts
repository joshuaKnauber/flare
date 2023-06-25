import { register, unregister } from "@tauri-apps/api/globalShortcut";
import { invoke } from "@tauri-apps/api";
import { listen } from "@tauri-apps/api/event";
import { useEffect } from "react";
import useConfig from "./useConfig";

const useGlobalShortcut = () => {
  const { config } = useConfig();

  useEffect(() => {
    if (!config) return;
    try {
      register(config.shortcut, () => {
        invoke("show_window");
      });
    } catch (e) {
      console.error(e);
    }
    return () => {
      try {
        unregister(config.shortcut);
      } catch (e) {
        console.error(e);
      }
    };
  }, [config]);
};

export default useGlobalShortcut;
