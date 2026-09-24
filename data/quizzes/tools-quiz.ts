import type { Quiz } from "@/types/content";

export const toolsQuiz: Quiz = {
  id: "tools-quiz",
  title: "Line 2 Quiz: AI Tools & Techniques",
  description: "Put your prompting, planning and fact-checking skills to work in realistic school situations.",
  kind: "module",
  moduleId: "ai-tools",
  passPercent: 70,
  questions: [
    {
      id: "tq-1",
      prompt: "Why might an AI assistant give a different answer when you ask the exact same question twice?",
      options: [
        { id: "a", text: "It has learned from your first question and changed its mind" },
        { id: "b", text: "It is searching a different website each time" },
        { id: "c", text: "It's broken and needs to be restarted" },
        { id: "d", text: "Many assistants include some randomness when choosing each next token" },
      ],
      correctOptionId: "d",
      explanation: "Language models generate text by choosing likely next tokens, often with some randomness. That makes responses vary between runs — and it's another reason to verify important answers.",
    },
    {
      id: "tq-2",
      prompt: "Which prompt includes all four parts of Goal, Context, Format and Limits?",
      options: [
        { id: "a", text: "\"Explain the French Revolution in detail.\"" },
        { id: "b", text: "\"I'm in 10th-grade world history. Help me review the causes of the French Revolution as a 5-row table, using simple language and under 150 words.\"" },
        { id: "c", text: "\"French Revolution causes, table please.\"" },
        { id: "d", text: "\"You are the smartest historian ever. Tell me about France.\"" },
      ],
      correctOptionId: "b",
      explanation: "B names the goal (review causes), context (10th-grade world history), format (5-row table) and limits (simple language, under 150 words). The others are missing multiple parts.",
    },
    {
      id: "tq-3",
      scenario: "Priya pastes her lab report into an AI assistant and types: \"Fix this.\" The assistant rewrites the whole report in a style that doesn't sound like her.",
      prompt: "What would have been a better prompt?",
      options: [
        { id: "a", text: "\"Fix this better.\"" },
        { id: "b", text: "\"Rewrite this so it gets an A.\"" },
        { id: "c", text: "\"Point out up to 5 unclear sentences or missing parts in my conclusion, but don't rewrite them — I'll fix them myself.\"" },
      ],
      correctOptionId: "c",
      explanation: "C gives a specific goal and a clear limit (don't rewrite), so Priya gets feedback while keeping her own voice and doing the learning.",
    },
    {
      id: "tq-4",
      prompt: "You have a big multi-part project. According to the task-breakdown approach, what's the main reason to ask AI for help one step at a time?",
      options: [
        { id: "a", text: "Smaller outputs are easier to check, and you stay in control of the decisions" },
        { id: "b", text: "AI tools can only handle very short prompts" },
        { id: "c", text: "It uses up more of the AI's free messages" },
        { id: "d", text: "Teachers can't detect AI use in small pieces" },
      ],
      correctOptionId: "a",
      explanation: "Focused requests produce focused answers you can verify at each checkpoint, and you make the important choices along the way.",
    },
    {
      id: "tq-5",
      prompt: "Which use of AI is MOST likely to improve your understanding before a chemistry test?",
      options: [
        { id: "a", text: "Having it complete your practice worksheet so you can memorize the answers" },
        { id: "b", text: "Asking it to quiz you on your class notes and explain the questions you miss" },
        { id: "c", text: "Asking it to predict which questions will be on the test" },
        { id: "d", text: "Having it summarize the chapter so you can skip reading" },
      ],
      correctOptionId: "b",
      explanation: "Being quizzed on your own notes uses active recall, and explanations of mistakes target what you don't know yet. The other options let you skip the thinking.",
    },
    {
      id: "tq-6",
      scenario: "Marcus asks an AI for sources for his research paper. It lists five journal articles with authors, titles and page numbers.",
      prompt: "What should Marcus do with this list?",
      options: [
        { id: "a", text: "Copy the citations into his works cited page" },
        { id: "b", text: "Use the citations only if the author names sound real" },
        { id: "c", text: "Ask the AI to confirm each one is real" },
        { id: "d", text: "Search for each article himself and only use the ones he can find and actually read" },
      ],
      correctOptionId: "d",
      explanation: "AI can produce convincing but fake references. Only sources Marcus locates and reads himself belong in his paper; the AI's confirmation isn't independent evidence.",
    },
    {
      id: "tq-7",
      prompt: "An AI suggests code that fixes your bug, but you don't understand how it works. What's the best move?",
      options: [
        { id: "a", text: "Ask it to explain the code line by line, then test it yourself with several inputs" },
        { id: "b", text: "Submit it — if it runs, it's fine" },
        { id: "c", text: "Delete all your code and use only AI-generated code from now on" },
      ],
      correctOptionId: "a",
      explanation: "You're responsible for code you submit. Understanding it and testing it with different inputs helps you catch hidden bugs and learn the concept.",
    },
    {
      id: "tq-8",
      prompt: "Which of these is an example of lateral reading?",
      options: [
        { id: "a", text: "Reading an AI answer slowly, twice" },
        { id: "b", text: "Checking whether the AI answer has any spelling mistakes" },
        { id: "c", text: "Opening new tabs to see what reliable sources say about a claim in the AI answer" },
        { id: "d", text: "Asking the AI to rate its own confidence" },
      ],
      correctOptionId: "c",
      explanation: "Lateral reading means leaving the original text to check it against other trustworthy sources, rather than judging it from the inside.",
    },
  ],
};
