import type { Quiz } from "@/types/content";

export const scenariosQuiz: Quiz = {
  id: "real-world-scenarios",
  title: "What Would You Do? Real-World AI Scenarios",
  description: "Eight realistic high-school situations. There's no memorizing here — pick the choice that uses AI skillfully and responsibly.",
  kind: "scenario",
  passPercent: 70,
  questions: [
    {
      id: "sq-1",
      scenario:
        "Your group has a slideshow due tomorrow. One member pastes a chatbot's answer into the slides, including a statistic attributed to \"a 2021 university study.\" No one can find the study online.",
      prompt: "What's the best choice?",
      options: [
        { id: "a", text: "Keep it — the chatbot must have gotten it from somewhere." },
        { id: "b", text: "Remove the statistic or replace it with one from a source your group has actually found and read." },
        { id: "c", text: "Keep it but change \"2021\" to \"recent\" so it's harder to check." },
        { id: "d", text: "Ask the chatbot again and use whichever answer sounds more confident." },
      ],
      correctOptionId: "b",
      explanation: "A study no one can find may be a hallucination. Only use claims you can trace to a real source — making it vaguer doesn't make it true.",
    },
    {
      id: "sq-2",
      scenario:
        "You're drafting a college application essay about a challenge you overcame. A friend suggests letting AI write the whole thing because \"everyone does it and it'll sound more impressive.\"",
      prompt: "What's the best choice?",
      options: [
        { id: "a", text: "Write the essay in your own words, and use AI (if allowed) only for feedback like spotting unclear sentences." },
        { id: "b", text: "Have AI write it, then add one personal detail so it feels authentic." },
        { id: "c", text: "Have AI write several versions and submit the best one." },
      ],
      correctOptionId: "a",
      explanation: "An application essay is supposed to show your voice and experiences, and many applications ask you to certify it's your own work. Feedback keeps the writing yours; AI-written drafts don't.",
    },
    {
      id: "sq-3",
      scenario:
        "A friend sends your group chat a realistic audio clip of your principal announcing school is canceled tomorrow. It came from an account none of you recognize, and the school website says nothing.",
      prompt: "What's the best choice?",
      options: [
        { id: "a", text: "Forward it to everyone — if it's real, people need to know." },
        { id: "b", text: "Assume it's real because the voice sounds exactly right." },
        { id: "c", text: "Don't forward it; check the school's official channels and let your friends know it's unverified." },
        { id: "d", text: "Post it publicly and ask people to vote on whether it's real." },
      ],
      correctOptionId: "c",
      explanation: "Voices can be cloned convincingly. Official sources are the way to confirm, and not spreading unverified content stops misinformation where it starts.",
    },
    {
      id: "sq-4",
      scenario:
        "Your chemistry teacher's syllabus says nothing about AI. You're stuck on a homework set and want to use a chatbot to walk you through the problems.",
      prompt: "What's the best choice?",
      options: [
        { id: "a", text: "Use it to generate all the answers since the syllabus doesn't forbid it." },
        { id: "b", text: "Ask your teacher what's allowed; meanwhile, try the problems yourself and review your notes." },
        { id: "c", text: "Copy a classmate's answers instead, since that isn't AI." },
      ],
      correctOptionId: "b",
      explanation: "When a policy is unclear, ask. Working the problems yourself first is the part that builds your skill — and copying a classmate is an integrity problem no matter what tool is involved.",
    },
    {
      id: "sq-5",
      scenario:
        "For a computer science project, a chatbot gives you 40 lines of code that fixes your bug. You don't understand how it works, and the project is due tonight.",
      prompt: "What's the best choice?",
      options: [
        { id: "a", text: "Submit it as-is — working code is working code." },
        { id: "b", text: "Delete the comments so it looks like your own style." },
        { id: "c", text: "Submit it and hope your teacher doesn't ask about it." },
        { id: "d", text: "Check your class's AI rules, test the code, ask the AI to explain each part until you understand it, and credit the help if required." },
      ],
      correctOptionId: "d",
      explanation: "Code you don't understand can hide bugs, and submitting it as entirely your own may break class rules. Testing, understanding and crediting the help keeps you learning and honest.",
    },
    {
      id: "sq-6",
      scenario:
        "Your school club gets 80 applications for 10 leadership spots. The club president suggests using an AI tool trained on past leaders' applications to automatically pick the winners, with no one reading the applications.",
      prompt: "What's the best choice?",
      options: [
        { id: "a", text: "Go ahead — AI is more objective than people." },
        { id: "b", text: "Let the AI pick, but only for applicants the officers don't know personally." },
        { id: "c", text: "Point out that past selections may carry bias into the tool, and make sure people review every application and make the final decisions." },
      ],
      correctOptionId: "c",
      explanation: "A tool trained on past choices can repeat past patterns, including unfair ones. Decisions about people need human review and accountability.",
    },
    {
      id: "sq-7",
      scenario:
        "You're using a chatbot to help write a scholarship application. It asks for more details, and you're about to paste in your full name, home address, Social Security number and your family's income documents.",
      prompt: "What's the best choice?",
      options: [
        { id: "a", text: "Share only general information about your goals and experiences, and never paste IDs, addresses or financial documents." },
        { id: "b", text: "Share everything, since the chatbot needs details to help." },
        { id: "c", text: "Share everything but delete the conversation afterward." },
        { id: "d", text: "Share only the Social Security number, since it's just a number." },
      ],
      correctOptionId: "a",
      explanation: "You can get writing help without handing over identifying or financial information. Deleting a chat from your screen doesn't guarantee the service didn't store it.",
    },
    {
      id: "sq-8",
      scenario:
        "Late at night, a friend messages you that they've been feeling really down for weeks. They say they've been talking only to a chatbot about it because it's easier than talking to people.",
      prompt: "What's the best choice?",
      options: [
        { id: "a", text: "Tell them the chatbot is enough, since it's available anytime." },
        { id: "b", text: "Listen, and encourage them to talk to a trusted adult, school counselor or professional support service — offering to help them reach out." },
        { id: "c", text: "Suggest they try a different chatbot that might give better advice." },
      ],
      correctOptionId: "b",
      explanation: "A chatbot can't know your friend, follow up, or get them real help. Supporting them in reaching a trusted person or professional is the caring and responsible choice.",
    },
  ],
};
