# Use an official Python runtime as a parent image
FROM python:3.11-slim

# Set the working directory in the container
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY . /app

# Install Chainlit
RUN pip install -e .

# Make port 8000 available to the world outside this container
EXPOSE 8000

# Run Chainlit when the container launches
CMD ["chainlit", "run", "app.py", "-w", "--host", "0.0.0.0"]