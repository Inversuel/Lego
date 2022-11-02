import axios from "axios";
import React, { useEffect, useCallback, FC, useMemo } from "react";
import { useParams } from "react-router-dom";
import { legoPartApi, legoPartsApi } from "../client/getLegos.type";
import Loader from "../components/Loader";
import { useLego } from "../Context/Lego";
import { useForm } from "react-hook-form";

const ThirdPage = () => {
  const { id } = useParams();
  const { legoData } = useLego();
  const [parts, setParts] = React.useState<legoPartsApi>([]);

  const lego = legoData?.find((lego) => lego.set_num === id);

  const getLegoParts = useCallback(
    async () =>
      await axios
        .get(`https://rebrickable.com/api/v3/lego/minifigs/${id}/parts/`, {
          headers: {
            Authorization: `key ${process.env.REACT_APP_API_KEY}`,
          },
        })
        .then((res) => setParts(res.data.results)),
    [id]
  );

  useEffect(() => {
    getLegoParts();
    return () => setParts([]);
  }, [getLegoParts]);

  const partsId = useMemo(() => parts.map((part) => part?.part?.part_num), [parts]);

  if(partsId.length === 0) return <Loader />

  return (
    <div className="h-screen w-screen grid lg:grid-cols-12  gap-6 text-black">
      <div className="lg:col-start-1 lg:col-end-8 rounded-2xl flex flex-col p-14 m-3">
        <h1 className="uppercase text-3xl font-[Modak] mb-10 text-white ">
          Shipping details
        </h1>
        <LegoForm
          partsId={partsId}
        />
      </div>
      <div className="lg:col-start-8 lg:col-end-13 bg-white rounded-2xl flex flex-col p-14 mt-6 mb-6 lg:mr-14 max-w-xl lg:max-w-none mx-auto lg:mx-0">
        <h1 className="uppercase text-3xl font-[Modak] mb-10">Summary</h1>
        <img
          src={lego?.set_img_url}
          alt={lego?.name}
          className="w-40 mx-auto"
        />
        <p className=" m-2 text-center">{lego?.name}</p>
        <p className=" font-bold">
          There are {lego?.num_parts ? lego?.num_parts : "??"} parts in this
          minifigs:
        </p>
        <div className="mt-4">
          {parts.length === 0 ? (
            <Loader />
          ) : (
            parts.map((part) => <LegoPart part={part} key={part?.id} />)
          )}
        </div>
      </div>
    </div>
  );
};

export default ThirdPage;

interface LegoPartProps {
  part?: legoPartApi;
}

const LegoPart: FC<LegoPartProps> = ({ part }) => {
  return (
    <div className="flex align-middle items-center gap-3">
      <img
        src={part?.part?.part_img_url}
        alt={part?.part?.name}
        className="w-14 h-14"
      />
      <div>
        <p className="truncate max-w-xs">{part?.part?.name}</p>
        <p className="text-red-400">part number: {part?.part?.part_num}</p>
      </div>
    </div>
  );
};

interface LegoFormProps {
  partsId: (string | undefined)[];
}

