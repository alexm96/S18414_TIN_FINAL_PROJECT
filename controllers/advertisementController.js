const fs = require("fs");

const mysql = require("mysql2/promise");
const { generateId } = require("../utils/nanoid");
const uploadMyOwnImage = require("./imageController").uploadMyOwnImage;
const mysqlConnection = require("../secrets.json").mysqlConnection;
const getSpecificCategory = require("../controllers/categoryController")
  .getCategoryId;
const ImageFromDb = require("../models/image").ImageFromDb;
const MiniAd = require("../models/miniAd").MiniAd;

exports.createAdvertisement = async (advertObject, userUid, imageData) => {
  // get category id
  // upload image and get id
  // upload advert and get id
  //set location data of advert to that of user and id to advert id
  // add entry to m2m table

  const connection = await mysql.createConnection(mysqlConnection);

  const categoryId = advertObject.category;
  const uploadImage = await uploadMyOwnImage(imageData);
  const createdAndUpdatedAt = new Date(new Date().toUTCString());
  const newId = await generateId();
  if (categoryId && uploadImage) {
    try {
      await connection.query("START TRANSACTION");
      const [
        insertRows,
        insertFields,
      ] = await connection.query(
        "insert into advertisement (id,title,description,image_id,price,tag_id,created_at,updated_at) values(?,?,?,?,?,?,?,?)",
        [
          newId,
          advertObject.title,
          advertObject.description,
          uploadImage,
          advertObject.price,
          categoryId,
          createdAndUpdatedAt,
          createdAndUpdatedAt,
        ]
      );

      const sql = connection.format(
        "insert into location (select ?,address_line1,address_line2,country,postal_code,city from user where id=?)",
        [newId, userUid]
      );

      const [locationRows, locationFields] = await connection.execute(sql);

      const [
        userAdRows,
        userAdFields,
      ] = await connection.query(
        "insert into user_advertisement (ad_id,user_id) values(?,?)",
        [newId, userUid]
      );

      await connection.query("COMMIT");
      return true;
    } catch (error) {
      await connection.query("ROLLBACK");
      return undefined;
    } finally {
      connection.close();
    }
  } else {
    return undefined;
  }
};
exports.updateAdvertisement = async (req, res) => {};
exports.deleteAdvertisement = async (req, res) => {};
exports.getAdvertisement = async (req, res) => {};
exports.getAdvertisements = async (searchTerm, city,pageNumber,pageSize) => {
  const connection = await mysql.createConnection(mysqlConnection);
  const formattedSearchTerm = "%" + searchTerm.toLowerCase() + "%";
  const formattedCity = "%" + city.toString().toLowerCase() + "%";
  try {
    const queryString = connection.format(
      "select title,price,image.type,image.name,image.data,advertisement.created_at as created_at from advertisement join image on advertisement.image_id=image.id join location on location.id=advertisement.id where lower(title) like ? and lower(city) like ? limit ?,?",
      [formattedSearchTerm, formattedCity,(pageNumber-1)*pageSize,parseInt(pageSize)]
    );

    const [rows, fields] = await connection.execute(queryString);
    const numberQueryString = connection.format(
        "Select count(1) as total_ads from advertisement join location on location.id=advertisement.id where lower(title) like ? and lower(city) like ? ",
        [formattedSearchTerm, formattedCity]
    );

    const [numberRows, numberFields] = await connection.execute(numberQueryString);

    const adverts=rows.map((row) => {
      const adImage = new ImageFromDb(row);
      return new MiniAd(row, adImage);
    });
    console.log(numberQueryString)
    const numberOfAds=numberRows[0]["total_ads"]
    const maxPages=Math.round((numberOfAds/pageSize)-.5)
    console.log(numberOfAds)
    return {
      "adverts":adverts,
      "maxPage":maxPages
    }
  } catch (error) {
    console.log(error);
    return undefined;
  }finally {
    connection.end().then(()=>console.log("connection close"))
  }
};


exports.getUserAdvertisements = async (id) => {
  const connection = await mysql.createConnection(mysqlConnection);

  try {
    const queryString = connection.format(
      "select title,price,image.type,image.name,image.data,advertisement.created_at as created_at from advertisement join image on advertisement.image_id=image.id join location on location.id=advertisement.id join user_advertisement on user_advertisement.ad_id=advertisement.id where user_advertisement.user_id=? ",
      [id]
    );

    const [rows, fields] = await connection.execute(queryString);

    return rows.map((row) => {
      const adImage = new ImageFromDb(row);
      return new MiniAd(row, adImage);
    });
  } catch (error) {
    console.log(error);
    return undefined;
  }
  finally {
    connection.end().then(()=>console.log("connection close"))
  }
};
exports.getAvailableAdvertisements = async (req, res) => {
  // will fire after authentication so no need to use jwt
  const connection = await mysql.createConnection(mysqlConnection);
  try {
    const uid = req.user._id;

    const [
      rows,
      fields,
    ] = await connection.query(
      "select can_post from user_monthly_post_limits where user_id=?",
      [uid]
    );

    return rows[0]["can_post"] === 1;
  } catch (error) {
    console.log(error);
    return false;
  } finally {
    connection.close();
  }
};
