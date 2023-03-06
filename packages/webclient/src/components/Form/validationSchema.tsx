import * as Yup from 'yup';

const regMatch = /^((http|https):\/\/)?(www.)?(?!.*(http|https|www.))[a-zA-Z0-9_-]+(\.[a-zA-Z]+)+(\/)?.([\w\?[a-zA-Z-_%\/@?]+)*([^\/\w\?[a-zA-Z0-9_-]+=\w+(&[a-zA-Z0-9_]+=\w+)*)?$/;

const validationSchema = Yup.object({
    title: Yup.string()
        .max(15, 'Must be 15 characters or less')
        .required('Please provide a title'),
    description: Yup.string().min(20, 'Must contain atleast 20 characters')
        .max(255, 'Must be 255 characters or less')
        .required('Please provide a description'),
    customerLink: Yup
        .string()
        .matches(regMatch, "Website should be a valid URL").required('You must add a link to the website'),

})

export default validationSchema;