import { useEffect, useState } from "react";
import CommunityListView from "./CommunityListView";
import apiService from "../../services/ApiService";

const CommunityBookmark = () => {
  const [bookmarkList, setBookmarkList] = useState([]);
  useEffect(() => {
    getBookmarkList();
  }, []);
  const getBookmarkList = () => {
    apiService.get("bookmark").then((res) => {
      console.log(res.data.list);
      setBookmarkList(res.data.list);
    });
  };
  return (
    <div>
      <CommunityListView
        communityPostList={bookmarkList}
        communityListCnt={bookmarkList.length}
      />
    </div>
  );
};
export default CommunityBookmark;
