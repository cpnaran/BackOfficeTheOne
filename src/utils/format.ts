import dayjs from "dayjs";
require("dayjs/locale/th");
const buddhistEra = require("dayjs/plugin/buddhistEra");
dayjs.extend(buddhistEra);
export const numberWithCommas = (number: number): string => {
    return number.toLocaleString();
  };
  
  export const numberTwoDecimalWithCommas = (
    number: number,
    locale = "th"
  ): string => {
    return number.toLocaleString(locale, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };


  export function parseCurrencyToNumber(currency: string): string {
  return parseFloat(currency.replace(/,/g, "")).toString();
}



// format https://day.js.org/docs/en/display/format, https://day.js.org/docs/en/plugin/buddhist-era
// BBBB thai year
export function dateFormat(date: string | Date, format: string) {
   if(dayjs(date).locale("th").format(format) === "Invalid Date"){
    return "-"
   }else{
      return  dayjs(date).locale("th").format(format);
   }
 
}


export const dateStringShortFormat = (date: Date, locale = "th"): string => {
  return date.toLocaleDateString(locale, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};
export const dateStringLongFormat = (date: Date, locale = "th"): string => {
  return date.toLocaleDateString(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};


export const dateStringLongWithTimeFormat = (
  date: Date,
  locale = "th"
): string => {
  return (
    dateStringLongFormat(date) +
    " " +
    date.toLocaleTimeString(locale, { hour: "2-digit", minute: "2-digit" }) +
    " น."
  );
};


export const getInputOriginalValue = <T extends Record<string, any>>(
  data: T,
  path: string
): any => {
  const keys = path.split(".");
  let result: any = data;

  for (const key of keys) {
    if (result[key] === undefined) {
      return undefined;
    }
    result = result[key];
  }

  return result;
};