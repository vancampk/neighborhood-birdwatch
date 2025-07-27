export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T,
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never;
    };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  BigInt: { input: any; output: any };
  ISO8601Date: { input: any; output: any };
  ISO8601DateTime: { input: any; output: any };
  JSON: { input: any; output: any };
  SpeciesCountKey: { input: any; output: any };
  TimeZone: { input: any; output: any };
};

export type AccelReading = {
  __typename?: 'AccelReading';
  /** Reading timestamp */
  timestamp?: Maybe<Scalars['ISO8601DateTime']['output']>;
  x?: Maybe<Scalars['Float']['output']>;
  y?: Maybe<Scalars['Float']['output']>;
  z?: Maybe<Scalars['Float']['output']>;
};

/** The connection type for AccelReading. */
export type AccelReadingConnection = {
  __typename?: 'AccelReadingConnection';
  /** A list of edges. */
  edges?: Maybe<Array<Maybe<AccelReadingEdge>>>;
  /** A list of nodes. */
  nodes?: Maybe<Array<Maybe<AccelReading>>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

/** An edge in a connection. */
export type AccelReadingEdge = {
  __typename?: 'AccelReadingEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node?: Maybe<AccelReading>;
};

/** Air pollution reading provided by OpenWeather */
export type AirPollutionReading = {
  __typename?: 'AirPollutionReading';
  /** Air Quality Index. Possible values: 1, 2, 3, 4, 5. Where 1 = Good, 2 = Fair, 3 = Moderate, 4 = Poor, 5 = Very Poor. */
  aqi: Scalars['Int']['output'];
  /** Сoncentration of CO (Carbon monoxide), μg/m3 */
  co: Scalars['Float']['output'];
  /** Geographic coordinates of the reading */
  coords: Coordinates;
  /** Сoncentration of NH3 (Ammonia), μg/m3 */
  nh3: Scalars['Float']['output'];
  /** Сoncentration of NO (Nitrogen monoxide), μg/m3 */
  no: Scalars['Float']['output'];
  /** Сoncentration of NO2 (Nitrogen dioxide), μg/m3 */
  no2: Scalars['Float']['output'];
  /** Сoncentration of O3 (Ozone), μg/m3 */
  o3: Scalars['Float']['output'];
  /** Сoncentration of PM2.5 (Fine particles matter), μg/m3 */
  pm2_5: Scalars['Float']['output'];
  /** Сoncentration of PM10 (Coarse particulate matter), μg/m3 */
  pm10: Scalars['Float']['output'];
  /** Сoncentration of SO2 (Sulphur dioxide), μg/m3 */
  so2: Scalars['Float']['output'];
  /** Reading timestamp */
  timestamp?: Maybe<Scalars['ISO8601DateTime']['output']>;
};

export type BinnedSpeciesCount = {
  __typename?: 'BinnedSpeciesCount';
  bins: Array<SpeciesCountBin>;
  count: Scalars['Int']['output'];
  species: Species;
  speciesId: Scalars['ID']['output'];
};

export type BinnedSpeciesSummaryCount = {
  __typename?: 'BinnedSpeciesSummaryCount';
  counts: Array<SummarySpeciesCount>;
  date: Scalars['ISO8601Date']['output'];
  dayOfYear: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export type Coordinates = {
  __typename?: 'Coordinates';
  /** Latitude */
  lat: Scalars['Float']['output'];
  /** Longitude */
  lon: Scalars['Float']['output'];
};

export type Count = {
  __typename?: 'Count';
  count: Scalars['Int']['output'];
  type: Scalars['String']['output'];
};

export type Counts = {
  __typename?: 'Counts';
  birdnet?: Maybe<Scalars['Int']['output']>;
  breakdown: CountsBreakdown;
  detections: Scalars['Int']['output'];
  species: Scalars['Int']['output'];
  stations: Scalars['Int']['output'];
};

export type CountsBreakdown = {
  __typename?: 'CountsBreakdown';
  stations: Array<Count>;
};

/** An audio detection of a species by a BirdWeather station. */
export type Detection = Record & {
  __typename?: 'Detection';
  /** Calculated certainty */
  certainty: Scalars['String']['output'];
  /** Reported confidence */
  confidence: Scalars['Float']['output'];
  /** Geographic coordinates of the detection */
  coords: Coordinates;
  /** The detection's vicinity to the 2024 Solar Eclipse path of totality (total, partial or null) */
  eclipse?: Maybe<Scalars['String']['output']>;
  /** URL for favoriting detections */
  favoriteUrl: Scalars['String']['output'];
  /** URL for flagging detections */
  flagUrl: Scalars['String']['output'];
  /** The unique identifier for the resource */
  id: Scalars['ID']['output'];
  /** Recording mode (live, recorded or birdnetpi) */
  mode: Scalars['String']['output'];
  /** Reported probability */
  probability?: Maybe<Scalars['Float']['output']>;
  /** Calculated score */
  score: Scalars['Float']['output'];
  /** Associated soundscape (optional) */
  soundscape?: Maybe<Soundscape>;
  /** Detection species */
  species: Species;
  /** Species ID */
  speciesId: Scalars['ID']['output'];
  /** Station that recorded this detection */
  station?: Maybe<Station>;
  /** Detection timestamp (in station time zone) */
  timestamp?: Maybe<Scalars['ISO8601DateTime']['output']>;
  /** URL for up/downvote detections */
  voteUrl: Scalars['String']['output'];
};

/** The connection type for Detection. */
export type DetectionConnection = {
  __typename?: 'DetectionConnection';
  /** A list of edges. */
  edges?: Maybe<Array<Maybe<DetectionEdge>>>;
  /** A list of nodes. */
  nodes?: Maybe<Array<Maybe<Detection>>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  speciesCount: Scalars['Int']['output'];
  totalCount: Scalars['Int']['output'];
};

/** An edge in a connection. */
export type DetectionEdge = {
  __typename?: 'DetectionEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node?: Maybe<Detection>;
};

export type DetectionsReading = {
  __typename?: 'DetectionsReading';
  detections: Scalars['Int']['output'];
  species: Scalars['Int']['output'];
  /** Reading timestamp */
  timestamp?: Maybe<Scalars['ISO8601DateTime']['output']>;
};

/** The connection type for DetectionsReading. */
export type DetectionsReadingConnection = {
  __typename?: 'DetectionsReadingConnection';
  /** A list of edges. */
  edges?: Maybe<Array<Maybe<DetectionsReadingEdge>>>;
  /** A list of nodes. */
  nodes?: Maybe<Array<Maybe<DetectionsReading>>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

/** An edge in a connection. */
export type DetectionsReadingEdge = {
  __typename?: 'DetectionsReadingEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node?: Maybe<DetectionsReading>;
};

export type EnvironmentReading = {
  __typename?: 'EnvironmentReading';
  aqi?: Maybe<Scalars['Float']['output']>;
  barometricPressure?: Maybe<Scalars['Float']['output']>;
  eco2?: Maybe<Scalars['Float']['output']>;
  humidity?: Maybe<Scalars['Float']['output']>;
  soundPressureLevel?: Maybe<Scalars['Float']['output']>;
  temperature?: Maybe<Scalars['Float']['output']>;
  /** Reading timestamp */
  timestamp?: Maybe<Scalars['ISO8601DateTime']['output']>;
  voc?: Maybe<Scalars['Float']['output']>;
};

/** The connection type for EnvironmentReading. */
export type EnvironmentReadingConnection = {
  __typename?: 'EnvironmentReadingConnection';
  /** A list of edges. */
  edges?: Maybe<Array<Maybe<EnvironmentReadingEdge>>>;
  /** A list of nodes. */
  nodes?: Maybe<Array<Maybe<EnvironmentReading>>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

/** An edge in a connection. */
export type EnvironmentReadingEdge = {
  __typename?: 'EnvironmentReadingEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node?: Maybe<EnvironmentReading>;
};

/** A time period (e.g. last 24 hours) or explicit date duration. */
export type InputDuration = {
  /** Number of units of time */
  count?: InputMaybe<Scalars['Int']['input']>;
  /** From date */
  from?: InputMaybe<Scalars['ISO8601Date']['input']>;
  /** Timezone for from/to dates */
  timezone?: InputMaybe<Scalars['TimeZone']['input']>;
  /** To date */
  to?: InputMaybe<Scalars['ISO8601Date']['input']>;
  /** Unit of time (hour/day/week/month/year) */
  unit?: InputMaybe<Scalars['String']['input']>;
};

/** A geographic location (latitude / longitude pair). */
export type InputLocation = {
  /** Latitude */
  lat: Scalars['Float']['input'];
  /** Longitude */
  lon: Scalars['Float']['input'];
};

export type LightReading = {
  __typename?: 'LightReading';
  clear?: Maybe<Scalars['Int']['output']>;
  f1?: Maybe<Scalars['Int']['output']>;
  f2?: Maybe<Scalars['Int']['output']>;
  f3?: Maybe<Scalars['Int']['output']>;
  f4?: Maybe<Scalars['Int']['output']>;
  f5?: Maybe<Scalars['Int']['output']>;
  f6?: Maybe<Scalars['Int']['output']>;
  f7?: Maybe<Scalars['Int']['output']>;
  f8?: Maybe<Scalars['Int']['output']>;
  nir?: Maybe<Scalars['Int']['output']>;
  /** Reading timestamp */
  timestamp?: Maybe<Scalars['ISO8601DateTime']['output']>;
};

/** The connection type for LightReading. */
export type LightReadingConnection = {
  __typename?: 'LightReadingConnection';
  /** A list of edges. */
  edges?: Maybe<Array<Maybe<LightReadingEdge>>>;
  /** A list of nodes. */
  nodes?: Maybe<Array<Maybe<LightReading>>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

/** An edge in a connection. */
export type LightReadingEdge = {
  __typename?: 'LightReadingEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node?: Maybe<LightReading>;
};

export type LocationProbabilities = {
  __typename?: 'LocationProbabilities';
  /** Location coordinates */
  coords: Coordinates;
  /** Array of probabilities (monthly or 48 week) */
  probabilities: Array<Scalars['Float']['output']>;
};

export type LocationReading = {
  __typename?: 'LocationReading';
  altitude?: Maybe<Scalars['Float']['output']>;
  lat?: Maybe<Scalars['Float']['output']>;
  lon?: Maybe<Scalars['Float']['output']>;
  satellites?: Maybe<Scalars['Int']['output']>;
  /** Reading timestamp */
  timestamp?: Maybe<Scalars['ISO8601DateTime']['output']>;
};

/** The connection type for LocationReading. */
export type LocationReadingConnection = {
  __typename?: 'LocationReadingConnection';
  /** A list of edges. */
  edges?: Maybe<Array<Maybe<LocationReadingEdge>>>;
  /** A list of nodes. */
  nodes?: Maybe<Array<Maybe<LocationReading>>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

/** An edge in a connection. */
export type LocationReadingEdge = {
  __typename?: 'LocationReadingEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node?: Maybe<LocationReading>;
};

export type MagReading = {
  __typename?: 'MagReading';
  /** Reading timestamp */
  timestamp?: Maybe<Scalars['ISO8601DateTime']['output']>;
  x?: Maybe<Scalars['Float']['output']>;
  y?: Maybe<Scalars['Float']['output']>;
  z?: Maybe<Scalars['Float']['output']>;
};

/** The connection type for MagReading. */
export type MagReadingConnection = {
  __typename?: 'MagReadingConnection';
  /** A list of edges. */
  edges?: Maybe<Array<Maybe<MagReadingEdge>>>;
  /** A list of nodes. */
  nodes?: Maybe<Array<Maybe<MagReading>>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

/** An edge in a connection. */
export type MagReadingEdge = {
  __typename?: 'MagReadingEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node?: Maybe<MagReading>;
};

/** Autogenerated return type of NewDetection. */
export type NewDetectionPayload = {
  __typename?: 'NewDetectionPayload';
  detection: Detection;
};

/** Information about pagination in a connection. */
export type PageInfo = {
  __typename?: 'PageInfo';
  /** When paginating forwards, the cursor to continue. */
  endCursor?: Maybe<Scalars['String']['output']>;
  /** When paginating forwards, are there more items? */
  hasNextPage: Scalars['Boolean']['output'];
  /** When paginating backwards, are there more items? */
  hasPreviousPage: Scalars['Boolean']['output'];
  /** When paginating backwards, the cursor to continue. */
  startCursor?: Maybe<Scalars['String']['output']>;
};

export type Probability = {
  __typename?: 'Probability';
  /** Probability of species for each month of year (0-12) [Fogleman] */
  months?: Maybe<Array<Scalars['Float']['output']>>;
  /** Species for this probability range */
  species: Species;
  /** Species ID */
  speciesId: Scalars['ID']['output'];
  /** Probability of species for each week of year (0-48) [BirdNET] */
  weeks?: Maybe<Array<Scalars['Float']['output']>>;
};

export enum ProbabilityModel {
  /** BirdNET */
  Birdnet = 'BIRDNET',
  /** BirdWeather */
  Birdweather = 'BIRDWEATHER',
  /** Fogleman */
  Fogleman = 'FOGLEMAN',
  /** iNaturalist */
  Inaturalist = 'INATURALIST',
}

export type Query = {
  __typename?: 'Query';
  /** Lookup multiple species by IDs */
  allSpecies?: Maybe<SpeciesConnection>;
  birdnetSightings: SightingConnection;
  counts: Counts;
  dailyDetectionCounts: Array<BinnedSpeciesSummaryCount>;
  /** List all detections */
  detections: DetectionConnection;
  ebirdSightings: Array<Sighting>;
  /** Search for species by common or scientific name */
  searchSpecies?: Maybe<SpeciesConnection>;
  /** Fetch species by ID or exact scientific name */
  species?: Maybe<Species>;
  station: Station;
  /** List all public stations. */
  stations: StationConnection;
  timeOfDayDetectionCounts: Array<BinnedSpeciesCount>;
  topBirdnetSpecies: Array<SpeciesCount>;
  topSpecies: Array<SpeciesCount>;
};

export type QueryAllSpeciesArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  ids: Array<Scalars['ID']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
};

export type QueryBirdnetSightingsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  ne?: InputMaybe<InputLocation>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  period?: InputMaybe<InputDuration>;
  speciesId?: InputMaybe<Scalars['ID']['input']>;
  sw?: InputMaybe<InputLocation>;
};

export type QueryCountsArgs = {
  ne?: InputMaybe<InputLocation>;
  period?: InputMaybe<InputDuration>;
  speciesId?: InputMaybe<Scalars['ID']['input']>;
  stationIds?: InputMaybe<Array<Scalars['ID']['input']>>;
  stationTypes?: InputMaybe<Array<Scalars['String']['input']>>;
  sw?: InputMaybe<InputLocation>;
};

export type QueryDailyDetectionCountsArgs = {
  period?: InputMaybe<InputDuration>;
  speciesIds?: InputMaybe<Array<Scalars['ID']['input']>>;
  stationIds?: InputMaybe<Array<Scalars['ID']['input']>>;
};

export type QueryDetectionsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  classifications?: InputMaybe<Array<Scalars['String']['input']>>;
  confidenceGt?: InputMaybe<Scalars['Float']['input']>;
  confidenceGte?: InputMaybe<Scalars['Float']['input']>;
  confidenceLt?: InputMaybe<Scalars['Float']['input']>;
  confidenceLte?: InputMaybe<Scalars['Float']['input']>;
  continents?: InputMaybe<Array<Scalars['String']['input']>>;
  countries?: InputMaybe<Array<Scalars['String']['input']>>;
  eclipse?: InputMaybe<Scalars['Boolean']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  ne?: InputMaybe<InputLocation>;
  overrideStationFilters?: InputMaybe<Scalars['Boolean']['input']>;
  period?: InputMaybe<InputDuration>;
  probabilityGt?: InputMaybe<Scalars['Float']['input']>;
  probabilityGte?: InputMaybe<Scalars['Float']['input']>;
  probabilityLt?: InputMaybe<Scalars['Float']['input']>;
  probabilityLte?: InputMaybe<Scalars['Float']['input']>;
  recordingModes?: InputMaybe<Array<Scalars['String']['input']>>;
  scoreGt?: InputMaybe<Scalars['Float']['input']>;
  scoreGte?: InputMaybe<Scalars['Float']['input']>;
  scoreLt?: InputMaybe<Scalars['Float']['input']>;
  scoreLte?: InputMaybe<Scalars['Float']['input']>;
  sortBy?: InputMaybe<Scalars['String']['input']>;
  speciesId?: InputMaybe<Scalars['ID']['input']>;
  speciesIds?: InputMaybe<Array<Scalars['ID']['input']>>;
  stationIds?: InputMaybe<Array<Scalars['ID']['input']>>;
  stationTypes?: InputMaybe<Array<Scalars['String']['input']>>;
  sw?: InputMaybe<InputLocation>;
  timeOfDayGte?: InputMaybe<Scalars['Int']['input']>;
  timeOfDayLte?: InputMaybe<Scalars['Int']['input']>;
  uniqueStations?: InputMaybe<Scalars['Boolean']['input']>;
  validSoundscape?: InputMaybe<Scalars['Boolean']['input']>;
  vote?: InputMaybe<Scalars['Int']['input']>;
};

export type QueryEbirdSightingsArgs = {
  center: InputLocation;
  period?: InputMaybe<InputDuration>;
  speciesId: Scalars['ID']['input'];
};

export type QuerySearchSpeciesArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  query?: InputMaybe<Scalars['String']['input']>;
  searchLocale?: InputMaybe<Scalars['String']['input']>;
};

export type QuerySpeciesArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
  scientificName?: InputMaybe<Scalars['String']['input']>;
};

export type QueryStationArgs = {
  id: Scalars['ID']['input'];
};

export type QueryStationsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  ne?: InputMaybe<InputLocation>;
  period?: InputMaybe<InputDuration>;
  query?: InputMaybe<Scalars['String']['input']>;
  sw?: InputMaybe<InputLocation>;
};

export type QueryTimeOfDayDetectionCountsArgs = {
  confidenceGt?: InputMaybe<Scalars['Float']['input']>;
  confidenceGte?: InputMaybe<Scalars['Float']['input']>;
  confidenceLt?: InputMaybe<Scalars['Float']['input']>;
  confidenceLte?: InputMaybe<Scalars['Float']['input']>;
  ne?: InputMaybe<InputLocation>;
  period?: InputMaybe<InputDuration>;
  probabilityGt?: InputMaybe<Scalars['Float']['input']>;
  probabilityGte?: InputMaybe<Scalars['Float']['input']>;
  probabilityLt?: InputMaybe<Scalars['Float']['input']>;
  probabilityLte?: InputMaybe<Scalars['Float']['input']>;
  scoreGt?: InputMaybe<Scalars['Float']['input']>;
  scoreGte?: InputMaybe<Scalars['Float']['input']>;
  scoreLt?: InputMaybe<Scalars['Float']['input']>;
  scoreLte?: InputMaybe<Scalars['Float']['input']>;
  speciesId?: InputMaybe<Scalars['ID']['input']>;
  stationIds?: InputMaybe<Array<Scalars['ID']['input']>>;
  sw?: InputMaybe<InputLocation>;
  timeOfDayGte?: InputMaybe<Scalars['Int']['input']>;
  timeOfDayLte?: InputMaybe<Scalars['Int']['input']>;
};

export type QueryTopBirdnetSpeciesArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  ne?: InputMaybe<InputLocation>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  period?: InputMaybe<InputDuration>;
  speciesId?: InputMaybe<Scalars['ID']['input']>;
  sw?: InputMaybe<InputLocation>;
};

