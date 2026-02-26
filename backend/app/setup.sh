#!/bin/bash

echo ">>> unzipping video_games.zip"
cd data
unzip video_games.zip
echo ">>> complete"

cd ..

echo ">>> building video_games.db"
python3 dbconversion.py
echo ">>> complete"
