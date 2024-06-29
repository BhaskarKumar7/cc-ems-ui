import { JobRole } from "./JobRole";
import { Department } from "./Department";
import { BankDetails } from "./BankDetails";
import { Address } from "./Address";

export class Employee   {
    ctc: number = 0;
    employeeId: number = 0;
    firstName: string = '';
    lastName: string = '';
    day: number = 0;
    month: number = 0;
    year: number = 0;
    gender: string = '';
    email: string = '';
    mobileNumber: string = '';
    panNumber: string = '';
    universalAccountNumber: string = '';
    hiredDate: string = '';
    jobRole: JobRole = new JobRole();
    address: Address = new Address();
    department: Department = new Department();
    bankDetails: BankDetails = new BankDetails();
}