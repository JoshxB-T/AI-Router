# Frontend


# Backend
## Setup
```bash
# Change directory
cd Backend

# Create virtual environment
python -m venv .venv

# Activate virtual environment (macOS/Linux)
source .venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# At any time to deactivate virtual environment
deactivate

# Start server
uvicorn app.server:app --host <IP_Address> --reload --port <port_number>
```

