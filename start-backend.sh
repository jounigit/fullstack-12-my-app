#!/bin/bash

# Start the backend server
cd backend
# Database available by docker
docker compose -f docker-compose.db.yml up -d &&
# Run backend
npm run dev 
echo "backend is running"