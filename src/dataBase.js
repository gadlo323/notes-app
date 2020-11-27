import localforage from "localforage";

export const AllData = async () => {
  let arr = [];
  await localforage
    .iterate(function (value, key, iterationNumber) {
      arr.push(value);
    })
    .catch(function (err) {
      console.log(err);
    });

  return arr;
};

export const clearDtaebase = () => {
  localforage
    .clear()
    .then(function () {
      // Run this code once the database has been entirely deleted.
      console.log("Database is now empty.");
    })
    .catch(function (err) {
      // This code runs if there were any errors
      console.log(err);
    });
};

export const saveNote = (item) => {
  localforage.setItem(item.id, item).catch(function (err) {
    console.log(err);
  });
};

export const updateDb = (id, newItem) => {
  localforage.getItem(id).then(function (item) {
    item.id = id;
    item.noteTitle = newItem.noteTitle;
    item.noteVal = newItem.noteVal;
    item.updateDate = newItem.updateDate;
    localforage.setItem(id, item);
  });
};

export const removeItemdb = (id) => {
  localforage.removeItem(id).catch(function (err) {
    console.log(err);
  });
};
