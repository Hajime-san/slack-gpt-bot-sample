1. install gpt2-japanese  
`cd .docker/opt && git clone https://github.com/tanreinama/gpt2-japanese`
2. build docker && start
`docker-compose build`
`docker-compose up`

### check sample
`docker-compose exec slack-gpt-bot-sample bash`
`cd opt/gpt2-japanese`
#### generate 5 sample
`python gpt2-generate.py --model ./checkpoint/gpr2ja-finetune_run1-small --num_generate 5`
