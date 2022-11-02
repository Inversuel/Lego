import axios from "axios";
import {
  createContext,
  FC,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { legoTypeApi } from "../client/getLegos.type";
import { getOptionsToChoose } from "../hooks/getRandomLego";

export type LegoContextType = {
  legoData: legoTypeApi[] | null;
  firstLego: legoTypeApi | undefined;
  secondLego: legoTypeApi | undefined;
  thirdLego: legoTypeApi | undefined;
};

export const LegoContext = createContext<LegoContextType | null>(null);

const LegoProvider: FC<{ children: ReactNode }> = (props) => {
  const [legoData, setLegoData] = useState([]);
  const [firstId, secondId, thirdId] = getOptionsToChoose();

  const data = async () =>
    await axios
      .get("https://rebrickable.com/api/v3/lego/minifigs/?page_size=1000", {
        headers: {
          Authorization: `key ${process.env.REACT_APP_API_KEY}`,
        },
      })
      .then((res) => res.data.results);
  useEffect(() => {
    data().then((res) => setLegoData(res));
    return () => {
      setLegoData([]);
    };
  }, []);

  const firstLego: legoTypeApi | undefined = legoData?.find(
    (lego: legoTypeApi) => lego.set_num === `fig-${firstId}`
  );
  const secondLego: legoTypeApi | undefined = legoData?.find(
    (lego: legoTypeApi) => lego.set_num === `fig-${secondId}`
  );
  const thirdLego: legoTypeApi | undefined = legoData?.find(
    (lego: legoTypeApi) => lego.set_num === `fig-${thirdId}`
  );

  // return {
  //   firstLego,
  //   secondLego,
  //   thirdLego,
  // };

  return (
    <LegoContext.Provider
      value={{ legoData, firstLego, secondLego, thirdLego }}
    >
      {props.children}
    </LegoContext.Provider>
  );
};

export const useLego = () => useContext(LegoContext) as LegoContextType;

export default LegoProvider;
