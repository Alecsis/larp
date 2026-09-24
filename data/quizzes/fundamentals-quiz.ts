import type { Quiz } from "@/types/content";

/** Line 1 checkpoint quiz — application questions covering all six lessons. */
export const fundamentalsQuiz: Quiz = {
  id: "fundamentals-quiz",
  title: "Line 1 Quiz: AI Fundamentals",
  description: "Eight questions on what AI is, how machines learn, training data, neural networks and LLMs.",
  kind: "module",
  moduleId: "ai-fundamentals",
  passPercent: 70,
  questions: [
    {
      id: "fq-1",
      prompt: "Which statement best describes the relationship between AI and machine learning?",
      options: [
        { id: "a", text: "They are two names for exactly the same thing." },
        { id: "b", text: "Machine learning is one approach to building AI, based on learning patterns from data." },
        { id: "c", text: "AI is one type of machine learning." },
        { id: "d", text: "Machine learning only refers to robots." },
      ],
      correctOptionId: "b",
      explanation:
        "AI is the broad field. Machine learning is a subset of AI where systems learn from examples instead of relying only on hand-written rules.",
    },
    {
      id: "fq-2",
      scenario:
        "A streaming service wants to predict whether a user will finish a movie. It has data on each movie's genre, length, and the viewer's past watch history, plus a record of whether they actually finished it.",
      prompt: "In this setup, what is the label?",
      options: [
        { id: "a", text: "The movie's genre" },
        { id: "b", text: "The viewer's past watch history" },
        { id: "c", text: "Whether the viewer actually finished the movie" },
        { id: "d", text: "The movie's length" },
      ],
      correctOptionId: "c",
      explanation:
        "The label is the correct answer the model is learning to predict. Genre, length and watch history are features — the inputs used to make the prediction.",
    },
    {
      id: "fq-3",
      prompt: "A plant-identification app works well on photos of healthy leaves but often fails on leaves with disease spots. What is the most likely explanation?",
      options: [
        { id: "a", text: "Diseased leaves were rare or missing in its training data." },
        { id: "b", text: "The app's camera is broken." },
        { id: "c", text: "Plant identification is impossible for AI." },
        { id: "d", text: "The model is refusing to answer on purpose." },
      ],
      correctOptionId: "a",
      explanation:
        "Models learn only from their training data. If diseased leaves weren't well represented, the model never learned their patterns and becomes unreliable on them.",
    },
    {
      id: "fq-4",
      prompt: "What does it mean when we say a neural network “learns”?",
      options: [
        { id: "a", text: "It memorizes every training example word for word." },
        { id: "b", text: "A programmer types in new rules after each mistake." },
        { id: "c", text: "It becomes aware of the task it is doing." },
        { id: "d", text: "Its weights are adjusted step by step to reduce the error between its outputs and the correct answers." },
      ],
      correctOptionId: "d",
      explanation:
        "Learning in a neural network means automatically nudging its many weights so its predictions get closer to the labels over many examples.",
    },
    {
      id: "fq-5",
      prompt: "Why does a large language model split text into tokens?",
      options: [
        { id: "a", text: "Tokens let it break text into manageable chunks that can be converted into numbers for the network to process." },
        { id: "b", text: "Tokens are how it checks facts against the internet." },
        { id: "c", text: "Tokens make the text shorter so it costs less to print." },
      ],
      correctOptionId: "a",
      explanation:
        "Neural networks work with numbers. Tokenizing turns text into pieces — words, word parts, punctuation — that are each represented numerically.",
    },
    {
      id: "fq-6",
      scenario:
        "Maya asks a chatbot for a quote from a famous scientist to open her essay. The chatbot gives a perfect-sounding quote with the scientist's name attached.",
      prompt: "What should Maya do next?",
      options: [
        { id: "a", text: "Use it — chatbots store exact quotes from books." },
        { id: "b", text: "Use it, but change a few words so it isn't copied." },
        { id: "c", text: "Search reliable sources to confirm the scientist actually said it before using it." },
        { id: "d", text: "Ask the chatbot if it's sure, and use it if it says yes." },
      ],
      correctOptionId: "c",
      explanation:
        "LLMs generate likely-sounding text and can invent quotes. Asking the chatbot again doesn't verify anything — only an independent, reliable source can confirm the quote is real.",
    },
    {
      id: "fq-7",
      prompt: "Which of these is an example of inference rather than training?",
      options: [
        { id: "a", text: "Feeding a model 50,000 labeled x-ray images so it can adjust its weights" },
        { id: "b", text: "A finished translation model translating a sentence you just typed" },
        { id: "c", text: "Collecting and labeling thousands of product reviews" },
      ],
      correctOptionId: "b",
      explanation:
        "Inference is using an already-trained model on new input. Feeding labeled images and preparing labeled data are parts of the training process.",
    },
    {
      id: "fq-8",
      prompt: "A self-driving research car was tested only on dry, sunny roads and performed very well. Which limitation of AI is the biggest concern before using it in winter?",
      options: [
        { id: "a", text: "AI gets tired after long drives." },
        { id: "b", text: "AI always refuses to drive in snow." },
        { id: "c", text: "The car's AI might hallucinate street names." },
        { id: "d", text: "Brittleness — performance can drop sharply on conditions unlike its training data." },
      ],
      correctOptionId: "d",
      explanation:
        "AI can be brittle: it may fail on inputs that differ from what it was trained and tested on. Snowy roads are a very different situation from sunny ones.",
    },
  ],
};
