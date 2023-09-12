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

  return <></>;
};
