// All site content lives here so copy edits never touch component logic.

export const projects = [
  {
    id: 'nmd', chan: 'rna', kicker: 'PhD · UC Santa Cruz',
    title: 'A different primary mechanism for mRNA decay',
    one: 'First author, Genome Research 2025.',
    body: [
      'For about forty years, the field assumed nonsense-mediated decay started by trimming the poly(A) tail. I used a modified nanopore direct RNA-seq assay to read full-length transcripts directly, and the data pointed to endonucleolytic cleavage as the primary trigger instead.',
      'Reading native RNA end to end, rather than reassembling it from short fragments, is what made the mechanism visible.',
    ],
    pills: ['nanopore direct RNA-seq', 'RNA decay', 'first author · Genome Research 2025'],
  },
  {
    id: 'polya', chan: 'rna', kicker: 'PhD · UC Santa Cruz',
    title: 'Splint-ligation prep captures RNA more evenly',
    one: 'First author, BMC Genomics 2022.',
    body: [
      'Nanopore direct RNA-seq builds its libraries by splint ligation, attaching the adapter straight to native RNA. I showed that approach captures transcripts more evenly than the common poly(A) selection step, which skews toward longer tails and inconsistently picks up more than 10% of genes. The practical upshot is that you can skip selection entirely.',
      'Because the prep reads full-length native RNA, I could measure that difference directly rather than infer it. The result is now standard caveat language in the direct RNA-seq community.',
    ],
    pills: ['nanopore direct RNA-seq', 'splint ligation', 'first author · BMC Genomics 2022'],
  },
  {
    id: 'trinity', chan: 'me', kicker: 'Multiomics · lead scientist',
    title: 'Three assays collapsed into one library',
    one: 'DNA, RNA, and CpG methylation from a single input.',
    body: [
      'DNA, RNA, and methylation usually come from three separate assays run on split material. I led wet-lab development of a single-library protocol that produces all three from one input, validated across cell line, fresh tissue, and FFPE, with early signal from plasma.',
      'The matched pipeline separates the channels so each output is comparable to its single-assay equivalent.',
    ],
    pills: ['multiomic library design', 'FFPE / tissue / cell', 'DNA + RNA + methyl'],
  },
  {
    id: 'pipes', chan: 'dna', kicker: 'Multiomics · pipeline owner',
    title: 'Production pipelines for a non-standard assay',
    one: 'Nextflow on AWS Batch, in production on real cohorts.',
    body: [
      'Off-the-shelf pipelines do not fit a custom assay, so I architect and maintain production Nextflow pipelines on Seqera Platform and AWS Batch that demultiplex the channels and run each through method-appropriate analysis.',
      'Several of the modules and algorithms are ones I wrote for the custom chemistry. That work only makes sense if you also know what happened at the bench.',
    ],
    pills: ['Nextflow', 'AWS Batch', 'custom algorithms', 'Seqera Platform'],
  },
  {
    id: 'andromeda', chan: 'rna', kicker: 'Open source',
    title: 'ANDROMEDA',
    one: 'Reading an evolved enzyme’s genotype and its activity off single molecules.',
    expand: 'Alignment-based Nucleotide Detection and Read Optimization for Mapping Errors, Deaminations, and Alterations.',
    body: [
      'I led the analysis and the sequencing-template design for a directed-evolution campaign that pushed an adenosine deaminase (TadA8.20) toward RNA A-to-I editing. The template keeps each enzyme variant tethered to the transcript it edits, so one sequenced molecule carries both the variant’s coding sequence (its genotype) and the edits that variant made (its activity).',
      'Nanopore reads are only ~80% accurate, which would bury a real edit under the error floor. ANDROMEDA groups reads by a protected UMI into a per-template consensus (~99.98% accuracy), then splits the two overlaid signals by frequency: near-100% changes are the coding mutations (genotype), partial-frequency changes are the deamination edits (a quantitative activity score). That surfaced the alleles driving higher editing at non-canonical motifs.',
      'A collaborative project with another grad student and our PI; I led the analysis and template design. Open source, MIT licensed. github.com/MViscardi-UCSC/ANDROMEDA',
    ],
    pills: ['directed evolution', 'RNA A-to-I editing', 'single-molecule readout', 'UMI consensus'],
  },
  {
    id: 'nemastocks', chan: 'warm', kicker: 'UC Santa Cruz · full-stack',
    title: 'NemaStocks',
    one: 'A Django web app for tracking the lab’s C. elegans strain collection.',
    body: [
      'C. elegans labs keep hundreds of frozen strains, and tracking them in spreadsheets gets messy fast. I built a Django web app backed by a relational database (ORM) that the Arribere Lab uses to log strains, record who froze and thawed what, and see current stock, with real user accounts and an admin layer.',
      'I designed the data model, wrote the importer that migrated the lab’s existing records from JSON, and deployed it for local-network access. It’s the project where I taught myself full-stack software rather than analysis scripts. github.com/MViscardi-UCSC/djangoNemaStocks',
    ],
    pills: ['Django', 'relational data model', 'full-stack', 'lab tooling'],
  },
  {
    id: 'consult', chan: 'warm', kicker: 'UC Santa Cruz · 3 years',
    title: 'The lab people came to for sequencing help',
    one: 'Three years of ad hoc bioinformatics consulting across the Mol Bio department.',
    body: [
      'Within the UCSC Molecular Biology department I was the person other scientists came to for sequencing strategy, library-prep choices, pipeline design, and debugging, and I built containerized Snakemake and Docker pipelines that were shared between groups.',
      'Four quarters as a biochem TA and five years coaching rugby come from the same place. I like helping people get unstuck.',
    ],
    pills: ['consulting', 'Snakemake + Docker', 'teaching'],
  },
]