export type QueryTopSpeciesArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  ne?: InputMaybe<InputLocation>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  period?: InputMaybe<InputDuration>;
  recordingModes?: InputMaybe<Array<Scalars['String']['input']>>;
  speciesId?: InputMaybe<Scalars['ID']['input']>;
  stationIds?: InputMaybe<Array<Scalars['ID']['input']>>;
  stationTypes?: InputMaybe<Array<Scalars['String']['input']>>;
  sw?: InputMaybe<InputLocation>;
};

export type Record = {
  /** The unique identifier for the resource */
  id: Scalars['ID']['output'];
};

/** Container type for PUC sensor readings */
export type Sensors = {
  __typename?: 'Sensors';
  /** Latest accelerometer sensor data reading */
  accel?: Maybe<AccelReading>;
  /** Accelerometer sensor data reading history */
  accelHistory: AccelReadingConnection;
  /** Detection counts history */
  detectionsHistory: DetectionsReadingConnection;
  /** Latest environmental sensor data reading */
  environment?: Maybe<EnvironmentReading>;
  /** Environmental sensor data reading history */
  environmentHistory: EnvironmentReadingConnection;
  /** Latest light sensor data reading */
  light?: Maybe<LightReading>;
  /** Light sensor data reading history */
  lightHistory: LightReadingConnection;
  /** Latest location sensor data reading */
  location?: Maybe<LocationReading>;
  /** Location sensor data reading history */
  locationHistory: LocationReadingConnection;
  /** Latest magnetometer sensor data reading */
  mag?: Maybe<MagReading>;
  /** Magnetometer sensor data reading history */
  magHistory: MagReadingConnection;
  /** Latest system info reading */
  system?: Maybe<SystemReading>;
  /** System info reading history */
  systemHistory: SystemReadingConnection;
};

