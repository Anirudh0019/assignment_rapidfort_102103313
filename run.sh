set -e

echo "Step 1: Stopping and removing any existing containers..."
docker compose down

echo "Step 2: Building Docker images..."
docker compose build

echo "Step 3: Starting Docker containers..."
docker compose up -d

echo "Step 4: Checking container logs..."
docker compose logs -f frontend backend

echo "Containers are up and running!"
echo "Frontend is accessible at: http://localhost:5000"
echo "Backend is accessible at: http://localhost:3000"