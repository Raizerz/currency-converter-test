FROM node:12.18.1-alpine

RUN apk update \
 && apk upgrade \
 && apk add --update --no-cache \
        ca-certificates \
        curl \
        openssh \
        python3 \
        py-pip
RUN apk --no-cache add --virtual builds-deps build-base python
RUN pip3 install boto3


RUN mkdir -p /app
ADD docker/entrypoint.sh /app
COPY ./ /app/

WORKDIR /app
RUN chmod a+x entrypoint.sh

EXPOSE 3000
ENTRYPOINT ["./entrypoint.sh"]
