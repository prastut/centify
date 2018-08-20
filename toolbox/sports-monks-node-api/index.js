const SportmonksApi = require("sportmonks").SportmonksApi;
const sportmonks = new SportmonksApi(
  "gsTmoQI3Svw1vaxyX2XGYBedbS53zfvNsKmIpRbA0gva2fYeNGsP4OMLVaNI"
);

const LEAGUE_ID = 501;

const get_fixtures = async () => {
  try {
    const fixtures = await sportmonks.get(
      "v2.0/fixtures/between/2018-08-01/2018-09-01"
    );

    const filtered_fixtures_by_id = fixtures.data.filter(
      fixture => fixture.league_id === LEAGUE_ID
    );

    console.log(filtered_fixtures_by_id);
  } catch (err) {
    console.log(err);
  }
};

get_fixtures();