/** Container type for PUC sensor readings */
export type SensorsAccelHistoryArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  period?: InputMaybe<InputDuration>;
};

/** Container type for PUC sensor readings */
export type SensorsDetectionsHistoryArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  period?: InputMaybe<InputDuration>;
};

/** Container type for PUC sensor readings */
export type SensorsEnvironmentHistoryArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  period?: InputMaybe<InputDuration>;
};

/** Container type for PUC sensor readings */
export type SensorsLightHistoryArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  period?: InputMaybe<InputDuration>;
};

/** Container type for PUC sensor readings */
export type SensorsLocationHistoryArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  period?: InputMaybe<InputDuration>;
};

/** Container type for PUC sensor readings */
export type SensorsMagHistoryArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  period?: InputMaybe<InputDuration>;
};

/** Container type for PUC sensor readings */
export type SensorsSystemHistoryArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  period?: InputMaybe<InputDuration>;
};

/** A BirdNET or eBird sighting. */
export type Sighting = Record & {
  __typename?: 'Sighting';
  coords: Coordinates;
  /** The unique identifier for the resource */
  id: Scalars['ID']['output'];
  score: Scalars['Float']['output'];
  species: Species;
  speciesId: Scalars['ID']['output'];
  timestamp?: Maybe<Scalars['ISO8601DateTime']['output']>;
};

