/**
 * Extra learning resources shown on /resources. All links were opened and
 * checked on 2026-09-24. Descriptions are our own summaries.
 */
export interface Resource {
  title: string;
  by: string;
  url: string;
  description: string;
  /** Rough time/format hint for students. */
  format: string;
}

export interface ResourceGroup {
  id: string;
  title: string;
  intro: string;
  color: "cobalt" | "tangerine" | "emerald" | "sun";
  resources: Resource[];
}

export const RESOURCE_GROUPS: ResourceGroup[] = [
  {
    id: "understand",
    title: "Understand how AI works",
    intro: "Go deeper on the ideas from Line 1.",
    color: "cobalt",
    resources: [
      {
        title: "Elements of AI",
        by: "University of Helsinki & MinnaLearn",
        url: "https://www.elementsofai.com/",
        description: "A free, beginner-friendly online course on what AI is, what it can and can't do, and how machine learning works.",
        format: "Online course",
      },
      {
        title: "Neural Networks (video series)",
        by: "3Blue1Brown",
        url: "https://www.3blue1brown.com/topics/neural-networks",
        description: "Visual, animated explanations of how neural networks and language models work. Great if you like math.",
        format: "Videos",
      },
      {
        title: "Machine Learning Crash Course",
        by: "Google for Developers",
        url: "https://developers.google.com/machine-learning/crash-course",
        description: "A more technical introduction to machine learning concepts for students who want to go further.",
        format: "Online course (advanced)",
      },
      {
        title: "Five Big Ideas in AI",
        by: "AI4K12",
        url: "https://ai4k12.org/",
        description: "The big ideas every student should know about AI, organized by grade band.",
        format: "Website",
      },
    ],
  },
  {
    id: "try",
    title: "Try it hands-on",
    intro: "Train and test simple models yourself — no coding needed.",
    color: "tangerine",
    resources: [
      {
        title: "Teachable Machine",
        by: "Google",
        url: "https://teachablemachine.withgoogle.com/",
        description: "Train a model to recognize images, sounds or poses using your own webcam or microphone examples. A real-life version of our classifier lab.",
        format: "Web tool",
      },
      {
        title: "Quick, Draw!",
        by: "Google",
        url: "https://quickdraw.withgoogle.com/",
        description: "A drawing game where a neural network tries to guess your doodle — a fun way to see pattern recognition succeed and fail.",
        format: "Web game",
      },
      {
        title: "Day of AI",
        by: "Day of AI",
        url: "https://www.dayofai.org/",
        description: "Free AI literacy activities and lessons designed for K–12 classrooms.",
        format: "Lessons & activities",
      },
      {
        title: "Code.org AI",
        by: "Code.org",
        url: "https://code.org/ai",
        description: "AI lessons and activities from Code.org, including how AI is trained and used.",
        format: "Lessons & activities",
      },
    ],
  },
  {
    id: "verify",
    title: "Check what you read",
    intro: "Skills for Lines 2 and 3: verifying claims and spotting misinformation.",
    color: "emerald",
    resources: [
      {
        title: "SIFT (The Four Moves)",
        by: "Mike Caulfield",
        url: "https://hapgood.us/2019/06/19/sift-the-four-moves/",
        description: "The original explanation of Stop, Investigate the source, Find better coverage, Trace claims.",
        format: "Article",
      },
      {
        title: "Checkology",
        by: "The News Literacy Project",
        url: "https://checkology.org/",
        description: "Free lessons on news literacy: evaluating sources, recognizing misinformation and checking facts.",
        format: "Online lessons",
      },
      {
        title: "Civic Online Reasoning",
        by: "Digital Inquiry Group",
        url: "https://cor.inquirygroup.org/",
        description: "Lessons on evaluating online information, including lateral reading.",
        format: "Lessons",
      },
    ],
  },
  {
    id: "school",
    title: "Use AI responsibly at school",
    intro: "Citations, policies and the big picture.",
    color: "sun",
    resources: [
      {
        title: "How do I cite generative AI in MLA style?",
        by: "MLA Style Center",
        url: "https://style.mla.org/citing-generative-ai/",
        description: "Official MLA guidance on citing and disclosing AI-generated content.",
        format: "Style guide",
      },
      {
        title: "How to cite ChatGPT",
        by: "APA Style Blog",
        url: "https://apastyle.apa.org/blog/how-to-cite-chatgpt",
        description: "APA's guidance on citing AI tools, with examples.",
        format: "Style guide",
      },
      {
        title: "TeachAI",
        by: "TeachAI",
        url: "https://teachai.org/",
        description: "Resources on AI guidance and policy for schools — useful context for why teachers set the rules they do.",
        format: "Website",
      },
      {
        title: "Copyright and Artificial Intelligence",
        by: "U.S. Copyright Office",
        url: "https://www.copyright.gov/ai/",
        description: "The U.S. Copyright Office's ongoing work on how copyright applies to AI.",
        format: "Government website",
      },
    ],
  },
];

/** A quick checklist students can use before using AI on an assignment. */
export const AI_CHECKLIST = [
  "Does my teacher or school allow AI for this assignment? If unsure, ask first.",
  "Am I using AI to help me think — not to do the thinking for me?",
  "Have I kept personal and private information out of my prompt?",
  "Did I check every fact, number and source the AI gave me?",
  "Can I explain the final work in my own words without the AI?",
  "Did I disclose or cite my AI use the way my class requires?",
];
