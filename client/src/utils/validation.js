import * as yup from 'yup';

export default yup.object({
  firstName: yup
    .string('Enter valid name')
    .min(2, 'Name should be of minimum 2 characters length')
    .required('Name is required'),
  lastName: yup
    .string('Enter valid last name')
    .min(2, 'Last name should be of minimum 2 characters length')
    .required('Last name is required'),
  country: yup
    .string('Enter valid country')
    .min(2, 'Country should be of minimum 2 characters length')
    .required('Country is required'),
  role: yup
    .string('Enter valid role')
    .min(2, 'Role should be of minimum 2 characters length')
    .required('Role is required'),
  gender: yup.string().required('Gender is required'),
  email: yup.string('Enter email').email('Enter a valid email'),
});