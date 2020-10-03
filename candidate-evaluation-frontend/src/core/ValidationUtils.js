export class ValidationUtils {

    isMobileNumberValid(ph) {
      const regX = new RegExp(/^[0-9]{10,10}$/)
      return regX.test(ph)
    }
  
    isEmailValid(email) {
      const regX = new RegExp(/^[a-zA-Z0-9_]+(\.[_a-zA-Z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$/)
      return regX.test(email)
    }
  
    isEmpty(str) {
      return (!str || str.length === 0) ? true : false
    }
  
  }