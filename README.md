# Newsscraper

An application built using webscraping on the backend to get the top daily news articles from some of Hungary's most read online newspapers. It displays the articles side-by-side so that the reader can make a comparison of who is reporting on what and how exactly(less than perfect solution, but this is the idea behind it). Archive functionality to search back older articles as well (limited because of free servers/databases). Search by date or by titles. Articles link to the original sources for more reading.

Only in Hungarian because of the nature of project.

## Demo

Deployed at: "https://newsscraper-inky.vercel.app/"

![Demo](newsscraper.gif)

## Features

- REST API built with Node/Express
- Article scraping with Puppeteer
- Saving articles to backend Database
- External CRON-job set up to scrape articles every day at certain time (because free servers can't handle it internally)
- UI to display articles side-by-side for today's date
- Search function to search by keyword in title or by dates in archived articles
- Design for UI created by me in Figma

## Tech Stack

**Client:** Typescript, React, Next.js, Sass, Deployed on Vercel

**Server**: Typescript, Node.js, Express.js, REST API, Prisma(PostgreSQL), Puppeteer, Deployed on Heroku, CRON

## Lessons Learned

Webscraping with Puppeteer, building REST API & Express server, deploying client and server separately, deploying on Heroku(server & database), setting up CRON jobs to hit an endpoint periodically, working around the limitations of free servers...
