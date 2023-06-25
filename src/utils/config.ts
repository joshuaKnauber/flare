import { FlareConfig } from "@/types";
import * as constants from "@/constants";
import {
  createDir,
  exists,
  readTextFile,
  writeTextFile,
} from "@tauri-apps/api/fs";
import { appDataDir, dirname, join } from "@tauri-apps/api/path";

export const configPaths = async () => {
  const dataDir = await join(
    await dirname(await appDataDir()),
    constants.DATA_DIR_NAME
  );
  const configPath = await join(dataDir, constants.CONFIG_FILE_NAME);
  const functionsPath = await join(dataDir, constants.FUNCTIONS_DIR_NAME);
  return {
    dataDir,
    configPath,
    functionsPath,
  };
};

const initConfig = async () => {
  const { dataDir, configPath, functionsPath } = await configPaths();

  if (!(await exists(dataDir))) {
    await createDir(dataDir);
  }
  if (!(await exists(configPath))) {
    const emptyData: FlareConfig = {
      open_ai_key: "",
      shortcut: "CommandOrControl+Shift+Space",
      model: "gpt-3.5-turbo-0613",
      functions: [],
    };
    await writeTextFile(configPath, JSON.stringify(emptyData, null, 2));
  }
  if (!(await exists(functionsPath))) {
    await createDir(functionsPath);
  }
};

export const getConfig = async () => {
  const { configPath } = await configPaths();
  initConfig();

  const config = await readTextFile(configPath);
  return JSON.parse(config) as FlareConfig;
};

export const setConfigValue = async (key: keyof FlareConfig, value: any) => {
  const { configPath } = await configPaths();
  initConfig();

  const config = await getConfig();
  config[key] = value;
  await writeTextFile(configPath, JSON.stringify(config, null, 2));
};

export const getFunctionPath = async (relPath: string) => {
  const { functionsPath } = await configPaths();
  return join(functionsPath, relPath);
};
