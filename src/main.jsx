// src/app.jsx
import { useState } from "react";
import Medewerkers from "./pages/medewerkers";

export default function App() {
  const [screen, setScreen] = useState("home");

  return (
    <div className="min-h-screen">
      <header className="p-4 border-b flex items-center gap-4">
        <button onClick={() => setScreen("home")} className="underline">
          home
        </button>
        <button onClick={() => setScreen("medewerkers")} className="underline">
          medewerkers
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
  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">home</h1>
      <p className="text-gray-600">basis werkt ✅</p>
    </div>
  );
}
