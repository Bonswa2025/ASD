// src/App.jsx
import { useState } from "react";
import Medewerkers from "./pages/Medewerkers";

export default function App() {
  const [screen, setScreen] = useState("home");

  return (
    <div className="min-h-screen">
      <header className="p-4 border-b flex items-center gap-4">
        <button onClick={() => setScreen("home")} className="underline">
          Home
        </button>
        <button onClick={() => setScreen("medewerkers")} className="underline">
          Medewerkers
        </button>
      </header>

      <main>
        {screen === "home" && <Home />}
        {screen === "medewerkers" && <Medewerkers />}
      </main>
    </div>
  );
}

function Home() {
  return <div className="p-4">Home</div>;
}
