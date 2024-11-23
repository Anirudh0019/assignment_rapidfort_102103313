
Good evening, i will be making some changes after submission mainly:
1. documentation
2. some improovements to ui

## **Table of Contents**

1. [Introduction](#introduction)
2. [Prerequisites](#prerequisites)
3. [Installation](#installation)
4. [Running the Project](#running-the-project)
5. [Troubleshooting](#troubleshooting)

## **Introduction**

This project is a DOCX to PDF converter built using Node.js, Express.js, and LibreOffice. It allows users to upload DOCX files and convert them to PDF format.
This uses Vite with React (js and jsx) along with tailwind to develop frontend.

## **Prerequisites**

- WSL/Linux "will not work on windows, can but LibreOffice will need to be set up carefully", In linux this is a breeze
- Node.js (version 20 or later)
- Docker // i used docker desktop, it automatically provides support for WSL2
## **Installation**
### Method 1
docker
1. Clone the repository: `git clone https://github.com/Anirudh0019/assignment_rapidfort_102103313.git`
2. Navigate to the project directory: `cd assignment_rapidfort_102103313` 
3. Install dependencies: `npm install`
4. Build the Docker images: `docker-compose build`
5. Start the containers: `docker-compose up`
### Method 2
traditional
1. Clone the repo: ` git clone https://github.com/Anirudh0019/assignment_rapidfort_102103313.git `
2. Navigate to the project directory: `cd assignment_rapidfort_102103313` 
3. Two folders are available "Backend" & "frontend" , navigate to Backend run - `
npm i
node server.js
`
4. The server should start on localhost:3000
5. Navigate to frontend
6. run - `npm i npm run dev`
7. frontend should start on localhost:5173
## **Running the Project**

1. Open a web browser and navigate to `http://localhost:5000` if docker otherwise `http://localhost:5173`
2. Upload a DOCX file using the file uploader
3. Click the "Convert" button to convert the file to PDF
4. Download the converted PDF file

## **Troubleshooting**

- If you encounter issues with the file upload, check the server logs for errors
- If the conversion fails, check the LibreOffice installation and configuration(this is the reason i cant get to production)
## **Preview**
![image](https://github.com/user-attachments/assets/352d67cd-e1ff-4dd7-8c47-121767de867f)

![image](https://github.com/user-attachments/assets/4c539542-fc04-4b6a-9903-2d8295776cab)

![image](https://github.com/user-attachments/assets/13abaa1f-a406-4cdb-b82a-57dfca1f3226)

### dark Mode Preview
![image](https://github.com/user-attachments/assets/10fcf6cb-6e7b-42df-a976-4325bc8147a4)


## **Final Thoughts**
This works locally but had issues with deployment
The project is deployed on vercel, However Internal server gateway error [500] is recieved
{The link is along side this repo's main page}


