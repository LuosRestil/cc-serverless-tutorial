import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';

interface CityData {
  name: string;
  state: string;
  description: string;
  mayor: string;
  population: number;
  zipCodes?: string;
}

const cityData: {[key: string]: CityData} = {
  newYork: {
    name: "New York",
    state: "New York",
    description: "Description of New York City goes here.",
    mayor: "Bill de Blasio",
    population: 8399000,
    zipCodes: "100xx-104xx, 11004-05, 111xx-114xx, 116xx"
  },
  washington: {
    name: "Washington",
    state: "District of Columbia",
    description: "Washington DC is the US capital, a compact city on the Potomac River.",
    mayor: "Muriel Bowser",
    population: 705549
  },
  seattle: {
    name: "Seattle",
    state: "Washington",
    description: "A city on Puget sound in the Pacific Northwest.",
    mayor: "Jenny Durham",
    population: 744955
  }
}

export const handler: APIGatewayProxyHandler = async (event, _context) => {
  const city = event.pathParameters?.city;
  if (!city || !cityData[city]) {
    return apiResponses._400({message: "Missing or invalid city."})
  }
  return apiResponses._200(cityData[city]);
}

const apiResponses = {
  _200: (body: {[key: string]: any}) => {
    return {
      statusCode: 200,
      body: JSON.stringify(body, null, 2),
    };
  },
  _400: (body: {[key: string]: any}) => {
    return {
      statusCode: 400,
      body: JSON.stringify(body, null, 2),
    };
  }, 
}