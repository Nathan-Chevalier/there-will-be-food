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
    <div>
      <h1>ADD FOOD</h1>
      <form>
        <div className="image-sector">
          <fieldset>
            <div className="image-select">
              <div>Select Image:</div>
              <select
                className="image-select-dropdown"
                onChange={(event) => {
                  const copy = { ...userValues };
                  copy.imageId = parseInt(event.target.value);
                  setUserValues(copy);
                }}
              >
                <option value={0}>IMAGE SELECT IMAGE</option>
                {images.map((imageObj) => {
                  return (
                    <option
                      key={imageObj.id}
                      value={imageObj.id}
                      className="image-select-option"
                    >
                      {imageObj.name}
                    </option>
                  );
                })}
              </select>
            </div>
          </fieldset>
        </div>
        <div className="data-sector">
          <div className="name-type-row">
            <fieldset>
              <label>Food Name: </label>
              <input
                id="name"
                type="text"
                className="name-input"
                placeholder="Input food name..."
                onChange={(event) => {
                  const copy = { ...userValues };
                  copy.name = event.target.value;
                  setUserValues(copy);
                }}
              />
            </fieldset>
            <fieldset>
              <label>Food Type: </label>
              <select
                className="type-select"
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
          <div className="description-row">
            <fieldset>
              <label>Description: </label>
              <input
                id="description"
                className="description-input"
                placeholder="Input description (Optional)..."
                onChange={(event) => {
                  const copy = { ...userValues };
                  copy.description = event.target.value;
                  setUserValues(copy);
                }}
              />
            </fieldset>
          </div>
          <div className="expiration-quantity-row">
            <fieldset>
              <input
                id="expirationDate"
                type="date"
                value={userValues.expirationDate}
                onChange={(event) => {
                  const copy = { ...userValues };
                  copy.expirationDate = event.target.value;
                  setUserValues(copy);
                }}
              />
            </fieldset>
            <fieldset>
              <input
                id="quantity"
                type="number"
                placeholder="Input quantity..."
                value={userValues.quantity}
                onChange={(event) => {
                  const copy = { ...userValues };
                  copy.quantity = parseInt(event.target.value);
                  setUserValues(copy);
                }}
              />
            </fieldset>
            <fieldset>
              <select
                className="unit-select"
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
          <div className="storage-submit-row">
            <fieldset>
              {storages.map((storageObj) => {
                return (
                  <label key={storageObj.id}>
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
            <button
              className="save-food-button"
              onClick={(event) => {
                handleSaveFood(event);
              }}
            >
              Save Food
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
