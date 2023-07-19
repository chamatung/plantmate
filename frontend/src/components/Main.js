import { Route, Routes } from "react-router";
import SampleHome from "./SampleHome";
import Community from "./community/Community";
import CommunityPostRegister from "./community/CommunityPostRegister";
import CommunityPostDetail from "./community/CommunityPostDetail";
import CommunityBookmark from "./community/CommunityBookmark";
import GrowthDiaryList from "./diary/GrowthDiaryList";
import MyPlantList from "./myplants/MyPlantList";

import MyPlantDetail from "./myplants/MyPlantDetail";
import { MyPlantStore } from "../context/MyPlantStore";
import SignUp from "../SignUp";
import LoginForm from "../LoginForm";
const Main = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<SampleHome />} />
        <Route path="/search" element={<SampleHome />} />
        <Route path="/community" element={<Community />} />
        <Route
          path="/community/post-register"
          element={<CommunityPostRegister />}
        />
        <Route
          path="/community/post-detail/:id"
          element={<CommunityPostDetail />}
        />
        <Route path="/community/bookmark" element={<CommunityBookmark />} />
        <Route
          path="/my-plants"
          element={
            <MyPlantStore>
              <MyPlantList />{" "}
            </MyPlantStore>
          }
        />
        <Route
          path="/my-plants/:id"
          element={
            <MyPlantStore>
              <MyPlantDetail />
            </MyPlantStore>
          }
        />
        <Route path="/growth-journal" element={<GrowthDiaryList />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/LoginForm" element={<LoginForm />} />
      </Routes>
    </>
  );
};

export default Main;
