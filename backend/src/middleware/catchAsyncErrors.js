/**
 * this async handler for catching error may occur during execution of "theFunc" 
 * if error occur and we can not catch or handle it 
 * then it may stop server.
 * 
 * so in  this 
 * 
 * we use promise class and if error occur we send message and 
 * do not stop server 
 */

export default (theFunc) => (req, res, next) => {
  Promise.resolve(theFunc(req, res, next)).catch(next);
};
