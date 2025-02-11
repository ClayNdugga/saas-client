<div align="center">
    <img src="https://github.com/ClayNdugga/saas-client/blob/main/public/demogrid.png" alt="Screenshot Grid of App Pages" style="max-width:80%;"/> 
</div> 
<!-- <div align="center" style="margin-top: 1rem; margin-bottom: 1rem;">  
    <div style="position: relative; padding-bottom: 56.25%; height: 0;"><iframe style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: 0;" src="https://www.tella.tv/video/cm6zgj2fy002r0hla2s2qenqw/embed?b=0&title=0&a=0&loop=0&t=0&muted=0&wt=0" allowfullscreen allowtransparency></iframe>
    </div>
 </div> -->

https://github.com/user-attachments/assets/51cd16cf-db5e-46e8-a7cf-d296cefc3d57




# Overview

This application allows users to chat with their PDF documents and provides clickable references for reliable sourcing.

- **Frontend:** A Next.js application using React and TypeScript.
- **Backend:** A Node.js Express API written in TypeScript, containerized with Docker, and deployed on Google Cloud Platform (GCP) Cloud Run.

Try the application [here](https://saas-client-indol.vercel.app/)
# Workflow

## PDF Upload Process

1. **Upload:** The user uploads a PDF via the frontend interface.
2. **Storage:** The PDF is stored in a GCP Storage bucket.
3. **Task Queue:** A job is created in a task queue to manage asynchronous processing.
4. Embeddings Generation: A serverless function is triggered to generate embeddings from the PDF content.

## Query Process

1. **User Query:** The user submits a question about the uploaded document through a chat interface.
2. **Query Embedding:** The question is transformed into an embedding.
3. **Vector Search:** The embedding is used to query a vector database (Pinecone) to retrieve the 20 most relevant sections from the document.
4. **Reranking:** A reranker filters these sections down to the top 3 most relevant results.
5. **LLM Augmentation:** The selected sections, along with the original query, are passed to a Large Language Model (LLM) to generate an accurate and contextually enriched answer.
6. **Clickable References:** The response includes clickable references that highlight the original text in the PDF, providing quick navigation to the source material.

## Architecture and Technologies

<div align="center" style="margin-top: 1rem; margin-bottom: 1rem;">
    <img src="https://github.com/ClayNdugga/saas-client/blob/main/public/RAG Architecture.png" alt="Application Architecture" style="max-width:80%;"/> 
</div>

- **Frontend:** Next.js, React, TypeScript
- **Backend:** Node.js, Express, TypeScript, Docker
- **Cloud Infrastructure:** Google Cloud Platform (Cloud Run, Cloud Storage), Firebase (Authentication, NoSQL databse, Serverless functions)
- **Vector Database:** Pinecone
- **Embeddings & LLM:** OpenAI
