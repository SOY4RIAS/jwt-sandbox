import { useCallback, useEffect } from "react";
import { useConfigStore } from "../store/config";

export function useSetConfig() {
  const { config, saveConfig } = useConfigStore((state) => state);

  const handleConfig = () => {
    if (!config.endpoint) {
      const origin = window.location.origin;
      const prompt = window.prompt("Please enter a endpoint")
      saveConfig({ endpoint: prompt || origin, origin: !prompt });
    }
  };

  useEffect(() => {
    console.log("config", config);
    handleConfig();
  }, [handleConfig]);

  return {canRender: !!config.endpoint,}
}
