import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getFoodById } from "../../services/foodService";
import {
  getAllImages,
  getAllStorages,
  getAllTypes,
  getAllUnits,
} from "../../services/formService";

export const EditForm = () => {
  const { foodId } = useParams();

  const [userValues, setUserValues] = useState();
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

  return (
    <div>
      <h1>Update Food</h1>
      <form>
        <div className="image-sector">
          <fieldset>
            <div className="image-select">
              <div>Select Image:</div>
              <select
                className="image-select-dropdown"
                value={userValues?.imageId}
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
                value={userValues?.name}
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
                value={userValues?.typeId}
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
                value={userValues?.description}
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
                value={userValues?.expirationDate}
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
                value={userValues?.quantity}
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
                value={userValues?.quantityUnitId}
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
                  <label key={storageObj?.id}>
                    <div className="storage-radio">
                      <input
                        type="radio"
                        id="storage"
                        value={storageObj?.id}
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
            <button className="save-food-button" onClick={() => {}}>
              Save Food
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
