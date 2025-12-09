Data pipeline folder — planned connectors and ingestion scripts.

Planned connectors:

- RapidAPI / Adzuna / Jooble scrapers for job listings
- O*NET skill taxonomies
- GitHub trending scraper for repository-level signals
- BLS (Bureau of Labor Statistics) fetcher for occupational projections

Initial files to implement:

- fetch_jobs.py — lightweight fetcher to store normalized job listings as JSONL
- build_skill_ontology.py — map skills to canonical tokens using RapidFuzz
- embed_jobs.py — produce embeddings and store to Postgres + pgvector