/** The connection type for Sighting. */
export type SightingConnection = {
  __typename?: 'SightingConnection';
  /** A list of edges. */
  edges?: Maybe<Array<Maybe<SightingEdge>>>;
  /** A list of nodes. */
  nodes?: Maybe<Array<Maybe<Sighting>>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

/** An edge in a connection. */
export type SightingEdge = {
  __typename?: 'SightingEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node?: Maybe<Sighting>;
};

/** A soundscape file uploaded by a BirdWeather station. */
export type Soundscape = Record & {
  __typename?: 'Soundscape';
  /** Suggested filename of audio file */
  downloadFilename: Scalars['String']['output'];
  /** Duration (in seconds) of the audio file */
  duration: Scalars['Int']['output'];
  /** End time (in seconds) of the detection */
  endTime: Scalars['Float']['output'];
  /** Size (in bytes) of the audio file */
  filesize: Scalars['Int']['output'];
  /** The unique identifier for the resource */
  id: Scalars['ID']['output'];
  /** Recording mode (live, recorded or birdnetpi) */
  mode: Scalars['String']['output'];
  /** Starting time (in seconds) of the detection */
  startTime: Scalars['Float']['output'];
  /** Station that recorded this soundscape */
  station?: Maybe<Station>;
  /** Timestamp of the soundscape */
  timestamp: Scalars['ISO8601DateTime']['output'];
  /** URL for the audio file */
  url: Scalars['String']['output'];
};

export type Species = Record & {
  __typename?: 'Species';
  /** 4-letter alpha code */
  alpha?: Maybe<Scalars['String']['output']>;
  /** 6-letter alpha code */
  alpha6?: Maybe<Scalars['String']['output']>;
  /** URL to BirdWeather species page */
  birdweatherUrl?: Maybe<Scalars['String']['output']>;
  /** Assigned color */
  color: Scalars['String']['output'];
  /** Common name */
  commonName: Scalars['String']['output'];
  detectionCounts: BinnedSpeciesCount;
  /** eBird alpha code */
  ebirdCode?: Maybe<Scalars['String']['output']>;
  /** URL to eBird page */
  ebirdUrl?: Maybe<Scalars['String']['output']>;
  /** The unique identifier for the resource */
  id: Scalars['ID']['output'];
  /** Credited author of image */
  imageCredit?: Maybe<Scalars['String']['output']>;
  /** Name of image license */
  imageLicense?: Maybe<Scalars['String']['output']>;
  /** URL to image license page */
  imageLicenseUrl?: Maybe<Scalars['String']['output']>;
  /** 400x400 image URL */
  imageUrl?: Maybe<Scalars['String']['output']>;
  /** URL to Macaulay Library page */
  mlUrl?: Maybe<Scalars['String']['output']>;
  predictionArea?: Maybe<Scalars['JSON']['output']>;
  probabilities?: Maybe<SpeciesProbabilities>;
  range?: Maybe<Scalars['JSON']['output']>;
  /** Scientific name */
  scientificName?: Maybe<Scalars['String']['output']>;
  /** List stations with species detection */
  stations: Array<StationCount>;
  /** 100x100 thumbnail image URL */
  thumbnailUrl?: Maybe<Scalars['String']['output']>;
  /** List top detection for each station the species was detected at */
  topDetections: DetectionConnection;
  translations: Array<SpeciesTranslation>;
  /** Wikipedia extract */
  wikipediaSummary?: Maybe<Scalars['String']['output']>;
  /** URL to Wikipedia page */
  wikipediaUrl?: Maybe<Scalars['String']['output']>;
};

export type SpeciesDetectionCountsArgs = {
  group?: InputMaybe<Scalars['Int']['input']>;
  ne?: InputMaybe<InputLocation>;
  period?: InputMaybe<InputDuration>;
  stationIds?: InputMaybe<Array<Scalars['ID']['input']>>;
  sw?: InputMaybe<InputLocation>;
};

export type SpeciesProbabilitiesArgs = {
  model: ProbabilityModel;
  ne?: InputMaybe<InputLocation>;
  sw?: InputMaybe<InputLocation>;
};

export type SpeciesStationsArgs = {
  ne?: InputMaybe<InputLocation>;
  period?: InputMaybe<InputDuration>;
  stationTypes?: InputMaybe<Array<Scalars['String']['input']>>;
  sw?: InputMaybe<InputLocation>;
};

export type SpeciesTopDetectionsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  period?: InputMaybe<InputDuration>;
};

