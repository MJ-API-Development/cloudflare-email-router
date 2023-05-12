export default {
  /**
   *  this function routes emails and send notifications about the emails to my backend
   * @param {email message} message 
   * @param {*} env 
   * @param {*} ctx 
   */
  async email(message, env, ctx) {
    const {email_domains} = env;
    const allowedDomains = email_domains.split(",");
    const fromAddress = message.headers.get("from");
    const domain = fromAddress.substring(fromAddress.lastIndexOf("@") + 1);

    const body = message.text || message.body;
    const {int_terms} = env;
    const interesting_terms = int_terms.split(",")
    const body_contains_interesting_information = await search_body(body, interesting_terms);

    if (allowedDomains.includes(domain) || body_contains_interesting_information) {
      const {email_notifications_endpoint} = env;
      await fetch(email_notifications_endpoint, {
        body: `Got an email from ${fromAddress}, subject: ${message.headers.get('subject')}`,
      });
      
    } 
      await message.forward(gmail_address);    
  }
}

async function search_body(body, search_strings) {
  /**
   * If this function finds any important word in the document body then it will return true
   */
  for (let search_string of search_strings) {
    if (body.toLowerCase().includes(search_string.toLowerCase())) {
      return true;
    }
  }
  return false;
}
