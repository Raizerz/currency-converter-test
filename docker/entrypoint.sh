#!/bin/sh
set -x
env

cd /app
npm install
npm run start:dev