export type SpeciesTranslationsArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
};

/** The connection type for Species. */
export type SpeciesConnection = {
  __typename?: 'SpeciesConnection';
  /** A list of edges. */
  edges?: Maybe<Array<Maybe<SpeciesEdge>>>;
  /** A list of nodes. */
  nodes?: Maybe<Array<Maybe<Species>>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type SpeciesCount = {
  __typename?: 'SpeciesCount';
  averageProbability?: Maybe<Scalars['Float']['output']>;
  breakdown?: Maybe<SpeciesCountBreakdown>;
  count: Scalars['Int']['output'];
  species?: Maybe<Species>;
  speciesId: Scalars['ID']['output'];
};

export type SpeciesCountBin = {
  __typename?: 'SpeciesCountBin';
  count: Scalars['Int']['output'];
  key: Scalars['SpeciesCountKey']['output'];
};

export type SpeciesCountBreakdown = {
  __typename?: 'SpeciesCountBreakdown';
  /** Count of almost certain detections */
  almostCertain: Scalars['Int']['output'];
  /** Count of uncertain detections */
  uncertain: Scalars['Int']['output'];
  /** Count of unlikely detections */
  unlikely: Scalars['Int']['output'];
  /** Count of very likely detections */
  veryLikely: Scalars['Int']['output'];
};

/** An edge in a connection. */
export type SpeciesEdge = {
  __typename?: 'SpeciesEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node?: Maybe<Species>;
};

export type SpeciesProbabilities = {
  __typename?: 'SpeciesProbabilities';
  /** Probabilities for each location */
  locations: Array<LocationProbabilities>;
  /** Geographic precision (in degrees) of location probabilities */
  precision: Scalars['Float']['output'];
  /** Species */
  species: Species;
  /** Species ID */
  speciesId: Scalars['ID']['output'];
};

export type SpeciesTranslation = {
  __typename?: 'SpeciesTranslation';
  commonName?: Maybe<Scalars['String']['output']>;
  locale: Scalars['String']['output'];
  wikipediaSummary?: Maybe<Scalars['String']['output']>;
  wikipediaUrl?: Maybe<Scalars['String']['output']>;
};

/** A BirdWeather station (either real or virtual). */
export type Station = Record & {
  __typename?: 'Station';
  /** Air pollution data from OpenWeather */
  airPollution?: Maybe<AirPollutionReading>;
  /** Station audio feed URL */
  audioUrl?: Maybe<Scalars['String']['output']>;
  /** Continent */
  continent?: Maybe<Scalars['String']['output']>;
  /** Location coordinates */
  coords?: Maybe<Coordinates>;
  /** Country name */
  country?: Maybe<Scalars['String']['output']>;
  counts: StationCounts;
  detectionCounts: Array<BinnedSpeciesCount>;
  detections: DetectionConnection;
  /** Timestamp of earliest detection */
  earliestDetectionAt?: Maybe<Scalars['ISO8601DateTime']['output']>;
  /** The station's vicinity to the 2024 Solar Eclipse path of totality (total, partial or null) */
  eclipse?: Maybe<Scalars['String']['output']>;
  hasProbabilities: Scalars['Boolean']['output'];
  /** The unique identifier for the resource */
  id: Scalars['ID']['output'];
  /** Timestamp of latest detection */
  latestDetectionAt?: Maybe<Scalars['ISO8601DateTime']['output']>;
  /** Human-readable location */
  location?: Maybe<Scalars['String']['output']>;
  /** Location privacy enabled */
  locationPrivacy: Scalars['Boolean']['output'];
  /** Station minimum confidence setting */
  minConfidence?: Maybe<Scalars['Float']['output']>;
  /** Station minimum probability setting */
  minProbability?: Maybe<Scalars['Float']['output']>;
  /** Station minimum score setting */
  minScore?: Maybe<Scalars['Float']['output']>;
  /** Station name */
  name: Scalars['String']['output'];
  /** Station notes (optional) */
  notes?: Maybe<Scalars['String']['output']>;
  /** Station supports detections outside of the station location */
  portableDetections: Scalars['Boolean']['output'];
  probabilities: Array<Probability>;
  sensors?: Maybe<Sensors>;
  /** @deprecated Stream source URL (use audioUrl/videoUrl instead) */
  source?: Maybe<Scalars['String']['output']>;
  /** State/province/region */
  state?: Maybe<Scalars['String']['output']>;
  timeOfDayDetectionCounts: Array<BinnedSpeciesCount>;
  /** Timezone string */
  timezone: Scalars['String']['output'];
  topSpecies: Array<SpeciesCount>;
  /** Station type (birdnetpi, puc, mobile, stream_youtube, stream_audio) */
  type: Scalars['String']['output'];
  /** Station video feed URL */
  videoUrl?: Maybe<Scalars['String']['output']>;
  /** Weather data from OpenWeather */
  weather?: Maybe<WeatherReading>;
};

/** A BirdWeather station (either real or virtual). */
export type StationCountsArgs = {
  period?: InputMaybe<InputDuration>;
};

/** A BirdWeather station (either real or virtual). */
export type StationDetectionCountsArgs = {
  confidenceGt?: InputMaybe<Scalars['Float']['input']>;
  confidenceGte?: InputMaybe<Scalars['Float']['input']>;
  confidenceLt?: InputMaybe<Scalars['Float']['input']>;
  confidenceLte?: InputMaybe<Scalars['Float']['input']>;
  ne?: InputMaybe<InputLocation>;
  period?: InputMaybe<InputDuration>;
  probabilityGt?: InputMaybe<Scalars['Float']['input']>;
  probabilityGte?: InputMaybe<Scalars['Float']['input']>;
  probabilityLt?: InputMaybe<Scalars['Float']['input']>;
  probabilityLte?: InputMaybe<Scalars['Float']['input']>;
  scoreGt?: InputMaybe<Scalars['Float']['input']>;
  scoreGte?: InputMaybe<Scalars['Float']['input']>;
  scoreLt?: InputMaybe<Scalars['Float']['input']>;
  scoreLte?: InputMaybe<Scalars['Float']['input']>;
  speciesId?: InputMaybe<Scalars['ID']['input']>;
  sw?: InputMaybe<InputLocation>;
  timeOfDayGte?: InputMaybe<Scalars['Int']['input']>;
  timeOfDayLte?: InputMaybe<Scalars['Int']['input']>;
};

/** A BirdWeather station (either real or virtual). */
export type StationDetectionsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
};

