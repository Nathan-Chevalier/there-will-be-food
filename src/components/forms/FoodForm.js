import { useState, useEffect } from "react";
import {
  getAllImages,
  getAllStorages,
  getAllTypes,
  getAllUnits,
} from "../../services/formService";

export const FoodForm = () => {
  const [userValues, setUserValues] = useState({});
  const [types, setTypes] = useState([]);
  const [units, setUnits] = useState([]);
  const [storages, setStorages] = useState([]);
  const [images, setImages] = useState([]);

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

  return (
    <div>
      <h1>ADD FOOD</h1>
      <form>
        <div className="image-sector">
          <fieldset>
            <div className="image-select">
              <div>Select Image:</div>
              <select className="image-select-dropdown" onChange={() => {}}>
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
          <div className="name-storage-row">
            <fieldset>
              <label>Food Name: </label>
              <input
                id="name"
                type="text"
                className="name-input"
                placeholder="Input food name..."
                value={userValues.name}
                onChange={() => {}}
              />
            </fieldset>
            <fieldset>
              {storages.map((storageObj) => {
                return (
                  <label>
                    <div key={storageObj.id} className="storage-radio">
                      <input
                        type="radio"
                        id="storage"
                        value={storageObj.id}
                        checked={userValues.storageId === storageObj.id}
                        onChange={() => {}}
                      />
                    </div>
                    {storageObj.name}
                  </label>
                );
              })}
            </fieldset>
          </div>
          <div className="description-row">
            <fieldset>
              <label>Description: </label>
              <input
                id="description"
                className="description-input"
                placeholder="Input description (Optional)..."
                value={userValues.description}
                onChange={() => {}}
              />
            </fieldset>
          </div>
          <div className="expiration-quantity-row">
            <fieldset>
              <input
                id="expirationDate"
                type="date"
                value={userValues.expirationDate}
                onChange={() => {}}
              />
            </fieldset>
          </div>
        </div>
      </form>
    </div>
  );
};
