import type { Quiz } from "@/types/content";

/**
 * The capstone challenge: 12 synthesis questions, 4 from each line.
 * Passing it (with every lesson complete) unlocks the AI Scholar badge.
 */
export const finalQuiz: Quiz = {
  id: "final-challenge",
  title: "The AI Scholar Final Challenge",
  description: "Twelve harder questions that connect all three lines: how AI works, how to use it well, and how to use it responsibly.",
  kind: "final",
  passPercent: 70,
  questions: [
    /* ---- Line 1: AI Fundamentals ---- */
    {
      id: "xq-1",
      prompt: "A school uses a program that flags late assignments using a rule a teacher typed in: \"if submitted after the due date, mark late.\" Another program learned to predict which students might need extra help by studying thousands of past records. Which statement is accurate?",
      options: [
        { id: "a", text: "Both are machine learning because both run on computers" },
        { id: "b", text: "Only the second one learned its behavior from data, which is what makes it machine learning" },
        { id: "c", text: "Only the first one is AI, because it follows exact rules" },
        { id: "d", text: "Neither could be called AI" },
      ],
      correctOptionId: "b",
      explanation: "Machine learning systems learn patterns from examples instead of following rules a person wrote by hand. The late-work checker simply follows a programmed rule.",
    },
    {
      id: "xq-2",
      prompt: "A model trained to recognize plant diseases worked well in testing but performs poorly on photos from a new farm with different lighting and plant varieties. What is the most likely cause?",
      options: [
        { id: "a", text: "The training data didn't represent conditions like those at the new farm" },
        { id: "b", text: "The model got tired after too many photos" },
        { id: "c", text: "The new farm's photos were too high quality" },
      ],
      correctOptionId: "a",
      explanation: "Models learn from the examples they're trained on. When real-world data looks different from the training data, accuracy often drops.",
    },
    {
      id: "xq-3",
      prompt: "Which description best matches how a large language model produces an answer?",
      options: [
        { id: "a", text: "It looks up the answer in a database of verified facts" },
        { id: "b", text: "It understands the question exactly the way a human expert does" },
        { id: "c", text: "It copies a full answer written by a person somewhere online" },
        { id: "d", text: "It generates text by repeatedly predicting a likely next token based on patterns learned in training" },
      ],
      correctOptionId: "d",
      explanation: "LLMs produce text one token at a time based on learned statistical patterns. That makes them fluent, but fluency doesn't guarantee accuracy.",
    },
    {
      id: "xq-4",
      prompt: "In a neural network, what happens to the connection weights during training?",
      options: [
        { id: "a", text: "They are typed in by a programmer one by one" },
        { id: "b", text: "They are gradually adjusted to reduce the network's errors on training examples" },
        { id: "c", text: "They stay the same, and only the input data changes" },
        { id: "d", text: "They are deleted once the network reaches 100% accuracy" },
      ],
      correctOptionId: "b",
      explanation: "Training repeatedly nudges the weights so the network's outputs get closer to the correct answers. No one sets each weight by hand.",
    },

    /* ---- Line 2: AI Tools & Techniques ---- */
    {
      id: "xq-5",
      scenario: "Leo asks an assistant: \"Summarize the causes of World War I.\" He gets a long, college-level essay that doesn't help him study for his 9th-grade quiz.",
      prompt: "Which revision applies the GCFL checklist best?",
      options: [
        { id: "a", text: "\"Summarize the causes of World War I. Make it better this time.\"" },
        { id: "b", text: "\"You are a world-famous history professor. Summarize WWI.\"" },
        { id: "c", text: "\"Help me study for a 9th-grade quiz on WWI causes. List the 4 main causes as bullets with one simple sentence each, then give me 3 practice questions.\"" },
        { id: "d", text: "\"WWI causes, short.\"" },
      ],
      correctOptionId: "c",
      explanation: "C states the goal (study for a quiz), context (9th grade), format (4 bullets + 3 questions) and limits (one simple sentence each).",
    },
    {
      id: "xq-6",
      prompt: "You're in a very long chat, and the assistant has stopped following instructions you gave near the beginning. What best explains this?",
      options: [
        { id: "a", text: "Earlier parts of a long conversation can fall outside or get less attention within the model's context window" },
        { id: "b", text: "The assistant got annoyed with you" },
        { id: "c", text: "Assistants can only remember your first message" },
      ],
      correctOptionId: "a",
      explanation: "A model can only consider a limited amount of text at once. Restating key instructions or starting a new chat with a summary usually helps.",
    },
    {
      id: "xq-7",
      scenario: "An AI answer about a historical event includes a quote, a date and a statistic. You can confirm the quote and date in two reliable sources, but the statistic appears nowhere else.",
      prompt: "What's the best decision?",
      options: [
        { id: "a", text: "Keep everything, since most of it checked out" },
        { id: "b", text: "Throw out the whole answer, since part of it was wrong" },
        { id: "c", text: "Ask the AI to double-check the statistic, and use it if it says it's correct" },
        { id: "d", text: "Use the verified quote and date from the reliable sources, and drop or replace the unverified statistic" },
      ],
      correctOptionId: "d",
      explanation: "Verify claim by claim. Keep what reliable sources support, cite those sources, and don't use anything you can't confirm.",
    },
    {
      id: "xq-8",
      prompt: "Which plan shows the best use of AI on a large research project?",
      options: [
        { id: "a", text: "Ask AI to write the entire project, then read it once before submitting" },
        { id: "b", text: "Use AI to help plan stages and brainstorm search terms, then find and read real sources yourself and check each step" },
        { id: "c", text: "Avoid planning and ask AI for help only the night before it's due" },
        { id: "d", text: "Use AI-generated citations so you don't need to visit the library" },
      ],
      correctOptionId: "b",
      explanation: "Breaking the task into steps and using AI for planning support keeps you doing the real research and thinking — and lets you check work at each checkpoint.",
    },

    /* ---- Line 3: Ethical & Responsible AI ---- */
    {
      id: "xq-9",
      prompt: "A chatbot confidently describes a court case that, after searching, you discover never happened. What is this called, and what's the right lesson?",
      options: [
        { id: "a", text: "A hallucination — fluent, confident output can still be false, so verify important claims" },
        { id: "b", text: "A virus — the chatbot has been hacked" },
        { id: "c", text: "Bias — the chatbot prefers certain court cases" },
        { id: "d", text: "A deepfake — the chatbot is creating fake videos" },
      ],
      correctOptionId: "a",
      explanation: "When an AI generates false information presented as fact, it's called a hallucination. The confident tone is not evidence that it's true.",
    },
    {
      id: "xq-10",
      scenario: "A company trains a résumé-screening tool on its past hiring decisions. In the past, the company mostly hired people from a small number of schools.",
      prompt: "What is the biggest risk?",
      options: [
        { id: "a", text: "The tool will be too slow to use" },
        { id: "b", text: "The tool will reject every applicant" },
        { id: "c", text: "The tool may learn to favor applicants who resemble past hires, repeating an unfair pattern" },
      ],
      correctOptionId: "c",
      explanation: "AI learns patterns from its training data, including unfair ones. Skewed historical data can lead to biased predictions, which is why human review and fairness testing matter.",
    },
    {
      id: "xq-11",
      prompt: "Your teacher allows AI for brainstorming but requires you to disclose any AI use. You used an assistant to generate topic ideas, then wrote the essay yourself. What should you do?",
      options: [
        { id: "a", text: "Say nothing, since you wrote the essay yourself" },
        { id: "b", text: "Follow the teacher's instructions to disclose how you used AI, using the citation or disclosure format they require" },
        { id: "c", text: "Claim you didn't use AI at all" },
        { id: "d", text: "List the AI as a co-author of the essay" },
      ],
      correctOptionId: "b",
      explanation: "Academic integrity means following your teacher's policy and being honest about how you used AI. Style guides like MLA and APA offer formats when citation is required.",
    },
    {
      id: "xq-12",
      prompt: "Which situation MOST clearly requires a human to make the final decision rather than relying on an AI system alone?",
      options: [
        { id: "a", text: "Choosing a playlist for studying" },
        { id: "b", text: "Suggesting synonyms for a word in your essay" },
        { id: "c", text: "Sorting your notes into folders by topic" },
        { id: "d", text: "Deciding whether a student should be suspended based on an AI's behavior report" },
      ],
      correctOptionId: "d",
      explanation: "High-stakes decisions that affect people's lives and rights need human judgment, context and accountability. AI can inform such decisions, but a person must stay responsible.",
    },
  ],
};
