


const validationSchema = Yup.object().shape({
    firstName: Yup.string().matches(nameRegexWithSpaces, "Only English letters").required(String(required)),
    lastName: Yup.string().matches(nameRegexWithSpaces, "Only English letters").required(String(required)),
    email: Yup.string().email("Invalid email address").matches(emailRegex, "Only English letters").required(String(required)),
    phone: Yup.string().matches(phoneRegex, "Invalid phone number").required(String(required)),
    city: Yup.string().ensure().required(String(required)),
    degree: Yup.string().matches(nameRegexWithSpaces, "Only English letters").required(String(required)),
    subject: Yup.string().matches(nameRegexWithSpaces, "Only English letters").required(String(required)),
    career: Yup.string().matches(nameRegexWithSpaces, "Only English letters").required(String(required)),
    age: Yup.string().required(String(required)),
    company: Yup.string().matches(nameRegexWithSpaces, "Only English letters").required(String(required)),
    imageUrl: Yup.string().required(String(required)),
    gender: Yup.string().required(String(required)),
});