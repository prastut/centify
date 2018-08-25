const r = require("rethinkdb");

const DB_CONFIG = {
  host: process.env.RETHINK_HOST || "localhost",
  port: process.env.RETHINK_PORT || 28015,
  db: "test"
};

const state = { connection: null };

const connect = (config, done) => {
  if (state.connection) return done();

  r.connect(
    { ...config },
    (err, conn) => {
      if (err) return done(err);
      state.connection = conn;
      done();
    }
  );
};

connect(
  DB_CONFIG,
  err => {
    if (err) {
      throw new Error(err.message);
      process.exit(1);
    } else {
      r.table("tv_shows").run(state.connection, function(err, cursor) {
        if (err) throw err;
        cursor.toArray(function(err, result) {
          if (err) throw err;
          console.log(JSON.stringify(result, null, 2));
        });
      });
    }
  }
);
