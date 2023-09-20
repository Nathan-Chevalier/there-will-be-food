import { useState, useEffect } from "react";
import {
  getAllImages,
  getAllStorages,
  getAllTypes,
  getAllUnits,
} from "../../services/formService";
import { useNavigate } from "react-router-dom";

export const FoodForm = ({ currentUser }) => {
  const navigate = useNavigate();
  // ? Pulls today's date and formats it to YYYY-MM-DD
  const currentDate = new Date();
  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  };
  const today = formatDate(currentDate);

  // ? States required for form
  const [userValues, setUserValues] = useState({
    storageDate: today,
    storageId: 0,
    userId: currentUser.id,
  });
  const [types, setTypes] = useState([]);
  const [units, setUnits] = useState([]);
  const [storages, setStorages] = useState([]);
  const [images, setImages] = useState([]);

  // ? Initial render, populating dropdowns
  useEffect(() => {
    getAllTypes().then((typeArray) => {
      setTypes(typeArray);
    });
    getAllUnits().then((unitArray) => {
      setUnits(unitArray);
    });
    getAllStorages().then((storageArray) => {
      setStorages(storageArray);
    });
    getAllImages().then((imageArray) => {
      setImages(imageArray);
    });
  }, []);

  const handleSaveFood = (event) => {
    const findStorage = storages.find(
      (storage) => userValues.storageId === storage.id
    );
    event.preventDefault();

    if (
      userValues.storageId &&
      userValues.userId &&
      userValues.imageId &&
      userValues.name &&
      userValues.typeId &&
      userValues.description &&
      userValues.expirationDate &&
      userValues.quantity &&
      userValues.quantityUnitId
    ) {
      fetch("http://localhost:8088/foods", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userValues),
      }).then(() => {
        navigate(`/${findStorage.name}`);
      });
    } else {
      alert("Please finish filling out the form!");
    }
  };

  return (
    <div className="flex justify-center bg-[#a4bdba] font-helvetica ">
      <form className="flex flex-col bg-[#a47f74] w-5/12 gap-y-2 p-6 m-5">
        <div className="flex justify-center">
          <div className="text-5xl font-bold text-white drop-shadow-[0_2px_2px_rgba(0,0,0,1)]">
            Add Food
          </div>
        </div>
        {/* Data container */}
        <div className="flex flex-col gap-2">
          {/* Name & Type Container */}
          <div className="name-type-container flex justify-between bg-slate-950/10 rounded-xl p-2">
            <fieldset className="name-container flex flex-col">
              <label className="text-lg text-white drop-shadow-[0_2px_2px_rgba(0,0,0,1)]">
                Food Name:{" "}
              </label>
              <input
                id="name"
                type="text"
                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                placeholder="Input food name..."
                onChange={(event) => {
                  const copy = { ...userValues };
                  copy.name = event.target.value;
                  setUserValues(copy);
                }}
              />
            </fieldset>
            <fieldset className="type-container flex flex-col">
              <label>Food Type: </label>
              <select
                className="type-select  bg-gray-200 border-2 border-gray-200 rounded py-2 px-4"
                onChange={(event) => {
                  const copy = { ...userValues };
                  copy.typeId = parseInt(event.target.value);
                  setUserValues(copy);
                }}
              >
                <option value={0}>Select type...</option>
                {types.map((typeObj) => {
                  return (
                    <option
                      key={typeObj.id}
                      value={typeObj.id}
                      className="type-select-option"
                    >
                      {typeObj.name}
                    </option>
                  );
                })}
              </select>
            </fieldset>
          </div>
          <div className="description-container flex justify-start bg-slate-950/10 rounded-xl p-2">
            <fieldset className="flex flex-col grow">
              <label>Description: </label>
              <input
                id="description"
                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded  py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                placeholder="Input description (Optional)..."
                onChange={(event) => {
                  const copy = { ...userValues };
                  copy.description = event.target.value;
                  setUserValues(copy);
                }}
              />
            </fieldset>
          </div>
          <div className="expiration-quantity-container flex flex-row justify-between bg-slate-950/10 rounded-xl p-2">
            <div className="flex flex-col justify-self-start grow">
              <label>Expiration Date:</label>
              <fieldset>
                <input
                  id="expirationDate"
                  type="date"
                  className="bg-gray-200 appearance-none border-2 border-gray-200 rounded py-1 px-4"
                  value={userValues.expirationDate}
                  onChange={(event) => {
                    const copy = { ...userValues };
                    copy.expirationDate = event.target.value;
                    setUserValues(copy);
                  }}
                />
              </fieldset>
            </div>

            <div className="quantity-container flex flex-col">
              <label>Quantity:</label>
              <div className="flex flex-row content-center justify-center gap-x-2">
                <fieldset>
                  <input
                    id="quantity"
                    type="number"
                    placeholder="Input quantity..."
                    className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                    value={userValues.quantity}
                    onChange={(event) => {
                      const copy = { ...userValues };
                      copy.quantity = parseInt(event.target.value);
                      setUserValues(copy);
                    }}
                  />
                </fieldset>
                <fieldset className="flex flex-col content-center justify-center ">
                  <select
                    className="unit-select bg-gray-200 border-2 border-gray-200 rounded py-2 px-4"
                    onChange={(event) => {
                      const copy = { ...userValues };
                      copy.quantityUnitId = parseInt(event.target.value);
                      setUserValues(copy);
                    }}
                  >
                    <option value={0}>Select Units...</option>
                    {units.map((unitObj) => {
                      return (
                        <option
                          key={unitObj.id}
                          value={unitObj.id}
                          className="unit-select-option"
                        >
                          {unitObj.name}
                        </option>
                      );
                    })}
                  </select>
                </fieldset>
              </div>
            </div>
          </div>
          <div className="storage-submit-row flex flex-col bg-slate-950/10 rounded-xl p-2">
            <div className="self-center">Select Storage:</div>
            <fieldset className="flex flex-row justify-around content-center">
              {storages.map((storageObj) => {
                return (
                  <label className="flex flex-row" key={storageObj.id}>
                    <div className="storage-radio">
                      <input
                        type="radio"
                        id="storage"
                        value={storageObj.id}
                        checked={userValues.storageId === storageObj.id}
                        onChange={(event) => {
                          const copy = { ...userValues };
                          copy.storageId = parseInt(event.target.value);
                          setUserValues(copy);
                        }}
                      />
                    </div>
                    {storageObj.name}
                  </label>
                );
              })}
            </fieldset>
          </div>
        </div>
        <div>
          <div className="image-container flex flex-row flex-wrap justify-around bg-slate-950/10 rounded-xl p-2">
            <fieldset className="image-select gap-2">
              {images.map((imageObj) => {
                return (
                  <label key={imageObj.id}>
                    <img
                      src={imageObj.address}
                      alt={imageObj.name}
                      className={
                        userValues.imageId === imageObj.id
                          ? // ? Selected Image style ternary
                            "border-green-300 border-4 rounded-2xl hover:cursor-pointer"
                          : "hover:cursor-pointer opacity-60"
                      }
                      onClick={() => {
                        const copy = { ...userValues };
                        copy.imageId = imageObj.id;
                        setUserValues(copy);
                      }}
                    />
                  </label>
                );
              })}
            </fieldset>
          </div>
        </div>
        <div className="button-container flex justify-center bg-slate-950/10 rounded-xl p-2">
          <button
            className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-900 hover:border-blue-500 rounded"
            onClick={(event) => {
              handleSaveFood(event);
            }}
          >
            Save Food
          </button>
        </div>
      </form>
    </div>
  );
};
