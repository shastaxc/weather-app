export interface IWeatherData {
  coord: {
    lon: number; // City geo location, longitude
    lat: number; // City geo location, latitude
  };
  weather: {
    id: number; // Weather condition id
    main: string; // Group of weather parameters (Rain, Snow, Extreme etc.)
    description: string; // Weather condition within the group. You can get the output in your language.
    icon: string; // Weather icon id
  }[];
  base?: any; // OpenWeatherMap internal parameter
  main: {
    temp: number; // Temperature. Unit Default: Kelvin, Metric: Celsius, Imperial: Fahrenheit.
    feels_like: number; // Temperature. This temperature parameter accounts for the human perception of weather. Unit Default: Kelvin, Metric: Celsius, Imperial: Fahrenheit.
    pressure: number; // Atmospheric pressure (on the sea level, if there is no sea_level or grnd_level data), hPa
    humidity: number; // Humidity, %
    temp_min: number; // Minimum temperature at the moment. This is minimal currently observed temperature (within large megalopolises and urban areas). Unit Default: Kelvin, Metric: Celsius, Imperial: Fahrenheit.
    temp_max: number; // Maximum temperature at the moment. This is maximal currently observed temperature (within large megalopolises and urban areas). Unit Default: Kelvin, Metric: Celsius, Imperial: Fahrenheit.
    sea_level?: number; // Atmospheric pressure on the sea level, hPa
    grnd_level?: number; // Atmospheric pressure on the ground level, hPa
  };
  visibility: number; // Visibility, meter
  wind: {
    speed: number; // Wind speed. Unit Default: meter/sec, Metric: meter/sec, Imperial: miles/hour.
    deg: number; // Wind direction, degrees (meteorological)
    gust?: number; // Wind gust. Unit Default: meter/sec, Metric: meter/sec, Imperial: miles/hour
  };
  clouds?: {
    all: number; // Cloudiness, %
  };
  rain?: {
    '1h': number; // Rain volume for the last 1 hour, mm
    '3h': number; // Rain volume for the last 3 hours, mm
  };
  snow?: {
    '1h': number; // Rain volume for the last 1 hour, mm
    '3h': number; // Rain volume for the last 3 hours, mm
  };
  dt: number; // Time of data calculation, unix, UTC
  sys: {
    type?: number; // OpenWeatherMap internal parameter
    id?: number; // OpenWeatherMap internal parameter
    message?: string; // OpenWeatherMap internal parameter
    country: string; // Country code (GB, JP etc.)
    sunrise: number; // Sunrise time, unix, UTC
    sunset: number; // Sunset time, unix, UTC
  };
  timezone: number; // Shift in seconds from UTC
  id: number; // City ID
  name: string; // City name
  cod?: number; // OpenWeatherMap internal parameter
  precipitation?: {
    value: number; // Precipitation, mm
    mode: string; // Possible values are 'no", name of weather phenomena as 'rain',
  };
  lastupdate?: Date; // Last time when data was updated
}

export interface IOpenWeatherMapsLocation {
  id: number;
  name: string;
  state: string;
  country: string;
  coord: {
    lon: number;
    lat: number;
  };
}

export interface IWeatherSearchResults {
  cnt: number,
  list: IWeatherData[];
}

export interface ILocationWeatherPair {
  location: IOpenWeatherMapsLocation;
  weatherData: IWeatherData;
}

export interface IWeatherSearchResponse {
  results: ILocationWeatherPair[];
}
