import pg from "pg";

const db=new pg.Client(
    {
      user:"postgres",
      host:"localhost",
      database:"pernstack",
      password:"postgres@37",
      port:5432,
    }
  );
  db.connect();

  export default db;