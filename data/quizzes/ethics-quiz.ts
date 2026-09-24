import type { Quiz } from "@/types/content";

export const ethicsQuiz: Quiz = {
  id: "ethics-quiz",
  title: "Line 3 Quiz: Ethical & Responsible AI",
  description: "Hallucinations, bias, privacy, academic integrity, deepfakes and human oversight — show you can use AI with integrity.",
  kind: "module",
  moduleId: "ai-ethics",
  passPercent: 70,
  questions: [
    {
      id: "eq-1",
      prompt: "Why do language models sometimes produce fake citations that look completely real?",
      options: [
        { id: "a", text: "They are programmed to trick users into trusting them." },
        { id: "b", text: "They copy citations from websites that are mostly fake." },
        { id: "c", text: "They generate text that fits the pattern of a citation, whether or not the source exists." },
        { id: "d", text: "They only make up citations when the user asks for them." },
      ],
      correctOptionId: "c",
      explanation: "Models predict likely text. A citation has a very predictable format, so a model can produce a convincing one without any real source behind it — there's no intent to deceive.",
    },
    {
      id: "eq-2",
      prompt: "An AI tool is 92% accurate overall at recognizing faces, but much less accurate for one group of people. What does this show?",
      options: [
        { id: "a", text: "Overall accuracy can hide unfair performance gaps between groups." },
        { id: "b", text: "The tool is fair because 92% is a high score." },
        { id: "c", text: "The group with lower accuracy used the tool incorrectly." },
        { id: "d", text: "Accuracy differences are impossible to measure." },
      ],
      correctOptionId: "a",
      explanation: "A single overall number can mask big differences. Fairness testing breaks results down by group so these gaps become visible.",
    },
    {
      id: "eq-3",
      prompt: "A developer removes gender from a hiring model's inputs, but the model still favors one gender. What is the most likely explanation?",
      options: [
        { id: "a", text: "The model secretly still has access to the gender column." },
        { id: "b", text: "Other inputs act as proxies that carry similar information." },
        { id: "c", text: "Bias can only come from the programmer's personal opinions." },
      ],
      correctOptionId: "b",
      explanation: "Features like activities, word choice or past job titles can correlate with gender. Deleting one column doesn't remove the pattern, which is why outcomes must be tested.",
    },
    {
      id: "eq-4",
      prompt: "Which of these is the safest thing to type into a general-purpose chatbot?",
      options: [
        { id: "a", text: "Your student ID number, so it can personalize a study plan." },
        { id: "b", text: "A screenshot of your friend's private messages, to ask for advice." },
        { id: "c", text: "Your full address, to get directions to a library." },
        { id: "d", text: "A question about how photosynthesis works for your biology test." },
      ],
      correctOptionId: "d",
      explanation: "General study questions contain no personal information. IDs, addresses and other people's private messages can identify people and may be stored by the service.",
    },
    {
      id: "eq-5",
      prompt: "Your teacher allows AI brainstorming as long as you disclose it. You used a chatbot to generate topic ideas, then researched and wrote the essay yourself. What should you do?",
      options: [
        { id: "a", text: "Nothing — brainstorming doesn't count as using AI." },
        { id: "b", text: "Add a short note explaining that you used AI to brainstorm topics, and what you did yourself." },
        { id: "c", text: "List the chatbot as a co-author of the essay." },
      ],
      correctOptionId: "b",
      explanation: "The teacher's rule requires disclosure, and a specific note is honest and clear. The AI didn't write the essay, so listing it as a co-author would misrepresent the work too.",
    },
    {
      id: "eq-6",
      prompt: "What's the most reliable way to judge whether a surprising viral video is real?",
      options: [
        { id: "a", text: "Check for visual glitches like blurry edges or strange hands." },
        { id: "b", text: "Count how many times it's been shared." },
        { id: "c", text: "Run it through one AI detector and trust the result." },
        { id: "d", text: "Find the original source and check whether credible outlets are reporting it." },
      ],
      correctOptionId: "d",
      explanation: "Visual flaws are disappearing as tools improve, popularity isn't evidence, and detectors make mistakes. Tracing the source and context is the most dependable check.",
    },
    {
      id: "eq-7",
      prompt: "Which statement best describes the current state of copyright and generative AI?",
      options: [
        { id: "a", text: "Anything an AI generates is automatically free for anyone to use for any purpose." },
        { id: "b", text: "Important questions are still being debated and the rules vary by country." },
        { id: "c", text: "AI companies are never allowed to train on any copyrighted material anywhere." },
      ],
      correctOptionId: "b",
      explanation: "Questions about training data and ownership of AI output are still being worked out by courts and governments, and answers differ between countries. That's why respecting creators and following school rules is the safe path.",
    },
    {
      id: "eq-8",
      prompt: "A hospital uses AI to flag X-rays that might show a problem. What's the most responsible way to use it?",
      options: [
        { id: "a", text: "Let the AI make final diagnoses so doctors can save time." },
        { id: "b", text: "Ignore the AI completely, since AI can make mistakes." },
        { id: "c", text: "Have qualified doctors review the flags and make the final decisions." },
        { id: "d", text: "Use the AI only for patients who agree to skip a doctor's review." },
      ],
      correctOptionId: "c",
      explanation: "AI can help doctors notice things faster, but medical decisions are high-stakes. A qualified human stays in the loop and remains accountable for the diagnosis.",
    },
  ],
};
