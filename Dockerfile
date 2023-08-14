FROM node:16.10

ARG JWT_KEY
ARG PORT
ARG MONGODB_URI

ENV JWT_KEY=$JWT_KEY
ENV PORT=$PORT
ENV MONGODB_URI=$MONGODB_URI

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install

COPY . .

CMD ["node", "src/index.js"]
