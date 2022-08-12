import "./App.css";
import Login from "./components/pages/Login/Login";
import Home from "./components/pages/Home/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PlayLists from "./components/pages/PlayLists/PlayLists";
import Artists from "./components/pages/Artists/Artists";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="playlists" element={<PlayLists />} />
        <Route path="artists" element={<Artists />} />
      </Routes>
    </BrowserRouter>
  );
}
