#!/bin/bash

PY="python3"

echo ">>> unzipping video_games.zip"
cd data
unzip video_games.zip
echo ">>> complete"

cd ..

echo ">>> building video_games.db"
$PY dbconversion.py
echo ">>> complete"
