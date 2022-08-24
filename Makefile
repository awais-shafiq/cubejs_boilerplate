.PHONY:	start status stop #sternguard social content overseer notification all

start:
	UUID=$(shell whoami)$(shell hostname) docker-compose up -d --build

status:
	docker ps

stop:
	docker-compose down

# sternguard:
# 	docker cp backend/sternguard/. sternguard:/usr/app
# 	docker exec -it sternguard killall node

# social:
# 	docker cp backend/social/. social:/usr/app
# 	docker exec -it social killall node

# content:
# 	docker cp backend/content/. content:/app
# 	docker exec -it content pkill --signal 9 -x python3

# overseer:
# 	docker cp backend/overseer/. overseer:/app
# 	docker exec -it overseer pkill --signal 9 -x python3

# notification:
# 	docker cp backend/notification/. notification:/usr/app
# 	docker exec -it notification killall node

# all:
# 	docker cp backend/sternguard/. sternguard:/usr/app
# 	docker cp backend/social/. social:/usr/app
# 	docker cp backend/content/. content:/app
# 	docker cp backend/overseer/. overseer:/app
# 	docker cp backend/notification/. notification:/usr/app

# 	docker exec -it sternguard killall node
# 	docker exec -it social killall node
# 	docker exec -it content pkill --signal 9 -x python3
# 	docker exec -it overseer pkill --signal 9 -x python3
# 	docker exec -it notification killall node