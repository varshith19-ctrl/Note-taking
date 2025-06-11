import { Route, Routes } from "react-router-dom";

import CreatePage from "../pages/CreatePage";
import NoteDetailPage from "../pages/NotedetailPage";
import HomePage from "../pages/Homepage";

const App = () => {
  return (
    <div className="relative min-h-screen w-full bg-gradient-to-br from-base-100 via-base-200 to-base-300">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>
      <div className="relative z-10">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/create" element={<CreatePage />} />
          <Route path="/note/:id" element={<NoteDetailPage />} />
        </Routes>
      </div>
    </div>
  );
};
export default App;