export const publications = [
  {
    venue: 'Genome Research · 2025', role: 'First author', first: true,
    title: 'Endonucleolytic cleavage is the primary mechanism of decay elicited by C. elegans nonsense-mediated mRNA decay',
    authors: [['Marcus J. Viscardi', true], ['Enisha Sehgal', false], ['Joshua A. Arribere', false]],
    found: 'In living worms, mRNAs flagged for nonsense-mediated decay are destroyed mainly by a single internal cut (SMG-6 endonucleolytic cleavage), not by tail-trimming as the field had assumed for decades. SMG-5, long thought to drive deadenylation, turns out to be required for that cut.',
    mine: 'I built the modified nanopore direct RNA-seq assay, designed and ran the C. elegans experiments, wrote the decay-pathway analysis from scratch, and led the project from question to publication.',
    link: 'https://genome.cshlp.org/content/35/6/1337',
  },
  {
    venue: 'BMC Genomics · 2022', role: 'First author', first: true,
    title: 'Poly(A) selection introduces bias and undue noise in direct RNA-sequencing',
    authors: [['Marcus J. Viscardi', true], ['Joshua A. Arribere', false]],
    found: 'Poly(A) selection, a routine library-prep step, skews nanopore direct RNA-seq toward longer poly(A) tails and inconsistently captures more than 10% of genes. It also turns out to be unnecessary for the method. The result is now standard caveat language in the direct RNA-seq community.',
    mine: 'I designed the comparison, ran the library preps and sequencing, did the analysis, and wrote the paper.',
    link: 'https://doi.org/10.1186/s12864-022-08762-8',
  },
  {
    venue: 'RNA · 2026', role: 'Co-author', first: false,
    title: 'The PIN domain of SMG-5 functionally interacts with SMG-6 to stimulate NMD',
    authors: [['Matthew S. Modena', false], ['Chloe M. Wohlenberg', false], ['Marcus J. Viscardi', true], ['Christian R. Dunn', false], ['Benjamin L. Haag', false], ['Joshua A. Arribere', false]],
    found: 'The PIN domain of SMG-5 works together with SMG-6, pointing to a composite catalytic site as the engine that initiates decay-cleavage. A complementary line of evidence for the cleavage-first picture from the Genome Research work above.',
    mine: 'I designed and built two of the SMG-5 mutant alleles the study used to probe the SMG-5/SMG-6 interaction.',
    link: 'https://rnajournal.cshlp.org/content/32/6/858',
  },
  {
    venue: 'RNA · 2024', role: 'Co-author', first: false,
    title: 'High-resolution reconstruction of a C. elegans ribosome sheds light on evolutionary dynamics and tissue specificity',
    authors: [['Enisha Sehgal', false], ['Chloe Wohlenberg', false], ['Evan M. Soukup', false], ['Marcus J. Viscardi', true], ['Vitor Hugo Balasco Serrão', false], ['Joshua A. Arribere', false]],
    found: 'The first high-resolution cryo-EM structure of a C. elegans ribosome, revealing a streamlined animal ribosome. Core architecture is conserved, while expansion segments and eL28 are rapidly evolving, and two ribosomal proteins (uL5, uL23) show tissue-specific paralog expression, suggesting ribosomes differ across tissues.',
    mine: 'I generated the long-read RNA sequencing that confirmed several of the newly identified ribosomal-protein homologs are expressed.',
    link: 'https://rnajournal.cshlp.org/content/30/11/1513',
  },
]

