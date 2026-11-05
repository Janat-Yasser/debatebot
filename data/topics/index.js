// Copyright (c) 2026 Janat Yasser. All rights reserved.
// RAG Knowledge Base — 20 Topics, no emojis

const topics = [
  {
    id: 'ai-jobs',
    title: 'AI Will Destroy More Jobs Than It Creates',
    category: 'Technology',
    difficulty: 'Hot',
    description: 'The rise of automation and artificial intelligence is reshaping the labor market at unprecedented speed.',
    for_label: 'AI Destroys Jobs',
    against_label: 'AI Creates Jobs',
    chunks: [
      { id: 1, side: 'for', text: 'McKinsey Global Institute estimates that 375 million workers—14% of the global workforce—may need to switch occupational categories by 2030 due to automation. Manufacturing, data processing, and customer service roles are most at risk.' },
      { id: 2, side: 'for', text: 'Oxford University researchers Frey and Osborne found that 47% of US jobs are at high risk of automation within the next two decades. This includes roles in transportation, logistics, administrative support, and production occupations.' },
      { id: 3, side: 'for', text: 'Goldman Sachs research suggests AI could automate 300 million full-time jobs globally. White-collar knowledge workers—lawyers, accountants, programmers—are now also vulnerable, unlike previous automation waves that mainly hit blue-collar work.' },
      { id: 4, side: 'for', text: 'Historical automation has disproportionately harmed low-income workers. The transition from agricultural to industrial economies took generations and caused enormous social disruption. AI is moving orders of magnitude faster, giving workers no time to retrain.' },
      { id: 5, side: 'for', text: 'Amazon replaced 1,300 workers at a single warehouse with robots in 2023. Klarna replaced 700 customer service agents with AI. IBM plans to halt hiring for 7,800 roles that automation could fill. The trend is accelerating.' },
      { id: 6, side: 'against', text: 'The World Economic Forum projects AI will create 97 million new jobs by 2025 while displacing 85 million—a net positive of 12 million jobs. Roles in AI maintenance, data science, human-AI collaboration, and creative fields are booming.' },
      { id: 7, side: 'against', text: 'Every major technological revolution—the printing press, steam engine, electricity, computers—was predicted to cause mass unemployment. Instead, each one raised living standards and created entirely new categories of work that were unimaginable before.' },
      { id: 8, side: 'against', text: 'The ATM was supposed to eliminate bank tellers. Instead, teller employment increased because ATMs lowered the cost of opening bank branches. AI similarly reduces friction and opens new markets, creating demand for human oversight and judgment.' },
      { id: 9, side: 'against', text: 'AI creates enormous demand for complementary human skills: emotional intelligence, creativity, complex problem solving, ethical judgment, and physical dexterity. These are areas where humans vastly outperform current AI systems.' },
      { id: 10, side: 'against', text: 'Global talent shortages already exceed 85 million people, costing $8.5 trillion in unrealized revenue. AI helps fill these gaps rather than creating unemployment. In aging economies like Japan and Germany, automation is necessary to maintain economic output.' }
    ]
  },
  {
    id: 'social-media',
    title: 'Social Media Does More Harm Than Good',
    category: 'Society',
    difficulty: 'Classic',
    description: 'Social platforms connect billions but may be rewiring our minds and tearing apart society in the process.',
    for_label: 'Social Media Harms',
    against_label: 'Social Media Helps',
    chunks: [
      { id: 1, side: 'for', text: 'A landmark study by Jean Twenge found that teen depression and anxiety rates surged 50-70% between 2010-2015, precisely when smartphone and social media use became ubiquitous. Girls are particularly affected, with rates of severe depression nearly tripling.' },
      { id: 2, side: 'for', text: 'Facebook\'s own internal research, leaked by whistleblower Frances Haugen, showed the company knew Instagram was toxic for teenage girls, worsening body image issues in 32% of teen girls who already felt bad about their bodies.' },
      { id: 3, side: 'for', text: 'MIT research shows that false news spreads 6 times faster on Twitter than true news. Social media algorithms optimize for engagement, which favors outrage and controversy over accuracy, creating an epistemic crisis in democratic societies.' },
      { id: 4, side: 'for', text: 'Social media platforms extracted over $200 billion in advertising revenue in 2023 by selling users\' attention and data. The business model fundamentally requires maximizing time-on-platform through psychological manipulation, not genuine user wellbeing.' },
      { id: 5, side: 'for', text: 'Political polarization in the US has dramatically increased since 2009. Research shows social media filter bubbles and algorithmic amplification of extreme content are significant contributors to this polarization, threatening democratic institutions.' },
      { id: 6, side: 'against', text: 'Social media enabled the Arab Spring, #MeToo, Black Lives Matter, and dozens of other social movements that would have been impossible to organize without digital platforms. It has democratized access to information and given voice to the previously voiceless.' },
      { id: 7, side: 'against', text: 'During the COVID-19 pandemic, social media platforms facilitated real-time information sharing, connected isolated individuals, and enabled remote communities to maintain social bonds. For rural, disabled, and marginalized populations, it provides irreplaceable connection.' },
      { id: 8, side: 'against', text: 'Pew Research shows 81% of Americans say social media helps them stay connected to family and friends. For LGBTQ+ youth in unsupportive environments, online communities can be life-saving sources of support and identity affirmation.' },
      { id: 9, side: 'against', text: 'Social media has democratized entrepreneurship. Over 50% of small businesses use social media as their primary marketing channel. Platforms like Instagram and TikTok have enabled millions of creators to build sustainable businesses from scratch.' },
      { id: 10, side: 'against', text: 'Jonathan Haidt\'s research, while influential, has faced significant methodological criticism. Many researchers argue the correlation between social media use and mental health problems is weak and that other factors—economic inequality, academic pressure—are more significant drivers.' }
    ]
  },
  {
    id: 'universal-basic-income',
    title: 'Universal Basic Income Should Be Implemented',
    category: 'Economics',
    difficulty: 'Complex',
    description: 'Should governments give every citizen an unconditional regular cash payment? Finland, Kenya, and Stockton have run the experiments.',
    for_label: 'Pro UBI',
    against_label: 'Anti UBI',
    chunks: [
      { id: 1, side: 'for', text: 'The Stockton SEED experiment gave 125 residents $500/month for 24 months. Recipients were more likely to find full-time employment (28% vs 25%), reported lower anxiety and depression, and improved physical health. The money was spent on necessities, not luxuries.' },
      { id: 2, side: 'for', text: 'Finland\'s UBI trial found recipients had better mental wellbeing, stronger trust in institutions, and were more confident in their future. The simplicity of UBI reduces bureaucratic overhead—the US currently runs 80+ overlapping anti-poverty programs.' },
      { id: 3, side: 'for', text: 'As AI automates increasing portions of the economy, UBI provides a crucial economic floor. Without it, the productivity gains from AI will accrue entirely to capital owners while displaced workers have no safety net.' },
      { id: 4, side: 'for', text: 'UBI eliminates the poverty trap where earning more income causes loss of benefits. Currently, low-income workers face effective marginal tax rates exceeding 80% when benefits phase out. UBI allows people to take economic risks and pursue education.' },
      { id: 5, side: 'for', text: 'Alaska has run a de facto UBI—the Permanent Fund Dividend—since 1982, funded by oil revenues. Alaska has the lowest income inequality of any US state. The program enjoys broad bipartisan support and has not reduced employment rates.' },
      { id: 6, side: 'against', text: 'A UBI of $1,000/month for all 258 million American adults would cost $3.1 trillion annually—nearly the entire current federal budget. Funding it through taxes sufficient to cover this would require massive tax increases that could harm economic growth.' },
      { id: 7, side: 'against', text: 'Economic theory predicts that unconditional income reduces labor supply. A 10% reduction in work hours across the economy would cost trillions in lost output. Work provides not just income but social connection, purpose, and structure—UBI cannot replace these.' },
      { id: 8, side: 'against', text: 'If UBI replaces means-tested programs, the poorest citizens could end up worse off. A universal $500/month is far less valuable to someone in extreme poverty than targeted programs providing housing, healthcare, and food assistance worth thousands per month.' },
      { id: 9, side: 'against', text: 'Inflation risk is significant. If everyone receives more money without a corresponding increase in production, prices rise and the real value of the UBI erodes. Housing markets in particular would likely absorb much of the extra cash through rent increases.' },
      { id: 10, side: 'against', text: 'Most UBI pilots have been small-scale and short-term, making it impossible to model macroeconomic effects. When everyone receives extra money simultaneously, general equilibrium effects—inflation, labor market shifts—could negate individual-level benefits seen in pilots.' }
    ]
  },
  {
    id: 'space-exploration',
    title: 'Space Exploration Is Worth the Cost',
    category: 'Science',
    difficulty: 'Classic',
    description: 'Should humanity spend hundreds of billions exploring the cosmos when so many problems remain on Earth?',
    for_label: 'Pro Space',
    against_label: 'Against Space',
    chunks: [
      { id: 1, side: 'for', text: 'NASA\'s budget generates $3 in economic benefit for every $1 spent. Space technology has produced GPS, memory foam, scratch-resistant lenses, water filtration, and hundreds of other spin-off technologies worth trillions.' },
      { id: 2, side: 'for', text: 'Earth observation satellites provide $100 billion annually in weather forecasting, agricultural optimization, disaster monitoring, and climate science. Without space exploration, we would have far less ability to address climate change or prepare for natural disasters.' },
      { id: 3, side: 'for', text: 'Stephen Hawking and many leading scientists argue that humanity must become multi-planetary to ensure long-term survival. A single asteroid, pandemic, or nuclear war could end civilization on Earth. Mars colonization is existential insurance.' },
      { id: 4, side: 'for', text: 'The space industry is projected to reach $1 trillion by 2040. SpaceX, Blue Origin, and hundreds of startups are creating high-skilled jobs and driving innovation. Government investment seeds this private industry just as ARPANET seeded the internet.' },
      { id: 5, side: 'for', text: 'Space exploration inspires STEM education and national ambition. The Apollo program drove a generation into science and engineering. Countries with active space programs consistently outperform in scientific research and technological innovation.' },
      { id: 6, side: 'against', text: 'The US spends $25 billion annually on NASA while 38 million Americans live in poverty. Global child malnutrition kills 3 million children per year—solvable for roughly $40 billion. The moral case for prioritizing earthly suffering over space exploration is overwhelming.' },
      { id: 7, side: 'against', text: 'Mars colonization faces extraordinary biological challenges. Six months of space travel causes bone density loss, muscle atrophy, vision problems, and radiation exposure equivalent to 150 chest X-rays. Establishing a self-sustaining Mars colony within centuries is highly speculative.' },
      { id: 8, side: 'against', text: 'Most space exploration benefits—GPS, satellites, weather forecasting—could be achieved with purely orbital programs costing a fraction of deep space missions. The marginal benefit of going to Mars vs. improving Earth satellites does not justify the cost difference.' },
      { id: 9, side: 'against', text: 'Rocket launches release black carbon directly into the stratosphere, where it is particularly effective at warming the planet. As launch frequency increases with SpaceX\'s ambitions, this environmental impact becomes increasingly significant.' },
      { id: 10, side: 'against', text: 'Space exploration spending reinforces global inequality when the same resources could fund education, healthcare, and infrastructure in developing nations. The overview effect is largely experienced by a privileged few.' }
    ]
  },
  {
    id: 'death-penalty',
    title: 'The Death Penalty Should Be Abolished',
    category: 'Justice',
    difficulty: 'Intense',
    description: 'Capital punishment remains one of humanity\'s most divisive moral questions — justice, deterrence, and the value of human life.',
    for_label: 'Abolish It',
    against_label: 'Keep It',
    chunks: [
      { id: 1, side: 'for', text: 'Since 1973, over 190 death row inmates have been exonerated in the United States. The Innocence Project estimates that 4% of death sentences are imposed on innocent people. Executing an innocent person is an irreversible injustice the state cannot undo.' },
      { id: 2, side: 'for', text: 'Death penalty cases cost 3 times more than life imprisonment cases due to mandatory appeals, specialized legal representation, and separate death row facilities. California alone has spent $5 billion on capital punishment since 1978 while executing only 13 people.' },
      { id: 3, side: 'for', text: 'Studies consistently show no significant deterrent effect. States with the death penalty have higher murder rates than those without. Texas executes more people than any other state but has a higher murder rate than Wisconsin, which abolished capital punishment in 1853.' },
      { id: 4, side: 'for', text: 'The death penalty is applied with extreme racial and economic bias. Black defendants are 4 times more likely to receive a death sentence than white defendants for similar crimes. Defendants with inadequate legal representation are dramatically more likely to receive death sentences.' },
      { id: 5, side: 'for', text: '106 countries have abolished the death penalty. Every nation in the European Union has abolished capital punishment as incompatible with human dignity. The US is increasingly isolated among liberal democracies.' },
      { id: 6, side: 'against', text: 'For the most heinous crimes—mass murder, genocide, the killing of children—death may be the only proportionate punishment. Life imprisonment does not adequately reflect society\'s moral condemnation of the worst acts humans can commit against each other.' },
      { id: 7, side: 'against', text: 'The death penalty provides absolute certainty that the most dangerous criminals can never harm again. Life sentences do not prevent prison violence, escapes, or harm to corrections officers. Execution is the only guarantee of permanent incapacitation.' },
      { id: 8, side: 'against', text: 'Victims\' families often report that the death penalty provides closure and a sense of justice that life imprisonment cannot. The state has an obligation to consider victim impact in sentencing.' },
      { id: 9, side: 'against', text: 'With modern DNA evidence, wrongful conviction rates have plummeted. Improved forensics, mandatory recording of interrogations, and better legal standards make miscarriages of justice far rarer than in previous decades.' },
      { id: 10, side: 'against', text: 'Democratic societies have the right to determine their own justice systems through elected legislatures. When citizens consistently support capital punishment for the worst crimes in democratic polls, abolition by judicial fiat overrides legitimate democratic self-governance.' }
    ]
  },
  {
    id: 'remote-work',
    title: 'Remote Work Should Be the Default',
    category: 'Work',
    difficulty: 'Hot',
    description: 'The pandemic forced a global experiment. Now companies are forcing workers back. Who is right?',
    for_label: 'Remote Default',
    against_label: 'Office Default',
    chunks: [
      { id: 1, side: 'for', text: 'Stanford economist Nicholas Bloom\'s research across 16,000 workers found remote workers were 13% more productive than office workers. They worked more hours, took fewer breaks, and had fewer sick days.' },
      { id: 2, side: 'for', text: 'Remote work eliminates commuting, which averages 27 minutes each way in the US. Workers reclaim 200+ hours per year—time spent with family, exercising, sleeping, and pursuing education. This dramatically improves work-life balance and mental health outcomes.' },
      { id: 3, side: 'for', text: 'Remote work expands talent pools geographically. Companies can hire the best person globally rather than within commuting distance of a specific city. This is particularly transformative for workers in rural areas and developing countries.' },
      { id: 4, side: 'for', text: 'Remote work reduces carbon emissions by eliminating commutes. If US knowledge workers worked remotely 2.5 days per week, it would eliminate 54 million tons of CO2 annually—equivalent to taking 10 million cars off the road.' },
      { id: 5, side: 'for', text: 'Companies like GitLab and Automattic have been fully remote for over a decade and are highly successful. GitLab has 2,000+ employees across 65 countries with no headquarters, proving remote-first cultures can be productive at scale.' },
      { id: 6, side: 'against', text: 'Microsoft\'s research on 60,000 employees found that remote work caused professional networks to become significantly more siloed. Cross-team collaboration declined sharply. Innovation, which depends on serendipitous connections, suffered measurably.' },
      { id: 7, side: 'against', text: 'Junior employees are disproportionately harmed by remote work. They miss the informal mentorship, osmotic learning, and relationship building that happens naturally in offices. Remote work can stall career development for those starting out.' },
      { id: 8, side: 'against', text: 'Remote work advantages are not equally distributed. Workers with dedicated home offices and no caregiving responsibilities benefit most. Workers in small apartments or with children are significantly disadvantaged, potentially widening inequality.' },
      { id: 9, side: 'against', text: 'Company culture is extremely difficult to maintain remotely. Shared values, norms, and identity are built through in-person interaction. Fully remote companies struggle with onboarding and maintaining cohesion through difficult periods.' },
      { id: 10, side: 'against', text: 'Urban economies depend on office workers. The shift to remote work has devastated commercial real estate, restaurants, transit systems, and small businesses near office districts. San Francisco lost 7% of its population post-pandemic, causing a fiscal crisis.' }
    ]
  },
  {
    id: 'nuclear-energy',
    title: 'Nuclear Energy Is the Future of Clean Power',
    category: 'Energy',
    difficulty: 'Complex',
    description: 'As climate change accelerates, is nuclear power our best hope for clean baseload energy, or too dangerous and expensive?',
    for_label: 'Pro Nuclear',
    against_label: 'Anti Nuclear',
    chunks: [
      { id: 1, side: 'for', text: 'Nuclear power produces the least CO2 per kilowatt-hour of any energy source—less than solar or wind when accounting for full lifecycle emissions. France generates 70% of its electricity from nuclear and has among the lowest carbon emissions per capita in the developed world.' },
      { id: 2, side: 'for', text: 'Nuclear energy has the highest energy density of any fuel source. One uranium fuel pellet the size of a fingertip produces as much energy as 17,000 cubic feet of natural gas or 1,780 pounds of coal.' },
      { id: 3, side: 'for', text: 'Nuclear power is statistically the safest energy source per unit of energy produced. Deaths per terawatt-hour: coal 24.6, oil 18.4, gas 2.8, wind 0.04, solar 0.02, nuclear 0.03. Even including Chernobyl and Fukushima, nuclear is extraordinarily safe.' },
      { id: 4, side: 'for', text: 'Advanced reactor designs—Small Modular Reactors, molten salt reactors, thorium reactors—are dramatically safer than Cold War-era designs and cannot melt down. Dozens of startups are commercializing these technologies now.' },
      { id: 5, side: 'for', text: 'Nuclear provides stable baseload power that solar and wind cannot. Without nuclear or massive battery storage, transitioning to 100% renewables requires either overbuilding capacity by 5-10x or accepting blackouts.' },
      { id: 6, side: 'against', text: 'New nuclear plants are extraordinarily expensive and slow to build. The Vogtle plant in Georgia cost $35 billion—nearly 4x its original budget—and took 7 years longer than planned. Solar and wind costs have dropped 90% in a decade while nuclear costs keep rising.' },
      { id: 7, side: 'against', text: 'Nuclear waste remains radioactive for tens of thousands of years. The US has no permanent repository for high-level nuclear waste. 90,000 metric tons of spent fuel sits in temporary storage at 75 sites, a permanent liability imposed on future generations.' },
      { id: 8, side: 'against', text: 'Chernobyl left 2,600 km² uninhabitable. Fukushima displaced 154,000 people and cost $200 billion in cleanup. Even with low probability, nuclear accidents have catastrophic, irreversible consequences no other energy technology poses.' },
      { id: 9, side: 'against', text: 'Nuclear proliferation risk is real. Civilian nuclear programs provide cover and technology that can be diverted to weapons. Iran, North Korea, and Pakistan all developed nuclear capabilities under civilian program cover.' },
      { id: 10, side: 'against', text: 'Battery storage, smart grids, and geographic diversification of renewables can address intermittency without nuclear. Betting on nuclear means locking in 15-year construction timelines when we need solutions now.' }
    ]
  },
  {
    id: 'college-worth',
    title: 'A College Degree Is No Longer Worth It',
    category: 'Education',
    difficulty: 'Hot',
    description: 'With student debt at $1.7 trillion and coding bootcamps producing six-figure earners, is the traditional degree obsolete?',
    for_label: 'Degree Obsolete',
    against_label: 'Degree Essential',
    chunks: [
      { id: 1, side: 'for', text: 'US student loan debt has surpassed $1.7 trillion, averaging $37,000 per borrower. At 6% interest, a typical borrower pays $400/month for 10 years after graduation, delaying home ownership, family formation, and retirement savings by years.' },
      { id: 2, side: 'for', text: 'Apple, Google, IBM, and over 50% of Fortune 500 companies have dropped degree requirements for many positions. Skills-based hiring through portfolio, coding assessments, and bootcamp credentials is rapidly replacing the degree as the primary signal of competence.' },
      { id: 3, side: 'for', text: 'A software engineer who completes a 3-month bootcamp at $15,000 and enters the workforce 4 years earlier than a CS graduate earns $400,000+ more in cumulative salary by age 30—before accounting for student loan repayment costs.' },
      { id: 4, side: 'for', text: 'Platforms like Coursera, edX, and YouTube have made world-class education effectively free. The information content of a degree is no longer scarce—what matters is demonstrated skills and projects.' },
      { id: 5, side: 'for', text: 'Degree inflation has made credential arms races pointless. Jobs requiring a high school diploma in 1970 now require a bachelor\'s degree. This credentialism benefits universities financially while extracting enormous cost from students.' },
      { id: 6, side: 'against', text: 'College graduates earn $1.2 million more over their lifetime than high school graduates—a 65% premium that persists across economic cycles. The ROI on a bachelor\'s degree, despite rising costs, remains strongly positive for most fields.' },
      { id: 7, side: 'against', text: 'The college experience provides far more than technical skills: critical thinking, writing, exposure to diverse disciplines, professional network, and credentials gatekeepers require. Medicine, law, engineering, and academia remain degree-gated and represent millions of high-paying positions.' },
      { id: 8, side: 'against', text: 'Bootcamp outcomes data shows wide variance. Top bootcamp graduates at major tech companies are the exception. Average bootcamp graduate salaries are far lower than marketing numbers suggest. Selection bias makes bootcamp success stories misleading.' },
      { id: 9, side: 'against', text: 'Four years of intellectual exploration, forming deep friendships, developing identity, and gaining independence are formative experiences with lifelong effects on wellbeing that purely economic analyses undervalue.' },
      { id: 10, side: 'against', text: 'For first-generation college students and underrepresented minorities, college remains a powerful equalizer. Alumni networks, internship pipelines, and institutional prestige provide access to opportunities that are extremely difficult to access through alternative credentialing paths.' }
    ]
  },
  {
    id: 'drug-legalization',
    title: 'All Drugs Should Be Decriminalized',
    category: 'Justice',
    difficulty: 'Intense',
    description: 'Portugal decriminalized all drugs in 2001. Drug deaths fell, HIV infections plummeted, and incarceration dropped. Should the world follow?',
    for_label: 'Decriminalize',
    against_label: 'Keep Criminalized',
    chunks: [
      { id: 1, side: 'for', text: 'Portugal decriminalized personal possession of all drugs in 2001. Within a decade, drug-related HIV infections fell 95%, drug-induced deaths dropped from 80 to 3 per million, and drug use rates remained below the European average.' },
      { id: 2, side: 'for', text: 'The United States has spent over $1 trillion on the War on Drugs since 1971 with no measurable reduction in drug use rates. Drug arrests—1.5 million annually—destroy lives and careers without reducing addiction or trafficking.' },
      { id: 3, side: 'for', text: 'Drug criminalization disproportionately harms Black and Hispanic communities. Black Americans are 3.7 times more likely to be arrested for marijuana possession than white Americans despite similar usage rates, according to ACLU research.' },
      { id: 4, side: 'for', text: 'Addiction is a medical condition, not a moral failing. The American Medical Association and American Society of Addiction Medicine classify addiction as a chronic brain disorder. Treating it through the criminal justice system is as illogical as arresting people for diabetes.' },
      { id: 5, side: 'for', text: 'Decriminalization allows harm reduction approaches: needle exchanges, safe consumption sites, naloxone distribution, and fentanyl test strips. These evidence-based interventions save lives but are hampered by criminalization.' },
      { id: 6, side: 'against', text: 'Decriminalization sends a permissive message that drug use is acceptable. Research shows perceived risk is one of the strongest predictors of drug use. Reducing legal consequences will increase use rates, particularly among youth who are most vulnerable to addiction.' },
      { id: 7, side: 'against', text: 'Not all drugs are equal. Decriminalizing methamphetamine, fentanyl, or heroin alongside marijuana conflates substances with vastly different harm profiles. A nuanced approach—not blanket decriminalization—is more responsible.' },
      { id: 8, side: 'against', text: 'Drug trafficking organizations would not disappear under decriminalization—only full legalization with regulated markets would eliminate the black market. Decriminalization merely removes consequences for users while leaving the violent supply chain intact.' },
      { id: 9, side: 'against', text: 'Communities already suffering from drug epidemics—particularly fentanyl and methamphetamine crises—would bear the greatest cost of decriminalization. Working-class families disproportionately experience drug-related property crime, violence, and family breakdown.' },
      { id: 10, side: 'against', text: 'The Portuguese model cannot be directly transplanted. Portugal simultaneously massively expanded treatment, social services, and harm reduction. The decriminalization itself was not the only variable—the comprehensive social investment was equally critical and expensive.' }
    ]
  },
  {
    id: 'veganism',
    title: 'Everyone Should Adopt a Vegan Diet',
    category: 'Society',
    difficulty: 'Hot',
    description: 'Animal agriculture produces 14.5% of global greenhouse gases and kills 80 billion land animals annually. Is veganism a moral imperative?',
    for_label: 'Go Vegan',
    against_label: 'Reject Veganism',
    chunks: [
      { id: 1, side: 'for', text: 'Animal agriculture is responsible for 14.5% of global greenhouse gas emissions, according to the FAO—more than the entire transportation sector. A vegan diet reduces an individual\'s food-related carbon footprint by up to 73%.' },
      { id: 2, side: 'for', text: 'Livestock farming uses 77% of global agricultural land while producing only 18% of global calorie supply. Shifting to plant-based diets would free up land equivalent to the US, EU, China, and Australia combined, massively reducing deforestation.' },
      { id: 3, side: 'for', text: 'The largest nutrition studies consistently show plant-based diets reduce risk of heart disease by 32%, type 2 diabetes by 23%, and certain cancers by 15-20%. The American Dietetic Association states that well-planned vegan diets are nutritionally adequate at all life stages.' },
      { id: 4, side: 'for', text: 'Factory farming confines 80% of livestock in conditions causing severe suffering—gestation crates, battery cages, and extreme overcrowding. If animals have the capacity for suffering, which neuroscience confirms, causing this suffering for human pleasure is a profound moral failing.' },
      { id: 5, side: 'for', text: 'Industrial animal agriculture is a leading driver of antibiotic resistance. 80% of antibiotics used in the US are administered to livestock. The WHO warns antibiotic resistance could kill 10 million people annually by 2050.' },
      { id: 6, side: 'against', text: 'Veganism is a privilege of the wealthy and well-nourished. For the 2 billion people dependent on livestock for their livelihoods, and the 800 million experiencing food insecurity, animal products are essential nutrition. Demanding universal veganism ignores global inequality.' },
      { id: 7, side: 'against', text: 'Many regions—Arctic communities, arid highlands, degraded lands—cannot support crop agriculture but can sustain pastoralism. Grass-fed ruminants on marginal land are not ecologically equivalent to factory-farmed animals and can be carbon-sequestering when managed properly.' },
      { id: 8, side: 'against', text: 'A vegan diet requires significant supplementation (B12, omega-3, iron, zinc, calcium) and careful planning. Nutrient deficiencies are common in poorly planned vegan diets, particularly for children, pregnant women, and the elderly.' },
      { id: 9, side: 'against', text: 'Food is deeply tied to culture, identity, and tradition. Demanding that billions of people abandon cultural practices involving animal products—from Indigenous communities to Mediterranean cultures—is a form of cultural imperialism.' },
      { id: 10, side: 'against', text: 'Systemic change, not individual dietary choices, is what matters for climate. The 100 largest corporations produce 71% of global emissions. Focusing on personal veganism diverts attention from the industrial policy changes needed at scale.' }
    ]
  },
  {
    id: 'immigration',
    title: 'Open Borders Would Benefit Everyone',
    category: 'Politics',
    difficulty: 'Intense',
    description: 'Economists estimate open borders could double world GDP. But would the political and social costs be too high?',
    for_label: 'Open Borders',
    against_label: 'Controlled Borders',
    chunks: [
      { id: 1, side: 'for', text: 'Economists estimate that fully open borders could increase world GDP by 50-150%—a $78 to $150 trillion boost. This would be the single largest economic policy change in human history, dwarfing any trade liberalization or development aid.' },
      { id: 2, side: 'for', text: 'Immigrants are disproportionately entrepreneurial. Over 40% of Fortune 500 companies were founded by immigrants or their children, including Apple, Google, Tesla, eBay, and Yahoo. Open borders would dramatically increase this innovative talent pool.' },
      { id: 3, side: 'for', text: 'Restricting migration is the single greatest remaining barrier to global equality. A worker doing identical work earns 10x more in a rich country than a poor one purely due to accident of birth. Borders enforce global apartheid, locking the poor in poverty based on birthplace.' },
      { id: 4, side: 'for', text: 'Aging wealthy nations face demographic crises. Japan, Germany, and Italy have fertility rates well below replacement. Controlled immigration already fails to supply sufficient workers. Open borders would organically solve demographic decline through market mechanisms.' },
      { id: 5, side: 'for', text: 'The vast majority of immigration restrictions serve powerful interest groups, not public welfare. Labor regulations, licensing requirements, and capital controls have been liberalized globally—migration is the one factor of production still artificially restricted.' },
      { id: 6, side: 'against', text: 'Political science research shows that rapid demographic change generates backlash, nativism, and authoritarian politics. The immigration-driven political crises in Hungary, Italy, France, and the US demonstrate that open borders would undermine the liberal democratic institutions needed to sustain them.' },
      { id: 7, side: 'against', text: 'Welfare states and open borders are incompatible. Generous social programs depend on limited membership. Unrestricted migration would either bankrupt welfare states or create a two-tier system where migrants are excluded from benefits, negating much of the poverty-reduction argument.' },
      { id: 8, side: 'against', text: 'Brain drain devastates developing nations. When educated workers emigrate from poor countries, those countries lose their doctors, engineers, and teachers—the exact people needed for development. Open borders accelerate this structural disadvantage.' },
      { id: 9, side: 'against', text: 'Cultural integration takes time. Research on immigrant assimilation shows that successful integration requires managed pace. Communities that receive immigrants faster than they can integrate experience increased social tension, reduced social trust, and declining civic participation.' },
      { id: 10, side: 'against', text: 'Nation-states have legitimate interests in controlling their borders for security, public health, and democratic self-determination. The right to determine who joins a political community is fundamental to national sovereignty and democratic self-governance.' }
    ]
  },
  {
    id: 'climate-change-action',
    title: 'Governments Must Mandate Net-Zero by 2035',
    category: 'Energy',
    difficulty: 'Intense',
    description: 'The IPCC says 1.5C is nearly out of reach. Should governments impose radical emissions mandates regardless of economic cost?',
    for_label: 'Mandate Net-Zero',
    against_label: 'Reject the Mandate',
    chunks: [
      { id: 1, side: 'for', text: 'The IPCC AR6 report states that limiting warming to 1.5C requires cutting global emissions 45% by 2030 and reaching net-zero by 2050. Current policies put us on track for 2.8C, which would cause $23 trillion in annual economic damage by 2100.' },
      { id: 2, side: 'for', text: 'Renewable energy is now the cheapest source of new electricity generation globally. Solar costs have fallen 90% since 2010. The economic argument against rapid transition has collapsed—the transition is now cheaper than continuing fossil fuel dependency.' },
      { id: 3, side: 'for', text: 'Climate change disproportionately harms the poorest populations who contributed least to emissions. Small island nations, Sub-Saharan Africa, and South Asian coastal regions face existential threats. Wealthy nations that caused this crisis have a moral obligation to act decisively.' },
      { id: 4, side: 'for', text: 'The economic case for urgent action is overwhelming. The Stern Review found that acting now costs 1% of GDP annually while inaction costs 5-20% of GDP in climate damages. Every year of delay increases the eventual cost of transition significantly.' },
      { id: 5, side: 'for', text: 'Green energy transitions create jobs. The US Inflation Reduction Act is projected to create 9 million clean energy jobs. Germany\'s Energiewende created 300,000 jobs. The transition is an economic opportunity, not just an environmental necessity.' },
      { id: 6, side: 'against', text: 'Net-zero by 2035 is technically impossible for most economies. Steel, cement, shipping, and aviation have no commercial zero-carbon solutions at scale. Mandating net-zero in 10 years would require shutting down sectors employing hundreds of millions of people.' },
      { id: 7, side: 'against', text: 'Aggressive mandates in wealthy nations without equivalent action from China and India—which together produce 45% of global emissions—accomplish little environmentally while imposing massive economic costs. Unilateral climate action is geopolitically naive.' },
      { id: 8, side: 'against', text: 'Energy poverty kills. 800 million people lack electricity access. Reliable fossil fuel energy has lifted billions out of poverty. Restricting developing nations from using fossil fuels to develop while wealthy nations built their prosperity on coal and oil is profoundly unjust.' },
      { id: 9, side: 'against', text: 'Democratic legitimacy matters. Radical economic restructuring imposed by government mandate without democratic consensus breeds resentment and political backlash. The yellow vest movement in France began as a response to fuel taxes. Imposed climate policy generates the politics that reverses it.' },
      { id: 10, side: 'against', text: 'Technology, not mandates, will solve climate change. Carbon capture, nuclear fusion, green hydrogen, and advanced geothermal are approaching commercial viability. Government mandates freeze in place current technology rather than allowing the innovation needed for true decarbonization.' }
    ]
  },
  {
    id: 'surveillance',
    title: 'Mass Surveillance Makes Society Safer',
    category: 'Technology',
    difficulty: 'Intense',
    description: 'Government agencies collect data on billions of people. Does surveillance prevent terrorism and crime, or destroy the freedoms it claims to protect?',
    for_label: 'Surveillance Works',
    against_label: 'Surveillance Harms',
    chunks: [
      { id: 1, side: 'for', text: 'The UK\'s CCTV network of 5.2 million cameras has been credited with solving thousands of crimes annually. After the 2005 London bombings, CCTV footage was essential in identifying perpetrators within 24 hours. Surveillance provides critical investigative evidence.' },
      { id: 2, side: 'for', text: 'NSA surveillance programs, according to declassified reports, contributed to disrupting over 50 terrorist plots between 2001 and 2013. Even if most cases are manageable without surveillance, preventing a single mass casualty attack justifies significant privacy trade-offs.' },
      { id: 3, side: 'for', text: 'China\'s social credit and surveillance system has demonstrably reduced petty crime and improved traffic compliance in pilot cities. Predictive policing algorithms in some US cities have reduced certain crime categories by 20-30% in experimental deployments.' },
      { id: 4, side: 'for', text: 'People with nothing to hide have nothing to fear. Most citizens will never be negatively affected by surveillance they are unaware of. The security benefits—preventing terrorism, solving murders, finding missing children—are concrete and significant.' },
      { id: 5, side: 'for', text: 'In an era of sophisticated criminal networks, encrypted communications, and international terrorism, law enforcement without surveillance tools is fighting modern threats with 20th-century methods. Proportionate surveillance is a necessary adaptation to a more dangerous world.' },
      { id: 6, side: 'against', text: 'The NSA\'s own review board found that bulk phone metadata collection—one of the most expansive surveillance programs in history—had not prevented a single terrorist attack that could not have been prevented by traditional targeted surveillance. Mass surveillance is theater, not security.' },
      { id: 7, side: 'against', text: 'Surveillance enables authoritarian control. In China, Uyghur Muslims are subject to total surveillance enabling mass detention, forced labor, and cultural genocide. The infrastructure built for "safety" is inevitably weaponized against dissidents, minorities, and political opponents.' },
      { id: 8, side: 'against', text: 'The chilling effect on free expression is severe. Research shows people self-censor political views, religious practice, and personal behavior when they know they are being watched. A surveillance society produces conformity, not safety—destroying the free society it claims to protect.' },
      { id: 9, side: 'against', text: 'Facial recognition technology has error rates of 20-35% for darker-skinned women, according to MIT research. Algorithmic bias means surveillance systems disproportionately flag, investigate, and harm minorities—amplifying existing injustices at scale.' },
      { id: 10, side: 'against', text: 'Once surveillance infrastructure exists, mission creep is inevitable. Programs built to fight terrorism are used against drug offenders, protesters, journalists, and political opponents. The IRS, DEA, and local police all access data collected for national security purposes.' }
    ]
  },
  {
    id: 'free-speech',
    title: 'Social Media Platforms Should Not Moderate Content',
    category: 'Politics',
    difficulty: 'Hot',
    description: 'When Elon Musk bought Twitter and gutted its moderation team, it ignited the oldest debate of the internet age: who decides what speech is acceptable?',
    for_label: 'No Moderation',
    against_label: 'Moderation Necessary',
    chunks: [
      { id: 1, side: 'for', text: 'The First Amendment principle that the government should not restrict speech reflects centuries of hard-won wisdom. Private platforms moderating speech create de facto censorship with no democratic accountability—a small group of engineers and executives deciding what billions can say.' },
      { id: 2, side: 'for', text: 'Content moderation is riddled with political bias. A 2022 study found conservative content was suppressed at higher rates than liberal content on major platforms. When moderation is subjective, it inevitably reflects the biases of predominantly left-leaning Silicon Valley moderators.' },
      { id: 3, side: 'for', text: 'Controversial speech is often proven correct over time. COVID lab-leak theories, Swedish lockdown skepticism, and vaccine myocarditis concerns were all suppressed as misinformation and later vindicated. Moderation freezes the current consensus and prevents necessary dissent.' },
      { id: 4, side: 'for', text: 'The marketplace of ideas works. Bad ideas are best countered with better ideas, not suppression. Censorship drives extremism underground where it cannot be challenged, monitored, or debunked. Sunlight is the best disinfectant.' },
      { id: 5, side: 'for', text: 'After Musk reduced moderation on Twitter/X, advertiser boycotts and predictions of hate speech explosions were largely unfounded. The platform has not collapsed. Actual illegal content remains removable under existing law without broad subjective moderation.' },
      { id: 6, side: 'against', text: 'Unmoderated platforms become unusable. Gab, Parler, and other "free speech" platforms were rapidly overwhelmed by hate speech, spam, and illegal content, driving away ordinary users. Complete non-moderation is not freedom—it\'s the tyranny of the loudest and most extreme voices.' },
      { id: 7, side: 'against', text: 'Algorithmic amplification means unmoderated false information spreads faster than corrections. A 2018 MIT study found false news travels 6x faster than true news on Twitter. Without moderation, the dominant voices are not the most truthful but the most outrageous.' },
      { id: 8, side: 'against', text: 'Online harassment drives women, minorities, and vulnerable populations off platforms. Without moderation, public discourse becomes dominated by those with the highest tolerance for abuse—homogenizing rather than diversifying the marketplace of ideas.' },
      { id: 9, side: 'against', text: 'There is no such thing as a truly neutral platform. Every algorithmic choice—what to amplify, what to recommend—is an editorial decision. The question is not whether platforms shape discourse but whether those choices are made responsibly and transparently.' },
      { id: 10, side: 'against', text: 'Coordination of real-world violence via social media—the Rohingya genocide in Myanmar, January 6th Capitol attack, Christchurch massacre—demonstrates that unmoderated platforms have catastrophic real-world consequences that extend far beyond mere speech.' }
    ]
  },
  {
    id: 'religion-public-life',
    title: 'Religion Should Have No Role in Government',
    category: 'Politics',
    difficulty: 'Classic',
    description: 'From prayer in schools to faith-based abortion bans, the boundary between church and state remains fiercely contested in democracies worldwide.',
    for_label: 'Strict Separation',
    against_label: 'Faith in Government',
    chunks: [
      { id: 1, side: 'for', text: 'The Establishment Clause of the US Constitution and similar provisions in most liberal democracies reflect the hard-won lesson of centuries of religious warfare: governments that take religious sides breed sectarian conflict. Secular governance protects religious pluralism.' },
      { id: 2, side: 'for', text: 'Laws based on religious doctrine impose one group\'s theological beliefs on those who do not share them. In a diverse democracy, laws must be justifiable on grounds accessible to all citizens regardless of faith. "Because God says so" is not a democratic justification.' },
      { id: 3, side: 'for', text: 'Nations with higher religious influence in government score lower on human development indices. The most secular countries—Nordic nations, Japan, Canada—consistently outperform on education, healthcare, equality, and quality of life measures.' },
      { id: 4, side: 'for', text: 'Religious influence in government systematically harms minorities. LGBTQ+ rights, women\'s reproductive freedom, and interfaith marriage rights have all been restricted by religiously-motivated legislation. Secularism protects minority rights from majority religious impositions.' },
      { id: 5, side: 'for', text: 'History is unambiguous: theocracies and states with strong religious governance—Iran, Afghanistan, medieval Europe—produce repression, stagnation, and persecution. No theocratic state has produced a flourishing, free society.' },
      { id: 6, side: 'against', text: 'Most Western legal and moral traditions are rooted in religious thought. The concept of inalienable human rights, the abolition of slavery, the civil rights movement—all were driven by religious conviction. Eliminating religious voices from public discourse impoverishes democracy.' },
      { id: 7, side: 'against', text: 'Religious communities provide irreplaceable social infrastructure: hospitals, schools, homeless shelters, food banks, addiction recovery programs. Faith-based organizations deliver social services that government cannot match in cost-effectiveness or community trust.' },
      { id: 8, side: 'against', text: 'Secular ideologies have caused the greatest atrocities in history. Stalinist atheism, Maoist communism, and Nazi racial science all operated outside religious moral frameworks and produced unparalleled mass murder. Secularism is no guarantee of ethical governance.' },
      { id: 9, side: 'against', text: 'For billions of people, faith is not separable from their identity, values, and civic participation. Demanding that religious citizens check their deepest convictions at the door of public life is a form of discrimination that excludes the majority of humanity from full democratic participation.' },
      { id: 10, side: 'against', text: 'Many of the most important moral advances in law—anti-poverty programs, environmental stewardship, refugee protection—have been championed by religious communities and justified in explicitly moral terms. Secular neutrality often means paralysis on moral questions.' }
    ]
  },
  {
    id: 'capitalism-vs-socialism',
    title: 'Capitalism Has Failed and Should Be Replaced',
    category: 'Economics',
    difficulty: 'Intense',
    description: 'Global wealth inequality has reached Gilded Age levels. Is capitalism a broken system or the greatest poverty-reduction engine in history?',
    for_label: 'Replace Capitalism',
    against_label: 'Defend Capitalism',
    chunks: [
      { id: 1, side: 'for', text: 'The richest 1% now own more wealth than the bottom 50% of humanity combined. Oxfam reports that during the pandemic, the 10 richest men doubled their fortunes while 99% of humanity experienced income decline. Capitalism systemically concentrates wealth and power.' },
      { id: 2, side: 'for', text: 'Capitalism\'s growth imperative is fundamentally incompatible with ecological survival. Infinite growth on a finite planet is physically impossible. The climate crisis, mass extinction, and resource depletion are direct consequences of capitalism\'s need for perpetual expansion.' },
      { id: 3, side: 'for', text: 'Healthcare, education, housing, and water are human rights that markets consistently fail to provide equitably. In the US—the world\'s most capitalist major economy—40 million lack health insurance, 500,000 are homeless, and student debt exceeds $1.7 trillion.' },
      { id: 4, side: 'for', text: 'Workers produce the value that capitalists extract. Marx\'s critique of surplus value has been empirically validated: CEO-to-worker pay ratios have gone from 20:1 in 1965 to 350:1 today. The system structurally transfers value from those who create it to those who own capital.' },
      { id: 5, side: 'for', text: 'Financialization has decoupled capitalism from productive activity. Wall Street profits from speculation, not production. The 2008 financial crisis, caused by unregulated financial capitalism, cost the global economy $22 trillion and wiped out millions of ordinary people\'s savings.' },
      { id: 6, side: 'against', text: 'Capitalism has lifted more people out of poverty than any system in history. Global extreme poverty fell from 90% in 1820 to 9% today. Life expectancy doubled. Literacy tripled. Child mortality collapsed. No alternative system has produced comparable human welfare improvements.' },
      { id: 7, side: 'against', text: 'Every attempt to replace capitalism with centrally planned alternatives has produced poverty, authoritarianism, and mass death. The Soviet Union, Maoist China, and Venezuela\'s Bolivarian socialism all demonstrate that market alternatives consistently fail the people they claim to serve.' },
      { id: 8, side: 'against', text: 'Decentralized price signals coordinate billions of individual decisions more efficiently than any planner can. The calculation problem identified by Hayek—that no central authority can possess the distributed knowledge markets aggregate—remains unresolved by any proposed alternative.' },
      { id: 9, side: 'against', text: 'The wealthiest capitalist societies—Nordic countries, Germany, Canada—achieve both high equality and high prosperity through regulated market economies, not by replacing capitalism. The Nordic model shows that well-regulated capitalism, not its replacement, produces the best outcomes.' },
      { id: 10, side: 'against', text: 'Innovation and entrepreneurship require the incentive structures capitalism provides. The smartphone, the internet, vaccines, and clean energy technology all emerged from capitalist innovation systems. Centrally planned economies have consistently failed to innovate at comparable rates.' }
    ]
  },
  {
    id: 'mental-health-crisis',
    title: 'Modern Life Is the Cause of the Mental Health Crisis',
    category: 'Society',
    difficulty: 'Complex',
    description: 'Depression and anxiety rates have surged globally. Is modern society — phones, isolation, inequality — to blame, or are we just better at diagnosing?',
    for_label: 'Modern Life Is the Problem',
    against_label: 'Not Modern Life\'s Fault',
    chunks: [
      { id: 1, side: 'for', text: 'The WHO reports that depression is now the leading cause of disability worldwide, affecting 280 million people. Anxiety disorders affect 284 million more. These rates have risen significantly since the 1990s, tracking with the rise of urban, digital, post-industrial modernity.' },
      { id: 2, side: 'for', text: 'Human beings evolved for small-group social living with clear purpose, physical activity, and meaningful work. Modern life—sedentary, isolated, purposeless consumption—is fundamentally mismatched with our evolved psychology. This mismatch produces chronic psychological distress.' },
      { id: 3, side: 'for', text: 'Social isolation has reached epidemic levels. 61% of Americans report feeling lonely. UK appointed a Minister for Loneliness in 2018. Harvard research links loneliness to health impacts equivalent to smoking 15 cigarettes per day. Modern life systematically destroys the social bonds humans need.' },
      { id: 4, side: 'for', text: 'Economic anxiety is a direct driver of mental illness. The combination of stagnant wages, rising costs, precarious employment, student debt, and unaffordable housing creates chronic financial stress that is the primary driver of anxiety in young adults.' },
      { id: 5, side: 'for', text: 'Smartphone use and social media correlate with declining mental health, particularly among adolescents. Countries that adopted smartphones earliest show the earliest deterioration in teen mental health. The average teenager spends 7 hours daily on screens.' },
      { id: 6, side: 'against', text: 'Apparent increases in mental illness rates largely reflect improved diagnosis, reduced stigma, and expanded definitions of mental disorders. People who would previously have suffered silently now seek help. Better detection looks like an epidemic but may represent progress in care.' },
      { id: 7, side: 'against', text: 'Pre-modern life was genuinely horrific for mental health: famine, plague, infant mortality, domestic violence, and crushing poverty caused immeasurable psychological suffering with no treatment available. Nostalgia for pre-modern community ignores its brutality.' },
      { id: 8, side: 'against', text: 'Mental illness has strong genetic and neurobiological components that exist independently of social conditions. Schizophrenia, bipolar disorder, and severe depression have similar prevalence rates across vastly different societies and historical periods.' },
      { id: 9, side: 'against', text: 'Correlation is not causation. The same period that produced rising mental illness diagnoses also saw rising prosperity, declining violence, improved physical health, and greater individual freedom. Attributing the mental health trend to modernity\'s negatives ignores its positives.' },
      { id: 10, side: 'against', text: 'The solutions to mental health crises are medical and therapeutic—better access to psychiatry, effective medication, quality psychotherapy—not societal restructuring. Medicalizing what is a healthcare access problem produces more tractable solutions than blaming "modern life."' }
    ]
  },
  {
    id: 'democracy-crisis',
    title: 'Democracy Is No Longer the Best System of Government',
    category: 'Politics',
    difficulty: 'Intense',
    description: 'Freedom House reports global democratic decline for 17 consecutive years. Meanwhile, Singapore and China outperform on governance metrics. Is liberal democracy failing?',
    for_label: 'Democracy Is Failing',
    against_label: 'Democracy Still Best',
    chunks: [
      { id: 1, side: 'for', text: 'Freedom House has recorded democratic decline globally for 17 consecutive years. Populist authoritarian leaders have been democratically elected in Hungary, Turkey, India, Brazil, and the United States. Democracy is electing its own destroyers.' },
      { id: 2, side: 'for', text: 'Democratic systems are structurally incapable of addressing long-term challenges. Politicians optimize for 4-year election cycles, not 50-year climate timelines. Singapore\'s technocratic governance has consistently outperformed democracies on housing, education, and infrastructure.' },
      { id: 3, side: 'for', text: 'Misinformation has broken democratic deliberation. When voters cannot distinguish truth from fabrication, elections do not produce informed consent—they produce manipulated outcomes. Cambridge Analytica, Russian election interference, and social media echo chambers have corrupted the information environment democracy requires.' },
      { id: 4, side: 'for', text: 'Money has captured democratic institutions. The US Supreme Court\'s Citizens United decision allows unlimited corporate political spending. Research by Martin Gilens shows that US policy outcomes reflect the preferences of economic elites, not ordinary citizens. Democracy is plutocracy in disguise.' },
      { id: 5, side: 'for', text: 'China\'s governance model has delivered extraordinary results: lifting 800 million from poverty, building world-class infrastructure, achieving rapid technological advancement. Meritocratic technocracy may simply produce better outcomes than popularity contests.' },
      { id: 6, side: 'against', text: 'Despite its flaws, democracy remains uniquely capable of peaceful power transfer and self-correction. Authoritarian regimes face catastrophic succession crises. Democracies adapt; autocracies stagnate or collapse. Churchill was right: democracy is the worst system except for all the others.' },
      { id: 7, side: 'against', text: 'No non-democratic government has produced sustained prosperity and human flourishing at scale. Singapore is a city-state, not a model for complex multi-ethnic nations. China\'s growth relied on 30 years of exceptional circumstances—cheap labor, export markets, technology transfer—not its political system.' },
      { id: 8, side: 'against', text: 'Authoritarian alternatives systematically violate human rights. The Uyghur genocide, Russian political assassinations, and Iranian theocracy demonstrate that non-democratic governance reliably produces systematic oppression. No governance efficiency justifies this cost.' },
      { id: 9, side: 'against', text: 'Democratic backsliding is happening within democracies—it is not evidence against democracy but against specific institutional designs. Ranked choice voting, campaign finance reform, independent electoral commissions, and deliberative democracy are proven reforms that strengthen democratic governance.' },
      { id: 10, side: 'against', text: 'The historical record is unambiguous: democracies do not go to war with each other, produce the highest standards of living, best protect minority rights, and generate the most scientific and technological innovation. These are not coincidences but structural features of democratic governance.' }
    ]
  },
  {
    id: 'gene-editing',
    title: 'Human Gene Editing Should Be Permitted',
    category: 'Science',
    difficulty: 'Complex',
    description: 'CRISPR can eliminate hereditary diseases — or create designer babies. Where is the line between medicine and eugenics?',
    for_label: 'Allow Gene Editing',
    against_label: 'Prohibit Gene Editing',
    chunks: [
      { id: 1, side: 'for', text: 'CRISPR-based therapies have already cured sickle cell disease in clinical trials, eliminating a condition that causes lifelong suffering for 300,000 people born with it annually. Prohibiting gene editing means condemning millions to preventable suffering and premature death.' },
      { id: 2, side: 'for', text: 'Huntington\'s disease, cystic fibrosis, and Tay-Sachs are caused by single gene mutations that gene editing can correct. Parents who carry these genes currently face the impossible choice of risking a dying child or avoiding parenthood. Gene editing offers a humane alternative.' },
      { id: 3, side: 'for', text: 'The distinction between treatment and enhancement is philosophically unstable. We permit vaccines, corrective lenses, antibiotics, and surgery to improve on nature. Gene editing is a more precise tool for doing what medicine has always done—reduce suffering and improve human wellbeing.' },
      { id: 4, side: 'for', text: 'Prohibiting gene editing in one country does not stop it globally—it merely drives the science to less regulated jurisdictions. The 2018 case of He Jiankui creating gene-edited babies in China shows that prohibition without global enforcement is futile and creates worse outcomes.' },
      { id: 5, side: 'for', text: 'Gene editing of somatic cells—treating existing patients rather than modifying inherited traits—is already widely accepted and used in cancer treatment. Extending this to germline editing with strict oversight is a proportionate next step, not a categorical leap.' },
      { id: 6, side: 'against', text: 'Germline editing permanently alters the human genome in ways that pass to all future descendants. We cannot obtain consent from people who do not yet exist. Making irreversible changes to the human species crosses a line that no previous medical intervention has approached.' },
      { id: 7, side: 'against', text: 'The history of eugenics—forced sterilization of 60,000 Americans, Nazi racial hygiene programs—demonstrates that human genetic "improvement" programs consistently produce atrocities. Gene editing places unprecedented power over human diversity in the hands of the powerful.' },
      { id: 8, side: 'against', text: 'Genetic enhancement will be available only to the wealthy, creating a biological aristocracy. If gene editing can produce smarter, healthier, longer-lived people, and only the rich can access it, the result is an insurmountable genetic advantage that makes inequality permanent.' },
      { id: 9, side: 'against', text: 'Disability advocates argue that gene editing reflects discriminatory assumptions about which lives are worth living. Many people with Down syndrome, deafness, and autism report high life satisfaction. Editing out their conditions is a value judgment about human worth that society should not make.' },
      { id: 10, side: 'against', text: 'Our understanding of gene expression is insufficient to safely edit complex traits. The genome is not a simple instruction set—most traits involve thousands of genes in complex interaction with environment. Off-target effects of CRISPR editing have caused unintended mutations in early trials.' }
    ]
  },
  {
    id: 'prison-abolition',
    title: 'Prisons Do More Harm Than Good',
    category: 'Justice',
    difficulty: 'Intense',
    description: 'The US incarcerates more people than any country on Earth. Does mass incarceration reduce crime or perpetuate it?',
    for_label: 'Abolish Prisons',
    against_label: 'Prisons Are Necessary',
    chunks: [
      { id: 1, side: 'for', text: 'The United States incarcerates 2.1 million people—the highest rate in the world at 639 per 100,000. This mass incarceration costs $80 billion annually yet has failed to make communities safer. The US has higher violent crime rates than comparable countries with far lower incarceration rates.' },
      { id: 2, side: 'for', text: 'Recidivism rates are catastrophic. Within 5 years of release, 76% of US prisoners are rearrested. Prison does not rehabilitate—it teaches criminal skills, severs community ties, eliminates employment prospects, and virtually guarantees future offending.' },
      { id: 3, side: 'for', text: 'Norway\'s prison system—focused on rehabilitation, education, and dignity—has a 20% recidivism rate compared to 76% in the US. Prison abolitionists argue this proves incarceration as punishment is not only cruel but ineffective compared to rehabilitative alternatives.' },
      { id: 4, side: 'for', text: 'Prison abolitionists propose community-based alternatives: restorative justice, mental health treatment, drug rehabilitation, and community supervision. These are consistently more effective at reducing reoffending and cost a fraction of incarceration.' },
      { id: 5, side: 'for', text: 'The prison-industrial complex profits from incarceration. Private prison companies lobby for longer sentences and harsher drug laws. For-profit detention creates a perverse incentive to maximize incarceration rather than minimize crime and suffering.' },
      { id: 6, side: 'against', text: 'Incapacitation works. While someone is imprisoned, they cannot commit crimes against the community. Research consistently shows that incarceration prevents significant crime through incapacitation, even if it fails to rehabilitate. Public safety requires removing dangerous individuals from communities.' },
      { id: 7, side: 'against', text: 'The communities most harmed by crime are often low-income minority communities that also experience highest incarceration rates. Abolishing prisons without alternative safety systems would disproportionately harm the people abolitionists claim to protect.' },
      { id: 8, side: 'against', text: 'No functional society has operated without any form of confinement for dangerous individuals. Even Nordic countries with rehabilitative prison systems still use incarceration for serious offenders. The abolition of all prisons has never been attempted at scale because no realistic alternative exists for violent offenders.' },
      { id: 9, side: 'against', text: 'Victims of violent crime have legitimate interests in justice, safety, and the removal of offenders from their communities. Prison abolition frameworks often center offender rehabilitation while inadequately addressing the trauma, safety needs, and justice claims of crime victims.' },
      { id: 10, side: 'against', text: 'The solution to mass incarceration is sentencing reform, drug decriminalization, improved rehabilitation programs, and better mental health services—not abolition. Radical abolition would be politically impossible and practically dangerous, foreclosing achievable reforms in favor of an unattainable ideal.' }
    ]
  }
];

module.exports = { topics };
