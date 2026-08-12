---
title: Vatras
description: Why Vatras exists and the problem it is trying to solve.
---

# Vatras

## Why Vatras Exists

AI has changed what is possible when building software.

I can give an AI agent a repository and an idea and have it explore the codebase, research a problem, write a plan, implement changes, run tests and iterate.

I can build software with AI.

I've done it.

But if someone asked me:

> **How do you build software with AI?**

I don't have a particularly good answer.

The way I've worked has often been improvised.

I might start with an idea, open an agent, write a prompt, try a skill, ask it to investigate something, change direction, ask for a plan, write some code, review the result, ask another question and continue until the software works.

It can be extremely effective.

But it is also easy for the process to become random.

And if the process is random, it is difficult to improve the process.

---

## The Personal Pain

This is the problem that led to Vatras.

I don't feel that I lack the ability to build software.

The problem is that I don't yet have a reliable **way of going about building software with AI**.

I don't always know:

- what I should do first
- what I should understand before implementing
- when I should research
- when I should brainstorm
- when I should challenge an idea
- when I should ask the AI to challenge it
- what information should become persistent
- when an idea has become sufficiently understood
- when to move from understanding to planning
- when to move from planning to implementation
- how to verify that what was built is actually what we intended
- what to do when implementation exposes that our original understanding was wrong

The result is that I can use a lot of powerful techniques without having a coherent process connecting them.

That feels backwards.

I don't need another clever prompt.

I need to understand the system those techniques belong to.

**I can build software with AI. The process has been random. Time to systematise it.**

---

## The Skills Problem

One of the things that makes this particularly obvious is the growing ecosystem of AI coding skills.

There are now sophisticated skills for almost every part of development:

- exploring a codebase
- researching
- brainstorming
- writing specifications
- planning
- implementing
- testing
- debugging
- reviewing
- improving architecture
- triaging work
- interrogating ideas

These can be extremely useful.

But collecting useful skills does not automatically give us a software-development system.

If every problem is approached by picking whichever skill seems useful at the time, we have simply replaced random prompts with a more sophisticated collection of random tools.

The deeper question is:

> **What tells us which thing to do, when to do it, and why?**

---

## What We Learned From Looking at Matt Pocock's Skills

Matt Pocock's skills are a useful example because they demonstrate how far this can be taken.

They are opinionated, practical and sophisticated.

There are skills for things such as grilling, testing, debugging, architecture improvement, specifications, triage and implementation.

They encode real ways of working rather than simply providing generic prompt templates.

But they also exposed something interesting.

A system can contain many excellent individual techniques while still leaving us with a higher-level question:

> **What is the mental model for the whole development process?**

Matt's system is also deliberately personal.

The naming, commands and workflows reflect his own way of working.

There is nothing inherently wrong with that.

In fact, it is part of what makes the skills useful.

But it made us ask whether there is a more fundamental layer underneath the individual skills.

Instead of starting with:

```text
What skill should I create?
```

we want to start with:

```text
How should we think about building software with AI?
```

Then determine what skills are required to support that way of working.

---

## A Collection of Skills Is Not a System

This distinction is important.

A collection of prompts is not a development system.

A collection of skills is not necessarily a development system either.

A developer can have twenty excellent skills and still not know:

- which one to use
- when to use it
- what should happen before it
- what should happen after it
- what information it should consume
- what it should produce
- what should persist
- how the result feeds into the next stage

The skills may be individually excellent while the overall process remains improvised.

Vatras is interested in the layer above this.

---

## The Sales Analogy

There is a useful analogy in sales.

A salesperson could improvise every conversation.

They could try different things with every prospect.

Sometimes it would work.

But if every interaction follows a completely different process, it becomes difficult to understand why one conversation succeeded and another failed.

A defined methodology gives the salesperson a line to work within.

The individual conversation can still vary.

The salesperson can still experiment.

But there is a consistent underlying process.

That makes the process observable.

And because it is observable, it can be improved.

This is the property we want for software development with AI.

We need a process that gives us something to work within.

Not a rigid script.

Not a prescribed sequence that can never change.

A systematic way of approaching the work.

---

## The Goal Is Not to Make AI Deterministic

There is another important constraint.

AI remains probabilistic.

The same input can sometimes produce different results.

An agent can occasionally make an unexpected decision even when the available context is correct.

There will always be an element of the slot machine.

The goal isn't to eliminate that uncertainty.

The goal is to reduce how much of software development depends on it.

Instead of hoping that the right prompt produces the right result, we can create enough structure around the agent that:

- its behaviour becomes more predictable
- its failures become visible
- assumptions can be challenged
- knowledge can persist
- failures can feed back into the process
- the process itself can be improved
