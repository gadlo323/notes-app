import localforage from "localforage";

let archive = localforage.createInstance({
  name: "ArchivNote",
});
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
  Archiv(id);
  localforage.removeItem(id).catch(function (err) {
    console.log(err);
  });
};

const Archiv = (id) => {
  localforage
    .getItem(id)
    .then(function (value) {
      archive.setItem(id + value.noteTitle, value);
    })
    .catch(function (err) {
      console.log(err);
    });
};

export const getArchiv = async () => {
  let arr = [];
  await archive
    .iterate(function (value, key, iterationNumber) {
      arr.push(value);
    })
    .catch(function (err) {
      console.log(err);
    });

  return arr;
};

export const GetOneItem = async (id) => {
  let data = await archive
    .getItem(id, function (err, value) {
      return value;
    })
    .catch((err) => {
      console.log(err);
    });
  return data;
};

export const Removefromarchiv = (id) => {
  archive.removeItem(id).catch(function (err) {
    console.log(err);
  });
};

export const removeItemArchiv = (id) => {
  archive.removeItem(id).catch(function (err) {
    console.log(err);
  });
};
