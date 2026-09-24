"use client";

import { ChoiceSortList, type ChoiceItem } from "./ChoiceSortList";
import { DemoFrame, useDemoTracker } from "./DemoFrame";

const ITEMS: ChoiceItem[] = [
  {
    id: "p1",
    title: "A general question about how photosynthesis works",
    answer: "share",
    reason: "General knowledge questions contain nothing personal. This is a great use of an AI assistant.",
  },
  {
    id: "p2",
    title: "Your home address",
    answer: "shield",
    reason: "Your address identifies where you live. Depending on the service, chats may be stored or reviewed — keep location details out.",
  },
  {
    id: "p3",
    title: "Your school login password",
    answer: "shield",
    reason: "Never type a password into a chatbot. No legitimate study task needs it, and it gives access to your accounts.",
  },
  {
    id: "p4",
    title: "A screenshot of a friend's private messages",
    answer: "shield",
    reason: "That's someone else's private information. They didn't agree to have it shared with an AI service.",
  },
  {
    id: "p5",
    title: "Your essay topic, with no personal details",
    answer: "share",
    reason: "A topic like “the causes of the French Revolution” is not personal — just follow your teacher's AI policy for how you use the help.",
  },
  {
    id: "p6",
    title: "Your medical symptoms together with your full name",
    answer: "shield",
    reason: "Health information linked to your name is highly sensitive. Talk to a parent, school nurse or doctor instead.",
  },
  {
    id: "p7",
    title: "A made-up example budget for a class project",
    answer: "share",
    reason: "Invented example numbers don't reveal anything about you. Swapping real details for made-up ones is a smart privacy habit.",
  },
  {
    id: "p8",
    title: "Your phone number",
    answer: "shield",
    reason: "A phone number can be used to identify and contact you. Leave it out.",
  },
];

export function PrivacySortDemo() {
  const markTried = useDemoTracker("privacy-sort");

  return (
    <DemoFrame
      title="Share or Shield?"
      instructions="You're about to type something into an AI chatbot. For each item, decide: is it OK to share, or should you shield it?"
      takeaway="If it identifies you, unlocks an account, or belongs to someone else, shield it. When you need help with something personal, swap in made-up details."
    >
      <ChoiceSortList
        groupName="privacy"
        items={ITEMS}
        options={[
          { value: "share", label: "OK to share" },
          { value: "shield", label: "Shield it" },
        ]}
        onInteract={markTried}
      />
    </DemoFrame>
  );
}
