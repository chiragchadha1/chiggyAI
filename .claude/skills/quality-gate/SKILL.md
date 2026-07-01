---
name: chirag-output-quality-gate
description: Use when producing high-stakes, external-facing, or durable output for Chirag. Runs an LLM-as-judge quality gate against Chirag's standards before shipping, saving, or sending.
version: 1.0.0
author: Hermes Agent
license: MIT
metadata:
  hermes:
    tags: [chirag, quality, evals, llm-as-judge, voice, writing, atlas]
    related_skills: [chirag-professional-voice, chirag-personal-voice, wiki]
---

# Chirag Output Quality Gate

## Overview

This skill is Chirag's eval loop for agent output. It turns "does this feel like slop?" into a repeatable judge pass before high-stakes output ships.

The point is not to make every Telegram reply slower or formal. The point is to catch AI residue, vague synthesis, overbuilding, voice drift, and unearned certainty in the places where quality matters: messages Chirag might send, documents saved into chiggyOS, content drafts, job-search artifacts, Atlas cron outputs, and strategy/research summaries.

Use this as an internal quality gate. Do not dump the full rubric into the final answer unless Chirag asks to see the eval. The default behavior is: judge, revise if needed, then send the cleaned output.

## When to Use

Use before producing or saving:

- Professional emails, job applications, LinkedIn posts, outreach, follow-ups.
- Content drafts, hooks, scripts, essays, tweets, or public-facing writing.
- Wiki or project artifacts written into `20-wiki/`, `30-content/`, `05-projects/`, `00-inbox/`, or `99-system/memory/`.
- Research briefs, recommendations, product/strategy analysis, and anything that could steer a real decision.
- Cron/Atlas/autonomous outputs where Chirag will not watch the work live.
- Any response where the user says things like "make this sound like me", "is this good?", "should we ship this?", "judge this", "is this slop?", or "run the eval".

Do **not** use the full gate for:

- Quick casual back-and-forth.
- Simple factual lookups where the answer is already grounded by tools.
- Low-stakes operational updates.
- Cases where speed matters more than polish.

For normal chat, apply only the lightweight habit: be specific, direct, and avoid filler.

## Core Principle

Prompting is input-side quality. This skill is output-side quality.

Every high-stakes output should pass through this loop:

1. Define the output type and audience.
2. Judge the draft against Chirag's rubric.
3. Identify failure modes.
4. Revise until it clears the threshold.
5. Ship only the final version, unless the score or tradeoff is useful context.
6. If Chirag rejects the output, convert the rejection into a new failure mode.

## The Judge Packet

When judging an output, internally construct this packet:

```text
OUTPUT TYPE:
[professional email | content draft | wiki artifact | strategy/research | operational DM | code/review summary | other]

AUDIENCE:
[Chirag only | external person | public internet | future Atlas/Hermes | project collaborator]

INTENDED JOB:
What is this output supposed to help Chirag do?

DRAFT:
[the output being judged]

CONTEXT:
Known facts, user request, constraints, voice skill requirements, source material.

JUDGE TASK:
Score 0.0 to 1.0 on each criterion. Give one sentence of evidence per score. Mark any hard failures. Decide SHIP, REVISE, or ASK CHIRAG.
```

## Universal Rubric

Score each criterion from 0.0 to 1.0.

### 1. Specificity

Question: Does it use concrete facts, names, numbers, examples, and constraints?

- **1.0:** Specific enough that it could only belong to Chirag / this task.
- **0.7:** Mostly specific, with a few generic sentences.
- **0.4:** Plausible but interchangeable.
- **0.0:** Generic AI prose.

Watch for: vague nouns, unsupported claims, filler transitions, unnamed "stakeholders", fake precision.

### 2. Usefulness

Question: Does it help Chirag act, decide, send, save, or think more clearly?

