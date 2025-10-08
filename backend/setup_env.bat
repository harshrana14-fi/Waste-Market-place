@echo off
setlocal enabledelayedexpansion

REM Create venv if missing
if not exist .venv (
    python -m venv .venv
)

call .venv\Scripts\activate
python -m pip install --upgrade pip
pip install -r requirements.txt
echo Environment ready. Activate with: call .venv\Scripts\activate

