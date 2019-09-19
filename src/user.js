export default class user {
    constructor() {
  
    }
  
    getName() {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve('花花');
        }, 2000)
      })
    }
  }