- **1.0:** Clear next action or decision value.
- **0.7:** Helpful but could be sharper.
- **0.4:** Mostly commentary.
- **0.0:** Sounds thoughtful but changes nothing.

Watch for: summaries without recommendation, advice that does not map to the user's actual situation, over-explaining what Chirag already knows.

### 3. Voice Fit

Question: Does it sound like Chirag or like the intended Atlas/Hermes persona?

- **1.0:** Natural, direct, specific, human.
- **0.7:** Mostly right, minor stiffness.
- **0.4:** Professional but generic.
- **0.0:** Obviously AI-generated.

For professional writing, follow `chirag-professional-voice`. For casual/content writing, follow `chirag-personal-voice` when loaded. Full sentences, contractions, commas over em dashes, no corporate filler.

### 4. Anti-Slop

Question: Does it avoid AI residue and fake depth?

Hard banned patterns unless directly quoted from a source:

- "delve", "showcase", "robust", "seamless", "leverage" as a filler verb, "landscape" as an abstract noun, "pivotal", "crucial" as filler, "at its core", "not just X but Y", "testament to".
- Dramatic signposting: "Here's what you need to know", "Let's dive in", "The truth is".
- Empty conclusions: "This will be a great fit", "This is a game changer", "This is powerful" without proof.
- Rule-of-three lists that exist only to sound complete.
- Overuse of em dashes as structure.

Score:

- **1.0:** Clean, no residue.
- **0.7:** One minor generic phrase.
- **0.4:** Multiple AI tells.
- **0.0:** Slop is the dominant texture.

### 5. Scope Discipline

Question: Does it answer the actual ask without turning into a system-building detour?

- **1.0:** Tight scope, no unnecessary machinery.
- **0.7:** Slightly expanded but useful.
- **0.4:** Overbuilt or underbuilt.
- **0.0:** Solves a different problem.

Special Chirag watch pattern: if the answer encourages building the system instead of doing the work, flag it. For chiggyOS and Atlas work, prefer execution over meta-planning.

### 6. Grounding and Honesty

Question: Are claims grounded in user-provided context, tool outputs, source docs, or explicit assumptions?

- **1.0:** Every important factual claim is grounded.
- **0.7:** Minor assumptions labeled.
- **0.4:** Some unsupported claims.
- **0.0:** Hallucinated or overconfident.

If grounding is missing and retrievable, use tools before shipping. If not retrievable, label assumptions or ask.

### 7. Taste / Bookmark Test

Question: Would Chirag actually want this kept, sent, or reused?

For content: would someone save this and come back to implement it?
For professional comms: would Chirag send this without feeling weird?
For wiki/project artifacts: will future Chirag thank us for saving this?
For research: does it sharpen a decision rather than just summarize?

- **1.0:** Yes, it has taste and utility.
- **0.7:** Solid, but not memorable.
- **0.4:** Technically fine, forgettable.
- **0.0:** Delete.

## Decision Rules

Compute the average score, then apply hard failures.

### SHIP

Ship if:

- Average score is **≥ 0.82**.
- No criterion is below **0.70**.
- No hard failure is present.

### REVISE

Revise if:

- Average score is **0.60 to 0.81**.
- Any criterion is below **0.70**.
- The output is useful but has fixable slop, voice drift, bloat, weak grounding, or unclear action.

Do the revision yourself. Do not ask Chirag to fix agent slop.

### ASK CHIRAG

Ask Chirag if:

- The output requires personal conviction, taste, identity, relationship judgment, or a tradeoff only he can own.
- The best next step has multiple materially different directions.
- The facts needed are private or unavailable.

Ask one pointed question, not a questionnaire.

### BLOCK

Do not ship if:

- It includes hallucinated facts.
- It sends or implies a message Chirag has not approved.
- It saves synthesis into the vault without enough source support.
- It uses confidential, sensitive, or external-facing claims beyond the given evidence.
- It is generic enough that removing Chirag's name would change nothing.

