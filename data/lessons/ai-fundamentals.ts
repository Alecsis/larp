/**
 * LINE 1 — AI FUNDAMENTALS
 * Six lessons that build from "what is AI?" to how large language models work
 * and where AI falls short. Edit text freely; the block types are defined in
 * types/content.ts.
 */
import type { Lesson } from "@/types/content";

export const aiFundamentalsLessons: Lesson[] = [
  /* ------------------------------------------------------------------ */
  /* 1. What is AI?                                                      */
  /* ------------------------------------------------------------------ */
  {
    id: "what-is-ai",
    moduleId: "ai-fundamentals",
    title: "What Is Artificial Intelligence?",
    summary: "Sort out what AI, machine learning, deep learning and generative AI actually mean — and what AI is not.",
    minutes: 6,
    xp: 50,
    objectives: [
      "Explain artificial intelligence in your own words",
      "Tell the difference between AI, machine learning, deep learning and generative AI",
      "Recognize AI you already use every day",
    ],
    sourceIds: ["elements-of-ai", "ai4k12-big-ideas"],
    blocks: [
      {
        type: "text",
        heading: "A big word for a big family of tools",
        paragraphs: [
          "Artificial intelligence (AI) is the field of building computer systems that do tasks we usually connect with human intelligence — recognizing faces, understanding speech, recommending songs, translating languages, or writing a paragraph.",
          "Notice the word “field.” AI isn't one single robot brain. It's a huge toolbox of techniques, and different tools are good at very different jobs.",
        ],
      },
      {
        type: "text",
        heading: "You already use AI (a lot)",
        paragraphs: [
          "When your phone unlocks with your face, when a streaming app suggests your next show, or when your email filters out spam, you're using AI. None of these systems can do the others' jobs — a spam filter can't pick your next song.",
          "That's called narrow AI: a system built for one specific kind of task. Every AI tool you use today is narrow AI, even the chatbots that seem to talk about anything.",
        ],
      },
      {
        type: "diagram",
        diagram: "ai-nesting",
        caption:
          "AI is the biggest circle. Machine learning is one way to build AI, deep learning is one kind of machine learning, and generative AI is one use of deep learning.",
      },
      {
        type: "terms",
        terms: [
          {
            term: "Artificial intelligence (AI)",
            definition: "The broad field of building computer systems that perform tasks usually associated with human intelligence.",
          },
          {
            term: "Machine learning (ML)",
            definition: "A way of building AI where the computer learns patterns from examples (data) instead of following only hand-written rules.",
          },
          {
            term: "Deep learning",
            definition: "A type of machine learning that uses large neural networks with many layers to find complex patterns.",
          },
          {
            term: "Generative AI",
            definition: "AI that creates new content — text, images, audio, code — based on patterns learned from training data.",
          },
          {
            term: "Narrow AI",
            definition: "AI designed for a specific task or range of tasks. All AI in use today is narrow AI.",
          },
        ],
      },
      {
        type: "check",
        question: {
          id: "kc-what-is-ai-1",
          prompt: "A video game enemy follows a list of rules a programmer wrote: “If the player is close, attack. If health is low, run away.” Which statement is most accurate?",
          options: [
            { id: "a", text: "It's not AI, because only chatbots count as AI." },
            { id: "b", text: "It's machine learning, because it makes decisions." },
            { id: "c", text: "It can be called AI, but it isn't machine learning — it follows hand-written rules instead of learning from data." },
            { id: "d", text: "It's generative AI, because it creates new behavior." },
          ],
          correctOptionId: "c",
          explanation:
            "AI is the broad umbrella, and rule-based systems like game enemies have long been called AI. Machine learning specifically means learning patterns from data, which this enemy doesn't do.",
        },
      },
      {
        type: "compare",
        heading: "Rule-based AI vs. machine learning",
        left: {
          title: "Rule-based",
          items: [
            "A person writes every rule by hand",
            "Predictable and easy to explain",
            "Breaks when a situation isn't covered by a rule",
          ],
        },
        right: {
          title: "Machine learning",
          items: [
            "The system finds patterns in lots of examples",
            "Handles messy, real-world input like photos and speech",
            "Harder to explain exactly why it made a choice",
          ],
        },
      },
      {
        type: "callout",
        tone: "think",
        title: "Does AI think?",
        body: "AI systems process data and calculate outputs — they don't have feelings, goals, or experiences like people do. When a chatbot says “I think,” that's a pattern of language it learned, not a sign of a mind behind the words.",
      },
      {
        type: "learnMore",
        title: "What about “general” AI?",
        paragraphs: [
          "You may hear the term artificial general intelligence (AGI): a hypothetical AI that could learn and perform almost any intellectual task a person can. It does not exist today, and experts disagree about whether or when it might.",
          "When you read headlines about AI, it helps to ask: is this describing a narrow tool that exists now, or a prediction about the future?",
        ],
      },
      {
        type: "check",
        question: {
          id: "kc-what-is-ai-2",
          prompt: "Your friend says, “The AI that writes my essay outlines is the same kind of AI that recognizes my face to unlock my phone.” What's the best response?",
          options: [
            { id: "a", text: "Right — all AI is one single system that does everything." },
            { id: "b", text: "Not quite — both likely use machine learning, but they're separate narrow AI systems trained for different tasks." },
            { id: "c", text: "Wrong — face unlock isn't AI at all." },
          ],
          correctOptionId: "b",
          explanation:
            "Both tools probably rely on machine learning, but each is a narrow system built and trained for its own job. A face-recognition model can't write outlines, and a text generator can't unlock your phone.",
        },
      },
      {
        type: "keyPoints",
        heading: "Key takeaways",
        points: [
          "AI is a broad field, not a single machine.",
          "Machine learning ⊂ AI: it learns from data instead of only following written rules.",
          "Every AI tool today is narrow AI, built for specific tasks.",
          "AI calculates outputs from patterns — it doesn't think or feel like a person.",
        ],
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  /* 2. Machine learning basics                                          */
  /* ------------------------------------------------------------------ */
  {
    id: "machine-learning",
    moduleId: "ai-fundamentals",
    title: "Machine Learning Basics",
    summary: "See how computers learn from labeled examples, and how a trained model makes predictions about things it has never seen.",
    minutes: 7,
    xp: 50,
    objectives: [
      "Compare writing rules by hand with learning from examples",
      "Describe the difference between training a model and using it",
      "Explain what labels and features are in supervised learning",
    ],
    sourceIds: ["google-ml-crash-course", "elements-of-ai"],
    blocks: [
      {
        type: "text",
        heading: "Try writing the rules for “cat”",
        paragraphs: [
          "Imagine writing a program that recognizes cats in photos. Pointy ears? Some dogs have those. Whiskers? So do seals. Four legs? So does a table. The list of rules never ends.",
          "Machine learning flips the approach. Instead of writing the rules, you show the computer thousands of photos labeled “cat” or “not cat” and let it find the patterns itself.",
        ],
      },
      {
        type: "diagram",
        diagram: "rules-vs-learning",
        caption:
          "Traditional programming: rules + data → answers. Machine learning: data + answers (labels) → a model that captures the rules.",
      },
      {
        type: "terms",
        terms: [
          {
            term: "Model",
            definition: "The result of training: a set of learned patterns (stored as numbers) that turns an input into a prediction.",
          },
          {
            term: "Training",
            definition: "The process of adjusting a model using example data so its predictions get better.",
          },
          {
            term: "Inference",
            definition: "Using an already-trained model to make a prediction on new input.",
          },
          {
            term: "Label",
            definition: "The correct answer attached to a training example, such as “spam” or “not spam.”",
          },
          {
            term: "Feature",
            definition: "A measurable piece of information the model uses as input, like a song's tempo or an email's number of links.",
          },
          {
            term: "Supervised learning",
            definition: "Machine learning from examples that come with labels, so the model can compare its guesses to the right answers.",
          },
        ],
      },
      {
        type: "steps",
        heading: "How supervised learning works",
        steps: [
          { title: "Collect examples", body: "Gather data, like thousands of past emails." },
          { title: "Add labels", body: "Mark each example with the correct answer: spam or not spam." },
          { title: "Train", body: "The model guesses, checks its guess against the label, and adjusts to make fewer mistakes." },
          { title: "Test", body: "Check the model on examples it has never seen to see if it learned real patterns." },
          { title: "Use it (inference)", body: "The trained model now sorts brand-new emails as they arrive." },
        ],
      },
      {
        type: "check",
        question: {
          id: "kc-machine-learning-1",
          prompt: "A music app wants to predict whether you'll skip a song. Which of these is a label in its training data?",
          options: [
            { id: "a", text: "Whether the listener actually skipped the song" },
            { id: "b", text: "The song's tempo" },
            { id: "c", text: "The song's length" },
            { id: "d", text: "The time of day it was played" },
          ],
          correctOptionId: "a",
          explanation:
            "The label is the answer the model is trying to predict — skipped or not skipped. Tempo, length and time of day are features: inputs the model uses to make that prediction.",
        },
      },
      {
        type: "demo",
        demo: "classifier",
      },
      {
        type: "callout",
        tone: "tip",
        title: "Predictions, not certainties",
        body: "A trained model doesn't know the answer — it makes its best prediction based on patterns in its training data. When new input looks unlike anything it trained on, those predictions can be way off.",
      },
      {
        type: "example",
        title: "Training vs. inference in real life",
        prompt: "A photo app is trained on millions of labeled pictures of dogs, cats, food and beaches.",
        response: "Later, you snap a picture of your lunch and the app tags it as “food” in a split second.",
        note: "The slow, expensive part (training) happened once, before you downloaded the app. What happens on your phone is inference — applying what the model already learned.",
      },
      {
        type: "learnMore",
        title: "Other kinds of machine learning",
        paragraphs: [
          "Unsupervised learning looks for structure in data that has no labels — for example, grouping shoppers with similar habits without being told what the groups are.",
          "Reinforcement learning learns by trial and error, earning rewards for good outcomes. It's often used to train systems to play games or control robots.",
        ],
      },
      {
        type: "check",
        question: {
          id: "kc-machine-learning-2",
          prompt: "A school trains a model to predict which students need extra math help, using grades from the past five years. Next fall, the model flags a new student. What is happening in the fall?",
          options: [
            { id: "a", text: "Training — the model is learning from the new student." },
            { id: "b", text: "Labeling — the model is writing correct answers." },
            { id: "c", text: "Inference — the trained model is making a prediction about new data." },
          ],
          correctOptionId: "c",
          explanation:
            "Training used the past five years of data. Applying the finished model to a brand-new student is inference. Its prediction is a starting point for teachers, not a final decision.",
        },
      },
      {
        type: "keyPoints",
        heading: "Key takeaways",
        points: [
          "Machine learning finds patterns in examples instead of relying only on hand-written rules.",
          "Features are the inputs; labels are the correct answers the model learns to predict.",
          "Training builds the model; inference uses it on new data.",
          "Model outputs are predictions that can be wrong.",
        ],
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  /* 3. Training data                                                    */
  /* ------------------------------------------------------------------ */
  {
    id: "training-data",
    moduleId: "ai-fundamentals",
    title: "Training Data: You Are What You Learn From",
    summary: "Discover why the amount, quality and variety of training data decide how well — and how fairly — a model works.",
    minutes: 6,
    xp: 50,
    objectives: [
      "Explain why data quality matters as much as data quantity",
      "Identify when a dataset doesn't represent the people or cases it will be used on",
      "Connect gaps in training data to unfair or unreliable results",
    ],
    sourceIds: ["google-ml-crash-course", "nist-ai-rmf"],
    blocks: [
      {
        type: "text",
        heading: "A model only knows its examples",
        paragraphs: [
          "A machine learning model learns everything it knows from its training data. It has no other way to learn about the world.",
          "So if the data is messy, missing important cases, or full of mistakes, the model learns those problems too. People sum this up as “garbage in, garbage out.”",
        ],
      },
      {
        type: "keyPoints",
        heading: "Three things that make training data good",
        points: [
          "Quality — examples are accurate and labels are correct.",
          "Quantity — there are enough examples for the model to find real patterns, not flukes.",
          "Representation — the data covers the full range of people, places and situations the model will face.",
        ],
      },
      {
        type: "terms",
        terms: [
          {
            term: "Training data",
            definition: "The collection of examples a machine learning model learns from.",
          },
          {
            term: "Dataset",
            definition: "An organized collection of data, such as a table of songs with their features and labels.",
          },
          {
            term: "Representative data",
            definition: "Data that reflects the full variety of cases a model will actually be used on.",
          },
          {
            term: "Garbage in, garbage out",
            definition: "The idea that a model trained on flawed data will produce flawed results.",
          },
        ],
      },
      {
        type: "example",
        title: "The sunny-day problem",
        prompt: "A team trains a model to spot stop signs using thousands of photos — all taken on clear, sunny afternoons.",
        response: "The model scores great in testing. Then it struggles at night, in rain and in snow.",
        note: "The model wasn't “bad at stop signs.” It never saw stop signs in those conditions. Its training data didn't represent the real world it was used in.",
      },
      {
        type: "check",
        question: {
          id: "kc-training-data-1",
          prompt: "A speech-recognition app was trained mostly on recordings of adults. Kids say it often mishears them. What's the most likely cause?",
          options: [
            { id: "a", text: "Kids speak incorrectly." },
            { id: "b", text: "The training data didn't represent kids' voices well." },
            { id: "c", text: "The app needs a faster processor." },
            { id: "d", text: "Speech recognition can never work for kids." },
          ],
          correctOptionId: "b",
          explanation:
            "The model learned patterns from mostly adult voices, so it's less reliable for voices that were missing from its data. Adding representative examples of kids' speech is the fix — not blaming the users.",
        },
      },
      {
        type: "demo",
        demo: "training-data",
      },
      {
        type: "callout",
        tone: "warning",
        title: "Data can carry bias",
        body: "Training data often comes from the past, and the past includes unfair decisions. If a model learns from biased examples, it can repeat or even amplify that bias. You'll dig into this on Line 3: Ethical & Responsible AI.",
      },
      {
        type: "learnMore",
        title: "Where does training data come from?",
        paragraphs: [
          "It depends on the model. Some datasets are collected on purpose, like labeled medical images. Others are gathered from large amounts of public text and images online.",
          "Labels are often added by people, which takes time and can introduce mistakes or personal judgment. That's one reason datasets need to be checked carefully.",
        ],
      },
      {
        type: "check",
        question: {
          id: "kc-training-data-2",
          prompt: "You're building a model to recommend clubs to all students at your school. Which dataset would likely work best?",
          options: [
            { id: "a", text: "Survey answers from 5,000 seniors only" },
            { id: "b", text: "Survey answers from 30 students picked at random" },
            { id: "c", text: "Survey answers from 1,500 students across every grade, with interests checked for accuracy" },
          ],
          correctOptionId: "c",
          explanation:
            "More data isn't enough on its own — 5,000 seniors don't represent freshmen. The best choice is large enough, accurate, and covers every group the model will make recommendations for.",
        },
      },
      {
        type: "keyPoints",
        heading: "Key takeaways",
        points: [
          "Models learn only from their training data — its strengths and its flaws.",
          "Good data is accurate, plentiful and representative.",
          "Missing groups or situations lead to unreliable results for those cases.",
          "Biased data can produce biased AI.",
        ],
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  /* 4. Neural networks                                                  */
  /* ------------------------------------------------------------------ */
  {
    id: "neural-networks",
    moduleId: "ai-fundamentals",
    title: "Neural Networks, Conceptually",
    summary: "Build intuition for how artificial neurons weigh inputs, stack into layers, and learn by adjusting their weights.",
    minutes: 8,
    xp: 50,
    objectives: [
      "Describe an artificial neuron as a weighted sum compared to a threshold",
      "Explain how layers let a network find more complex patterns",
      "Describe learning as adjusting weights to reduce errors",
    ],
    sourceIds: ["3b1b-neural-networks", "elements-of-ai"],
    blocks: [
      {
        type: "text",
        heading: "The idea behind deep learning",
        paragraphs: [
          "Neural networks are the engine inside deep learning — the kind of machine learning behind face recognition, speech assistants and chatbots.",
          "The name comes from a loose inspiration: brain cells called neurons pass signals to each other. But an artificial neural network is really just math — lots and lots of multiplying and adding numbers.",
        ],
      },
      {
        type: "text",
        heading: "One artificial neuron",
        paragraphs: [
          "An artificial neuron takes a few inputs, multiplies each by a weight that says how important it is, and adds them up. If the total passes a threshold, the neuron “fires” (outputs a strong signal).",
          "Say you're deciding whether to go to Friday's game. Inputs: Is it nice out? Are your friends going? Do you have a test Monday? Your friends going might carry a big weight, while the test might carry a negative one.",
        ],
      },
      {
        type: "demo",
        demo: "neuron",
      },
      {
        type: "terms",
        terms: [
          {
            term: "Neural network",
            definition: "A machine learning model made of many connected artificial neurons arranged in layers.",
          },
          {
            term: "Artificial neuron",
            definition: "A small unit that multiplies its inputs by weights, adds them up, and produces an output based on that total.",
          },
          {
            term: "Weight",
            definition: "A number that controls how much a particular input influences a neuron's output. Learning means adjusting weights.",
          },
          {
            term: "Layer",
            definition: "A group of neurons at the same stage of a network. Outputs from one layer become inputs to the next.",
          },
        ],
      },
      {
        type: "check",
        question: {
          id: "kc-neural-networks-1",
          prompt: "In a neuron deciding whether to go to the game, the input “I have a test Monday” has a large negative weight. What does that mean?",
          options: [
            { id: "a", text: "Having a test pushes the decision strongly toward NOT going." },
            { id: "b", text: "The test input is ignored completely." },
            { id: "c", text: "Having a test makes going more likely." },
            { id: "d", text: "The neuron will always output “go.”" },
          ],
          correctOptionId: "a",
          explanation:
            "Weights set both the direction and the strength of an input's influence. A large negative weight pulls the total down, making it less likely to pass the threshold.",
        },
      },
      {
        type: "diagram",
        diagram: "neural-network",
        caption:
          "Inputs flow left to right through layers of neurons. Each connection has its own weight. Early layers catch simple patterns; later layers combine them into more complex ones.",
      },
      {
        type: "steps",
        heading: "How a network learns",
        steps: [
          { title: "Guess", body: "Data flows through the network and it produces an output — at first, a pretty random one." },
          { title: "Measure the error", body: "The output is compared with the correct label to see how wrong it was." },
          { title: "Adjust the weights", body: "Every weight gets nudged slightly in the direction that would have made the error smaller." },
          { title: "Repeat", body: "Over thousands or millions of examples, those small nudges add up to a network that makes useful predictions." },
        ],
      },
      {
        type: "mythFact",
        items: [
          {
            myth: "A neural network is a digital copy of a human brain.",
            fact: "It was loosely inspired by neurons, but it works very differently. It's a math model that adjusts numbers — it has no awareness, feelings or understanding.",
          },
          {
            myth: "Programmers set every weight by hand.",
            fact: "Large networks can have millions or billions of weights. They are set automatically during training, which is also why it's hard to explain exactly why a network made a certain choice.",
          },
        ],
      },
      {
        type: "check",
        question: {
          id: "kc-neural-networks-2",
          prompt: "A network keeps labeling photos of wolves as “husky.” During training, what actually changes to fix this?",
          options: [
            { id: "a", text: "A programmer writes a new rule: “wolves are not huskies.”" },
            { id: "b", text: "The network's weights are adjusted to reduce the error on examples like these." },
            { id: "c", text: "The network memorizes the word “wolf.”" },
          ],
          correctOptionId: "b",
          explanation:
            "Networks learn by nudging their weights to shrink the difference between their output and the correct label. Nobody writes the rule by hand — the adjustment happens automatically across many examples.",
        },
      },
      {
        type: "keyPoints",
        heading: "Key takeaways",
        points: [
          "An artificial neuron = inputs × weights, added up, compared to a threshold.",
          "Stacking neurons in layers lets networks find complex patterns.",
          "Learning means automatically adjusting weights to reduce errors.",
          "Neural networks are inspired by brains but are not brains.",
        ],
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  /* 5. Generative AI & LLMs                                             */
  /* ------------------------------------------------------------------ */
  {
    id: "generative-ai-and-llms",
    moduleId: "ai-fundamentals",
    title: "Generative AI & Large Language Models",
    summary: "Look inside chatbots: how text becomes tokens, how models predict the next token, and why fluent doesn't mean correct.",
    minutes: 8,
    xp: 50,
    objectives: [
      "Explain what tokens are and why models use them",
      "Describe text generation as repeated next-token prediction",
      "Explain why a fluent, confident answer can still be wrong",
    ],
    sourceIds: ["attention-is-all-you-need", "elements-of-ai"],
    blocks: [
      {
        type: "text",
        heading: "From recognizing to creating",
        paragraphs: [
          "Most of the AI we've covered makes predictions about existing things: Is this spam? Is this a cat? Generative AI uses what it learned to produce new content — essays, images, music, code.",
          "A large language model (LLM) is a generative AI model trained on an enormous amount of text. Chatbots and writing assistants are built on top of LLMs.",
        ],
      },
      {
        type: "terms",
        terms: [
          {
            term: "Large language model (LLM)",
            definition: "A very large neural network trained on huge amounts of text to predict likely next tokens, which lets it generate language.",
          },
          {
            term: "Token",
            definition: "A chunk of text — a whole word, part of a word, or punctuation — that a language model reads and writes.",
          },
          {
            term: "Next-token prediction",
            definition: "The core task of an LLM: given the text so far, estimate which token is most likely to come next.",
          },
          {
            term: "Prompt",
            definition: "The input text you give a generative AI model to tell it what you want.",
          },
        ],
      },
      {
        type: "text",
        heading: "Step 1: Chop text into tokens",
        paragraphs: [
          "LLMs don't read letters the way you do. They split text into tokens. Common words are often a single token, while rare or long words get broken into pieces.",
          "Each token is turned into numbers, since neural networks can only work with numbers.",
        ],
      },
      {
        type: "demo",
        demo: "tokenizer",
      },
      {
        type: "text",
        heading: "Step 2: Predict the next token — again and again",
        paragraphs: [
          "Given “The team scored in the final,” a model estimates how likely every possible next token is: maybe “minute” is very likely, “seconds” is fairly likely, and “banana” is not.",
          "It picks a token, adds it to the text, and repeats — one token at a time — until the response is done. A full paragraph is built from many small predictions.",
        ],
      },
      {
        type: "demo",
        demo: "next-word",
      },
      {
        type: "check",
        question: {
          id: "kc-generative-ai-and-llms-1",
          prompt: "Why might a chatbot give a slightly different answer when you ask the exact same question twice?",
          options: [
            { id: "a", text: "It changed its mind after thinking it over." },
            { id: "b", text: "It looked the answer up in a different textbook." },
            { id: "c", text: "It remembers you and wants to vary its answers." },
            { id: "d", text: "It often samples from several likely next tokens, so small choices early on can lead to different wording." },
          ],
          correctOptionId: "d",
          explanation:
            "Many chatbots don't always pick the single most likely token — they sample among likely options. Different early picks send the rest of the response down a different path.",
        },
      },
      {
        type: "callout",
        tone: "warning",
        title: "Fluent is not the same as correct",
        body: "An LLM is trained to produce text that sounds likely, based on patterns in its training data. That's why its answers read smoothly. But sounding right and being right are different things — models can state false information with total confidence.",
      },
      {
        type: "learnMore",
        title: "What is “the model,” really?",
        paragraphs: [
          "After training, a model is essentially a giant file of numbers — the learned weights. It isn't a database of saved web pages that it looks things up in.",
          "Most modern LLMs are based on the transformer, a neural network design introduced in a 2017 research paper. Transformers are good at tracking how words in a long passage relate to each other.",
        ],
      },
      {
        type: "check",
        question: {
          id: "kc-generative-ai-and-llms-2",
          prompt: "An LLM writes a smooth, confident paragraph about a local historical event, including a specific date. What should you conclude?",
          options: [
            { id: "a", text: "The date is probably right, because the writing is so clear." },
            { id: "b", text: "The paragraph is likely-sounding text generated from patterns, so the date needs to be checked in a reliable source." },
            { id: "c", text: "LLMs copy facts straight from a database, so it must be accurate." },
          ],
          correctOptionId: "b",
          explanation:
            "LLMs generate text based on patterns, not by retrieving verified facts. Specific details like dates and names are exactly where errors slip in, so verify them with a trustworthy source.",
        },
      },
      {
        type: "keyPoints",
        heading: "Key takeaways",
        points: [
          "Generative AI creates new content; LLMs are generative models for text.",
          "LLMs split text into tokens and predict the next token, one at a time.",
          "The trained model is a huge set of learned numbers, not a fact database.",
          "Smooth writing can still contain errors — always verify important facts.",
        ],
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  /* 6. Strengths & limits                                               */
  /* ------------------------------------------------------------------ */
  {
    id: "strengths-and-limits",
    moduleId: "ai-fundamentals",
    title: "Strengths & Limits of AI",
    summary: "Learn where AI shines, where it breaks, and why people stay responsible for how it's used.",
    minutes: 6,
    xp: 50,
    objectives: [
      "List tasks where AI tends to be strong and where it tends to fail",
      "Explain hallucinations, training cutoffs and brittleness in plain language",
      "Explain why humans remain responsible for AI-assisted decisions",
    ],
    sourceIds: ["nist-ai-rmf", "elements-of-ai"],
    blocks: [
      {
        type: "text",
        heading: "Powerful, but not magic",
        paragraphs: [
          "AI can do some things amazingly well and other things surprisingly badly — sometimes in the same conversation. Knowing the difference is what makes someone a smart AI user instead of a trusting one.",
        ],
      },
      {
        type: "compare",
        heading: "Where AI tends to shine vs. struggle",
        left: {
          title: "Often strong at",
          items: [
            "Finding patterns in huge amounts of data",
            "Working fast and at scale, without getting tired",
            "Drafting, summarizing and rephrasing text",
            "Tasks that look a lot like its training data",
          ],
        },
        right: {
          title: "Often weak at",
          items: [
            "Guaranteeing facts are accurate",
            "Situations unlike its training data",
            "Knowing about events after its training ended",
            "Judgment calls involving values, fairness and context",
          ],
        },
      },
      {
        type: "terms",
        terms: [
          {
            term: "Hallucination",
            definition: "When an AI model produces information that sounds plausible but is false or made up.",
          },
          {
            term: "Training cutoff",
            definition: "The point in time after which a model has no training data, so it may not know about more recent events.",
          },
          {
            term: "Brittleness",
            definition: "When an AI system fails suddenly on inputs that are only a little different from what it was trained on.",
          },
        ],
      },
      {
        type: "check",
        question: {
          id: "kc-strengths-and-limits-1",
          prompt: "You ask a chatbot who won a championship game played last weekend, and it confidently names a team. Why should you be cautious?",
          options: [
            { id: "a", text: "Chatbots are never right about sports." },
            { id: "b", text: "The model may have a training cutoff before the game, so it could be guessing unless it's connected to a live, reliable source." },
            { id: "c", text: "Chatbots only know about events from over 100 years ago." },
            { id: "d", text: "It isn't allowed to talk about sports." },
          ],
          correctOptionId: "b",
          explanation:
            "A model only knows what was in its training data. Without a live search tool, it may produce a confident-sounding guess about recent events — check a current, reliable source.",
        },
      },
      {
        type: "mythFact",
        items: [
          {
            myth: "If an AI sounds confident, it's probably right.",
            fact: "AI models can hallucinate — stating made-up facts, quotes or sources in a completely confident tone.",
          },
          {
            myth: "AI understands what it's saying the way people do.",
            fact: "AI models process patterns in data. They can produce useful text without understanding meaning, having experiences or knowing whether something is true.",
          },
          {
            myth: "AI is objective because it's a computer.",
            fact: "AI learns from human-created data and design choices, so it can reflect and repeat human biases.",
          },
          {
            myth: "Once AI works in testing, it works everywhere.",
            fact: "AI can be brittle. Performance can drop sharply when real-world input differs from its training data.",
          },
        ],
      },
      {
        type: "callout",
        tone: "think",
        title: "Who is responsible?",
        body: "AI can suggest, draft and predict, but people choose whether to use its output. If an AI-assisted essay contains a false fact, or an AI tool makes an unfair recommendation, the humans who relied on it are still responsible for the result.",
      },
      {
        type: "example",
        title: "Using AI's strengths wisely",
        prompt: "Summarize my 6 pages of biology notes on cell division into a one-page review sheet.",
        response: "The AI produces a neat, well-organized summary in seconds.",
        note: "That's a great use of AI's speed. But before studying from it, compare it with your notes — a summary can drop a key step or mix up terms like mitosis and meiosis.",
      },
      {
        type: "check",
        question: {
          id: "kc-strengths-and-limits-2",
          prompt: "Which task is the best fit for an AI tool, with the least risk?",
          options: [
            { id: "a", text: "Deciding on its own which students get a scholarship" },
            { id: "b", text: "Brainstorming 20 possible titles for your short story, which you'll choose from" },
            { id: "c", text: "Giving final medical advice without a doctor" },
          ],
          correctOptionId: "b",
          explanation:
            "Brainstorming plays to AI's strengths — speed and variety — and you stay in control of the final choice. High-stakes decisions about people's opportunities or health need human judgment and accountability.",
        },
      },
      {
        type: "keyPoints",
        heading: "Key takeaways",
        points: [
          "AI is strong at speed, scale and pattern-matching.",
          "It can hallucinate, miss recent events, reflect bias and break on unfamiliar input.",
          "Confidence in AI output is not evidence of accuracy.",
          "Humans stay responsible for decisions made with AI's help.",
        ],
      },
    ],
  },
];
