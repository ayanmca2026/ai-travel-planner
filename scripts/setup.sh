#!/bin/bash
echo "Setting up TripWise AI environments..."
cd backend && python -m venv venv && source venv/bin/activate && pip install -r requirements.txt
cd ../frontend && npm install
echo "Done!"
