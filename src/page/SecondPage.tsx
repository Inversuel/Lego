import React from "react";
import { useNavigate } from "react-router-dom";
import { useLego } from "../Context/Lego";

const SecondPage = () => {
  const { firstLego, secondLego, thirdLego } = useLego();

  const [isSelected, setIsSelected] = React.useState({
    first: false,
    second: false,
    third: false,
  });

  const navigate = useNavigate();

  const handleProceed = () => {
    if (isSelected.first) {
      navigate(`/third-page/${firstLego?.set_num}`);
    } else if (isSelected.second) {
      navigate(`/third-page/${secondLego?.set_num}`);
    } else if (isSelected.third) {
      navigate(`/third-page/${thirdLego?.set_num}`);
    }
  };
  const disabledProceed =
    !isSelected.first && !isSelected.second && !isSelected.third;

  return (
    <div className="xl:h-screen flex flex-col justify-center items-center align-middle">
      <h1 className="text-4xl font-[Modak] uppercase mb-10">
        choose your minifig
      </h1>

      <div className="flex gap-8 flex-col xl:flex-row">
        <Card
          active={isSelected.first}
          img={firstLego?.set_img_url}
          name={firstLego?.name}
          onClick={() =>
            setIsSelected({ first: true, second: false, third: false })
          }
          detailLink={firstLego?.set_url}
        />
        <Card
          active={isSelected.second}
          img={secondLego?.set_img_url}
          name={secondLego?.name}
          onClick={() =>
            setIsSelected({ first: false, second: true, third: false })
          }
          detailLink={secondLego?.set_url}
        />
        <Card
          active={isSelected.third}
          img={thirdLego?.set_img_url}
          name={thirdLego?.name}
          onClick={() =>
            setIsSelected({ first: false, second: false, third: true })
          }
          detailLink={thirdLego?.set_url}
        />
      </div>
      <button
        className={`relative uppercase rounded-full text-base bg-blue-500 py-4 px-10 font-bold shadow-lg mt-12 cursor-pointer 
            disabled:opacity-50 disabled:cursor-not-allowed
        `}
        disabled={disabledProceed}
        onClick={handleProceed}
      >
        proceed to shipment
        {!disabledProceed && (
          <>
            <div className="absolute bottom-[20%] right-[25%] -mr-1 mt-1 w-36 h-2 bg-blue-300 rounded-full animate-ping"></div>
          </>
        )}
      </button>
    </div>
  );
};

export default SecondPage;

type cardProps = {
  active: boolean;
  img: string | undefined;
  name: string | undefined;
  onClick: () => void;
  detailLink?: string;
};

const Card: React.FC<cardProps> = ({
  active,
  img,
  name,
  onClick,
  detailLink,
}) => {
  return (
    <div
      className={`flex justify-center cursor-pointer ${
        active
          ? "shadow-[0px_0px_16px_8px] shadow-amber-400 rounded-xl"
          : "shadow-none"
      }`}
      onClick={onClick}
    >
      <div className="rounded-lg shadow-lg bg-white max-w-sm">
        <img
          className="rounded-t-lg min-w-[384px] min-h-[384px] max-w-[384px] max-h-[384px]"
          src={img}
          alt={name}
        />
        <div className="p-6">
          <p className="text-gray-700 text-base mb-4 min-h-[72px]">{name}</p>
          <button
            onClick={() => window.open(detailLink, "_blank")}
            type="button"
            className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
          >
            Show details
          </button>
        </div>
      </div>
    </div>
  );
};
