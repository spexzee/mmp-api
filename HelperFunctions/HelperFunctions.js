const isValidPhoneNumber = (phoneNumber) => {
  const phoneRegex = /^[+]?[0-9]{10,15}$/;
  const res= phoneRegex.test(phoneNumber);
  return res
};

const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

function generateSecurePassword(length = 8) {
  const upperCaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const lowerCaseChars = 'abcdefghijklmnopqrstuvwxyz';
  const numbers = '0123456789';
  const specialChars = '!@#$%^&*()_-+=<>?';
  const allChars = upperCaseChars + lowerCaseChars + numbers + specialChars;

  if (length < 4) {
    throw new Error("Password length must be at least 4 to include all required character types.");
  }

  let password = '';

  // Ensure at least one character from each required set
  password += upperCaseChars[Math.floor(Math.random() * upperCaseChars.length)];
  password += numbers[Math.floor(Math.random() * numbers.length)];
  password += specialChars[Math.floor(Math.random() * specialChars.length)];
  password += lowerCaseChars[Math.floor(Math.random() * lowerCaseChars.length)];

  // Fill the rest of the password length with random characters from all sets
  for (let i = 4; i < length; i++) {
    password += allChars[Math.floor(Math.random() * allChars.length)];
  }

  // Shuffle the password to make it unpredictable
  password = password.split('').sort(() => Math.random() - 0.5).join('');
  
  return password;
}


const HelperFunctions = { isValidPhoneNumber, isValidEmail , generateSecurePassword };

export default HelperFunctions;
