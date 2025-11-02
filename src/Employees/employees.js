import {
    maleCzechLastnames,
    femaleCzechLastnames,
    maleCzechNames,
    femaleCzechNames,
    workload
} from "./employeeBlueprint.js";


export class Employees {

    generateEmployees(dtoIn) {
        const dtoOut = []
        for (let counter = 0; counter < dtoIn.count; counter++) {
            const gender = Math.random() < 0.5 ? 'male' : 'female'
            const name = this.#getNameForGender(gender)
            const lastname = this.#getLastnameForGender(gender)
            const workload = this.#getWorkload()
            const age = this.#getAge(dtoIn).toISOString()
            dtoOut.push({gender: gender, birthdate: age, name: name, surname: lastname, workload: workload})
        }
        return dtoOut
    }

    #getNameForGender(gender) {
        if (gender === 'male') {
            return maleCzechNames[Math.floor(Math.random() * maleCzechNames.length)]
        } else {
            return femaleCzechNames[Math.floor(Math.random() * maleCzechNames.length)]
        }
    }

    #getLastnameForGender(gender) {
        if (gender === 'male') {
            return maleCzechLastnames[Math.floor(Math.random() * maleCzechLastnames.length)]
        } else {
            return femaleCzechLastnames[Math.floor(Math.random() * maleCzechLastnames.length)]
        }
    }

    #getWorkload() {
        return workload[Math.floor(Math.random() * workload.length)]
    }

    #getAge(input) {
        const now = new Date()

        const maxDate = new Date(
            now.getFullYear() - input.age.min,
            now.getMonth(),
            now.getDate()
        );

        const minDate = new Date(
            now.getFullYear() - input.age.max,
            now.getMonth(),
            now.getDate(),
        );

        return new Date(minDate.getTime() + Math.random() * (maxDate.getTime() - minDate.getTime()));
    }

    describeEmployees(employeeList) {
        const names = this.#getNames(employeeList)
        const chartNames = this.#chartNames(names)
        return {
            names: {
                all: this.#sortNames(names.all),
                male: this.#sortNames(names.male),
                female: this.#sortNames(names.female),
                femalePartTime: this.#sortNames(names.femalePartTime),
                maleFullTime: this.#sortNames(names.maleFullTime),
            },
            chartData: {
                all: chartNames.all,
                male: chartNames.male,
                female: chartNames.female,
                femalePartTime: chartNames.femalePartTime,
                maleFullTime: chartNames.maleFullTime
            }
        }
    }

    #getNames(employeeList) {
        const names = {
            all: {},
            male: {},
            female: {},
            femalePartTime: {},
            maleFullTime: {}
        }

        employeeList.forEach(employee => {
            names.all = this.#describeGender(employee, names.all)
            if (employee.gender === 'male') {
                names.male = this.#describeGender(employee, names.male)
                names.maleFullTime = this.#describeMaleWorkloads(employee, names.maleFullTime)
            } else {
                names.female = this.#describeGender(employee, names.female)
                names.femalePartTime = this.#describeFemalePartTime(employee, names.femalePartTime)
            }
        })
        return names;
    }

    #describeFemalePartTime(employee, workloads = {}) {
        if (employee.workload !== 40) {
            return this.#describeGender(employee, workloads)
        }
        return workloads;
    }

    #describeMaleWorkloads(employee, workloads = {}) {
        if (employee.workload === 40) {
            return this.#describeGender(employee, workloads)
        }
        return workloads;
    }

    #describeGender(employee, all = {}) {
        if (all[employee.name] === undefined) {
            return {...all, [employee.name]: 1}
        } else {
            return {...all, [employee.name]: all[employee.name] + 1}
        }
    }

    #chartNames(names) {
        const chartData = {
            all: [],
            male: [],
            female: [],
            femalePartTime: [],
            maleFullTime: []
        }
        chartData.all = this.#mapData(names.all)
        chartData.male = this.#mapData(names.male)
        chartData.female = this.#mapData(names.female)
        chartData.femalePartTime = this.#mapData(names.femalePartTime)
        chartData.maleFullTime = this.#mapData(names.maleFullTime)

        return chartData;
    }

    #mapData(data) {
        return Object.entries(data)
            .map(([label, value]) => ({label, value}))
            .sort((a, b) => b.value - a.value);
    }

    #sortNames(names) {
        return Object.fromEntries(
            Object.entries(names).sort(([, a], [, b]) => b - a))
    }
}
