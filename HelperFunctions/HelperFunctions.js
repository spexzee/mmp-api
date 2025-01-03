const isValidPhoneNumber = (phoneNumber) => {
  console.log(11111)
  const phoneRegex = /^[+]?[0-9]{10,15}$/;
  const res= phoneRegex.test(phoneNumber);
  console.log(222,res)
  return res
};

const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const HelperFunctions = { isValidPhoneNumber, isValidEmail };

export default HelperFunctions;
