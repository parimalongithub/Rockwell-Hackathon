const { GoogleGenerativeAI } = require("@google/generative-ai");
const { pretify } = require("../Common/pretify");
const dotenv = require("dotenv");
dotenv.config();

const SummarygenAImodel = async (prompt) => {
  const genAI = new GoogleGenerativeAI(process.env.API_KEY);
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    systemInstruction:
      "You will be given a large prompt with large number of queries concanated together you have to study those queries and give a summary of the queries point wise in a json format like {summary} where summary is only one field and contains the negatives from the query in a single paragraph if multiple queries related to same problem exists than mention it in one point try to make the summary concise",
  });
  const result = await model.generateContent([prompt]);
  resp = result.response.text();
  return pretify(resp);
};

module.exports = SummarygenAImodel;