/** A BirdWeather station (either real or virtual). */
export type StationSensorsArgs = {
  fieldName?: InputMaybe<Scalars['String']['input']>;
  sensorType?: InputMaybe<Scalars['String']['input']>;
};

/** A BirdWeather station (either real or virtual). */
export type StationTimeOfDayDetectionCountsArgs = {
  confidenceGt?: InputMaybe<Scalars['Float']['input']>;
  confidenceGte?: InputMaybe<Scalars['Float']['input']>;
  confidenceLt?: InputMaybe<Scalars['Float']['input']>;
  confidenceLte?: InputMaybe<Scalars['Float']['input']>;
  ne?: InputMaybe<InputLocation>;
  period?: InputMaybe<InputDuration>;
  probabilityGt?: InputMaybe<Scalars['Float']['input']>;
  probabilityGte?: InputMaybe<Scalars['Float']['input']>;
  probabilityLt?: InputMaybe<Scalars['Float']['input']>;
  probabilityLte?: InputMaybe<Scalars['Float']['input']>;
  scoreGt?: InputMaybe<Scalars['Float']['input']>;
  scoreGte?: InputMaybe<Scalars['Float']['input']>;
  scoreLt?: InputMaybe<Scalars['Float']['input']>;
  scoreLte?: InputMaybe<Scalars['Float']['input']>;
  speciesId?: InputMaybe<Scalars['ID']['input']>;
  sw?: InputMaybe<InputLocation>;
  timeOfDayGte?: InputMaybe<Scalars['Int']['input']>;
  timeOfDayLte?: InputMaybe<Scalars['Int']['input']>;
};

