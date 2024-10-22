import "./App.css";
import { ThemeProvider } from "./context/theme-provider";
import Root from "./routes/root";

// interface AppProps {
//   children: React.ReactNode;
// }

function App() {

  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Root/>
      </ThemeProvider>
    </>
  );
}

export default App;
