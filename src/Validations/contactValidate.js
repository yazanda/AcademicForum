
export function nameValidator(name) {
    if (!name) return "Name can't be empty."
    const regex = /^[A-Za-z\s]+$/;
    if(!regex.test(name)) 
        return 'Name should contain only characters.'
    return ''
}

export function emailValidator(email) {
    const re = /\S+@\S+\.\S+/
    if (!email) return "Email can't be empty."
    if (!re.test(email)) return 'Ooops! We need a valid email address.'
    return ''
}

export function messageValidator(message) {
    if (!message) return "Message can't be empty."
    return ''
}

export function subjectValidator(subject) {
    if (!subject) return "Please select a subject."
    return ''
}
// export function phoneNumberValidator(input) {
//     let number = "";
//     if (!input) return "Phone number can't be empty.";
//     if (typeof input === "string" || input instanceof String) number = input;
//     else number = input.toString();
//     var phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
//     if (phoneno.test(number)) {
//       if (number.length < 10)
//         return "phone number must be at least 10 numbers long.";
//       return "";
//     } else {
//       return "Not a valid Phone Number";
//     }
// }

