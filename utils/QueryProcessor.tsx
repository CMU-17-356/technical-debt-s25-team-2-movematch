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


  const parseMathQuery = (query: string): string => {
    // Define the mapping from words to operators
    const operatorMapping: Record<string, string> = {
      "plus": "+",
      "minus": "-",
      "multiplied by": "*",
      "divided by": "/",
      "to the power of": "^",
      "sqrt": "sqrt"
    };
  
    // Clean up the query by removing the question part ("What is ...?")
    const cleanQuery = query.replace(/^What is /i, '').trim();
  
    // Replace operators in the query with their corresponding symbols
    let expression = cleanQuery.toLowerCase();
  
    for (let [word, operator] of Object.entries(operatorMapping)) {
      expression = expression.replace(new RegExp(word, 'g'), operator);
    }
  
    // Now split the expression based on operators to isolate numbers and operators
    const parts = expression.split(/([+\-*/^])/).map(part => part.trim()).filter(Boolean);
  
    // Handle special cases like "to the power of" which was already mapped, and return the expression
    console.log("Parsed expression:", parts.join(" ")); // You can log the expression for debugging
  
    // After splitting, evaluate the expression
    try {
      // Evaluating the expression (be cautious with eval in production)
      const result = eval(parts.join(''));
      return `${result}`;
    } catch (error) {
      return "none"
    }
  };
  
  const result = parseMathQuery(query);

  if (!(result === "none")) {
    return result
  }

  console.log("Nothing found to answer question...")
  return "";

}
