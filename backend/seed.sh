#!/bin/bash

# Script to seed the database with seed.sql

# Copy seed.sql to the Docker container's tmp folder
docker cp seed.sql fullstack-db:/tmp/seed.sql

# Execute the SQL file in the database
docker exec fullstack-db psql -U postgres -d mydb -f /tmp/seed.sql

echo "Database seeded successfully."