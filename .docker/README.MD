## On local development
1. install gpt2-japanese\
`cd .docker/opt && git clone https://github.com/tanreinama/gpt2-japanese`

2. build docker and start dev server\
`docker-compose build`\
`docker-compose up`\
`docker exec slack-gpt-bot-sample flask run --host 0.0.0.0 --port 3000`

3. check sample text\
`curl http://localhost:3000/generate-text`

## CI/CD
1. Cloud Build\
`gcloud builds submit --project slack-gpt-bot-sample --tag gcr.io/slack-gpt-bot-sample/generate-text`

2. Depoly Cloud Run\
`gcloud run deploy --project slack-gpt-bot-sample --image gcr.io/slack-gpt-bot-sample/generate-text --max-instances=1 --cpu 2 --memory=5Gi`
