const pretify = (resp) => {
  let cleanedString = resp.replace("```json", "");
  let secondclean = cleanedString.replace("```", "").trim();
  let jsondata = JSON.parse(secondclean);
  // let parsedJSON = JSON.parse(cleanedString);
  return jsondata;
};

module.exports = { pretify };
