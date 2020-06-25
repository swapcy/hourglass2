export interface User {
    registration_date ?: string;
    last_login_date ?: string;
    last_update_date ?: string;
    uid : string;
    user_status ?:string,
    user_type ?:string,
    country ?:string,
    email : string,
    displayName: string,
    dateofBirth ?: string,
    bio?: string,
    gender?: string,
    age_group?: string,
    photoURL ?: string,
    avatar ?: string,        
    language ?: string,
    providerId ?:string,
    nlist ?: [],
    journal ?: [],
    default_location ?: {
        pin_code ?: number,
        city ?: string,
        location ?: [string, string]
    }


}