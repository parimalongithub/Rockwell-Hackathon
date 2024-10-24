const { GoogleGenerativeAI } = require("@google/generative-ai");
const { pretify } = require("../Common/pretify");
const dotenv = require("dotenv");
dotenv.config();

const genAImodel = async (prompt) => {
  const genAI = new GoogleGenerativeAI(process.env.API_KEY);
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    systemInstruction:
      "You are given a prompt of customer response. You have to decide which department to notify among 'Technical', 'HR', 'Customer Service' or 'miscellaneous'. Give the name of department, reply to customer, suggest solution for backend employees to make their work easy, determine priority, and sentiment of query according to the json format provided. Don't ask them for additional details tell them the said department will contact them at the earliest. The json field format should be in this format : {department, reply, solution_for_backend, priority:['None', 'Low', 'Medium', 'High'], querySentiment:['Positive','Negative','Neutral']} give only word for priority and sentiment. ",
  });
  const result = await model.generateContent([prompt]);
  resp = result.response.text();
  return pretify(resp);
};

module.exports = genAImodel;
