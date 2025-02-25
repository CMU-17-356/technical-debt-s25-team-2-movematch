import axios from 'axios';

export default function QueryProcessor(query: string): string {
  if (query.toLowerCase().includes("shakespeare")) {
    return (
      "William Shakespeare (26 April 1564 - 23 April 1616) was an " +
      "English poet, playwright, and actor, widely regarded as the greatest " +
      "writer in the English language and the world's pre-eminent dramatist."
    );
  }

  if (query.toLowerCase().includes("name")) {
    return "Dominick and Sid and Eyob and Itamar";
  }

  // if (query.includes("largest")) {
  //   const numbers = query.match("/(\d+(\.\d+)?)/g");
  //   return toString(Math.max(..numbers));
  // }


  if (query.toLowerCase().includes("both a square and a cube")) {
    const extractNumbers = (query: string): number[] => {
      return query.match(/\d+/g)?.map(Number) || [];
    };
  
    const isPerfectSixthPower = (num: number): boolean => {
      const root = Math.round(Math.pow(num, 1 / 6));
      return root ** 6 === num;
    };
  
    const findValidNumbers = (query: string): number[] => {
      const numbers = extractNumbers(query);
      return numbers.filter(isPerfectSixthPower);
    };
  
    const result = findValidNumbers(query);
  
    return result.length > 0
      ? `${result.join(", ")}`
      : "None";
  }

  return "";

}
