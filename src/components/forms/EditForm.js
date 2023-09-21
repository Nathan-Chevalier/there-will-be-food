import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getFoodById } from "../../services/foodService";
import {
  getAllImages,
  getAllStorages,
  getAllTypes,
  getAllUnits,
} from "../../services/formService";
import { useNavigate } from "react-router-dom";

export const EditForm = () => {
  const navigate = useNavigate();

  const { foodId } = useParams();

  const [userValues, setUserValues] = useState({});
  const [types, setTypes] = useState([]);
  const [units, setUnits] = useState([]);
  const [storages, setStorages] = useState([]);
  const [images, setImages] = useState([]);

  useEffect(() => {
    getFoodById(foodId).then((foodObj) => {
      setUserValues(foodObj);
    });
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
  }, [foodId]);

  const handleEditFood = (event) => {
    event.preventDefault();

    const finalValues = {
      userId: userValues.userId,
      storageId: userValues.storageId,
      name: userValues.name,
      description: userValues.description,
      storageDate: userValues.storageDate,
      expirationDate: userValues.expirationDate,
      imageId: userValues.imageId,
      typeId: userValues.typeId,
      quantity: userValues.quantity,
      quantityUnitId: userValues.quantityUnitId,
    };

    if (
      finalValues.storageId &&
      finalValues.userId &&
      finalValues.imageId &&
      finalValues.name &&
      finalValues.typeId &&
      finalValues.description &&
      finalValues.expirationDate &&
      finalValues.quantity &&
      finalValues.quantityUnitId
    ) {
      fetch(`http://localhost:8088/foods/${foodId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(finalValues),
      }).then(() => {
        navigate(`/food/${foodId}`);
      });
    } else {
      alert("Please finish filling out the form!");
    }
  };

  const handleDeleteFood = (event) => {
    event.preventDefault();
    fetch(`http://localhost:8088/foods/${foodId}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    }).then(() => {
      navigate(`/all`);
    });
  };

  return (
    <div className="flex justify-center bg-[#a4bdba] font-helvetica ">
      <form className="flex flex-col bg-[#a47f74] w-6/12 gap-y-2 p-6 m-5 ">
        <div className="flex justify-center ">
          <div className="text-5xl font-bold text-white drop-shadow-[0_2px_2px_rgba(0,0,0,1)]">
            Edit Food
          </div>
        </div>
        {/* Data container */}
        <div className="flex flex-col gap-2">
          {/* Name,Type, expiration Container */}
          <div className="name-type-container flex justify-between bg-slate-950/10 rounded-xl p-2 border-slate-950/20 border-2">
            <div className="name-container flex flex-col px-3 py-1 rounded-lg pb-3 bg-slate-950/10 border-slate-950/20 border-2">
              <fieldset>
                <label className="text-lg shadow-text">Food Name: </label>
                <input
                  id="name"
                  type="text"
                  value={userValues.name}
                  className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                  placeholder="Input food name..."
                  onChange={(event) => {
                    const copy = { ...userValues };
                    copy.name = event.target.value;
                    setUserValues(copy);
                  }}
                />
              </fieldset>
            </div>
            <div className="type-container flex flex-col px-3 py-1 rounded-lg pb-3 bg-slate-950/10 border-slate-950/20 border-2">
              <fieldset className="flex flex-col">
                <label className="shadow-text">Food Type: </label>
                <select
                  className="type-select  bg-gray-200 border-2 border-gray-200 rounded py-2 px-4"
                  value={userValues.typeId}
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

            <div className="flex flex-col align-center justify-center  bg-slate-950/10 px-3 py-1 rounded-lg pb-3 border-slate-950/20 border-2">
              <label className="shadow-text">Expiration Date:</label>
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
          </div>
          <div className="description-container flex justify-start bg-slate-950/10 rounded-xl p-2 border-slate-950/20 border-2">
            <fieldset className="flex flex-col grow">
              <label className="shadow-text mb-1">Description: </label>
              <input
                id="description"
                value={userValues.description}
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

          <div className="storage-submit-row flex flex-row justify-between bg-slate-950/10 rounded-xl p-2 border-slate-950/20 border-2">
            <div className="quantity-container flex flex-col bg-slate-950/10 px-3 py-1 rounded-lg pb-3 border-slate-950/20 border-2">
              <label className="shadow-text">Quantity:</label>
              <div className="flex flex-row content-center justify-center gap-x-2">
                <fieldset>
                  <input
                    id="quantity"
                    type="number"
                    placeholder="Input quantity..."
                    className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-20 py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
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
                    className="unit-select bg-gray-200 border-2 border-gray-200 rounded pb-2 py-2 px-4"
                    value={userValues.quantityUnitId}
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
            <div className="flex flex-col bg-slate-950/10 px-3 py-1 rounded-lg pb-3 border-slate-950/20 border-2">
              <div className="shadow-text">Select Storage:</div>
              <fieldset className="flex flex-row justify-around content-center">
                {storages.map((storageObj) => {
                  return (
                    <label
                      className="flex flex-row bg-gray-200 rounded pb-2 py-2 px-2 gap-5 mx-1"
                      key={storageObj.id}
                    >
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
        </div>
        <div>
          <div className="image-container bg-slate-950/10 rounded-xl p-2 border-slate-950/20 border-2">
            <fieldset className="image-select flex flex-row flex-wrap justify-between gap-x-8 gap-y-4 m-2">
              {images.map((imageObj) => {
                return (
                  <label key={imageObj.id} className="basis-36">
                    <img
                      src={imageObj.address}
                      alt={imageObj.name}
                      value={userValues.imageId}
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
        <div className="flex justify-around">
          <button
            className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-900 hover:border-blue-500 rounded"
            onClick={(event) => {
              handleEditFood(event);
            }}
          >
            Save Food Edit
          </button>
          <button
            onClick={(event) => {
              handleDeleteFood(event);
            }}
            className="bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 border-b-4 border-red-900 hover:border-red-500 rounded"
          >
            Delete
          </button>
        </div>
      </form>
    </div>
  );
};