/** A BirdWeather station (either real or virtual). */
export type StationTopSpeciesArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  period?: InputMaybe<InputDuration>;
  speciesId?: InputMaybe<Scalars['ID']['input']>;
};

/** The connection type for Station. */
export type StationConnection = {
  __typename?: 'StationConnection';
  /** A list of edges. */
  edges?: Maybe<Array<Maybe<StationEdge>>>;
  /** A list of nodes. */
  nodes?: Maybe<Array<Maybe<Station>>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type StationCount = {
  __typename?: 'StationCount';
  count: Scalars['Int']['output'];
  station: Station;
};

export type StationCounts = {
  __typename?: 'StationCounts';
  detections: Scalars['Int']['output'];
  species: Scalars['Int']['output'];
};

/** An edge in a connection. */
export type StationEdge = {
  __typename?: 'StationEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node?: Maybe<Station>;
};

export type Subscription = {
  __typename?: 'Subscription';
  newDetection: NewDetectionPayload;
};

export type SubscriptionNewDetectionArgs = {
  classifications?: InputMaybe<Array<Scalars['String']['input']>>;
  confidenceGt?: InputMaybe<Scalars['Float']['input']>;
  confidenceGte?: InputMaybe<Scalars['Float']['input']>;
  confidenceLt?: InputMaybe<Scalars['Float']['input']>;
  confidenceLte?: InputMaybe<Scalars['Float']['input']>;
  continents?: InputMaybe<Array<Scalars['String']['input']>>;
  countries?: InputMaybe<Array<Scalars['String']['input']>>;
  overrideStationFilters?: InputMaybe<Scalars['Boolean']['input']>;
  probabilityGt?: InputMaybe<Scalars['Float']['input']>;
  probabilityGte?: InputMaybe<Scalars['Float']['input']>;
  probabilityLt?: InputMaybe<Scalars['Float']['input']>;
  probabilityLte?: InputMaybe<Scalars['Float']['input']>;
  recordingModes?: InputMaybe<Array<Scalars['String']['input']>>;
  scoreGt?: InputMaybe<Scalars['Float']['input']>;
  scoreGte?: InputMaybe<Scalars['Float']['input']>;
  scoreLt?: InputMaybe<Scalars['Float']['input']>;
  scoreLte?: InputMaybe<Scalars['Float']['input']>;
  speciesIds?: InputMaybe<Array<Scalars['ID']['input']>>;
  stationIds?: InputMaybe<Array<Scalars['ID']['input']>>;
  stationTypes?: InputMaybe<Array<Scalars['String']['input']>>;
  timeOfDayGte?: InputMaybe<Scalars['Int']['input']>;
  timeOfDayLte?: InputMaybe<Scalars['Int']['input']>;
};

export type SummarySpeciesCount = {
  __typename?: 'SummarySpeciesCount';
  count: Scalars['Int']['output'];
  species: Species;
  speciesId: Scalars['ID']['output'];
};

export type SystemReading = {
  __typename?: 'SystemReading';
  batteryVoltage?: Maybe<Scalars['Float']['output']>;
  firmware?: Maybe<Scalars['String']['output']>;
  powerSource?: Maybe<Scalars['String']['output']>;
  sdAvailable?: Maybe<Scalars['BigInt']['output']>;
  sdCapacity?: Maybe<Scalars['BigInt']['output']>;
  /** Reading timestamp */
  timestamp?: Maybe<Scalars['ISO8601DateTime']['output']>;
  uploadingCompleted?: Maybe<Scalars['Int']['output']>;
  uploadingTotal?: Maybe<Scalars['Int']['output']>;
  wifiRssi?: Maybe<Scalars['Int']['output']>;
};

/** The connection type for SystemReading. */
export type SystemReadingConnection = {
  __typename?: 'SystemReadingConnection';
  /** A list of edges. */
  edges?: Maybe<Array<Maybe<SystemReadingEdge>>>;
  /** A list of nodes. */
  nodes?: Maybe<Array<Maybe<SystemReading>>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

/** An edge in a connection. */
export type SystemReadingEdge = {
  __typename?: 'SystemReadingEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node?: Maybe<SystemReading>;
};

/** Weather reading provided by OpenWeather */
export type WeatherReading = {
  __typename?: 'WeatherReading';
  /** Cloudiness, % */
  cloudiness: Scalars['Int']['output'];
  /** Geographic coordinates of the reading */
  coords: Coordinates;
  /** Group of weather parameters (Rain, Snow, Extreme etc.) */
  description: Scalars['String']['output'];
  /** Temperature, Kelvin. This temperature parameter accounts for the human perception of weather */
  feelsLike: Scalars['Float']['output'];
  /** Atmospheric pressure on the ground level, hPa */
  groundLevel?: Maybe<Scalars['Int']['output']>;
  /** Humidity, % */
  humidity: Scalars['Int']['output'];
  /** Atmospheric pressure (on the sea level, if there is no sea_level or grnd_level data), hPa */
  pressure: Scalars['Int']['output'];
  /** Rain volume for the last 1 hour, mm */
  rain1h?: Maybe<Scalars['Float']['output']>;
  /** Rain volume for the last 3 hours, mm */
  rain3h?: Maybe<Scalars['Float']['output']>;
  /** Atmospheric pressure on the sea level, hPa */
  seaLevel?: Maybe<Scalars['Int']['output']>;
  /** Snow volume for the last 1 hour, mm */
  snow1h?: Maybe<Scalars['Float']['output']>;
  /** Snow volume for the last 3 hours, mm */
  snow3h?: Maybe<Scalars['Float']['output']>;
  /** Sunrise time */
  sunrise: Scalars['ISO8601DateTime']['output'];
  /** Sunset time */
  sunset: Scalars['ISO8601DateTime']['output'];
  /** Temperature, Kelvin */
  temp: Scalars['Float']['output'];
  /** Maximum temperature at the moment, Kelvin. This is maximal currently observed temperature (within large megalopolises and urban areas) */
  tempMax: Scalars['Float']['output'];
  /** Minimum temperature at the moment, Kelvin. This is minimal currently observed temperature (within large megalopolises and urban areas) */
  tempMin: Scalars['Float']['output'];
  /** Reading timestamp */
  timestamp?: Maybe<Scalars['ISO8601DateTime']['output']>;
  /** Visibility, meters */
  visibility: Scalars['Int']['output'];
  /** Wind direction, degrees (meteorological) */
  windDir: Scalars['Int']['output'];
  /** Wind gust, meter/sec */
  windGust?: Maybe<Scalars['Float']['output']>;
  /** Wind speed, meter/sec */
  windSpeed: Scalars['Float']['output'];
};
