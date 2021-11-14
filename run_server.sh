cd backend
nohup uvicorn main:app --reload &
cd ..
cd frontend
nohup npm run serve &
