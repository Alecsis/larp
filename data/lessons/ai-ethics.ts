/**
 * Module 3 — Ethical & Responsible AI ("Line 3", emerald).
 *
 * Plain data only: the lesson page renders these blocks in order.
 * Facts that need support list reference IDs in `sourceIds`
 * (see data/references.ts).
 */
import type { Lesson } from "@/types/content";

export const aiEthicsLessons: Lesson[] = [
  /* ------------------------------------------------------------------ */
  /* 1. Hallucinations                                                   */
  /* ------------------------------------------------------------------ */
  {
    id: "hallucinations",
    moduleId: "ai-ethics",
    title: "Hallucinations: When AI Sounds Sure and Is Wrong",
    summary: "Why AI tools sometimes invent facts, sources and quotes — and how to catch it before it ends up in your work.",
    minutes: 7,
    xp: 50,
    objectives: [
      "Explain what an AI hallucination is and why it happens",
      "Recognize that a confident tone is not evidence of accuracy",
      "Use a quick routine to catch made-up facts and citations",
    ],
    blocks: [
      {
        type: "text",
        heading: "Fluent is not the same as true",
        paragraphs: [
          "Ask a chatbot a question and you usually get a smooth, well-organized answer. Most of the time that answer is useful. But sometimes part of it is simply made up — a statistic that doesn't exist, a book that was never written, or a quote nobody ever said.",
          "This is called a hallucination. The tool isn't lying on purpose, and it isn't \"seeing things.\" It is doing exactly what it was built to do: produce text that looks like a likely answer. Looking likely and being correct are two different things.",
        ],
      },
      {
        type: "terms",
        terms: [
          {
            term: "Hallucination",
            definition: "When an AI system produces information that sounds plausible but is false, unsupported, or invented — such as fake facts, sources or quotes.",
          },
          {
            term: "Fabricated citation",
            definition: "A reference to a book, article, study or web page that looks real but does not exist, or that does not say what the AI claims it says.",
          },
        ],
      },
      {
        type: "text",
        heading: "Why it happens",
        paragraphs: [
          "Large language models generate text by predicting what is likely to come next, one small piece at a time. They learned patterns from huge amounts of writing, so they are very good at producing the shape of a good answer — the right tone, structure and vocabulary.",
          "But the model does not look facts up in a verified database by default. If it hasn't learned a reliable pattern for your exact question, it can still produce something that fits the pattern of an answer. A citation, for example, has a predictable shape: author, year, title, journal. The model can generate that shape even when no such paper exists.",
          "Some tools can search the web or read documents you give them, which can help. Even then, they can misread a source or mix details from different places, so checking still matters.",
        ],
      },
      {
        type: "callout",
        tone: "warning",
        title: "Confidence is not a fact-check",
        body: "AI tools often use the same calm, certain tone whether they are right or wrong. Words like \"definitely\" or a very specific number can make an answer feel trustworthy, but they tell you nothing about whether it is accurate.",
      },
      {
        type: "check",
        question: {
          id: "kc-hallucinations-1",
          prompt: "A chatbot gives you a very specific statistic with a precise decimal and names the organization that supposedly published it. What does that level of detail tell you?",
          options: [
            { id: "a", text: "It is probably accurate, because made-up numbers are usually rounded." },
            { id: "b", text: "Nothing on its own — specific-sounding details can be generated just as easily as vague ones." },
            { id: "c", text: "It is accurate if the organization is a well-known one." },
            { id: "d", text: "It is definitely fake, because chatbots can't know statistics." },
          ],
          correctOptionId: "b",
          explanation: "A language model can produce precise-looking numbers and real-sounding organization names whether or not they are true. The only way to know is to find the statistic in the original source.",
        },
      },
      { type: "demo", demo: "hallucination" },
      {
        type: "steps",
        heading: "A 60-second hallucination check",
        steps: [
          {
            title: "Spot the checkable claims",
            body: "Names, dates, numbers, quotes and sources are the parts most worth checking — and the parts most likely to be invented.",
          },
          {
            title: "Search for the source itself",
            body: "Look up the exact title, author or quote. If a paper or book can't be found in a library database or on the publisher's site, don't use it.",
          },
          {
            title: "Read what the source actually says",
            body: "Even real sources get misquoted. Make sure the source supports the specific claim the AI attached to it.",
          },
          {
            title: "Cross-check with an independent source",
            body: "A second trustworthy source that agrees is much stronger evidence than asking the same chatbot \"Are you sure?\"",
          },
        ],
      },
      {
        type: "mythFact",
        items: [
          {
            myth: "If I ask the AI whether its answer is correct, it will tell me.",
            fact: "A model can confidently \"confirm\" an answer that is wrong, or change a right answer just because you pushed back. Check against outside sources instead.",
          },
          {
            myth: "Hallucinations only happen with obscure topics.",
            fact: "They are more common on niche or very recent topics, but they can show up anywhere — especially in details like dates, quotes and citations.",
          },
        ],
      },
      {
        type: "check",
        question: {
          id: "kc-hallucinations-2",
          prompt: "For a history essay, an AI tool suggests three scholarly sources. You can find the first two in your library database, but not the third. What's the best move?",
          options: [
            { id: "a", text: "Cite all three — two out of three being real means the third probably is too." },
            { id: "b", text: "Ask the chatbot to confirm the third source exists, then cite it if it says yes." },
            { id: "c", text: "Leave out the third source and check that the first two actually support your points." },
          ],
          correctOptionId: "c",
          explanation: "A source you can't locate may be fabricated, and the chatbot's confirmation isn't independent evidence. Even the real sources need to be read to confirm they say what the AI claimed.",
        },
      },
      {
        type: "learnMore",
        title: "Can hallucinations be fixed completely?",
        paragraphs: [
          "Developers use several techniques to reduce hallucinations, such as connecting models to search tools or trusted documents and training them to say \"I'm not sure.\" These help, but no current method removes the problem entirely.",
          "That's why the responsible habit isn't \"find a tool that never hallucinates.\" It's \"treat AI output as a draft and verify anything that matters.\"",
        ],
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  /* 2. Bias & fairness                                                  */
  /* ------------------------------------------------------------------ */
  {
    id: "bias-and-fairness",
    moduleId: "ai-ethics",
    title: "Bias & Fairness: Whose Patterns Does AI Learn?",
    summary: "How unfair patterns get into AI systems, why they matter when AI makes decisions about people, and what fairness checks look like.",
    minutes: 8,
    xp: 50,
    objectives: [
      "Identify four places bias can enter an AI system",
      "Explain why biased data can lead to unfair outcomes even when no one intends harm",
      "Describe practical ways to test an AI system for fairness",
    ],
    sourceIds: ["gender-shades", "nist-ai-rmf"],
    blocks: [
      {
        type: "text",
        heading: "AI learns the world it's shown",
        paragraphs: [
          "Machine learning systems find patterns in examples. If those examples reflect unfair patterns from the past — or leave some groups of people out — the system can learn and repeat those patterns, often at large scale.",
          "That's why an AI tool can be unfair even when nobody who built it meant it to be. Bias in AI is usually not a single villain. It's a chain of choices about data, labels and design that adds up.",
        ],
      },
      {
        type: "terms",
        terms: [
          {
            term: "Algorithmic bias",
            definition: "Systematic errors in an AI or computer system that create unfair outcomes, such as consistently favoring or disadvantaging certain groups of people.",
          },
          {
            term: "Representative data",
            definition: "Data that includes the full range of people and situations the system will be used on, in reasonable proportions.",
          },
          {
            term: "Proxy variable",
            definition: "A piece of data that isn't about a sensitive trait directly but closely tracks it — for example, a zip code that strongly relates to income or race.",
          },
        ],
      },
      {
        type: "keyPoints",
        heading: "Four places bias can sneak in",
        points: [
          "The data: some groups are missing, under-represented, or shown in stereotyped ways.",
          "The labels: the \"right answers\" in training data came from past human decisions, which may themselves have been unfair.",
          "The design: what the system is told to optimize, and which inputs it uses (including proxies), shape who it serves well.",
          "The use: a tool built for one setting can perform badly — or be used unfairly — in another.",
        ],
      },
      {
        type: "check",
        question: {
          id: "kc-bias-and-fairness-1",
          prompt: "A company trains a résumé-screening tool on ten years of its own hiring decisions. In that decade, managers rarely hired people from certain schools. What is the most likely result?",
          options: [
            { id: "a", text: "The tool will be fair, because it only copies what the company already did." },
            { id: "b", text: "The tool may learn to rank candidates from those schools lower, repeating the old pattern." },
            { id: "c", text: "The tool will ignore schools because computers don't have opinions." },
            { id: "d", text: "The tool will automatically correct for the managers' past decisions." },
          ],
          correctOptionId: "b",
          explanation: "When training labels come from past human decisions, a model learns to imitate those decisions — including unfair ones. Copying the past is exactly how old bias becomes automated bias.",
        },
      },
      { type: "demo", demo: "bias-screening" },
      {
        type: "text",
        heading: "A real example: testing face analysis",
        paragraphs: [
          "Researchers Joy Buolamwini and Timnit Gebru tested commercial facial analysis systems that classified gender from photos. Their Gender Shades study found the systems were much less accurate for darker-skinned women than for lighter-skinned men.",
          "The study made an important point: a system's overall accuracy can look strong while hiding big differences between groups. You only see the problem when you break the results down.",
        ],
      },
      {
        type: "steps",
        heading: "What fairness checks look like",
        steps: [
          {
            title: "Break results down by group",
            body: "Measure accuracy and error rates separately for different groups instead of trusting one overall score.",
          },
          {
            title: "Audit the training data",
            body: "Ask who is included, who is missing, and where the labels came from.",
          },
          {
            title: "Remove or question proxies",
            body: "Check whether inputs like location or school quietly stand in for protected traits.",
          },
          {
            title: "Keep humans accountable",
            body: "For decisions about people, give them a way to question the result and have a person review it.",
          },
        ],
      },
      {
        type: "callout",
        tone: "think",
        title: "Bias in everyday tools",
        body: "Bias isn't only a problem in high-stakes systems. Image generators can default to stereotypes about who is a \"scientist\" or a \"nurse,\" and chatbots can reflect one culture's point of view as if it were universal. Noticing these defaults is a skill worth practicing.",
      },
      {
        type: "check",
        question: {
          id: "kc-bias-and-fairness-2",
          prompt: "A team reports that their new AI tool is \"95% accurate overall.\" What's the most important follow-up question from a fairness point of view?",
          options: [
            { id: "a", text: "How accurate is it for each group of people it will be used on?" },
            { id: "b", text: "Could it reach 99% accuracy with more computing power?" },
            { id: "c", text: "How quickly does it produce results?" },
          ],
          correctOptionId: "a",
          explanation: "An overall score can hide much worse performance for smaller groups. Breaking accuracy down by group is how studies like Gender Shades revealed hidden gaps.",
        },
      },
      {
        type: "learnMore",
        title: "Is \"removing race and gender from the data\" enough?",
        paragraphs: [
          "Not usually. Other inputs — like zip code, school name or even word choice — can act as proxies that carry the same information. A system can still produce unequal outcomes without ever seeing a sensitive trait directly.",
          "That's why fairness work focuses on testing outcomes, not just deleting columns. Frameworks such as the NIST AI Risk Management Framework treat bias as a risk to be measured and managed throughout a system's life.",
        ],
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  /* 3. Privacy                                                          */
  /* ------------------------------------------------------------------ */
  {
    id: "privacy-and-your-data",
    moduleId: "ai-ethics",
    title: "Privacy: What Not to Tell a Chatbot",
    summary: "What can happen to what you type into AI tools, and a simple rule for deciding what to share and what to shield.",
    minutes: 6,
    xp: 50,
    objectives: [
      "Explain why information typed into AI tools may not stay private",
      "Sort personal information into safe-to-share and never-share categories",
      "Check an AI tool's privacy settings and policies before relying on it",
    ],
    blocks: [
      {
        type: "text",
        heading: "A chat box is not a diary",
        paragraphs: [
          "Chatting with an AI tool can feel private — it's just you and a text box. But what you type is sent to the company that runs the service. Depending on that company's policy and your settings, conversations may be stored, reviewed by people for safety or quality, or used to improve future models.",
          "Policies differ a lot between tools, between free and paid versions, and between personal and school accounts. The safe assumption: don't type anything you wouldn't be comfortable with a stranger at that company reading.",
        ],
      },
      {
        type: "terms",
        terms: [
          {
            term: "Personally identifiable information (PII)",
            definition: "Any information that can identify a specific person, such as a full name combined with an address, a phone number, a student ID, or a government ID number.",
          },
          {
            term: "Data retention",
            definition: "How long a service keeps the information you give it, and what it is allowed to do with that information during that time.",
          },
          {
            term: "Privacy policy",
            definition: "The document where a company explains what data it collects, how it uses and shares that data, and what choices you have.",
          },
        ],
      },
      {
        type: "compare",
        heading: "Share or shield?",
        left: {
          title: "Usually fine to share",
          items: [
            "General questions about a topic you're studying",
            "Your own writing with personal details removed",
            "Made-up examples that illustrate your real problem",
            "Public information that's already widely available",
          ],
        },
        right: {
          title: "Shield — never share",
          items: [
            "Passwords, login codes and security answers",
            "Home address, phone number, student or government ID numbers",
            "Health, financial or other sensitive personal details",
            "Other people's private information, photos or messages",
          ],
        },
      },
      { type: "demo", demo: "privacy-sort" },
      {
        type: "check",
        question: {
          id: "kc-privacy-and-your-data-1",
          prompt: "You want help writing an email to your counselor about a family situation. What's the most privacy-smart way to use an AI tool?",
          options: [
            { id: "a", text: "Paste in the full situation with names and details so the AI understands it perfectly." },
            { id: "b", text: "Don't use AI for any writing that involves personal topics, ever." },
            { id: "c", text: "Ask for general structure and tone tips, then write the personal details yourself." },
            { id: "d", text: "Use a friend's account so it isn't connected to you." },
          ],
          correctOptionId: "c",
          explanation: "You can get useful help on structure and tone without handing over sensitive family details. Using someone else's account doesn't protect the information — and it isn't yours to share.",
        },
      },
      {
        type: "callout",
        tone: "warning",
        title: "Other people's privacy counts too",
        body: "Screenshots of group chats, a friend's photo, or a classmate's essay aren't yours to upload. Even if you're comfortable sharing your own info, they didn't agree to share theirs.",
      },
      {
        type: "steps",
        heading: "Before you rely on an AI tool",
        steps: [
          {
            title: "Check which account you're using",
            body: "Your school may provide approved AI tools with different privacy protections than personal accounts. Use the one your school recommends for schoolwork.",
          },
          {
            title: "Look at the settings",
            body: "Many tools let you turn off chat history or opt out of your conversations being used for training. Find out what your tool offers.",
          },
          {
            title: "Skim the privacy policy",
            body: "Look for what's collected, how long it's kept, and whether people may review conversations. Search the policy for words like \"retain,\" \"train\" and \"share.\"",
          },
          {
            title: "Strip the details",
            body: "Replace real names and identifying details with placeholders like \"Student A\" before pasting anything in.",
          },
        ],
      },
      {
        type: "check",
        question: {
          id: "kc-privacy-and-your-data-2",
          prompt: "A chatbot is helping you debug code for a club website, and the code contains the club's database password. What should you do?",
          options: [
            { id: "a", text: "Replace the password with a placeholder like \"YOUR_PASSWORD\" before pasting the code." },
            { id: "b", text: "Paste it as-is — the chatbot needs the real password to find the bug." },
            { id: "c", text: "Paste it, then delete the chat afterward so it's gone." },
          ],
          correctOptionId: "a",
          explanation: "The bug is almost never in the password itself, so a placeholder works just as well. Deleting a chat from your view doesn't guarantee the service hasn't already stored it.",
        },
      },
      {
        type: "learnMore",
        title: "Why do companies keep conversations at all?",
        paragraphs: [
          "Common reasons include letting you see your chat history, investigating misuse, fixing problems, and improving their products. Some services also use conversations as training data unless you opt out.",
          "None of these reasons are automatically bad — but they mean your words may exist somewhere beyond your screen. Knowing that lets you make an informed choice.",
        ],
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  /* 4. Academic integrity & citation                                    */
  /* ------------------------------------------------------------------ */
  {
    id: "academic-integrity-and-citation",
    moduleId: "ai-ethics",
    title: "Academic Integrity: Using AI Without Cheating Yourself",
    summary: "How to tell helpful AI use from dishonest use, follow your teacher's policy, and disclose and cite AI when you use it.",
    minutes: 8,
    xp: 50,
    objectives: [
      "Place common AI uses on a green / yellow / red spectrum",
      "Explain why your teacher's policy is the first rule to check",
      "Disclose and cite AI assistance using published style guidance",
    ],
    sourceIds: ["mla-cite-genai", "apa-cite-chatgpt", "unesco-genai-guidance"],
    blocks: [
      {
        type: "text",
        heading: "The real question: who did the learning?",
        paragraphs: [
          "Assignments exist so you can practice thinking, writing and problem-solving. When AI does that part for you, you get the grade but skip the learning — and you misrepresent whose work it is.",
          "At the same time, AI can be a genuinely good study partner: explaining a tough concept, quizzing you, or pointing out where your argument is weak. Academic integrity is about using it in ways that support your learning and being honest about how you used it.",
        ],
      },
      {
        type: "callout",
        tone: "tip",
        title: "Rule #1: Your teacher's policy wins",
        body: "Different classes allow different things. One teacher may encourage AI brainstorming; another may ban AI entirely for an assignment. If the policy isn't clear, ask before you start — not after you submit.",
      },
      {
        type: "diagram",
        diagram: "use-spectrum",
        caption: "Most AI uses fall somewhere on a spectrum. Green supports your learning, yellow needs permission and disclosure, and red replaces your own work.",
      },
      {
        type: "compare",
        heading: "Green, yellow and red uses",
        left: {
          title: "Green: usually supports learning",
          items: [
            "Explaining a concept in simpler words",
            "Generating practice questions to quiz yourself",
            "Brainstorming topics you then research yourself",
            "Getting feedback on your own draft's clarity",
          ],
        },
        right: {
          title: "Yellow to red: check policy and disclose",
          items: [
            "Yellow: rewording or editing your sentences",
            "Yellow: suggesting an outline you then build on",
            "Red: generating an essay, answers or code you submit as your own",
            "Red: using AI on a test or assignment where it's not allowed",
          ],
        },
      },
      {
        type: "check",
        question: {
          id: "kc-academic-integrity-and-citation-1",
          prompt: "Your English teacher's syllabus doesn't mention AI. You'd like to use a chatbot to suggest a structure for your essay. What's the best first step?",
          options: [
            { id: "a", text: "Go ahead — if it's not banned, it's allowed." },
            { id: "b", text: "Use it but don't mention it, since it only helped with structure." },
            { id: "c", text: "Ask your teacher whether this use is okay and how they'd like it disclosed." },
            { id: "d", text: "Ask a friend in another class what their teacher allows." },
          ],
          correctOptionId: "c",
          explanation: "When a policy is unclear, only your teacher can clarify it for their class. Asking up front protects you and shows good faith; another teacher's rules may not apply.",
        },
      },
      {
        type: "terms",
        terms: [
          {
            term: "Academic integrity",
            definition: "Being honest and responsible in schoolwork: doing your own work, giving credit to sources, and following the rules for each assignment.",
          },
          {
            term: "Disclosure",
            definition: "Clearly stating how you used an AI tool in your work — for example, \"I used a chatbot to generate practice questions and to check my grammar.\"",
          },
        ],
      },
      {
        type: "text",
        heading: "How to disclose and cite AI",
        paragraphs: [
          "If AI contributed to your work and your teacher allows it, say so. A short disclosure note explains what tool you used and what you used it for. If you quote or paraphrase AI-generated text, cite it.",
          "Major style guides have published guidance for this. The MLA Style Center explains how to cite generative AI in MLA style, and the APA Style blog explains how to cite tools like ChatGPT in APA style. Formats can be updated over time, so check the current guidance or your teacher's preferred format.",
        ],
      },
      {
        type: "example",
        title: "A sample disclosure note",
        prompt: "Assignment: Research essay on renewable energy policy",
        response: "AI use statement: I used an AI chatbot to brainstorm possible essay topics and to generate practice questions while studying. I chose my topic, found and read all sources myself, and wrote every paragraph. I did not use AI-generated text in the final essay.",
        note: "Specific and honest beats vague. Saying what you did not use AI for is just as helpful to your teacher as what you did.",
      },
      {
        type: "keyPoints",
        heading: "Protect yourself with a paper trail",
        points: [
          "Keep your drafts, notes and outlines — they show how your thinking developed.",
          "Save or screenshot important AI conversations you used, so you can show exactly what help you got.",
          "Never cite a source the AI suggested unless you found and read it yourself.",
        ],
      },
      {
        type: "check",
        question: {
          id: "kc-academic-integrity-and-citation-2",
          prompt: "Your teacher allows AI for feedback but not for writing. Which use fits that rule?",
          options: [
            { id: "a", text: "Asking AI to rewrite your conclusion so it sounds more professional." },
            { id: "b", text: "Asking AI which of your paragraphs has the weakest evidence, then revising it yourself." },
            { id: "c", text: "Asking AI to write a paragraph, then changing a few words." },
          ],
          correctOptionId: "b",
          explanation: "Getting feedback and then doing the revision yourself keeps the writing yours. Rewriting your conclusion or lightly editing AI-written text both put AI's words in your submission.",
        },
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  /* 5. Deepfakes, copyright & misinformation                            */
  /* ------------------------------------------------------------------ */
  {
    id: "deepfakes-copyright-misinformation",
    moduleId: "ai-ethics",
    title: "Deepfakes, Copyright & Misinformation",
    summary: "How AI-generated images, audio and video can mislead, how to check before you share, and the open questions around AI and creators' rights.",
    minutes: 7,
    xp: 50,
    objectives: [
      "Explain what synthetic media and deepfakes are",
      "Use a verification routine before sharing surprising content",
      "Describe why copyright and consent matter when creating with AI",
    ],
    sourceIds: ["us-copyright-ai", "sift-caulfield"],
    blocks: [
      {
        type: "text",
        heading: "Seeing is no longer believing",
        paragraphs: [
          "AI tools can now generate realistic images, clone voices from short audio samples, and create video of people saying things they never said. Some uses are creative or fun. Others are used to deceive, embarrass, scam or spread false information.",
          "Because this content is fast and cheap to make, the old habit of trusting a photo or video \"because I saw it\" isn't enough anymore. The new habit is checking where it came from.",
        ],
      },
      {
        type: "terms",
        terms: [
          {
            term: "Synthetic media",
            definition: "Images, audio, video or text created or heavily altered by AI rather than captured directly from the real world.",
          },
          {
            term: "Deepfake",
            definition: "Synthetic media that realistically shows a real person doing or saying something they did not actually do or say.",
          },
          {
            term: "Misinformation",
            definition: "False or misleading information shared without necessarily intending harm. When it's spread on purpose to deceive, it's often called disinformation.",
          },
        ],
      },
      {
        type: "mythFact",
        items: [
          {
            myth: "You can always spot a deepfake by looking for weird hands or blurry edges.",
            fact: "Visual glitches used to be common clues, but tools keep improving. Checking the source and context is more reliable than hunting for flaws.",
          },
          {
            myth: "AI detectors can reliably tell you whether something is AI-generated.",
            fact: "Detection tools can help, but they make mistakes in both directions. Treat their results as one clue, not a final answer.",
          },
        ],
      },
      {
        type: "steps",
        heading: "Before you share: stop and check",
        steps: [
          {
            title: "Pause",
            body: "Content designed to shock, outrage or amaze you is exactly the kind worth checking first.",
          },
          {
            title: "Find the original source",
            body: "Who first posted it? Is it from a credible outlet or the person's official account, or an anonymous repost?",
          },
          {
            title: "Look for other coverage",
            body: "If something major really happened, multiple trustworthy sources will usually report it. Search for it outside the platform where you saw it.",
          },
          {
            title: "Trace the image",
            body: "A reverse image search can show where an image appeared before and whether it's been altered or taken out of context.",
          },
        ],
      },
      {
        type: "check",
        question: {
          id: "kc-deepfakes-copyright-misinformation-1",
          prompt: "A shocking video of a celebrity appears in your feed from an account you don't recognize. No news sites are reporting it yet. What's the best response?",
          options: [
            { id: "a", text: "Share it with a caption asking \"Is this real?\" so others can decide." },
            { id: "b", text: "Hold off on sharing, and look for the original source and coverage from credible outlets." },
            { id: "c", text: "Share it, because if it were fake the platform would have removed it." },
            { id: "d", text: "Decide based on whether the video quality looks realistic." },
          ],
          correctOptionId: "b",
          explanation: "Sharing unverified content — even with a question — spreads it further. Platforms don't catch everything, and realistic quality isn't proof, so checking the source comes first.",
        },
      },
      {
        type: "callout",
        tone: "warning",
        title: "Consent matters",
        body: "Creating fake images, audio or video of a real person — especially a classmate — can cause real harm, even as a \"joke.\" It can also break school rules and, in some places, laws. Don't create or share synthetic media of someone without their permission.",
      },
      {
        type: "text",
        heading: "Copyright: open questions",
        paragraphs: [
          "Generative AI raises copyright questions that courts and governments are still working through. Two big ones: Is it okay to train AI on copyrighted books, art and music without permission? And who, if anyone, owns what an AI generates?",
          "The answers are evolving and differ from country to country. In the United States, the U.S. Copyright Office runs an initiative studying these issues and publishing guidance. This lesson isn't legal advice — but a good rule for students is to respect creators: don't pass off AI imitations of a specific artist's work as original, and follow your school's rules for using AI-generated media in projects.",
        ],
      },
      {
        type: "check",
        question: {
          id: "kc-deepfakes-copyright-misinformation-2",
          prompt: "For a class presentation, you want an AI-generated image in the style of a living illustrator whose work you love. What's the most responsible approach?",
          options: [
            { id: "a", text: "Generate it and present it as your own original artwork." },
            { id: "b", text: "Generate it and label it as the illustrator's work." },
            { id: "c", text: "Check your teacher's rules, label the image as AI-generated, and consider using or crediting the illustrator's real work instead." },
          ],
          correctOptionId: "c",
          explanation: "Being transparent that the image is AI-generated avoids misleading your audience, and labeling it as the artist's own work would be false. Crediting real work respects the creator while copyright questions remain unsettled.",
        },
      },
      {
        type: "learnMore",
        title: "Why labels and watermarks aren't a complete fix",
        paragraphs: [
          "Some AI companies add visible labels or hidden watermarks to generated content, and some platforms label AI media. These are useful signals when they're present.",
          "But labels can be cropped out, not every tool adds them, and content gets re-uploaded without its original context. Your own verification habits still matter.",
        ],
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  /* 6. Human oversight & when NOT to use AI                             */
  /* ------------------------------------------------------------------ */
  {
    id: "human-oversight",
    moduleId: "ai-ethics",
    title: "Human Oversight: Knowing When Not to Use AI",
    summary: "Why people must stay accountable for important decisions, what \"human in the loop\" means, and situations where AI is the wrong tool.",
    minutes: 7,
    xp: 50,
    objectives: [
      "Explain why accountability for decisions stays with people",
      "Identify high-stakes situations that need meaningful human review",
      "Recognize everyday situations where not using AI is the better choice",
    ],
    sourceIds: ["nist-ai-rmf", "unesco-genai-guidance"],
    blocks: [
      {
        type: "text",
        heading: "AI can advise. People decide.",
        paragraphs: [
          "AI systems can sort, predict and suggest faster than any person. But they don't understand consequences, can't be held responsible, and can be wrong in ways that are hard to see. When a decision seriously affects someone's health, safety, rights, grades or future, a person needs to stay in charge.",
          "That's the idea behind human oversight: AI can be part of the process, but a qualified human reviews the result, can override it, and is accountable for the final call.",
        ],
      },
      {
        type: "terms",
        terms: [
          {
            term: "Human in the loop",
            definition: "A setup where a person reviews, approves or can override an AI system's output before it's acted on.",
          },
          {
            term: "Accountability",
            definition: "Being responsible for a decision and its effects — including explaining it and fixing mistakes. It belongs to people and organizations, not to software.",
          },
          {
            term: "High-stakes decision",
            definition: "A decision with serious or hard-to-reverse effects on someone's life, such as medical treatment, legal outcomes, school discipline, or hiring.",
          },
        ],
      },
      {
        type: "keyPoints",
        heading: "Areas that need a human in charge",
        points: [
          "Health and medical decisions — AI can support doctors, but diagnosis and treatment need qualified professionals.",
          "Legal and disciplinary decisions — people deserve a human who can hear their side.",
          "Grades and admissions — decisions about a student's future need human judgment and a way to appeal.",
          "Safety-critical situations — when an error could hurt someone, humans must be able to step in.",
        ],
      },
      {
        type: "check",
        question: {
          id: "kc-human-oversight-1",
          prompt: "A school considers using an AI system to automatically decide which students get suspended, with no staff review. What's the biggest problem?",
          options: [
            { id: "a", text: "AI systems are too slow for school use." },
            { id: "b", text: "A high-stakes decision about a student would be made with no one accountable to review it or hear the student's side." },
            { id: "c", text: "The system would need an internet connection." },
            { id: "d", text: "Students might find the system confusing to use." },
          ],
          correctOptionId: "b",
          explanation: "Discipline seriously affects a student's life. Without human review, errors or bias go uncorrected and no one is accountable for the outcome.",
        },
      },
      { type: "demo", demo: "ai-or-human" },
      {
        type: "text",
        heading: "When NOT to use AI",
        paragraphs: [
          "Human oversight isn't only for big institutions. In your own life, sometimes the smartest AI move is not using it at all.",
        ],
      },
      {
        type: "compare",
        heading: "Better without AI",
        left: {
          title: "Skip AI when…",
          items: [
            "The point of the task is to build your own skill, like practicing a new math method",
            "It would mean sharing private information about you or others",
            "You're going through something hard and need real support",
            "You can't check whether the answer is right, and being wrong matters",
          ],
        },
        right: {
          title: "Instead, try…",
          items: [
            "Working it through yourself first, then using AI to check or explain",
            "Keeping it offline, or removing identifying details",
            "Talking to a trusted adult, counselor, or support service",
            "Going to an expert or a trustworthy primary source",
          ],
        },
      },
      {
        type: "callout",
        tone: "tip",
        title: "Feeling overwhelmed? Talk to a person.",
        body: "A chatbot can't know you, follow up with you, or get you real help in an emergency. If you or a friend are struggling, reach out to a trusted adult, a school counselor, or a professional support service.",
      },
      {
        type: "check",
        question: {
          id: "kc-human-oversight-2",
          prompt: "Which situation is the best fit for using AI as a helper?",
          options: [
            { id: "a", text: "Deciding whether a friend's symptoms need a doctor." },
            { id: "b", text: "Completing a practice worksheet whose purpose is to build your own algebra skills." },
            { id: "c", text: "Generating extra practice questions after you've finished studying, then checking answers with your notes." },
          ],
          correctOptionId: "c",
          explanation: "Extra practice with answers you can verify supports your learning. Medical questions need a qualified person, and letting AI do skill-building work defeats the purpose of the practice.",
        },
      },
      {
        type: "learnMore",
        title: "How organizations manage AI risk",
        paragraphs: [
          "Organizations that build and use AI increasingly follow risk-management frameworks. The NIST AI Risk Management Framework, for example, describes ways to identify, measure and manage risks from AI systems, including clear roles and human oversight.",
          "UNESCO's guidance on generative AI in education also emphasizes a human-centered approach, where AI supports teachers and learners rather than replacing their judgment.",
        ],
      },
    ],
  },
];
