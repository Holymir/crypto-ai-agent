module.exports = {
  log: (title, sentiment) => {
    console.log(`[${new Date().toISOString()}] ${sentiment} → ${title}`);
  }
};
