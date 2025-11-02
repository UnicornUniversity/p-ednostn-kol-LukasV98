import {Employees} from "./src/Employees/employees.js"

/**
 * The main function which calls the application. 
 * Please add a specific description here for the application purpose.
 * @param {object} dtoIn contains count of employees, age limit of employees {min, max}
 * @returns {object} containing the statistics
 */
export function main(dtoIn) {
  const employees = new Employees();
  return employees.describeEmployees(employees.generateEmployees(dtoIn));
}

/**
 * Please add specific description here
 * @param {object} dtoIn contains count of employees, age limit of employees {min, max}
 * @returns {Array} of employees
 */
export function generateEmployeeData(dtoIn) {
  return new Employees().generateEmployees(dtoIn);
}

/**
 * Please add specific description here
 * @param {Array} employees containing all the mocked employee data
 * @returns {object} frequencies of the employee names
 */
export function getEmployeeChartContent(employees) {
  return new Employees().describeEmployees(employees);
}

