import { useConfigStore } from "../store/config";

export function DisplaConf() {
  const { config, saveConfig } = useConfigStore((state) => state);

  const handleClear = () => saveConfig({ endpoint: null, origin: false });

  return (
    <div>
      <h2 className="text-4xl font-bold text-primary transition-all duration-200 hover:text-blue-600 transform-gpu hover:animate-pulse origin-top">
        Current Config
      </h2>
      <div>
        <pre className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" >{JSON.stringify({ config }, null, 2)}</pre>
        <button
          onClick={handleClear}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline "
        >
          Clear
        </button>
      </div>
    </div>
  );
}
