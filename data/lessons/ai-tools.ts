/**
 * LINE 2 — AI TOOLS & TECHNIQUES
 * Practical skills for using AI assistants well: how they process requests,
 * how to prompt, how to split big tasks, and how to check what they produce.
 */
import type { Lesson } from "@/types/content";

export const aiToolsLessons: Lesson[] = [
  /* ------------------------------------------------------------------ */
  {
    id: "how-ai-assistants-work",
    moduleId: "ai-tools",
    title: "How AI Assistants Work",
    summary: "Follow a message from your keyboard through the model and back — and learn why the same question can get different answers.",
    minutes: 6,
    xp: 50,
    objectives: [
      "Describe the steps between typing a message and getting a response",
      "Explain what a context window and a knowledge cutoff are",
      "Predict when an assistant's answer might be outdated or inconsistent",
    ],
    blocks: [
      {
        type: "text",
        heading: "It feels like a conversation. It's actually a prediction loop.",
        paragraphs: [
          "When you chat with an AI assistant, it can feel like texting a very fast friend. Behind the scenes, something more mechanical is happening: your message is converted into tokens, and a language model predicts a response one token at a time.",
          "Understanding that loop helps you use assistants better. It explains why they are great at some things, why they sometimes get facts wrong, and why rephrasing a question can change the answer.",
        ],
      },
      {
        type: "diagram",
        diagram: "assistant-pipeline",
        caption: "From prompt to response: your message is combined with instructions and earlier conversation, split into tokens, and the model generates a reply token by token.",
      },
      {
        type: "steps",
        heading: "What happens when you press Send",
        steps: [
          {
            title: "Your message is packaged",
            body: "The app combines your new message with earlier messages in the chat and with hidden instructions written by the company that runs the assistant.",
          },
          {
            title: "Text becomes tokens",
            body: "The combined text is split into tokens — small chunks of words — that the model can process as numbers.",
          },
          {
            title: "The model predicts, one token at a time",
            body: "The model estimates which token is likely to come next, picks one, adds it to the text, and repeats until the response is finished.",
          },
          {
            title: "Tokens become text again",
            body: "The predicted tokens are turned back into words and shown to you — often streamed word by word as they are generated.",
          },
        ],
      },
      {
        type: "terms",
        terms: [
          {
            term: "Prompt",
            definition: "The input you give an AI tool — your question, instructions, and any text or examples you include.",
          },
          {
            term: "System instructions",
            definition: "Hidden directions set by the company or developer that shape how an assistant behaves, such as its tone and what it should refuse to do.",
          },
          {
            term: "Context window",
            definition: "The maximum amount of text (measured in tokens) a model can consider at once, including the conversation so far and its own reply.",
          },
          {
            term: "Knowledge cutoff",
            definition: "The point in time after which a model's training data stops, so it may not know about later events unless it can look them up.",
          },
        ],
      },
      {
        type: "check",
        question: {
          id: "kc-how-ai-assistants-work-1",
          prompt: "You ask an assistant about a news event from last week, and it confidently describes something that doesn't match the news. What is the most likely explanation?",
          options: [
            { id: "a", text: "The assistant is deliberately lying to you" },
            { id: "b", text: "The event may be after its knowledge cutoff, and it doesn't have a way to look it up" },
            { id: "c", text: "Your internet connection garbled the response" },
            { id: "d", text: "Assistants can never answer questions about news" },
          ],
          correctOptionId: "b",
          explanation: "A model only knows what was in its training data up to its knowledge cutoff. Without a search tool, it may generate a plausible-sounding but wrong answer instead of admitting it doesn't know.",
        },
      },
      {
        type: "text",
        heading: "Memory has limits",
        paragraphs: [
          "Within one chat, an assistant can refer back to earlier messages because they are sent along with each new message. But the context window has a size limit. In a very long conversation, older parts may be trimmed or summarized, and the assistant can lose track of details you gave it early on.",
          "Some apps offer features that save notes between chats, and some can use tools like web search or a calculator. Not every assistant has these features, so check what the tool you're using can actually do.",
        ],
      },
      {
        type: "callout",
        tone: "tip",
        title: "Long chat going off the rails?",
        body: "Start a fresh conversation and paste in a short summary of the important details. A clean, focused context often gets better results than a messy 80-message thread.",
      },
      {
        type: "mythFact",
        items: [
          {
            myth: "If I ask the same question twice, I'll get the same answer.",
            fact: "Many assistants add some randomness when choosing tokens, so wording, details and even conclusions can change between runs. That's one more reason to verify important answers.",
          },
          {
            myth: "The assistant is searching the internet every time I ask something.",
            fact: "Many answers come only from patterns learned during training. Some assistants can search the web, but only when that feature exists and is turned on.",
          },
        ],
      },
      {
        type: "learnMore",
        title: "Why do responses appear word by word?",
        paragraphs: [
          "Because the model really does generate its answer one token at a time. Many apps show each token as soon as it's produced, a technique called streaming, so you can start reading before the full answer is finished.",
          "It also means the model doesn't plan the whole answer in advance the way you might outline an essay. Each new token depends on everything that came before it — which is why an early mistake can snowball.",
        ],
      },
      {
        type: "check",
        question: {
          id: "kc-how-ai-assistants-work-2",
          prompt: "Early in a long chat you told an assistant your essay must be in MLA format. Forty messages later, it starts using a different citation style. What's the best fix?",
          options: [
            { id: "a", text: "Give up — the assistant is broken" },
            { id: "b", text: "Keep repeating the same request louder, in all caps" },
            { id: "c", text: "Restate the key requirement, or start a new chat with a short summary of your requirements" },
          ],
          correctOptionId: "c",
          explanation: "Details from early in a long conversation can fall outside the context window or get less attention. Restating the requirement — or starting fresh with a summary — puts it back in view.",
        },
      },
    ],
    sourceIds: ["elements-of-ai", "nist-ai-rmf"],
  },

  /* ------------------------------------------------------------------ */
  {
    id: "prompt-design",
    moduleId: "ai-tools",
    title: "Prompt Design: Goal, Context, Format, Limits",
    summary: "Turn vague requests into clear prompts using a four-part checklist, then improve results by iterating.",
    minutes: 7,
    xp: 50,
    objectives: [
      "Use the Goal, Context, Format, Limits checklist to write a prompt",
      "Rewrite a vague prompt into a specific one",
      "Improve a response by giving feedback and examples",
    ],
    blocks: [
      {
        type: "text",
        heading: "Vague in, vague out",
        paragraphs: [
          "An AI assistant can only work with what you give it. Ask \"help me with my essay\" and it has to guess what essay, what kind of help, and how much. Guesses lead to generic answers.",
          "Good prompting isn't about magic words. It's about giving the same information you'd give a helpful tutor who has never met you.",
        ],
      },
      {
        type: "steps",
        heading: "The GCFL checklist",
        steps: [
          {
            title: "Goal — what do you want?",
            body: "Say the task clearly: explain, compare, quiz me, give feedback, brainstorm. \"Give feedback on my thesis statement\" beats \"look at this.\"",
          },
          {
            title: "Context — what should it know?",
            body: "Share your class, level, topic and situation: \"I'm in 10th-grade biology and we just started cell respiration.\"",
          },
          {
            title: "Format — what should the answer look like?",
            body: "Ask for a shape: a table, 5 bullet points, a step-by-step list, a short paragraph, or practice questions with an answer key.",
          },
          {
            title: "Limits — what are the boundaries?",
            body: "Set length, reading level and rules: \"under 150 words,\" \"don't rewrite my sentences, just point out problems,\" \"use only the text I pasted.\"",
          },
        ],
      },
      {
        type: "compare",
        heading: "Same request, two prompts",
        left: {
          title: "Vague prompt",
          items: [
            "\"Explain photosynthesis.\"",
            "No level given, so the answer may be too simple or too technical",
            "No format, so you may get a long wall of text",
            "No purpose, so it can't focus on what you actually need",
          ],
        },
        right: {
          title: "GCFL prompt",
          items: [
            "Goal: \"Help me review photosynthesis for a quiz.\"",
            "Context: \"I'm in 9th-grade biology and I get confused about light vs. dark reactions.\"",
            "Format: \"Use a two-column table, then give me 3 practice questions.\"",
            "Limits: \"Keep it under 200 words and don't show answers until I ask.\"",
          ],
        },
      },
      {
        type: "demo",
        demo: "prompt-builder",
      },
      {
        type: "check",
        question: {
          id: "kc-prompt-design-1",
          prompt: "Maya writes: \"Write about the Civil War.\" Which addition would improve her prompt the MOST for studying?",
          options: [
            { id: "a", text: "Adding \"please\" and \"thank you\"" },
            { id: "b", text: "\"I'm reviewing for an 11th-grade US History test on causes of the Civil War. Give me a 6-bullet summary and 3 practice questions.\"" },
            { id: "c", text: "Adding \"Make it really good\"" },
            { id: "d", text: "Writing the same prompt in all capital letters" },
          ],
          correctOptionId: "b",
          explanation: "Option B adds a goal (review for a test), context (11th-grade US History, causes), and a format (6 bullets + 3 questions). Politeness and emphasis don't tell the model what you need.",
        },
      },
      {
        type: "text",
        heading: "Prompting is a conversation, not a single shot",
        paragraphs: [
          "Your first prompt rarely gets a perfect answer — and that's normal. Treat the response as a draft and steer it: \"Shorter,\" \"Use an example from sports,\" \"That's too advanced, explain it like I'm new to this.\"",
          "Two more power moves: show an example of what you want (\"Format the flashcards like this: Term — definition\"), and ask the assistant to ask YOU questions first (\"Before you start, ask me 3 questions about my project\").",
        ],
      },
      {
        type: "example",
        title: "Letting the AI interview you first",
        prompt: "I need to give a 3-minute presentation for my environmental science class. Before suggesting a topic, ask me three questions to figure out what I'd be interested in.",
        response: "Happy to help! 1) Are you more interested in local issues (like your town's water or parks) or global ones (like oceans or climate)? 2) Do you prefer topics with lots of data and graphs, or ones with personal stories? 3) Is there a hobby or place you care about that we could connect to the environment?",
        note: "Instead of guessing, the assistant gathers context first. Your answers make the next suggestions far more personal and useful.",
      },
      {
        type: "terms",
        terms: [
          {
            term: "Iteration",
            definition: "Improving a result through repeated rounds of feedback and revision, such as refining a prompt based on the last response.",
          },
          {
            term: "Few-shot prompting",
            definition: "Including a few examples of the input and output you want in your prompt so the AI can follow the pattern.",
          },
        ],
      },
      {
        type: "callout",
        tone: "warning",
        title: "A great prompt doesn't guarantee a correct answer",
        body: "Clear prompts make useful answers more likely, but the model can still make mistakes. Prompting skills and checking skills go together.",
      },
      {
        type: "check",
        question: {
          id: "kc-prompt-design-2",
          prompt: "You asked for a study guide and the answer is way too long and advanced. What's the most effective next step?",
          options: [
            { id: "a", text: "Reply with feedback like \"Cut this to 8 bullet points at a 10th-grade level\"" },
            { id: "b", text: "Copy it into your notes anyway" },
            { id: "c", text: "Ask the exact same question again, word for word" },
            { id: "d", text: "Decide AI can't help with studying" },
          ],
          correctOptionId: "a",
          explanation: "Iterating with specific feedback on format (8 bullets) and limits (10th-grade level) steers the next response toward what you need.",
        },
      },
    ],
    sourceIds: ["elements-of-ai"],
  },

  /* ------------------------------------------------------------------ */
  {
    id: "breaking-down-tasks",
    moduleId: "ai-tools",
    title: "Breaking Down Complex Tasks",
    summary: "Split big assignments into small, checkable steps — and keep your own thinking in the driver's seat.",
    minutes: 6,
    xp: 50,
    objectives: [
      "Break a large project into smaller steps an AI can help with",
      "Decide which steps you should do yourself",
      "Check each step before moving on",
    ],
    blocks: [
      {
        type: "text",
        heading: "Big asks get shaky answers",
        paragraphs: [
          "\"Plan my entire science fair project\" is a huge request. An assistant will produce something, but a single giant answer is hard to check, easy to accept without thinking, and often generic.",
          "Professionals handle big problems by breaking them into smaller pieces. The same skill makes AI far more useful: small, focused requests get better answers, and each one is easier to verify.",
        ],
      },
      {
        type: "steps",
        heading: "A four-step breakdown method",
        steps: [
          {
            title: "Define the finish line",
            body: "Write down what \"done\" looks like: requirements, due date, rubric points. Share this with the AI as context.",
          },
          {
            title: "List the stages",
            body: "Split the project into stages like research, planning, drafting, revising and presenting. You can ask the AI to suggest stages — then adjust them yourself.",
          },
          {
            title: "Work one step at a time",
            body: "Ask for help with a single stage per prompt. \"Help me brainstorm research questions\" is better than \"do the research.\"",
          },
          {
            title: "Check before moving on",
            body: "Review each output: Is it accurate? Does it fit the rubric? Does it still sound like your ideas? Fix problems before they carry into the next step.",
          },
        ],
      },
      {
        type: "demo",
        demo: "task-breakdown",
      },
      {
        type: "check",
        question: {
          id: "kc-breaking-down-tasks-1",
          prompt: "Jordan has a 5-page history research paper due in two weeks. Which first request to an AI assistant is the best use of task breakdown?",
          options: [
            { id: "a", text: "\"Write my 5-page paper on the Industrial Revolution.\"" },
            { id: "b", text: "\"Tell me everything about history.\"" },
            { id: "c", text: "\"Here's my assignment sheet. Help me split this paper into stages with a rough schedule for the next two weeks.\"" },
          ],
          correctOptionId: "c",
          explanation: "Option C asks for help planning the stages while Jordan still does the research and writing. Option A hands over the entire task, and B is too vague to be useful.",
        },
      },
      {
        type: "compare",
        heading: "Who does what?",
        left: {
          title: "Good steps to get AI help with",
          items: [
            "Suggesting a schedule or checklist",
            "Brainstorming possible research questions",
            "Explaining a concept you're stuck on",
            "Giving feedback on a draft you wrote",
          ],
        },
        right: {
          title: "Steps that should stay yours",
          items: [
            "Choosing your topic and argument",
            "Reading and evaluating real sources",
            "Writing in your own voice",
            "Making final decisions about what to submit",
          ],
        },
      },
      {
        type: "terms",
        terms: [
          {
            term: "Task decomposition",
            definition: "Breaking a large, complex goal into smaller steps that can each be completed and checked on their own.",
          },
          {
            term: "Checkpoint",
            definition: "A planned moment to review work before moving on, so mistakes are caught early instead of piling up.",
          },
        ],
      },
      {
        type: "example",
        title: "One focused step",
        prompt: "I'm writing a lab report on how temperature affects enzyme activity. I've written my hypothesis and method. Can you list 3 things that are commonly missing from high school lab report conclusions, so I can check mine? Don't write the conclusion for me.",
        response: "Here are three things to check in your conclusion: 1) Does it directly state whether your data supported or did not support your hypothesis? 2) Does it refer to specific results, such as numbers from your data table? 3) Does it mention sources of error and how they might have affected your results?",
        note: "The student asked for a checklist, not a finished paragraph. They stay in control of the writing and learn what makes a strong conclusion.",
      },
      {
        type: "callout",
        tone: "think",
        title: "Your thinking is the point",
        body: "Teachers assign projects so you practice researching, reasoning and writing. If the AI does every step, you finish the assignment but skip the learning. Use AI to support steps, not to replace your thinking.",
      },
      {
        type: "check",
        question: {
          id: "kc-breaking-down-tasks-2",
          prompt: "An assistant gave you a project outline, and step 2 includes a claim you're not sure is true. What should you do before moving to step 3?",
          options: [
            { id: "a", text: "Move on — you can fix it at the end" },
            { id: "b", text: "Check the claim now against a reliable source, and fix the outline if needed" },
            { id: "c", text: "Ask the same assistant if it's sure, and trust whatever it says" },
            { id: "d", text: "Delete the whole outline and start over" },
          ],
          correctOptionId: "b",
          explanation: "Checkpoints catch errors before later steps build on them. Asking the same AI \"are you sure?\" isn't verification — it can confidently repeat or change its answer either way.",
        },
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  {
    id: "ai-for-studying-and-brainstorming",
    moduleId: "ai-tools",
    title: "AI for Studying & Brainstorming",
    summary: "Use AI as a practice partner and idea generator — without letting it do your thinking for you.",
    minutes: 7,
    xp: 50,
    objectives: [
      "Use AI to create practice questions, flashcards and alternate explanations",
      "Run a brainstorm where you make the final choices",
      "Recognize study habits that feel helpful but skip real learning",
    ],
    blocks: [
      {
        type: "text",
        heading: "A study partner that never gets tired",
        paragraphs: [
          "One of the most helpful ways to use AI is as a practice partner. It can quiz you, explain a concept a different way, or turn your notes into flashcards — any time you need it.",
          "The key word is practice. Learning happens when your brain does the work: recalling, explaining, making mistakes and fixing them. The best study prompts make you think more, not less.",
        ],
      },
      {
        type: "example",
        title: "Practice quiz from your own notes",
        prompt: "Here are my notes on chemical bonding for my chemistry test [notes pasted]. Quiz me with 5 questions, one at a time. Wait for my answer before telling me if I'm right, and explain any mistakes.",
        response: "Great, let's start. Question 1: In your own words, what is the main difference between an ionic bond and a covalent bond? Take your time — I'll wait for your answer.",
        note: "Using your own class notes keeps the quiz focused on what your teacher covered, and answering one at a time forces active recall instead of passive reading.",
      },
      {
        type: "example",
        title: "Explain it a different way",
        prompt: "My textbook's explanation of supply and demand isn't clicking. Explain it using an example about concert tickets, in under 120 words.",
        response: "Imagine a popular artist announces one small concert. Thousands of fans want tickets (high demand), but there are only 500 seats (low supply). Because many people are competing for few tickets, prices go up — especially on resale sites. Now imagine a huge stadium show with 60,000 seats and fewer interested fans. Supply is high compared to demand, so tickets are easier to get and prices may drop. That's the core idea: when demand is higher than supply, prices tend to rise; when supply is higher than demand, prices tend to fall.",
        note: "A familiar example can make an abstract idea stick. Still compare it with your textbook — if the two disagree, trust your class materials and ask your teacher.",
      },
      {
        type: "check",
        question: {
          id: "kc-ai-for-studying-and-brainstorming-1",
          prompt: "Which prompt is MOST likely to help you actually learn the material for a biology test?",
          options: [
            { id: "a", text: "\"Summarize chapter 7 so I don't have to read it.\"" },
            { id: "b", text: "\"Write the answers to my review sheet.\"" },
            { id: "c", text: "\"Ask me questions about chapter 7 one at a time and tell me what I got wrong.\"" },
            { id: "d", text: "\"Make my notes look nicer.\"" },
          ],
          correctOptionId: "c",
          explanation: "Being quizzed makes you retrieve information from memory, which strengthens learning. Summaries and answer keys let you skip the thinking that builds understanding.",
        },
      },
      {
        type: "text",
        heading: "Brainstorming: quantity first, then you choose",
        paragraphs: [
          "AI is good at producing lots of ideas quickly. Use that for the \"go wide\" part of brainstorming: project topics, angles for an essay, names for a club event, ways to test a hypothesis.",
          "Then switch roles. You narrow the list, combine ideas, and pick what fits your interests, your assignment and your voice. The AI generates options; you make the decisions.",
        ],
      },
      {
        type: "example",
        title: "Brainstorming with boundaries",
        prompt: "I'm choosing a topic for a 4-minute persuasive speech in English class. I like skateboarding and design. Give me 8 possible speech topics, each in one sentence. Mix serious and fun ideas.",
        response: "1) Towns should build more public skateparks. 2) Skateboarding teaches persistence better than many team sports. 3) Good design can make public spaces safer. 4) Schools should let students redesign common areas. 5) Skate culture deserves more credit for influencing fashion. 6) Hostile architecture hurts communities. 7) Every student should take a design class. 8) Skateboarding should be treated as a serious sport at school.",
        note: "Notice that each idea still needs your research and reasoning. Pick one or two that interest you, then check the facts behind them before building your argument.",
      },
      {
        type: "terms",
        terms: [
          {
            term: "Active recall",
            definition: "A study strategy where you practice pulling information out of memory, such as answering questions, instead of just rereading notes.",
          },
          {
            term: "Socratic tutoring",
            definition: "A teaching style that guides you with questions so you reason your way to an answer instead of being told it.",
          },
        ],
      },
      {
        type: "mythFact",
        items: [
          {
            myth: "If the AI explained it clearly, the explanation must be correct.",
            fact: "Clear writing and correct content are different things. AI explanations can contain errors, so compare them with your textbook, notes or teacher.",
          },
          {
            myth: "Reading an AI summary is the same as studying.",
            fact: "Reading feels productive, but you usually learn more by testing yourself and explaining ideas in your own words.",
          },
        ],
      },
      {
        type: "callout",
        tone: "warning",
        title: "Check your class's AI policy first",
        body: "Teachers and schools set different rules for AI. Something allowed in one class may not be allowed in another. When in doubt, ask your teacher before using AI on an assignment.",
      },
      {
        type: "check",
        question: {
          id: "kc-ai-for-studying-and-brainstorming-2",
          prompt: "An AI gives you 10 topic ideas for a history project. What should happen next?",
          options: [
            { id: "a", text: "Submit the first idea on the list as your topic without thinking about it" },
            { id: "b", text: "Ask the AI which idea your teacher will grade highest" },
            { id: "c", text: "Pick based on your interests and the assignment, then research whether there are good sources for it" },
          ],
          correctOptionId: "c",
          explanation: "Brainstorming with AI gives you options; the choosing, researching and reasoning are your job. The AI has no idea how your teacher grades.",
        },
      },
    ],
    sourceIds: ["unesco-genai-guidance"],
  },

  /* ------------------------------------------------------------------ */
  {
    id: "ai-for-research-and-coding",
    moduleId: "ai-tools",
    title: "AI for Research & Coding",
    summary: "Use AI as a starting point for research and a helper for code — while finding real sources and testing everything.",
    minutes: 8,
    xp: 50,
    objectives: [
      "Use AI to plan research without treating it as a source",
      "Use AI to explain and debug code you are responsible for",
      "Explain why AI-generated code and citations must be checked",
    ],
    blocks: [
      {
        type: "text",
        heading: "Research: a map, not the destination",
        paragraphs: [
          "AI can help you get started on research: getting a quick overview of an unfamiliar topic, suggesting search terms, or listing the main debates around a question.",
          "But an AI chatbot is not a source you can rely on for your final work. It can mix up facts, leave out important context, and even invent sources that don't exist. Your job is to find, read and cite real sources — books, articles, databases and websites you can check.",
        ],
      },
      {
        type: "steps",
        heading: "A research workflow that uses AI safely",
        steps: [
          {
            title: "Get oriented",
            body: "Ask for a short overview and key vocabulary so you understand what you'll be reading about.",
          },
          {
            title: "Generate search terms",
            body: "Ask for keywords and related topics to use in your library database or search engine.",
          },
          {
            title: "Find and read real sources",
            body: "Use your school library, databases and trustworthy websites. Read the sources yourself.",
          },
          {
            title: "Cite what you actually used",
            body: "Cite the real sources you read. If you used AI in a way your teacher allows, follow your class's rules for disclosing or citing it.",
          },
        ],
      },
      {
        type: "callout",
        tone: "warning",
        title: "Watch out for invented citations",
        body: "AI tools can produce references that look perfect — real-sounding authors, journal names and page numbers — for articles that don't exist. Never copy a citation from AI without finding the actual source yourself.",
      },
      {
        type: "check",
        question: {
          id: "kc-ai-for-research-and-coding-1",
          prompt: "An assistant gives you a quote and a citation from a journal article that supports your argument perfectly. What should you do?",
          options: [
            { id: "a", text: "Search for the article in a library database or search engine and confirm the quote is really in it before using it" },
            { id: "b", text: "Use it — the citation includes page numbers, so it must be real" },
            { id: "c", text: "Use the quote but leave off the citation" },
            { id: "d", text: "Ask the assistant to promise the source is real" },
          ],
          correctOptionId: "a",
          explanation: "Detailed-looking citations can still be fabricated. Only a source you've located and checked yourself is safe to use, and the AI's reassurance isn't evidence.",
        },
      },
      {
        type: "text",
        heading: "Coding: a helper that still needs a reviewer",
        paragraphs: [
          "In coding, AI can explain what a piece of code does, suggest why an error is happening, write small examples, and help you understand an unfamiliar concept like loops or functions.",
          "AI-generated code can look right and still be wrong. It may have bugs, miss edge cases, use outdated methods, or include security problems. You're responsible for any code you submit or run, so you need to understand it and test it.",
        ],
      },
      {
        type: "example",
        title: "Debugging while learning",
        prompt: "I'm learning Python in my intro CS class. My loop is supposed to print the numbers 1 to 5 but it prints 0 to 4. Here's my code: for i in range(5): print(i). Don't just fix it — explain why it happens.",
        response: "range(5) starts counting at 0 and stops before 5, so it produces 0, 1, 2, 3, 4. To print 1 through 5, you can give range a start and a stop: range(1, 6). The stop value is never included, which is why it's 6 and not 5. Try changing it and run your code to confirm.",
        note: "Asking for an explanation — not just a fix — helps you learn the rule so you won't need help with it next time. Running the code yourself is the real test.",
      },
      {
        type: "keyPoints",
        heading: "Rules for AI-assisted code",
        points: [
          "Understand every line before you use it. If you can't explain it, don't submit it.",
          "Test with normal inputs, unusual inputs and edge cases.",
          "Never paste passwords, API keys or private data into an AI tool.",
          "Follow your class's rules — some assignments require you to write code without AI.",
          "Be aware that generated code may resemble existing code with its own license terms.",
        ],
      },
      {
        type: "terms",
        terms: [
          {
            term: "Primary source",
            definition: "An original record or first-hand account, such as a historical document, a dataset or a research study, rather than someone's summary of it.",
          },
          {
            term: "Debugging",
            definition: "The process of finding and fixing errors in computer code.",
          },
          {
            term: "Edge case",
            definition: "An unusual or extreme input, like an empty list or a negative number, that can reveal bugs normal testing misses.",
          },
        ],
      },
      {
        type: "check",
        question: {
          id: "kc-ai-for-research-and-coding-2",
          prompt: "An AI writes a function for your coding project. It works on the one example you tried. What's the most responsible next step?",
          options: [
            { id: "a", text: "Submit it immediately since it worked once" },
            { id: "b", text: "Ask the AI to rewrite it in a different style" },
            { id: "c", text: "Read it until you understand each line, then test it with several inputs including edge cases" },
          ],
          correctOptionId: "c",
          explanation: "One passing test doesn't prove code is correct. Understanding and testing it — especially with edge cases — is how you catch hidden bugs and make sure you can explain your own work.",
        },
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  {
    id: "verifying-ai-output",
    moduleId: "ai-tools",
    title: "Verifying AI Output",
    summary: "Check AI answers claim by claim using lateral reading and the SIFT moves.",
    minutes: 8,
    xp: 50,
    objectives: [
      "Break an AI answer into individual claims that can be checked",
      "Use lateral reading and the SIFT moves to verify information",
      "Identify warning signs like fake citations and outdated facts",
    ],
    blocks: [
      {
        type: "text",
        heading: "Confident is not the same as correct",
        paragraphs: [
          "AI answers usually sound polished and sure of themselves, even when they're wrong. The tone of an answer tells you nothing about its accuracy.",
          "That's why verification is a core AI skill. The good news: you don't need to be an expert to check information. You need a routine.",
        ],
      },
      {
        type: "diagram",
        diagram: "verify-loop",
        caption: "The verify loop: pull out each claim, check it against reliable sources, then keep, fix or remove it.",
      },
      {
        type: "steps",
        heading: "The SIFT moves",
        steps: [
          {
            title: "Stop",
            body: "Before you use or share something, pause. Ask: do I know what this is, and do I know whether it's trustworthy?",
          },
          {
            title: "Investigate the source",
            body: "Find out who or what is behind the information. For AI answers, remember the chatbot itself isn't the original source.",
          },
          {
            title: "Find better coverage",
            body: "Look for other reliable sources covering the same claim. If trustworthy sources agree, that's a good sign.",
          },
          {
            title: "Trace claims to the original context",
            body: "Follow quotes, statistics and studies back to where they first appeared, and check they weren't taken out of context.",
          },
        ],
      },
      {
        type: "terms",
        terms: [
          {
            term: "Lateral reading",
            definition: "Checking information by opening new tabs to see what other reliable sources say, instead of only reading the original page top to bottom.",
          },
          {
            term: "SIFT",
            definition: "A four-step fact-checking method — Stop, Investigate the source, Find better coverage, Trace claims — developed by digital literacy researcher Mike Caulfield.",
          },
          {
            term: "Claim",
            definition: "A single statement that can be checked as true or false, such as a date, a number, a quote or a cause-and-effect statement.",
          },
        ],
      },
      {
        type: "check",
        question: {
          id: "kc-verifying-ai-output-1",
          prompt: "An AI answer says a scientist discovered something in a specific year and quotes them. Using lateral reading, what do you do?",
          options: [
            { id: "a", text: "Reread the AI answer carefully to see if it sounds accurate" },
            { id: "b", text: "Open new tabs and check the date and the quote in reliable sources, like encyclopedias, museum or university sites, or the original publication" },
            { id: "c", text: "Ask the AI to explain its answer in more detail" },
            { id: "d", text: "Assume it's correct because it includes specific details" },
          ],
          correctOptionId: "b",
          explanation: "Lateral reading means leaving the original text to see what other trustworthy sources say. Rereading or asking for more detail keeps you inside the same possibly-wrong answer.",
        },
      },
      {
        type: "demo",
        demo: "fact-check",
      },
      {
        type: "keyPoints",
        heading: "Red flags in an AI answer",
        points: [
          "Citations, quotes or statistics you can't find anywhere else",
          "Very specific details (exact numbers, dates, page numbers) with no source",
          "Information about recent events that may be past the model's knowledge cutoff",
          "Claims that perfectly support your argument with no nuance",
          "Different answers when you ask the same question again",
        ],
      },
      {
        type: "callout",
        tone: "tip",
        title: "Match your effort to the stakes",
        body: "Checking a fun fact for a group chat can be quick. Anything going into graded work, health decisions or something you'll share publicly deserves careful, claim-by-claim checking.",
      },
      {
        type: "learnMore",
        title: "What counts as a reliable source?",
        paragraphs: [
          "Reliable sources usually have clear authors or organizations, explain where their information comes from, and correct their mistakes. Examples include established news organizations, government and university websites, published books, and peer-reviewed research.",
          "No source is perfect, which is why finding better coverage matters: when several independent, reliable sources agree, you can be more confident. Your school librarian is a great person to ask for help.",
        ],
      },
      {
        type: "check",
        question: {
          id: "kc-verifying-ai-output-2",
          prompt: "You checked an AI answer and found that 4 of its 5 claims are supported by reliable sources, but one statistic can't be found anywhere. What should you do?",
          options: [
            { id: "a", text: "Use the whole answer — 4 out of 5 is good enough" },
            { id: "b", text: "Leave out the unverified statistic or replace it with one you found in a reliable source" },
            { id: "c", text: "Keep the statistic but round the number so it's less specific" },
          ],
          correctOptionId: "b",
          explanation: "Each claim stands on its own. A mostly-correct answer can still contain a made-up number, so drop or replace anything you can't verify.",
        },
      },
    ],
    sourceIds: ["sift-caulfield"],
  },
];
