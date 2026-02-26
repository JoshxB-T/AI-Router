#!/bin/bash

PY="python3"
DB_FILE="dbconversion.py"

echo ">>> unzipping video_games.zip"
cd data
unzip video_games.zip
echo ">>> complete"

echo ">>> building video_games.db"
cd ..
$PY $DB_FILE
echo ">>> complete"
