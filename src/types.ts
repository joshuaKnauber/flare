export type FlareFunction = {
  enabled: boolean;
  path: string;
  name: string;
  description: string;
  parameters: { [key: string]: any };
};

export type FlareConfig = {
  open_ai_key: string;
  model: string;
  shortcut: string;
  functions: FlareFunction[];
};
