const dotenv = require("dotenv");

dotenv.config();
const { HeadNews, News } = require("../models/News");
const categories = [
  "business",
  "entertainment",
  "general",
  "health",
  "science",
  "sports",
  "technology",
  "world",
  "nation",
];
module.exports.executeEveryDay = function executeEveryDay(executeFunction) {
  let now = new Date();
  let next = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    10,
    12,
    0,
    0
  );
  let diff = next.getTime() - now.getTime();
  if (diff < 0) {
    diff += 24 * 60 * 60 * 1000;
  }
  console.log(diff);
  setTimeout(() => {
    executeFunction();
    executeEveryDay(executeFunction);
  }, diff);
};

async function getHeadNews(category) {
  const response = await fetch(
    `https://gnews.io/api/v4/top-headlines?category=${category}&apikey=${process.env.GNEWS_API_KEY}`
  );
  if (!response.ok) {
    console.log(response);
    return { noData: true };
  } else {
    let data = await response.json();
    data.noData = false;
    return data;
  }
}
async function getNews(category) {
  const response = await fetch(
    `https://gnews.io/api/v4/search?q=${category}&apikey=${process.env.GNEWS_API_KEY}`
  );
  if (!response.ok) {
    console.log(response);
    return { noData: true };
  } else {
    let data = await response.json();
    data.noData = false;
    return data;
  }
}

function formatNews(data, category) {
  return data.articles.map((article) => {
    return {
      title: article.title,
      description: article.description,
      image: article.image,
      url: article.url,
      category,
    };
  });
}

async function addCategoryToHeadNewsDB(category) {
  let data = await getHeadNews(category);
  if (data.noData) {
    return;
  }
  try {
    await HeadNews.deleteMany({ category: category });
    await HeadNews.insertMany(formatNews(data, category));
  } catch (err) {
    console.log(err);
  }
}
async function addCategoryToNewsDB(category) {
  let data = await getNews(category);
  if (data.noData) {
    return;
  }
  try {
    await News.deleteMany({ category: category });
    await News.insertMany(formatNews(data, category));
  } catch (err) {
    console.log(err);
  }
}
module.exports.addHeadNewssToDB = async function addHeadNewssToDB() {
  for (let category of categories) {
    await addCategoryToHeadNewsDB(category);
    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    await delay(3000);
  }
};

module.exports.addNewssToDB = async function addHeadNewssToDB() {
  for (let category of categories) {
    await addCategoryToNewsDB(category);
    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    await delay(3000);
  }
};
