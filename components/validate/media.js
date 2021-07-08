
// legende is as stringified Array like
// {
//     locale: string;
//     value: string;
// }[]
export function validateMediaLegende(inputLegende){

    try {
        return Array.isArray(inputLegende)
    } catch (error) {
        console.log("ValidateMedia : ", error)
        return false
    }
    
}