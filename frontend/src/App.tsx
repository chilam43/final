import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./mainPage";
import { Selectroom } from "./Page/selectroomPage";
import { UnprotectedPage } from "./Page/unprotectedPage";
import { SetRoomContent } from "./Page/setRoomContentPage";


export default function App() {
  return (
    <>

      <Routes>
        <Route index element={<MainPage />} />
        <Route path="/selectroom" element={<Selectroom />} />
        <Route path="/unprotectPage" element={<UnprotectedPage />} />
        <Route path="/setroomdetail" element={<SetRoomContent />} />
      </Routes>

    </>
  );
}