export const talks = [
  { year: '2024', venue: 'RNA Society Annual Meeting', city: 'Edinburgh, UK', type: 'poster', topic: 'Endonucleolytic cleavage as the primary mechanism of nonsense-mediated decay.' },
  { year: '2024', venue: 'Bay Area RNA Club', city: 'UCSF, San Francisco', type: 'talk', topic: 'Reading mRNA decay intermediates with long-read direct RNA-seq.' },
  { year: '2023', venue: 'CSHL Eukaryotic mRNA Processing', city: 'Cold Spring Harbor, NY', type: 'talk', topic: 'Mechanism of NMD-target decay in C. elegans.' },
  { year: '2023', venue: 'Bay Area RNA Club', city: 'UCSF, San Francisco', type: 'poster', topic: 'Nanopore direct RNA-seq for studying mRNA decay.' },
  { year: '2022', venue: 'RNA Society Annual Meeting', city: 'Boulder, CO', type: 'poster', topic: 'Poly(A) selection bias in direct RNA-sequencing.' },
  { year: '2018', venue: 'RNA Society Annual Meeting', city: 'Berkeley, CA', type: 'poster', topic: 'In vivo expression studies of the V. cholerae glycine riboswitch, including mutational analysis of ligand-binding and dimerization regions.', note: "Undergraduate research, Saint Mary's College of California." },
]

export const skills = [
  { h: 'Wet lab', p: 'Nanopore direct RNA-seq, Illumina RNA/DNA/methyl library prep, EM/bisulfite-seq, FFPE workflows, hybrid capture, multiomic assay design.' },
  { h: 'Pipelines & cloud', p: 'Nextflow on Seqera Platform + AWS Batch, Snakemake, Docker/Singularity, GitHub Actions CI/CD, S3 at TB scale, Linux daily.' },
  { h: 'Languages', p: 'Python (Pandas, NumPy, SciPy, BioPython, PySAM, scikit-learn), R (tidyverse, DESeq2, edgeR), SQL, bash.' },
  { h: 'Genomics methods', p: 'STAR, minimap2, GATK, LoFreq, Biscuit, samtools/bcftools/bedtools, MultiQC, variant calling, CpG methylation, CNV, cfDNA.' },
  { h: 'Applied AI', p: 'Foundation models in production agentic systems — LLM tool-calling, scoped permissions for agents running code against scientific data. Statistical ML at scale.' },
  { h: 'Domain depth', p: 'RNA biology (decay, splicing, NMD), long-read sequencing, in vitro directed evolution, bulk RNA-seq, methylation, copy number.' },
]
