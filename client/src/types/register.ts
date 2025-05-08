
export interface  RegisterData {

    name : string;
    email : string;
    password : string;
    role : "recruiter" | "jobseeker";
    profileImage?: string;
    resume?: string;

}