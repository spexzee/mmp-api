const isValidPhoneNumber = (phoneNumber) => {
  const phoneRegex = /^[+]?[0-9]{10,15}$/;
  const res= phoneRegex.test(phoneNumber);
  return res
};

const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const HelperFunctions = { isValidPhoneNumber, isValidEmail };

export default HelperFunctions;