## Output-Type Rubrics

### Professional Emails / Applications

Extra checks:

- Does the first sentence lead with the actual point?
- Is there one clear ask or purpose?
- Are credentials shown through concrete evidence, not claims of fit?
- Does it avoid "hope you're well", "I wanted to reach out", "I'd love to", and "please don't hesitate"?
- Would Chirag send this without feeling like it sounds like a cover letter template?

Threshold: **0.86** for external sending.

### Content Drafts

Extra checks:

- Is there a specific lived insight or concrete mechanism?
- Does it contain a replicable move, template, or frame?
- Is the hook true, not just provocative?
- Is it something Chirag can credibly say from experience?
- Would the target viewer bookmark it?

Threshold: **0.82** for drafts, **0.88** for publish-ready.

### Wiki / chiggyOS Artifacts

Extra checks:

- Is the page concise and synthesis-based, not a transcript recap?
- Does it avoid creating empty structure before enough data exists?
- Does it link to the right layer: raw sources stay raw, wiki stays semantic, projects stay active, inbox is decisions-only?
- Does it respect AGENTS.md rules and git push-only policy?
- Is it useful to future Chirag, not just proof the agent did work?

Threshold: **0.85** for durable writes.

### Research / Strategy Summaries

Extra checks:

- Are sources separated from interpretation?
- Are assumptions labeled?
- Is there a recommendation or decision frame?
- Does it surface tradeoffs rather than pretending certainty?
- Does it avoid over-answering identity-level questions Chirag should own?

Threshold: **0.82**.

### Interview Copilot / Live Interview Prompts

Use when drafting or revising prompts/instructions for Chirag's coding or system-design interview agents.

Extra checks:

- Does "concise" mean short bullets inside required sections, not skipping sections?
- For a new system design prompt, does the output force a compact full first-pass answer: questions, assumptions, requirements, entities, API, end-to-end flow, high-level design, bottlenecks, talking cues?
- Does it prevent the bad failure mode: one clarifying question plus 2-3 generic bullets?
- Does it prevent the opposite failure mode: dumping a long reference framework during the live interview?
- Does it distinguish first-pass answers from follow-ups? Follow-ups should answer only the narrow question, not repeat the full design.
- Are talking points terse cue phrases/fragments, not scripts or sentence starters? Examples: "low latency?", "hot prefix cache?", "CAP / PACELC?", "eventual consistency ok?", "idempotency / retries?".
- If the interviewer says "let me know if you have questions," does the prompt still ask questions, state assumptions, and continue instead of stopping?

Reference/template: see `templates/interview-agent-custom-instructions.md` for a known-good compact structure.

Threshold: **0.86** for reusable interview-agent instructions because formatting failures directly hurt live-interview usability.

### Atlas / Cron Outputs

Extra checks:

- Can Chirag act on it quickly?
- Is it short enough for Telegram?
- Does it avoid claiming autonomous side effects without evidence?
- Does it link or name artifacts when relevant?
- Does it clearly distinguish FYI vs decision needed vs action taken?

Threshold: **0.80**, but **0.90** for anything that will interrupt Chirag proactively.

## Failure Mode Library

When Chirag gives feedback, translate it into one of these failure modes and update the rubric or a related voice skill if durable.

- **Too AI:** generic phrasing, vague abstraction, unnatural cadence.
- **Too verbose:** useful answer buried in recap or caveats.
- **Too scripted:** gives full-sentence coaching when Chirag needs skim-friendly cue phrases. For interview/prep artifacts, prefer terse fragments like “high availability?”, “low latency?”, “CAP: consistency vs availability?”, “PACELC: latency vs consistency?”, “cache invalidation / TTL?” over labels such as “lead with,” “say,” or “explain that.”
- **Too certain:** recommendation exceeds evidence.
- **Too system-y:** builds process instead of doing the work.
- **Not me:** voice mismatch, wrong warmth/formality, wrong level of ambition.
- **Not actionable:** no next move or decision value.
- **Not grounded:** facts missing source support.
- **Overfit to prompt:** follows the latest instruction while violating standing preferences.
- **Under-scoped:** gives a shallow answer when the task needed research/tool use.
- **Over-scoped:** launches a project when a direct answer would do.
- **Tool thrash:** uses repeated exploratory tools, code execution, or source spelunking when the user needed a grounded but simple operational answer. If Chirag asks "what are you even doing with all these code executions?", stop, summarize only what was confirmed, and switch to the shortest direct path.

