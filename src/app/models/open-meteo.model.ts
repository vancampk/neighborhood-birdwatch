import { Coordinates, Maybe, Scalars } from "./graphql.models";

/** Weather reading provided by OpenWeather */
export type OpenMeteoWeatherReading = {
  __typename?: 'WeatherReading';
  /** Cloudiness, % */
  cloudiness: Scalars['Int']['output'];  
  /** Group of weather parameters (Rain, Snow, Extreme etc.) */
  description: Scalars['String']['output'];
  /** Atmospheric pressure on the ground level, hPa */
  groundLevel?: Maybe<Scalars['Int']['output']>;
  /** Humidity, % */
  humidity: Scalars['Int']['output'];
  /** Atmospheric pressure (on the sea level, if there is no sea_level or grnd_level data), hPa */
  pressure: Scalars['Int']['output'];
  /** Rain volume for the last 1 hour, mm */
  rain?: Maybe<Scalars['Float']['output']>;  
  /** Temperature, F */
  temp: Scalars['Float']['output'];
  /** Reading timestamp */
  timestamp?: Maybe<Scalars['ISO8601DateTime']['output']>;
  /** Wind direction, degrees (meteorological) */
  windDir: Scalars['Int']['output'];
  /** Wind direction, degrees (compass) */
  windDirCompass: Scalars['String']['output'];
  /** Wind gust, meter/sec */
  windGust?: Maybe<Scalars['Float']['output']>;
  /** Wind speed, meter/sec */
  windSpeed: Scalars['Float']['output'];
};