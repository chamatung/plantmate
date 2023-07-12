import React, { useEffect, useReducer, useRef } from "react";

const reducer = (state, action) => {
  let newState = [];
  switch (action.type) {
    case "INIT": {
      return action.data;
    }
    case "CREATE": {
      newState = [action.data, ...state];
      break;
    }
    case "REMOVE": {
      newState = state.filter((it) => it.id !== action.targetId);
      break;
    }
    default:
      return state;
  }

  localStorage.setItem("myplant", JSON.stringify(newState));
  return newState;
};

const MyPlantStateContext = React.createContext();
const MyPlantDispatchContext = React.createContext();

const MyPlantStore = ({ children }) => {
  const [data, dispatch] = useReducer(reducer, []);

  useEffect(() => {
    const localData = localStorage.getItem("myplant");
    if (localData) {
      const myPlantList = JSON.parse(localData).sort(
        (a, b) => parseInt(b.id) - parseInt(a.id)
      );
      dataId.current = parseInt(myPlantList[0].id) + 1;

      dispatch({ type: "INIT", data: myPlantList });
    }
  }, []);

  const dataId = useRef(0);

  const onCreate = ({
    name,
    nickname,
    waterCycle,
    startDate,
    waterDate,
    memo,
  }) => {
    dispatch({
      type: "CREATE",
      data: {
        id: dataId.current,
        thumbnail: "https://source.unsplash.com/random/300x300/?plant",
        name: name,
        nickname: nickname,
        waterCycle: waterCycle,
        startDate: startDate,
        waterDate: waterDate,
        memo: memo,
      },
    });
    dataId.current += 1;
  };

  const onRemove = (targetId) => {
    dispatch({ type: "REMOVE", targetId });
  };

  return (
    <MyPlantStateContext.Provider value={data}>
      <MyPlantDispatchContext.Provider value={{ onCreate, onRemove }}>
        {children}
      </MyPlantDispatchContext.Provider>
    </MyPlantStateContext.Provider>
  );
};

export { MyPlantStateContext, MyPlantDispatchContext, MyPlantStore };