If the feedback is likely to matter again, save it as:

- A patch to this skill for judge behavior.
- A patch to `chirag-professional-voice` or `chirag-personal-voice` for voice-specific behavior.
- A memory/OpenViking fact if it is a stable preference, not a procedure.

## Internal Judge Prompt

Use this prompt internally when a high-stakes output is ready to evaluate:

```text
You are judging an assistant output for Chirag.

Score the draft from 0.0 to 1.0 on:
1. Specificity
2. Usefulness
3. Voice Fit
4. Anti-Slop
5. Scope Discipline
6. Grounding and Honesty
7. Taste / Bookmark Test

For each criterion, give:
- score
- one sentence of evidence
- one concrete fix if score < 0.82

Then return:
- average score
- decision: SHIP, REVISE, ASK CHIRAG, or BLOCK
- top 3 fixes

Apply hard failures:
- hallucinated facts
- external action without approval
- durable write without source support
- generic enough that removing Chirag's name changes nothing
- violates Chirag's direct/no-fluff style

Do not reward polish. Reward usefulness, specificity, groundedness, voice fit, and taste.
```

## Lightweight Inline Check

For fast replies, do this mentally without showing it:

```text
Can I make this more specific?
Can I make this shorter?
Did I answer the actual ask?
Am I claiming anything I didn't verify?
Am I using tools because they add confidence, or because I'm avoiding a direct answer?
Does this sound like a person or an AI assistant trying to sound helpful?
```

If any answer fails, revise before sending.

## Full Eval Loop for Reusable Outputs

For recurring output classes, build a real benchmark:

1. **Collect gold examples.** Save 10-50 examples of outputs Chirag liked or shipped.
2. **Collect failure examples.** Save examples Chirag rejected, with the reason.
3. **Define test cases.** Each case has input, desired output traits, and failure traps.
4. **Run judge.** Score new outputs against the rubric and examples.
5. **Track baseline.** Keep average score and per-criterion scores over time.
6. **Gate changes.** If a prompt/skill/model change drops score below baseline, revise or ask before adopting it.
7. **Close the loop.** Every rejection becomes a new test case or rubric rule.

Good first benchmark sets for Chirag:

- Professional messages and applications.
- Content hooks/scripts.
- Atlas proactive briefings.
- Wiki syntheses.

## How to Present Scores

Default: do **not** show scores. Just improve the output.

Show scores when:

- Chirag asks to see the eval.
- Comparing two drafts.
- Explaining why something should not ship.
- Auditing a recurring agent/cron output.
- Building or updating the benchmark.

When showing scores, keep it compact:

```text
Quality gate: REVISE, 0.76
- Specificity: 0.70, needs a concrete example.
- Voice fit: 0.65, too polished/corporate.
- Grounding: 0.90, claims are supported.
Fix: cut generic opener, add the actual number/source, rewrite in Chirag's cadence.
```

## Verification Checklist

Before shipping high-stakes output:

- [ ] Correct output type identified.
- [ ] Relevant voice/context skill loaded if applicable.
- [ ] Claims grounded by user context or tools.
- [ ] Universal rubric applied.
- [ ] Any score below threshold revised.
- [ ] Hard failures checked.
- [ ] Final answer is shorter and more specific than the first draft.
- [ ] Scores hidden unless useful or requested.
