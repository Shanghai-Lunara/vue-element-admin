.PHONY: web

HARBOR_DOMAIN := $(shell echo ${HARBOR})
PROJECT := lunara-common
DASHBOARD_IMAGE := "$(HARBOR_DOMAIN)/$(PROJECT)/api-dashboard:latest"

web:
	npm run build:prod
	docker build -t $(DASHBOARD_IMAGE) .
	docker push $(DASHBOARD_IMAGE)
	rm -rf dist

clean:
	$(shell docker ps | awk '{print $2}' | xargs docker kill)
	$(shell docker container ls -a | awk '{print $2}' | xargs docker container rm)
