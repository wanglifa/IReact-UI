#!/bin/env bash
yarn doc
git checkout gh-pages
mv -f dco/* ./
git add .
git commit -m 'update'
git push
git checkout master