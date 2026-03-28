//Gemini API
const {GoogleGenAI} = require("@google/genai");
const {z} = require("zod");
const {zodToJsonSchema} = require("zod-to-json-schema");
const {resume, selfDescription, jobDescription} = require("./temp");

const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_GENAI_API_KEY
});

//--------------takes resume, self describe and job describe as input and returns the interview report--------------------

//in accordance to "interviewReportSchema" in "interviewReport.model.js"
const interviewReportSchema = z.object({
    matchScore: z.number().describe("The match score between 0 and 100 indicating how well the candidate's resume and self describe match the job describe"),

    technicalQuestions : z.array(z.object({
        question: z.string().describe("The technical question asked during the interview"),
        intension: z.string().describe("The intension of interviewer behind asking this question"),
        answer: z.string().describe("How to answer this question, what points to cover, what approach to take, etc.")
    })).describe("Technical questions that are likely to be asked in the interview along with the intension of interviewer and how to answer them"),

    behaviouralQuestions : z.array(z.object({
        question: z.string().describe("The behavioural question asked during the interview"),
        intension: z.string().describe("The intension of interviewer behind asking this question"),
        answer: z.string().describe("How to answer this question, what points to cover, what approach to take, etc.")
    })).describe("Behavioural questions that are likely to be asked in the interview along with the intension of interviewer and how to answer them"),

    skillGaps : z.array(z.object({
        skill: z.string().describe("The skill that the candidate is lacking based on the resume and self describe"),
        severity: z.enum(['low', 'medium', 'high']).describe("The severity of the skill gap, whether it is a minor gap or a major gap that needs to be addressed")
    })).describe("Skill gaps that the candidate needs to work on based on the resume and self describe"),

    preparationPlan : z.array(z.object({
        day: z.number().describe("The day number in the preparation plan, starting from 1"), 
        focus: z.string().describe("The main focus of the preparation for that day, e.g. technical questions, behavioural questions, etc."),
        tasks: z.array(z.string()).describe("The specific tasks to be done on that day to prepare for the interview, e.g. concepts to be learnt, practice coding questions, mock interviews, etc.")
    })).describe("A day-wise preparation plan for the candidate to prepare for the interview, including the focus and specific tasks for each day")

}).describe("The interview report containing technical questions, behavioural questions, skill gaps and preparation plan for the candidate based on the resume, self describe and job describe");


async function generateInterviewReport({resume, selfDescription, jobDescription}){
    const prompt = `

    Generate an interview report for a candidate based on:
    Resume: ${resume}
    Self description: ${selfDescription}
    Job description: ${jobDescription}

    Return output in JSON format with this EXACT structure:
    {
        "matchScore": <number 0-100>,
        "technicalQuestions": [
            {"question": "...", "intension": "...", "answer": "..."},
            ...
        ],
        "behaviouralQuestions": [
            {"question": "...", "intension": "...", "answer": "..."},
            ...
        ],
        "skillGaps": [
            {"skill": "...", "severity": "low|medium|high"},
            ...
        ],
        "preparationPlan": [
            {
                "day": 1, 
                "focus": "...", 
                "tasks": [
                    "...", 
                    "..."
                ]   
            },
            ...
        ]
    }

    Please ensure to: 
    - Include 3-5 technical questions with detailed answers
    - Include 2-4 behavioral questions with detailed answers
    - Include a 4 or 5-day preparation plan with specific tasks for EACH day
    - tasks array MUST contain actual task description strings defining what the candidate needs to do, not empty or placeholders
    `;
    
    
    const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: [{
            role: "user",
            parts: [{text: prompt}]
        }],
        generationConfig: {
            responseMimeType: "application/json",
            responseSchema: zodToJsonSchema(interviewReportSchema),
        },
    });
        
    // Extract JSON from markdown-wrapped response
    const jsonStart = response.text.indexOf('{');
    const jsonEnd = response.text.lastIndexOf('}');
    const jsonString = response.text.substring(jsonStart, jsonEnd + 1);
    
    const report = interviewReportSchema.parse(JSON.parse(jsonString));
    return report;

}

//to check if the API is working fine
//NOTE: Structured output is required, so choose a model that way.
// async function invokeGeminiAi() {
//     const response = await ai.models.generateContent({
//         model: "gemini-2.5-flash",
//         contents: "Hello gemini! Explain what is interview? ",
//     });

//     console.log(response.text);
// }

module.exports = generateInterviewReport;