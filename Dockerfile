FROM node:14-alpine3.15
RUN mkdir -p /home/noteapp
COPY . /home/noteapp
WORKDIR /home/noteapp
CMD ["npm", "start"]    