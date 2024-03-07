import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ApiTester } from "./components/ApiTester";
import { useSetConfig } from "./hooks/useSetConfig";

const queryClient = new QueryClient();

function App() {
  const {canRender} = useSetConfig();
  return (
    <QueryClientProvider client={queryClient}>
      {canRender && <ApiTester />}
    </QueryClientProvider>
  );
}

export default App;
