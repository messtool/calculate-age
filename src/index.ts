const ERR_MSG_PREFIX = "[@messtool/calculate-age]: ";

interface Result {
  age: number;
  years: number;
}

function calculateAge(birth: Date, blocking: Date = new Date()): Result {
  if (!(birth instanceof Date) || !(blocking instanceof Date)) {
    throw new TypeError(
      `${ERR_MSG_PREFIX}'birth' and 'blocking' params must be 'Date' Objects.`
    );
  }

  if (blocking.getTime() - birth.getTime() < 0) {
    throw new RangeError(
      `${ERR_MSG_PREFIX}'blocking' mustn't earlier than birth.`
    );
  }

  let sYear, sMonth, sDate, eYear, eMonth, eDate;

  sYear = birth.getFullYear();
  sMonth = birth.getMonth() + 1;
  sDate = birth.getDate();

  eYear = blocking.getFullYear();
  eMonth = blocking.getMonth() + 1;
  eDate = blocking.getDate();

  const result: Result = {
    age: 0,
    years: 0
  };

  if (eMonth > sMonth || (eMonth === sMonth && eDate >= sDate)) {
    result.age = result.years = eYear - sYear;
  } else {
    result.age = result.years = eYear - sYear - 1; // less than one year.
  }

  return result;
}

export default calculateAge;
