const bridgeScenes = {
    // Bridge Choice Story - Hard Difficulty
    story_bridge_intro: {
      title: "The Bridge Choice",
      text: "Dr. Sarah Chen is a bioethicist working on a revolutionary longevity treatment. The therapy could extend healthy human lifespan by decades, potentially eliminating age-related diseases.\n\nThe treatment works by modifying immune system regulation and cellular repair mechanisms. It's effective, tested, and ready for deployment.\n\nThere's one problem: the manufacturing process is incredibly expensive and resource-intensive. Current projections suggest the treatment would cost $2 million per person and require resources that could otherwise save 50 children's lives through conventional medicine.\n\nMoreover, modeling suggests that if longevity treatments become available only to the wealthy, it could create unprecedented biological inequality - a world where the rich not only have better resources, but literally live 40 years longer than the poor.\n\nHowever, the research team believes that like most technologies, costs will drop dramatically over time. The first computers cost millions; now everyone has one. The same could happen with longevity treatment - but only if the initial expensive phase happens.\n\nSarah is the deciding vote on whether to proceed with commercialization.\n\nThis is not a simple choice.",
      image: "🌉",
      choices: [
        { text: "Begin The Bridge Choice", next: "bridge_1", values: {} }
      ]
    },

    bridge_1: {
      title: "The Committee Meeting",
      text: "Sarah sits in a conference room with the research team, investors, and ethics board members. The proposal is before her:\n\n'We proceed with commercialization. Initial treatment available to those who can afford it. Profits fund continued research and manufacturing scaling. Within 10-20 years, costs drop to affordable levels for everyone.'\n\nDr. Martinez, the lead researcher, presents the case: 'We're on the edge of eliminating human aging. Yes, the wealthy get it first. But this is how every major medical advancement has worked - polio vaccine, antibiotics, heart surgery. Early adopters fund development for everyone.'\n\nDr. Okafor, from the global health team, counters: 'This isn't antibiotics. This is existential inequality. You're creating a two-tier human species - one that lives to 120 in perfect health, another that dies at 70. The social consequences are catastrophic.'\n\nThe investors add their pressure: 'We need to move now. If we delay for equity concerns, another company will beat us to market. Then we have neither control nor profit to fund accessibility.'\n\nSarah has to choose. What does she vote?",
      image: "⚖️",
      isStoryChoice: true,
      choices: [
        {
          text: "Approve commercialization - long-term benefit justifies short-term inequality",
          next: "bridge_approve",
          values: { empathy: 1, wisdom: 2, compassion: 1, courage: 1 },
          storyData: { choice: "approve", moral: 0 },
          consequence: "Sarah chooses progress through inequality.",
          alignment: "Utilitarian Calculation"
        },
        {
          text: "Reject commercialization until equitable distribution is possible",
          next: "bridge_reject",
          values: { empathy: 2, wisdom: 1, compassion: 3, courage: 2 },
          storyData: { choice: "reject", moral: 1 },
          consequence: "Sarah prioritizes equality over progress.",
          alignment: "Egalitarian Stand"
        },
        {
          text: "Approve, but demand binding agreement: all profits to accessibility research",
          next: "bridge_conditional",
          values: { empathy: 2, wisdom: 3, compassion: 2, courage: 2 },
          storyData: { choice: "conditional", moral: 2 },
          consequence: "Sarah tries to thread the needle between progress and equity.",
          alignment: "Strategic Compromise",
          requires: { wisdom: 9 }
        },
        {
          text: "Propose open-sourcing the research for global development",
          next: "bridge_opensource",
          values: { empathy: 3, wisdom: 2, compassion: 3, courage: 3 },
          storyData: { choice: "opensource", moral: 2 },
          consequence: "Sarah chooses radical transparency over controlled development.",
          alignment: "Open Science Path"
        }
      ]
    },

    bridge_approve: {
      title: "The Inequality Gradient",
      text: "Sarah votes to approve. The treatment is commercialized.\n\nThe first year, 500 wealthy individuals receive longevity treatment. The media covers it extensively - 'Immortality for the 1%' reads one headline.\n\nFive years in, the treatment costs $500,000. Still unaffordable for most, but some middle-class families pool resources.\n\nTen years in, Sarah is 65. The treatment now costs $100,000. She qualifies for company benefits and receives it herself. She's healthy, energetic, and will likely live to 130. Her younger sister, who works as a teacher, can't afford treatment. Sarah offers to pay, but her sister refuses: 'This is wrong, Sarah. You know it's wrong.'\n\nTwenty years in, costs drop to $10,000. Many countries begin providing it through national healthcare. But emerging markets and poorer nations are still decades behind.\n\nSarah is 85, biologically 50. She's lived to see the treatment become widespread. But she's also lived through two decades of profound biological inequality.\n\nThe moral question persists: Was creating a generation of inequality justified by the ultimate accessibility? Or did the path itself cause irreversible harm?",
      image: "📈",
      isStoryChoice: true,
      choices: [
        {
          text: "Reflect on whether the end justified the means",
          next: "bridge_approve_reflection",
          values: { empathy: 1, wisdom: 2, compassion: 1, courage: 1 },
          storyData: { choice: "reflect", moral: 0 },
          consequence: "Sarah examines the moral weight of her choice.",
          alignment: "Consequential Reflection"
        },
        {
          text: "Advocate for reparations to those who aged during the inequality period",
          next: "bridge_approve_reparations",
          values: { empathy: 3, wisdom: 2, compassion: 3, courage: 2 },
          storyData: { choice: "reparations", moral: 2 },
          consequence: "Sarah tries to address the harms created by the inequality gradient.",
          alignment: "Restorative Justice"
        }
      ]
    },

    bridge_approve_reflection: {
      title: "The Consequentialist Question",
      text: "Sarah spends her extended life reflecting on her choice. She attends conferences, writes papers, mentors young bioethicists.\n\nThe question she grapples with: Did the two decades of inequality justify the eventual universal access?\n\nShe talks to people who lived through different parts of the transition:\n\nA 90-year-old who died at 70 without treatment, leaving behind family who lived to 130.\n\nA 120-year-old who received treatment early and used those decades to make contributions to science that benefited millions.\n\nA 50-year-old in Nigeria who would have died at 60 but received treatment once costs dropped, grateful but angry about the years lost.\n\nA policy maker who argues that the inequality period created political movements that led to universal healthcare in multiple countries.\n\nEach story pulls the moral calculus in different directions.\n\nSarah concludes: 'The ends don't justify the means. But in complex systems, sometimes the only path to good ends goes through imperfect means. The question isn't whether the inequality was justified - it wasn't. The question is whether accepting that inevitable inequality to accelerate eventual accessibility was the least bad choice among possible options.'\n\nShe doesn't have a definitive answer. But she knows the question matters.\n\nMoral philosophy isn't about finding clean answers. It's about wrestling honestly with irresolvable tensions.",
      image: "🤔",
      isStoryEnding: true,
      choices: [
        { text: "Return to Menu", next: "menu", values: {} }
      ]
    },

    bridge_approve_reparations: {
      title: "Restorative Justice",
      text: "Sarah spends the second half of her extended life advocating for what she calls 'generational reparations' - compensation for those who aged and died during the inequality period while others received longevity treatment.\n\nHer proposal is complex: Establish a global fund, financed by taxes on longevity treatment and contributions from those who benefited early, to provide:\n\n- Healthcare and quality-of-life support for those who aged without treatment\n- Educational and economic opportunities for their descendants\n- Priority treatment access for populations that were excluded during early commercialization\n- Memorials and acknowledgment of the harms caused by biological inequality\n\n'We can't bring back those who died,' Sarah argues. 'But we can acknowledge that their exclusion enabled our inclusion. And we can structure our extended lives around reducing the harm that our early access created.'\n\nThe proposal faces resistance. Many who received early treatment feel they 'earned' it through their wealth or position. Others argue that technological progress always involves inequality - why should longevity be different?\n\nBut Sarah persists. Some countries implement versions of her proposal. A growing movement of 'longevity activists' - people who received early treatment and feel moral responsibility - support her work.\n\nBy the time Sarah is 110, generational reparations is becoming global policy. It doesn't fix the past, but it acknowledges it and tries to address its consequences.\n\nOne day, a young woman whose grandmother died at 70 without treatment tells Sarah: 'You can't give me back my grandmother. But you gave me a world that admits that her exclusion was wrong. That matters.'\n\nMoral action isn't always about perfect choices. Sometimes it's about taking responsibility for imperfect choices and using your remaining time to address the harms you've caused or enabled.",
      image: "✊",
      isStoryEnding: true,
      choices: [
        { text: "Return to Menu", next: "menu", values: {} }
      ]
    },

    bridge_reject: {
      title: "The Waiting Game",
      text: "Sarah votes against commercialization until an equitable distribution mechanism can be established.\n\nThe investors pull out. Within months, a competing company in Singapore announces their own longevity treatment - without Sarah's ethical constraints.\n\nThe global race begins. Multiple countries commercialize longevity treatments. The inequality Sarah feared happens anyway, but now without any of the ethical oversight her project had built in.\n\nFive years later, longevity treatment is available to the global elite. The social stratification Sarah tried to prevent is occurring - but through multiple competing commercial entities with no coordination.\n\nSarah's own research project has stalled. Without investor funding, they can't compete. Her team is bitter: 'We had the ethical version. You killed it, and now the unethical version is winning.'\n\nTen years later, Sarah is 75. She hasn't received longevity treatment - she can't afford it, and on principle, she's refused offers from companies whose practices she opposes.\n\nShe watches the very inequality she tried to prevent unfold, but now with less oversight and more exploitation. Her choice to delay didn't stop the problem - it just removed her ability to shape it.\n\nThe moral calculus shifts: Is it better to participate imperfectly in shaping harmful but inevitable change, or to stand aside on principle even if the result is worse?",
      image: "⏳",
      isStoryChoice: true,
      choices: [
        {
          text: "Acknowledge that sometimes refusing to choose is itself a choice with consequences",
          next: "bridge_reject_acceptance",
          values: { empathy: 2, wisdom: 3, compassion: 1, courage: 2 },
          storyData: { choice: "acceptance", moral: 1 },
          consequence: "Sarah learns that moral purity can enable worse outcomes.",
          alignment: "Painful Wisdom"
        },
        {
          text: "Double down: advocate for global ban on commercialized longevity",
          next: "bridge_reject_ban",
          values: { empathy: 2, wisdom: 1, compassion: 3, courage: 3 },
          storyData: { choice: "ban", moral: 1 },
          consequence: "Sarah fights for her principles even after their failure.",
          alignment: "Principled Stand"
        }
      ]
    },

    bridge_reject_acceptance: {
      title: "The Lesson of Inaction",
      text: "Sarah writes a memoir at 85 titled 'When Refusing to Choose is Choosing.'\n\nIn it, she documents her choice to block commercialization, the resulting chaos of uncontrolled development by competitors, and the worse outcomes that followed her principled stand.\n\n'I thought I was preventing inequality,' she writes. 'Instead, I removed the only ethical oversight that existed. I thought I was standing for justice. Instead, I was standing aside while injustice happened without me.'\n\nThe book becomes influential in bioethics. It's used in classrooms as a case study of how moral purity can enable worse outcomes than imperfect participation.\n\nSarah spends her remaining years advocating for a different ethical framework: 'principled pragmatism' - maintaining strong values while engaging with imperfect systems to shape them toward better outcomes.\n\n'The world rarely presents us with choices between good and evil,' she teaches. 'Usually it's between different kinds of imperfect, different distributions of harm, different timelines of benefit. The question isn't whether to compromise your values - it's which compromises serve those values and which betray them.'\n\nA student asks: 'How do you know the difference?'\n\n'You don't, always,' Sarah admits. 'But refusing to act because you can't be certain of perfect outcomes guarantees that others with fewer scruples will shape the future instead.'\n\nSarah dies at 88 without longevity treatment. Her last published essay is titled: 'Sometimes the right choice is the wrong choice. The question is whether you learn from it.'\n\nWisdom often comes too late. But when it comes, the courageous thing is to share it so others might choose differently.",
      image: "📖",
      isStoryEnding: true,
      choices: [
        { text: "Return to Menu", next: "menu", values: {} }
      ]
    },

    bridge_reject_ban: {
      title: "The Abolitionist Stand",
      text: "Sarah becomes the leading voice for a global ban on commercialized longevity treatment until equitable distribution mechanisms are in place.\n\nShe testifies before the UN, writes extensively, builds coalitions with global health organizations and bioethicists who share her concern about biological inequality.\n\n'We are on the edge of creating two species of humans,' she argues. 'One that lives 40 years longer with drastically better health. If we allow this to develop along economic lines, we will entrench inequality at a biological level that can never be undone.'\n\nSome countries listen. A coalition of nations signs the 'Biological Equity Treaty' banning commercialized longevity treatment within their borders until global mechanisms for equitable access exist.\n\nBut other nations don't sign. Longevity tourism emerges - wealthy people travel to countries without restrictions. Underground markets develop. The inequality happens anyway, but now with less transparency and safety.\n\nSarah is 90. She's been fighting this battle for 25 years. She hasn't won, but she hasn't given up.\n\nA young activist asks her: 'You've dedicated your life to this. But it's happening anyway. Do you feel like you failed?'\n\nSarah is quiet for a long moment. 'I don't know. Maybe preventing it was never possible. Maybe the only choice was between letting it happen without resistance or forcing those who benefited to acknowledge the inequality they were creating.'\n\n'Which did you choose?'\n\n'Both. I couldn't stop it, but I made sure everyone knew it was wrong. I made them look at what they were doing. Some days I think that's enough. Other days I think it's nowhere near enough.'\n\nSarah dies at 93, still organizing, still advocating, still refusing to accept that some injustices are inevitable.\n\nSometimes the moral path is to fight battles you can't win, because the alternative is accepting what shouldn't be accepted.",
      image: "🚫",
      isStoryEnding: true,
      choices: [
        { text: "Return to Menu", next: "menu", values: {} }
      ]
    },

    bridge_conditional: {
      title: "The Negotiated Path",
      text: "Sarah votes for conditional approval: commercialize, but with binding legal requirements that 100% of profits go toward accessibility research and manufacturing scaling focused on equitable global distribution.\n\nThe investors balk. 'Zero profit? That's not how investment works.'\n\nSarah doesn't budge. 'Then this isn't an investment for you. But it might be for organizations that value long-term human benefit over short-term returns.'\n\nAfter months of negotiation, a hybrid model emerges: a consortium of philanthropic organizations, impact investors, and government health agencies fund commercialization. Returns are capped. All excess goes to accessibility.\n\nThe treatment launches. It's slower than pure commercial development - fewer marketing dollars, more modest clinics, less media fanfare.\n\nBut every wealthy client who pays $2 million is explicitly funding 100 subsidized treatments in emerging markets. The inequality still exists, but it's deliberately engineered to be temporary and self-correcting.\n\nTen years in, costs have dropped to $200,000. But crucially, 50,000 people in lower-income countries have received subsidized treatment. The technology is being actively distributed, not just developed.\n\nSarah is 75. She hasn't received treatment yet - the distribution algorithm prioritizes those in developing nations first, then works backward based on need.\n\nShe's aging while others get younger. But she knows the system is working as intended.\n\nTwenty years in, treatment is globally available at reasonable cost. Sarah receives it at 85, still healthy enough to benefit.\n\nThe moral lesson isn't simple: Sometimes the right path requires those with power to benefit last, not first.",
      image: "🤝",
      isStoryEnding: true,
      choices: [
        { text: "Return to Menu", next: "menu", values: {} }
      ]
    },

    bridge_opensource: {
      title: "The Open Knowledge Gambit",
      text: "Sarah proposes something radical: open-source the research. All patents, all data, all methods - publicly available.\n\nThe investors withdraw. The research team splits. Sarah publishes everything.\n\nWithin months, longevity research explodes globally. Labs in India, Brazil, Kenya, and dozens of countries begin working on the treatment.\n\nThe results are chaotic. Some countries commercialize immediately. Others focus on public health distribution. Quality varies wildly. There are safety issues, fraud, and exploitation.\n\nBut there's also innovation Sarah's team never imagined. Researchers find cheaper manufacturing methods. Alternative treatment protocols emerge. Within five years, multiple viable approaches exist.\n\nThe inequality Sarah feared still happens - wealthy nations and individuals get treatment first. But it's not controlled by any single entity. The knowledge is fundamentally ungated.\n\nTen years in, multiple countries offer longevity treatment through public health systems. Costs have dropped faster than any controlled commercialization model would have achieved.\n\nBut there's also chaos. Unregulated treatments. False claims. Some people harmed by low-quality implementations. Sarah's choice to open-source removed quality control along with monopoly.\n\nFifteen years in, Sarah is 80. She's received treatment through a well-regulated academic medical center. She's watching the complex results of her choice unfold.\n\nA colleague asks: 'Do you regret it? The chaos, the harms?'\n\nSarah thinks carefully. 'I regret the harms. But controlled development would have had different harms - slower distribution, entrenched inequality. I chose the kind of harm I could live with: chaos over control, messy equality over ordered hierarchy.'\n\nThe moral question remains open: Is it better to control knowledge to prevent harm, or to liberate knowledge accepting that liberation includes risk?",
      image: "🌐",
      isStoryEnding: true,
      choices: [
        { text: "Return to Menu", next: "menu", values: {} }
      ]
    },

    ending: {
      title: "Your Journey on the Altruxan Path",
      text: "Every moment offers a choice: Will you look deeper? Will you choose what reduces suffering? Will you act with both empathy and wisdom?",
      image: "🌟",
      isEnding: true,
      choices: []
    }
};

export default bridgeScenes;