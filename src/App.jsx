import { AuthProvider } from "./context/auth";
import { ChatProvider } from "./context/chat";
import AppRoutes from "./routes/AppRoutes";
import 'moment-timezone'

function App() {
  return (
    <>
      <AuthProvider>
        <ChatProvider>
          <AppRoutes />
        </ChatProvider>
      </AuthProvider>
    </>
  );
}

export default App;
