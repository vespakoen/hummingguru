FROM mhart/alpine-node:6.9

VOLUME /tmp
VOLUME /data/hummingguru

WORKDIR /tmp

RUN apk update \
  && apk --no-cache add curl git \
  && curl -O -L https://www.johnvansickle.com/ffmpeg/releases/ffmpeg-release-64bit-static.tar.xz \
  && tar xJf /tmp/ffmpeg-release-64bit-static.tar.xz -C /tmp \
  && mv /tmp/ffmpeg-3.1.5-64bit-static/ffmpeg /usr/local/bin/ \
  && rm -rf /tmp/ffmpeg*

WORKDIR /src

ADD . .

RUN npm install

EXPOSE 8080

CMD ["npm", "start"]