const LegoForm: FC<LegoFormProps> = ({ partsId }) => {

  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    phone: "",
    birthDate: new Date(),
    parts: partsId,
  };
  
  type formValues = typeof initialValues;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: initialValues,
  });
  const onSubmit = (data: formValues) => console.log(data);

  //regex for phone number
  const phoneRegex = /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
  const fieldRequiredValidationMessage = <p className="text-red-400 text-xs mt-1">This field is required</p>

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid md:grid-cols-2 md:gap-6">
        <div className="relative z-0 mb-6 w-full group">
          <label
            htmlFor="firstName"
            className={`block text-white text-sm font-bold mb-2`}
          >
            First name
          </label>
          <input
            type="text"
            id="firstName"
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.firstName && "border border-red-400 border-solid"}`}
            placeholder=" "
            {...register("firstName", { required: true })}
          />
          {errors.firstName && (
            fieldRequiredValidationMessage
          )}
        </div>
        <div className="relative z-0 mb-6 w-full group">
          <label
            htmlFor="lastName"
            className="block text-white text-sm font-bold mb-2"
          >
            Last name
          </label>
          <input
            type="text"
            id="lastName"
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.lastName && "border border-red-400 border-solid"}`}
            placeholder=" "
            {...register("lastName", { required: true })}
          />
          {errors.lastName && (
            fieldRequiredValidationMessage
          )}
        </div>
      </div>
      <div className="grid md:grid-cols-2 md:gap-6">
        <div className="relative z-0 mb-6 w-full group">
          <label
            htmlFor="email"
            className="block text-white text-sm font-bold mb-2"
          >
            Email address
          </label>
          <input
            type="email"
            id="email"
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.email && "border border-red-400 border-solid"}`}
            placeholder="joe@doe.com"
            {...register("email", { required: true })}
          />
          {errors.email && (
            fieldRequiredValidationMessage
          )}
        </div>
        <div className="relative z-0 mb-6 w-full group">
          <label
            htmlFor="phone"
            className="block text-white text-sm font-bold mb-2"
          >
            Phone number
          </label>
          <input
            type="tel"
            id="phone"
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.phone && "border border-red-400 border-solid"}`}
            placeholder="+48 123 456 789"
            {...register("phone", { required: false, pattern: phoneRegex })}
          />
          {errors.phone && (
            <p className="text-red-400 text-xs mt-1">
              Phone number must be in proper format
            </p>
          )}
        </div>
      </div>
      <div className="grid md:grid-cols-2 md:gap-6">
        <div className="relative z-0 mb-6 w-full group">
          <label
            htmlFor="address"
            className="block text-white text-sm font-bold mb-2"
          >
            Address
          </label>
          <input
            type="text"
            id="address"
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.address && "border border-red-400 border-solid"}`}
            placeholder=" "
            {...register("address", { required: true })}
          />
          {errors.address && (
            fieldRequiredValidationMessage
          )}
        </div>
        <div className="relative z-0 mb-6 w-full group">
          <label
            htmlFor="state"
            className="block text-white text-sm font-bold mb-2"
          >
            State
          </label>
          <input
            type="text"
            id="state"
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.state && "border border-red-400 border-solid"}`}
            placeholder=" "
            {...register("state", { required: true })}
          />
          {errors.state && (
            fieldRequiredValidationMessage
          )}
        </div>
      </div>
      <div className="grid md:grid-cols-2 md:gap-6">
        <div className="relative z-0 mb-6 w-full group">
          <label
            htmlFor="city"
            className="block text-white text-sm font-bold mb-2"
          >
            City
          </label>
          <input
            type="text"
            id="city"
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.city && "border border-red-400 border-solid"}`}
            placeholder=" "
            {...register("city", { required: true })}
          />
          {errors.city && (
            fieldRequiredValidationMessage
          )}
        </div>
        <div className="relative z-0 mb-6 w-full group">
          <label
            htmlFor="zip"
            className="block text-white text-sm font-bold mb-2"
          >
            Zip code
          </label>
          <input
            type="text"
            id="zip"
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.zip && "border border-red-400 border-solid"}`}
            placeholder=" "
            {...register("zip", { required: true })}
          />
          {errors.zip && (
            fieldRequiredValidationMessage
          )}
        </div>
      </div>
      <div className="grid md:grid-cols-2 md:gap-6">
        <div className="relative z-0 mb-6 w-full group">
          <label
            htmlFor="birthDate"
            className="block text-white text-sm font-bold mb-2"
          >
            Date of birth
          </label>{" "}
          <input
            type="Date"
            id="birthDate"
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.birthDate && "border border-red-400 border-solid"}`}
            placeholder=" "
            {...register("birthDate", { required: true, min: new Date().toString(), valueAsDate: true })}
          />
          {errors.birthDate && (
            fieldRequiredValidationMessage
          )}
        </div>
      </div>
      <button
        type="submit"
        className={`text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800`}
      >
        Submit
      </button>
    </form>
  );
};
