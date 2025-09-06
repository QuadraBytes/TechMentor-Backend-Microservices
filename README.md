# TechMentor Course Platform - Backend (Microservices)

This repository contains the **backend microservices** for the Technology Course Platform.  
The backend is designed using a **cloud-native, microservices architecture**, built with **Node.js/Express**, and deployed on **AWS EKS** with **Docker** and **GitHub Actions CI/CD**.

---

Backend consists of **4 independent microservices** deployed on **Amazon EKS**:
- **Auth Service** → Handles user authentication (JWT + Google Sign-In via GCP OAuth).  
- **User Service** → Manages user profiles and roles (student/instructor).  
- **Course Service** → Manages course creation, update and enrollments.  
- **Notification Service** → Listens to events via **Amazon MQ** and sends notifications via **Nodemailer**.  

### Other Key Components
- **Databases:**  
  - MongoDB Atlas (course & user data)  
  - Amazon RDS (auth data)  
- **API Gateway:** Single entry point for frontend requests  
- **AWS Lambda:** AI Assistant integration with OpenAI API  
- **Amazon MQ:** Message broker for async notifications  
- **Docker + ECR:** Containerized microservices  
- **GitHub Actions:** Automated CI/CD pipeline  

---

## Tech Stack

- **Backend Framework:** Node.js, Express  
- **Authentication:** JWT, Google OAuth (GCP)  
- **Databases:** MongoDB Atlas, Amazon RDS (PostgreSQL)  
- **Messaging & Notifications:** Amazon MQ, AWS SES, Nodemailer  
- **Containerization:** Docker + AWS ECR
- **Orchestration:** Amazon EKS (Kubernetes)  
- **CI/CD:** GitHub Actions
- **AI Integration:** AWS Lambda + OpenAI API  

---

## Setup Instructions

### Clone Repository
```bash
git clone https://github.com/QuadraBytes/TechMentor-Backend-Microservices.git
cd tech-course-platform-backend
```

### Install Dependencies
```bash
cd auth-service  (or user-service, course-service and notification-service)
npx prisma generate   (for auth service)
npm install
```

### Run locally (Dockerized)
```bash
docker-compose up --build
```

## Deployment

### Build Docker Images
```bash
docker build -t auth-service ./auth-service
docker build -t user-service ./user-service
docker build -t course-service ./course-service
docker build -t notification-service ./notification-service
```

### Push Images to ECR
```bash
docker tag auth-service:latest <aws_account_id>.dkr.ecr.region.amazonaws.com/auth-service:latest
docker push <aws_account_id>.dkr.ecr.region.amazonaws.com/auth-service:latest
```


### Deploy on EKS
```bash
kubectl apply -f k8s/auth-deployment.yaml
kubectl apply -f k8s/user-deployment.yaml
kubectl apply -f k8s/course-deployment.yaml
kubectl apply -f k8s/notification-deployment.yaml
```

### API Gateway
Configured as the single entry point.
Maps frontend requests to appropriate backend services.

---

## API Endpoints

Auth Service
  * POST /auth/signup → Register user
  * POST /auth/login → User login (JWT)
  * POST /auth/google → Google Sign-In

User Service
  * GET /users/instructor/:id → Get created courses list
  * GET /users/student/:id → Get enrolled courses list

Course Service
  * POST /courses → Create new course
  * PUT /courses/:id → Edit course
  * DELETE /courses/:id → Delete course
  * GET /courses → List all courses
  * GET /courses/:id → Get one course
  * POST /courses/:id/enroll → Enroll in a course

Notification Service
  * Triggered internally when enrollment events occur


