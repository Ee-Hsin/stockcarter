# Stockcarter Backend

## Overview
This is the backend for the "Stockcarter" project, a web application designed to analyze trades and compare the performance of a user's portfolio against benchmarks such as the S&P 500. The backend is built using FastAPI and MongoDB, providing robust, efficient API services.

## Technology Stack
- **FastAPI**: A modern, fast (high-performance) web framework for building APIs with Python 3.6+ based on standard Python type hints.
- **MongoDB**: A NoSQL database used for storing application data in a flexible, JSON-like format.
- **Python**: The programming language used to develop the application logic.
- **Uvicorn**: A lightning-fast ASGI server for Python, used to run the FastAPI application.
- **Virtual Environment**: Used to manage the Python packages required for the project without affecting the global Python environment.

## Getting Started

### Setting Up the Virtual Environment
Before you start working with the project, you need to set up a virtual environment to manage dependencies:

1. **Create the Virtual Environment**:
```python -m venv env```

2. **Activate the Virtual Environment**:
- On Unix/Linux/macOS:
  ```source env/bin/activate```
- On Windows:
  ```env\\Scripts\\activate```

A script (`start.sh`) is also available which checks if the virtual environment is activated. If not, it will remind you to activate it.

3. **Deactivate the Virtual Environment**:
When you're finished working, you can deactivate the virtual environment by running:
```deactivate```

### Starting the Server
To start the server, ensure that the virtual environment is activated, and run the provided shell script:
```./start.sh```

This script checks for virtual environment activation and starts the FastAPI server using Uvicorn. If the virtual environment is not active, it will remind you to activate it.
