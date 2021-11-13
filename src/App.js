import Builder from "./components/Builder";
import { Header, LogoImage, AppContainer } from "./styles/styles";

function App() {
  return (
    <AppContainer>
      <Header>
        <LogoImage src="./logo.png" />
        <p>Design Studio</p>
      </Header>
      <Builder />
    </AppContainer>
  );
}

export default App;
