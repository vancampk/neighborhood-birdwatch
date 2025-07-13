import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { fetchWeatherApi } from 'openmeteo';
import { WeatherReading } from 'src/app/models/station.model';

@Injectable({
  providedIn: 'root'
})

export class WeatherService {

    //https://open-meteo.com/en/docs/historical-weather-api?hourly=temperature_2m,rain,relative_humidity_2m,surface_pressure,cloud_cover,wind_speed_100m,wind_direction_100m&temperature_unit=fahrenheit&wind_speed_unit=mph&precipitation_unit=inch#location_and_time
    async getWeatherData(latitude: number, longitude: number, time: string): Promise<WeatherReading> {
        const params = {
            "latitude": latitude,
            "longitude": longitude,
            "time": time,
            "hourly": ["temperature_2m", "rain", "relative_humidity_2m", "surface_pressure", "cloud_cover", "wind_speed_100m", "wind_direction_100m"],
            "temperature_unit": "fahrenheit",
            "wind_speed_unit": "mph",
            "precipitation_unit": "inch"
        };

        // Fetch weather data
        const url = "https://historical-forecast-api.open-meteo.com/v1/forecast";
        const responses = await fetchWeatherApi(url, params);
        
        // Process returned data
        const response = responses[0];
        const hourly = response.hourly()!;
        const date = new Date(time);
        const hour = date.getHours();

        // Parse values from return (this will pull hourly data arrays for the given date)
        const temperature2m = hourly.variables(0)!.valuesArray()!;
        const rain = hourly.variables(1)!.valuesArray()!;
        const relativeHumidity2m = hourly.variables(2)!.valuesArray()!;
        const surfacePressure = hourly.variables(3)!.valuesArray()!;
        const cloudCover = hourly.variables(4)!.valuesArray()!;
        const windSpeed100m = hourly.variables(5)!.valuesArray()!;
        const windDirection100m = hourly.variables(6)!.valuesArray()!;

        // create/return WeatherReading
        const weatherReading: WeatherReading = {
            temp: temperature2m[hour],
            rain: rain[hour],
            humidity: relativeHumidity2m[hour],
            pressure: surfacePressure[hour],
            cloudCover: cloudCover[hour],
            windSpeed: windSpeed100m[hour],
            windDirDegrees: windDirection100m[hour],
            windDir: this.convertWindDirection(windDirection100m[hour]),
            description: `Temp: ${temperature2m[hour].toFixed(1)}°F, Humidity: ${relativeHumidity2m[hour]}%`
        };

        return weatherReading;
    }

    private convertWindDirection(degrees: number): string {
        const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
        const index = Math.round(degrees / 45) % 8;
        return directions[index];
    }
}