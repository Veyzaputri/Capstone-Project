import { db } from "../db/firebase.js";
import {
  validateQueryParams,
  validateData,
  validateId,
} from "../helpers/validationHelper.js";

const COLLECTION_NAME = "pemasukan";

const getAllData = async (queryParams) => {
  try {
    validateQueryParams(queryParams);

    let query = db.collection(COLLECTION_NAME);

    Object.keys(queryParams).forEach((key) => {
      if (queryParams[key]) {
        query = query.where(key, "==", queryParams[key]);
      }
    });

    const snapshot = await query.get();
    if (snapshot.empty) {
      return [];
    }

    const data = snapshot.docs.map((doc) => {
      const docData = { id: doc.id, ...doc.data() };
      validateData(docData);
      return docData;
    });

    return data;
  } catch (error) {
    throw new Error("Error fetching data from Firestore: " + error.message);
  }
};

const getDataById = async (id) => {
  try {
    validateId(id);

    const doc = await db.collection(COLLECTION_NAME).doc(id.toString()).get();

    if (!doc.exists) {
      return null;
    }

    const docData = { id: doc.id, ...doc.data() };

    validateData(docData);

    return docData;
  } catch (error) {
    throw new Error("Error fetching data by ID: " + error.message);
  }
};

export { getAllData, getDataById };
